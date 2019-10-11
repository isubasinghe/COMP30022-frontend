import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth, I18n } from 'aws-amplify';
import Loadable from 'react-loadable';
import AppErrorBoundary from './AppErrorBoundary';
import AirNavBar from './components/navbar';
import Home from './pages/Home';
import { getRegisters } from './utils/register';
import AuthTheme from './AuthTheme';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

I18n.setLanguage('en');

const authScreenLabels = {
  en: {
    'Sign in to your account': 'Sign in to Airloom'
  }
};

I18n.putVocabularies(authScreenLabels);

function Loading() {
  return <div></div>;
}

const MapView = Loadable({
  loader: () => import('./pages/MapView'),
  loading: Loading
});

const ListView = Loadable({
  loader: () => import('./pages/ListView'),
  loading: Loading
});

const TimelineView = Loadable({
  loader: () => import('./pages/TimelineView'),
  loading: Loading
});

const ArtifactView = Loadable({
  loader: () => import('./pages/ArtifactView'),
  loading: Loading
});

function App() {
  const [registers, setRegisters] = useState([]);
  const addRegister = register => {
    const newRegisters = registers;
    newRegisters.push(register);
    setRegisters(newRegisters);
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false
    })
      .then(() => {
        return getRegisters();
      })
      .then(registersFetched => {
        setRegisters(registersFetched);
      })
      .catch(() => {});
  }, []);

  const sortedRegisters = registers.sort((a, b) => {
    const { name: aName } = a;
    const { name: bName } = b;
    return aName.toUpperCase().localeCompare(bName.toUpperCase());
  });

  return (
    <div className="App">
      <AppErrorBoundary>
        <BrowserRouter>
          <AirNavBar registers={sortedRegisters} addRegister={addRegister} />
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
  },
  theme: AuthTheme
});
