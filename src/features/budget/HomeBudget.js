import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Budget } from './Budget';
import { BudgetNavbar } from './BudgetNavbar';
import { TransactionForm } from './TransactionForm';
import { selectEntries, removeTransaction } from '../transactions/transactionsSlice';

export function HomeBudget() {
    const [transactionFormOpen, setTransactionFormOpen] = useState(false);
    const [editedTransaction, setEditedTransaction] = useState(null);
    const dispatch = useDispatch();
    const transactions = useSelector(selectEntries);

    const indexOfTransaction = transactions.indexOf(editedTransaction);

    const showTransactionForm = (transaction = null) => {
        setTransactionFormOpen(true);
        setEditedTransaction(transaction);
    }

    const hideTransactionForm = () => {
        setTransactionFormOpen(false);
        setEditedTransaction(null);
    }

    const remove = () => {
        if(indexOfTransaction !== -1) {
          dispatch(removeTransaction(indexOfTransaction))
        }
    }

    const isDesktopOrLaptop = useMediaQuery({query: '(min-device-width: 1024px)'});

    return (
        <div>
            {(!transactionFormOpen || (transactionFormOpen && isDesktopOrLaptop)) &&
            (<div>
                <BudgetNavbar 
                    transactions={transactions} 
                    addNewTransaction={() => showTransactionForm()} />
                <Budget 
                    transactions={transactions} 
                    editTransaction={(transaction) => showTransactionForm(transaction)} />
            </div>)}
            {transactionFormOpen && 
                <TransactionForm 
                    isEdit={!!editedTransaction} 
                    transaction={editedTransaction} 
                    indexOfTransaction={indexOfTransaction} 
                    onRemove={() => remove(editedTransaction)}
                    onClose={() => hideTransactionForm()} /> }
        </div>
    )
}