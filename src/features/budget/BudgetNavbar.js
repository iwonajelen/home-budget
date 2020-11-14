import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CSVReader from 'react-csv-reader'
import { updateTransactions } from '../transactions/transactionsSlice';
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png"
import './BudgetNavbar.scss';

export function BudgetNavbar(props) {
    const {t, i18n} = useTranslation('common');
    const dispatch = useDispatch();
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

    const addNewTransaction = () => {
        props.addNewTransaction();
    }

    return (
        <nav className="level navbar container is-fluid">
            <div className="level-left">
                <a href="." className="level-item has-text-centered">
                    <img src={logo} alt={t('app.title')}/>
                </a>
            </div>
            <div className="level-item">
                <div className="buttons">
                    <button className="button is-primary is-light" onClick={addNewTransaction}>{t('buttons.new_transaction')}</button>
                        <CSVReader 
                            label={fileName ? fileName : t('buttons.select_csv_file')}
                            cssClass="button is-primary is-light"
                            cssInputClass="file-input"
                            cssLabelClass="file-label"
                            parserOptions={parseOptions} 
                            onFileLoaded={onTransactionsFileLoaded} 
                        />
                    <CSVLink filename={fileName ? fileName : "home-budget.csv"} className="button is-primary is-light" data={props.transactions}>
                        {/* <span className="icon is-small">
                            <i className="fas fa-check"></i>
                        </span> */}
                        <span>
                            {t('buttons.save')}
                        </span>
                    </CSVLink>
                </div>
            </div>
            <div className="level-right">
                {/* <div className="level-item">
                    <button className="button is-primary is-inverted" onClick={clearTransactionsData}>{t('buttons.clear')}</button>
                </div> */}
                <div className="level-item">
                    <button className="button is-primary is-light" onClick={() => i18n.changeLanguage(getLanguageToChange())}>{getLanguageToChange()}</button>
                </div>
            </div>
        </nav>
    );
}
