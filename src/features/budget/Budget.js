import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEntries, removeTransaction } from '../transactions/transactionsSlice';
import { useTranslation } from "react-i18next";

export function Budget() {
    const {t, i18n} = useTranslation('common');
    const transactionsData = useSelector(selectEntries);
    const dispatch = useDispatch();

    const readTitles = (data) => {
        return (
            <tr>
                {Object.keys(data).map((key) => {return key != "creation_date" ? <th key={key} >{t('transactions.' + key)}</th> : ''})}
                <th key="options" >{t('transactions.options')}</th>
            </tr>
        )
    }

    const readValues = (transaction) => {
        const values = [];
        for (const property in transaction) {
            if(property !== "creation_date"){
                if(property === "type") {
                    values.push(<td key={property}>{transaction[property] === "-" ? t('transactions.types.expense') : t('transactions.types.income')}</td>);
                } else {
                    values.push(<td key={property}>{transaction[property]}</td>);
                }
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
        return data.map((transaction) => {
            return (
            <tr>
                {readValues(transaction)}
                <td key="options">
                    <button className="button is-danger" onClick={() => remove(transaction)}>
                        <i className="fas fa-trash"></i>
                    </button>
                </td>
            </tr>);
        })
    }

    const createTable = (data) => {
        return (
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    {readTitles(data[0])}
                </thead>
                <tbody>
                    {readRow(data)}
                </tbody>
            </table>
        )
    }

    return (
        <div>
            {(transactionsData.length > 0) && createTable(transactionsData)}
        </div>
        
    );
}
