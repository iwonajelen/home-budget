import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min';
import { useForm } from "react-hook-form";
import './TransactionForm.scss';
import { addTransaction, editTransaction, selectCategoryList } from '../transactions/transactionsSlice';
import { TransactionProperties, TransactionEntity } from '../transactions/transactionModel';

export function TransactionForm(props) {
    const {t, i18n} = useTranslation('common');
    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const dispatch = useDispatch();
    const categoryList = useSelector(selectCategoryList);

    const defaultTransaction = () => {
        return props.transaction ? props.transaction : {}
    }

    const { handleSubmit, register, watch, errors } = useForm({
        mode: "onBlur",
        reValidateMode: 'onChange',
        defaultValues: {
            ...defaultTransaction()
        } 
    });

    const watchConstant = watch("constant", false);

    const onSubmit = values => {
        const entity = new TransactionEntity();
        entity.setBasedOnFormData(values, isCustomCategory);

        if(!props.isEdit) {
            const formData = {
                ...entity,
                creation_date: new Date().toString()
            }
            dispatch(addTransaction(formData));
        } else {
            const payload = {
                transaction: {
                    ...entity
                },
                index: props.indexOfTransaction
            }
            dispatch(editTransaction(payload));
        }
        props.onClose();
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
            lang: i18n.language,
            startDate: props.isEdit ? new Date(props.transaction.date) : new Date()
        });
    
        calendars.forEach((calendar) => {
          calendar.on('select', (date) => {
              
          });
        });
    
        const element = document.querySelector('#transaction-date');
        if (element) {
          element.bulmaCalendar.on('select', (datepicker) => {
            datepicker.data.hide();
          });
        }
      }, []);

    const categoryOptionsChanged = (e) => {
        setIsCustomCategory(e.target.selectedIndex === e.target.length-1);
    };  
    
    const renderCategoryList = () => {
        if(categoryList.length > 0) {
            const categoryListOptions = [...categoryList, t('transactions.otherType')]
            return(
                <div>
                    <div className="select is-info">
                        <select name={TransactionProperties.CATEGORY} ref={register} onChange={categoryOptionsChanged}>
                            {categoryListOptions.map(category => <option key={categoryListOptions.indexOf(category)} value={category}>{category}</option>)}
                        </select>
                    </div>
                    <div className="control">
                        <input className="input is-info" name="otherCategory" type={isCustomCategory ? 'text' : 'hidden'} ref={register} placeholder={t('transactions.otherType')}/>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="control">
                    <input name={TransactionProperties.CATEGORY}
                        ref={register({
                            required: "Required"
                        })} 
                        className={"input " + (errors.amount && "is-danger")}
                        type="text" 
                        placeholder={t('transactions.category')}/>
                </div>
            )
        }
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={() => props.onClose()}></div>
            <form className="modal-card" onSubmit={handleSubmit(onSubmit)}>
                <header className="modal-card-head">
                    <p className="modal-card-title">{ props.isEdit ? t('buttons.edit_transaction') : t('buttons.new_transaction')}</p>
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
                                    <input id="transaction-date" name={TransactionProperties.DATE} ref={register} className="input" type="date"/>
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
                                    <select name={TransactionProperties.TYPE} ref={register}>
                                        <option key="expense" value="-">{t('transactions.types.expense')}</option>
                                        <option key="income" value="+">{t('transactions.types.income')}</option>
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
                                <div className="control is-expanded">
                                    <input name={TransactionProperties.AMOUNT}
                                        ref={register({
                                            required: "Required",
                                            validate: value => parseFloat(value) > 0 || ""
                                        })} 
                                        className={"input " + (errors.amount ? "is-danger" : "")}
                                        type="text" 
                                        placeholder="0"/>
                                </div>
                                <div className="control addon-control">
                                    <input name={TransactionProperties.CURRENCY} ref={register} placeholder="PLN" className="button is-static addon-control-input" value="PLN" readOnly/>
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
                                    <input name={TransactionProperties.CONSTANT} ref={register} type="checkbox"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    { watchConstant && (
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.period')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="select is-info is-static">
                                    <select className="is-static" name={TransactionProperties.PERIOD} ref={register}>
                                        <option key="month" value="month">{t('transactions.periods.month')}</option>
                                        <option key="day" value="day">{t('transactions.periods.day')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">{t('transactions.unexpected')}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input name={TransactionProperties.UNEXPECTED} ref={register} type="checkbox"/>
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
                                <textarea name={TransactionProperties.COMMENT} ref={register} className="textarea" placeholder={t('transactions.comment')}></textarea>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot transaction-form-footer">
                    <div className="">
                        <button type="submit" className="button is-success">{t("buttons.save")}</button>
                        <button className="button" onClick={() => props.onClose()}>{t("buttons.cancel")}</button>
                    </div>
                    <div className="">
                        <button className="button is-danger" onClick={() => props.onRemove()}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    )
}