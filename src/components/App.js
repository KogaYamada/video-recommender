import React from 'react';
import { Router, Route } from 'react-router-dom';
import TopPage from './pages/TopPage';
import history from '../history';
import TopBar from './TopBar';
import RecommendCreate from './pages/RecommendCreate';
import RecommendEdit from './pages/RecommendEdit';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <TopBar />
        <Route exact path="/" component={TopPage} />
        <Route exact path="/video" component={RecommendCreate} />
        <Route exact path="/video/edit/:id" component={RecommendEdit} />
      </Router>
    </AuthProvider>
  );
};

export default App;
