import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CSVReader from 'react-csv-reader'
import { updateTransactions, selectEntries } from '../transactions/transactionsSlice';
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

export function BudgetNavbar() {
    const {t, i18n} = useTranslation('common');
    const dispatch = useDispatch();
    const transactions = useSelector(selectEntries);
    const [fileName, setFileName] = useState('');

    const parseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
          header
            .toLowerCase()
            .replace(/\W/g, '_')
    }

    const onTransactionsFileLoaded = (data, fileInfo) => {
        dispatch(updateTransactions(data));
        setFileName(fileInfo['name']);
    }

    const clearTransactionsData = () => {
        dispatch(updateTransactions([]));
        setFileName('');
    }

    const getLanguageToChange = () => {
        return i18n.language === "en" ? "pl" : "en";
    }

    return (
        <nav className="level navbar container is-fluid">
            <div className="level-left">
                <p className="title">{t('app.title')}</p>
            </div>
            <div className="level-right">
                <div className="level-item">
                    <p className="subtitle">{fileName}</p>
                </div>
                <div className="level-item">
                        <CSVReader 
                            label={t('buttons.select_csv_file')}
                            cssClass="button is-primary"
                            cssInputClass="file-input"
                            cssLabelClass="file-label"
                            parserOptions={parseOptions} 
                            onFileLoaded={onTransactionsFileLoaded} 
                        />
                </div>
                <div className="level-item">
                    <CSVLink filename={"home-budget.csv"} className="button is-success" data={transactions}>{t('buttons.save')}</CSVLink>
                </div>
                <div className="level-item">
                    <button className="button is-danger" onClick={clearTransactionsData}>{t('buttons.clear')}</button>
                </div>
                <div className="level-item">
                    <button className="button is-dark" onClick={() => i18n.changeLanguage(getLanguageToChange())}>{getLanguageToChange()}</button>
                </div>
            </div>
        </nav>
    );
}
