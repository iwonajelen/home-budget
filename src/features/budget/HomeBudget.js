import React, { useState } from 'react';
import { Budget } from './Budget';
import { BudgetNavbar } from './BudgetNavbar';
import { TransactionForm } from './TransactionForm';

export function HomeBudget() {
    const [transactionFormOpen, setTransactionFormOpen] = useState(false);

    return (
        <div>
            <BudgetNavbar addNewTransaction={() => setTransactionFormOpen(true)} />
            <Budget />
            {transactionFormOpen ? <TransactionForm onClose={() => setTransactionFormOpen(false)} /> : ''}
        </div>
    )
}