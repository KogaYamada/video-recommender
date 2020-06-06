import React from 'react';
import { Router, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import history from '../history';
import TopPage from './pages/TopPage';
import TopBar from './TopBar';
import RecommendCreate from './pages/RecommendCreate';
import RecommendEdit from './pages/RecommendEdit';

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <Route exact path="/" component={TopPage} />
        <Route exact path="/video" component={RecommendCreate} />
        <Route exact path="/video/edit/:id" component={RecommendEdit} />
      </Router>
    </AuthProvider>
  );
};

export default App;
