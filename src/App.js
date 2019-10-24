import React from 'react';
import Loadable from 'react-loadable';
import Home from './pages/Home';

import './App.css';

import('bootstrap/dist/css/bootstrap.min.css')
  .then(() => {})
  .catch(() => {});

const LoadableApp = Loadable({
  loader: () => import('./AppEntry'),
  loading: Home
});

function App() {
  return <LoadableApp className="App" />;
}

export default App;
