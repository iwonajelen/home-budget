import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
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

    const getUploadIcon = () => {
        return (
            <span className="icon is-small">
                <i className="fas fa-upload"></i>
            </span>
        )
    }

    const isDesktopOrLaptop = useMediaQuery({query: '(min-device-width: 1024px)'})
    
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })

    return (
        <nav className={"level navbar container " + (isDesktopOrLaptop ? "is-fluid" : "is-fluid-small-padding")}>
            <div className={"level-item " + (isDesktopOrLaptop ? "level-left" : "")}>
                <a href="." className="has-text-centered is-hidden-touch">
                    <img src={logo} alt={t('app.title')}/>
                </a>
                <div className="buttons is-hidden-desktop">
                    <button className="button is-primary is-light" onClick={addNewTransaction}>
                        <span className="icon is-small">
                            <i className="fas fa-plus"></i>
                        </span>
                    </button>
                    <CSVReader 
                        label={getUploadIcon()}
                        cssClass="button is-primary is-light"
                        cssInputClass="file-input"
                        cssLabelClass="file-label"
                        parserOptions={parseOptions} 
                        onFileLoaded={onTransactionsFileLoaded} 
                    />
                    <CSVLink filename={fileName ? fileName : "home-budget.csv"} className="button is-primary is-light" data={props.transactions}>
                        <span className="icon is-small">
                            <i className="fas fa-download"></i>
                        </span>
                    </CSVLink>
                </div>
            </div>
            <div className="level-item">
                <div className="buttons is-hidden-touch">
                    <button title={t('buttons.new_transaction')} className="button is-primary is-light" onClick={addNewTransaction}>{t('buttons.new_transaction')}</button>
                    <CSVReader 
                        label={fileName ? fileName : t('buttons.select_csv_file')}
                        cssClass="button is-primary is-light"
                        cssInputClass="file-input"
                        cssLabelClass="file-label"
                        parserOptions={parseOptions} 
                        onFileLoaded={onTransactionsFileLoaded} 
                    />
                    <CSVLink filename={fileName ? fileName : "home-budget.csv"} className="button is-primary is-light" data={props.transactions}>
                        <span>
                            {t('buttons.save')}
                        </span>
                    </CSVLink>
                </div>
            </div>
            <div className="level-right is-hidden-touch">
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
