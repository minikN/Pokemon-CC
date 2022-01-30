import React, { memo, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from '../Molecules/Dashboard/Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './AppState';

const App = memo(() => {
  const { dispatch } = useContext(store);
  return (
    <Router>
      <Dashboard />
    </Router>
  );
});

App.displayName = 'Pokemon code challenge';

export default App;
