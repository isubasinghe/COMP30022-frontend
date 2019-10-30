import React from 'react';
import ReactDOM from 'react-dom';
import { Auth } from 'aws-amplify';
import * as Sentry from '@sentry/browser';
import awsconfig from './aws-exports';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

Auth.configure(awsconfig);

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_ENDPOINT });

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
