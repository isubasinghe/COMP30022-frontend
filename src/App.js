import React from 'react';
import Loadable from 'react-loadable';
import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const LoadableApp = Loadable({
  loader: () => import('./AppEntry'),
  loading: Home
});

function App() {
  return <LoadableApp />;
}

export default App;
