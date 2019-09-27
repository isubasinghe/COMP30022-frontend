import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '@aws-amplify/auth';
import worker from './worker';
import awsconfig from './aws-exports';
import './styles/tailwind.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

Auth.configure(awsconfig);

const workJob = new Worker(worker);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
