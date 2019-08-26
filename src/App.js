import React, { useEffect } from 'react';
import Auth from '@aws-amplify/auth';
import LogRocket from 'logrocket';
import { withAuthenticator } from 'aws-amplify-react';
import logo from './logo.svg';
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});
