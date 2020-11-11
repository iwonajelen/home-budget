import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTransaction } from '../transactions/transactionsSlice';
import { useTranslation } from "react-i18next";
import { TransactionProperties } from "../transactions/transactionModel";

export function Budget(props) {
    const {t, i18n} = useTranslation('common');
    const dispatch = useDispatch();

    const getTitles = () => {
        const readTitle = (value) => {
            if(value !== TransactionProperties.CREATION_DATE) {
                return <th key={value} >{t('transactions.' + value)}</th>;
            }
            
        }
        return (
            <tr>
                {Object.values(TransactionProperties).map((value) => readTitle(value))}
                <th key="options" >{t('transactions.options')}</th>
            </tr>
        )
    }

    const readValues = (transaction) => {
        const values = [];
        const getValue = (property) => {
            switch(property) {
                case TransactionProperties.TYPE:
                    return transaction[property] === "-" ? t('transactions.types.expense') : t('transactions.types.income');
                case TransactionProperties.CONSTANT:
                    return transaction[property] ? t('transactions.yes') : t('transactions.no');
                case TransactionProperties.PERIOD:
                    return transaction[property] ? t('transactions.periods.' + transaction[property]) : '';
                default:
                    return transaction[property];
            }
        }
        for (const property in TransactionProperties) {
            if(property.toLowerCase() !== TransactionProperties.CREATION_DATE){
                values.push(<td key={property.toLowerCase()}>{getValue(property.toLowerCase())}</td>);
            }
        }
        return values;
    }

    const readRow = (data) => {
        const remove = (transaction) => {
            const index = data.indexOf(transaction);
            if(index !== -1) {
              dispatch(removeTransaction(index))
            }
        }
        const edit = (transaction) => {
            props.editTransaction(transaction);
        }
        return data.map((transaction) => {
            return (
            <tr key={data.indexOf(transaction)} onClick={() => edit(transaction)}>
                {readValues(transaction)}
                <td key="options">
                    <button className="button is-danger" onClick={() => remove(transaction)}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <button className="button is-warning" onClick={() => edit(transaction)}>
                        <i className="fas fa-edit"></i>
                    </button>
                </td>
            </tr>);
        })
    }

    const createTable = (data) => {
        return (
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    {getTitles()}
                </thead>
                <tbody>
                    {readRow(data)}
                </tbody>
            </table>
        )
    }

    return (
        <div>
            {(props.transactions.length > 0) && createTable(props.transactions)}
        </div>
        
    );
}
