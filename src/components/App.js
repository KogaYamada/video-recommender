import React from 'react';
import { Router, Route } from 'react-router-dom';
import TopPage from './pages/TopPage';
import history from '../history';
import TopBar from './TopBar';

const App = () => {
  return (
    <Router history={history}>
      <Route to="/" component={TopPage} />
    </Router>
  );
};

export default App;
