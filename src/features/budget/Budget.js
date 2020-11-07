import React from 'react';
import { useSelector } from 'react-redux';
import { selectEntries } from '../transactions/transactionsSlice';
import { useTranslation } from "react-i18next";

export function Budget() {
    const {t, i18n} = useTranslation('common');
    const transactionsData = useSelector(selectEntries);

    const readTitles = (data) => {
        return (<tr>{Object.keys(data).map((key) => <th key={key} >{t('transactions.' + key)}</th>)}</tr>)
    }

    const readValues = (transaction) => {
        const values = [];
        for (const property in transaction) {
            values.push(<td key={property}>{transaction[property]}</td>);
        }
        return values;
    }

    const readRow = (data) => {
        return data.map((transaction) => {
            return (<tr>{readValues(transaction)}</tr>);
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
