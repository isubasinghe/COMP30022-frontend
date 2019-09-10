import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import Auth from '@aws-amplify/auth';
import LogRocket from 'logrocket';
import Home from './pages/Home';
import MapView from './pages/MapView';
import './App.css';
import './styles/index.css';

function App() {
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false
    })
      .then(user => {
        LogRocket.identify({
          name: user.attributes.name,
          email: user.attributes.email,
          userID: user.username
        });
      })
      .catch(() => {
        LogRocket.identify({
          name: 'Anonymous'
        });
      });
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
    hiddenDefaults: ['phone_number', 'email'],
    signUpFields: [
      { label: 'Name', key: 'name', required: true, type: 'string', displayOrder: 1 },
      { label: 'Username', key: 'username', required: true, displayOrder: 2, type: 'string' },
      { label: 'Password', key: 'password', required: true, displayOrder: 3, type: 'password' }
    ]
  }
});
