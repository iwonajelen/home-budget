import React from 'react';
import './App.scss';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import "bulma-calendar/dist/css/bulma-calendar.min.css"
import { HomeBudget } from './features/budget/HomeBudget'

function App() {
  return (
    <section className="">
      <HomeBudget />
    </section>
  );
}

export default App;
