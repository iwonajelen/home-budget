import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min';
import { useForm } from "react-hook-form";
import './TransactionForm.scss';
import { addTransaction, selectCategoryList } from '../transactions/transactionsSlice';

export function TransactionForm(props) {
    const {t, i18n} = useTranslation('common');

    const dispatch = useDispatch();
    const categoryList = useSelector(selectCategoryList);

    const { handleSubmit, register, errors } = useForm({
        reValidateMode: 'onChange'
    });
    const onSubmit = values => {
        const formData = {
            creation_date: new Date().toString(),
            ...values
        }
        console.log("formData", formData)
        dispatch(addTransaction(formData));
    }

    useEffect(() => {
        const calendars = bulmaCalendar.attach('[type="date"]', {
            displayMode: 'dialog',
            showFooter: false,
            showHeader: false,
            color: "info",
            showClearButton: false,
            startDate: new Date(),
            dateFormat: "DD/MM/YYYY",
            lang: i18n.language
        });
    
        calendars.forEach((calendar) => {
          calendar.on('select', (date) => {
            console.log("date", date);
          });
        });
    
        const element = document.querySelector('#transaction-date');
        if (element) {
          element.bulmaCalendar.on('select', (datepicker) => {
            console.log("datepicker", datepicker.data.isOpen());
            datepicker.data.hide();
          });
        }
      }, []);

    const renderCategoryList = () => {
        if(categoryList.length > 0) {
            return(
                <div className="select is-info">
                    <select name="category" ref={register}>
                        {categoryList.map(category => <option value={category}>{category}</option>)}
                    </select>
                </div>
            )
        } else {
            return(
                <div className="control">
                    <input name="category" 
                        ref={register({
                            required: "Required"
                        })} 
                        className={"input " + (errors.amount && "is-danger")}
                        type="text" 
                        placeholder="Category"/>
                </div>
            )
        }
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={() => props.onClose()}></div>
            <form className="modal-card" onSubmit={handleSubmit(onSubmit)}>
                <header className="modal-card-head">
                    <p className="modal-card-title">{t('buttons.new_transaction')}</p>
                    <button className="delete" aria-label="close" onClick={() => props.onClose()}></button>
                </header>
                <section className="modal-card-body">
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.date')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input id="transaction-date" name="date" ref={register} className="input" type="date"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.type')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="select is-info">
                                    <select name="type" ref={register}>
                                        <option value="-">{t('transactions.types.expense')}</option>
                                        <option value="+">{t('transactions.types.income')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.category')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                {renderCategoryList()}
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.amount')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field has-addons">
                                <div className="control">
                                    <input name="amount" 
                                        ref={register({
                                            required: "Required",
                                            validate: value => parseFloat(value) > 0 || "Nice try!"
                                        })} 
                                        className={"input " + (errors.amount && "is-danger")}
                                        type="text" 
                                        placeholder="0"/>
                                </div>
                                <div className="control">
                                    <input name="currency" ref={register} placeholder="PLN" className="button is-static" value="PLN" readOnly/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.constant')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input name="constant" ref={register} type="checkbox"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.period')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="select is-info">
                                    <select name="period" ref={register}>
                                        <option value="month">{t('transactions.periods.month')}</option>
                                        <option value="day">{t('transactions.periods.day')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.unexpected')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input name="unexpected" ref={register} type="checkbox"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.comment')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                            <div className="control">
                                <textarea name="comment" ref={register} className="textarea" placeholder={t('transactions.comment')}></textarea>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-success">{t("buttons.save")}</button>
                    <button className="button" onClick={() => props.onClose()}>{t("buttons.cancel")}</button>
                </footer>
            </form>
        </div>
    )
}