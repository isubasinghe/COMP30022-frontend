import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import Auth from '@aws-amplify/auth';
import AppErrorBoundary from './AppErrorBoundary';
import AirNavBar from './components/navbar';
import Home from './pages/Home';
import MapView from './pages/MapView';
import ListView from './pages/ListView';
import TimelineView from './pages/TimelineView';
import ArtifactView from './pages/ArtifactView';
import { getDefaultRegister, getRegisters } from './utils/register';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [registers, setRegisters] = useState([]);
  const refetchRegisters = () => {
    getRegisters()
      .then(registersFetched => {
        if (registers !== null) {
          setRegisters(registersFetched);
        }
      })
      .catch(err => {});
  };
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false
    })
      .then(() => {
        return getDefaultRegister();
      })
      .then(reg => {
        localStorage.setItem('reg', JSON.stringify(reg));
      })
      .catch(() => {});
    getRegisters()
      .then(registersFetched => {
        if (registersFetched !== null) {
          setRegisters(registersFetched);
        }
      })
      .catch(error => {});
  }, []);

  return (
    <div className="App">
      <AppErrorBoundary>
        <BrowserRouter>
          <AirNavBar refetchRegisters={refetchRegisters} registers={registers} />
          <Route exact path="/" component={Home} />
          <Route path="/map/:registerId" component={MapView} />
          <Route path="/list/:registerId" component={ListView} />
          <Route path="/timeline/:registerId" component={TimelineView} />
          <Route path="/artifact/:registerId/:artifactId" component={ArtifactView} />
        </BrowserRouter>
      </AppErrorBoundary>
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
