import React from 'react';
import { format } from 'date-fns'
import { pl, enUS } from 'date-fns/locale'
import { TransactionsTable } from "./TransactionsTable";
import { getTransactionsByDateDesc, TransactionProperties } from "../transactions/transactionModel";
import { useTranslation } from "react-i18next";
import './Budget.scss';

export function Budget(props) {
    const sortedTransactions = getTransactionsByDateDesc(props.transactions);
    const {t, i18n} = useTranslation('common');
    const locale = i18n.language == 'en' ? enUS : pl;
    const getTransactionsByMonth = (transactions) => {
        const mapOfTransactions = new Map();

        transactions.map((transaction) => {
            const transactionDate = new Date(transaction.date);
            const month = `${transactionDate.getMonth()}/${transactionDate.getFullYear()}`;

            if(mapOfTransactions.get(month)) {
                mapOfTransactions.set(month, [...mapOfTransactions.get(month), transaction]);
            } else {
                mapOfTransactions.set(month, [transaction]);
            }

            return;
        })

        return mapOfTransactions;
    }

    const getAmountByMonth = (transactions) => {
        return transactions.reduce( ( sum , transaction ) => {
            const amount = parseFloat(transaction[TransactionProperties.AMOUNT]);
            if(transaction[TransactionProperties.TYPE] === "+") {
                return sum + amount;
            } else {
                return sum - amount;
            }
        }, 0);
    }

    const displayDataForMonth = (month, transactionsByMonth) => {
        const amountByMonth = getAmountByMonth(transactionsByMonth);
        return (
            <div key={month} className={"table-section " + (amountByMonth > 0 ? "income" : "expense")}>
                <div className="table-section-title">
                    <div className="">
                        <p className="title title-month is-4">{format(new Date(transactionsByMonth[0].date), "MMM yyyy", { locale })}</p>
                    </div>
                    <div className="">
                        <p className={"title is-5 " + (amountByMonth > 0 ? "amount-income" : "amount-expense")}>{amountByMonth > 0 ? "+" : ""}{amountByMonth}</p>
                    </div>
                </div>
                <TransactionsTable transactions={transactionsByMonth} editTransaction={(transaction) => props.editTransaction(transaction)}/>
            </div>
        )
    }

    const displayTransactionsByMonth = (transactions) => {
        let dataForMonth = [];
        const mapOfTransactions = getTransactionsByMonth(transactions);
        for(const [month, transactionsByMonth] of mapOfTransactions) {
            dataForMonth = [...dataForMonth, displayDataForMonth(month, transactionsByMonth)];
        }

        return dataForMonth;
    }

    return (
        <div>
            {displayTransactionsByMonth(sortedTransactions)}
        </div>
        
    );
}
