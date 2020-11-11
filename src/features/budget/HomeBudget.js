import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Budget } from './Budget';
import { BudgetNavbar } from './BudgetNavbar';
import { TransactionForm } from './TransactionForm';
import { selectEntries } from '../transactions/transactionsSlice';

export function HomeBudget() {
    const [transactionFormOpen, setTransactionFormOpen] = useState(false);
    const [editedTransaction, setEditedTransaction] = useState(null);
    const transactions = useSelector(selectEntries)

    const showTransactionForm = (transaction = null) => {
        setTransactionFormOpen(true);
        setEditedTransaction(transaction);
    }

    const hideTransactionForm = () => {
        setTransactionFormOpen(false);
        setEditedTransaction(null);
    }

    return (
        <div>
            <BudgetNavbar 
                transactions={transactions} 
                addNewTransaction={() => showTransactionForm()} />
            <Budget 
                transactions={transactions} 
                editTransaction={(transaction) => showTransactionForm(transaction)} />
            {transactionFormOpen && 
                <TransactionForm 
                    isEdit={!!editedTransaction} 
                    transaction={editedTransaction} 
                    indexOfTransaction={transactions.indexOf(editedTransaction)} 
                    onClose={() => hideTransactionForm()} /> }
        </div>
    )
}