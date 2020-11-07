import React from 'react';
import './App.scss';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Budget } from './features/budget/Budget';
import { BudgetNavbar } from './features/budget/BudgetNavbar';

function App() {
  return (
    <section className="">
        <BudgetNavbar />
        <Budget />
    </section>
  );
}

export default App;
