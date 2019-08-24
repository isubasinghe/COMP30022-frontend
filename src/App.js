import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import LogRocket from 'logrocket';
import { withAuthenticator } from 'aws-amplify-react';
import Home from './pages/Home';
import MapView from './pages/MapView';
import './App.css';

function App() {
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => {
        LogRocket.identify(user.username, {
          email: user.attributes.email
        });
      })
      .catch(() => {});
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/map" component={MapView} />
      </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});
