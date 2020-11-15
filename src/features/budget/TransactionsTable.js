import React from 'react';
import { format } from 'date-fns'
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from "react-i18next";
import { TransactionProperties, Properties } from "../transactions/transactionModel";
import './TransactionsTable.scss';

export function TransactionsTable(props) {
    const {t, i18n} = useTranslation('common');
    
    const isDesktopOrLaptop = useMediaQuery({query: '(min-device-width: 1024px)'});

    const propertiesToHide = [
        TransactionProperties.TYPE, 
        TransactionProperties.CATEGORY, 
        TransactionProperties.COMMENT, 
        TransactionProperties.CONSTANT,
        TransactionProperties.PERIOD
    ]

    const shouldHideProperty = (property) => {
        return !isDesktopOrLaptop && propertiesToHide.includes(property);
    }

    const getTitles = () => {
        const readTitle = (value) => {
            if(value !== TransactionProperties.CREATION_DATE) {
                return !shouldHideProperty(value.toLowerCase()) && <th key={value} >{t('transactions.' + value)}</th>;
            }
            
        }
        return (
            <tr>
                {Object.values(TransactionProperties).map((value) => readTitle(value))}
            </tr>
        )
    }

    const readValues = (transaction) => {
        const values = [];
        const getValue = (property) => {
            switch(property) {
                case Properties.DATE:
                    return format(new Date(transaction[property]), 'dd/MM/yyyy');
                case Properties.TYPE:
                    return transaction[property] === "-" ? t('transactions.types.expense') : t('transactions.types.income');
                case Properties.CONSTANT:
                    return transaction[property] ? t('transactions.yes') : t('transactions.no');
                case Properties.PERIOD:
                    return transaction[property] ? t('transactions.periods.' + transaction[property]) : '';
                case Properties.AMOUNT:
                    return `${transaction[property]} ${transaction[Properties.CURRENCY]}` ;
                default:
                    return transaction[property];
            }
        }
        for (const property in TransactionProperties) {
            if((property.toLowerCase() !== TransactionProperties.CREATION_DATE) && !shouldHideProperty(property.toLowerCase())){
                values.push(<td key={property.toLowerCase()}>{getValue(property.toLowerCase())}</td>);
            }
        }
        return values;
    }

    const readRow = (data) => {
        const edit = (transaction) => {
            props.editTransaction(transaction);
        }
        return data.map((transaction) => {
            return (
            <tr key={data.indexOf(transaction)} 
                onClick={() => edit(transaction)} 
                className={(transaction[TransactionProperties.TYPE] === "+") ? "income-background" : "expense-background"}>
                {readValues(transaction)}
            </tr>);
        })
    }

    const createTable = (data) => {
        return (
            <table className="table is-hoverable is-fullwidth">
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
