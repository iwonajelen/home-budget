import React from 'react';
import { compareDesc, format } from 'date-fns'
import { TransactionsTable } from "./TransactionsTable";
import { getTransactionsByDateDesc } from "../transactions/transactionModel";
import './Budget.scss';

export function Budget(props) {
    const sortedTransactions = getTransactionsByDateDesc(props.transactions);

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

    const displayDataForMonth = (transactionsByMonth) => {
        return (
            <div className="table-section">
                <div className="level table-section-title">
                    <div className="level-item has-text-centered">
                        <p className="title title-month is-4">{format(new Date(transactionsByMonth[0].date), "MMMM yyyy")}</p>
                    </div>
                    <div className="level-item">

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
            dataForMonth = [...dataForMonth, displayDataForMonth(transactionsByMonth)];
        }

        return dataForMonth;
        // return mapOfTransactions.values().map((transactionsByMonth) => displayDataForMonth(transactionsByMonth));
    }

    return (
        <div>
            {displayTransactionsByMonth(sortedTransactions)}
        </div>
        
    );
}
