import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import LogRocket from 'logrocket';
import { withAuthenticator } from 'aws-amplify-react';
import Home from './pages/Home';
import MapView from './pages/MapView';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/map" component={MapView} />
      </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App, true);
