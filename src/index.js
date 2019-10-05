import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '@aws-amplify/auth';
import * as Sentry from '@sentry/browser';
import awsconfig from './aws-exports';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

Auth.configure(awsconfig);

Sentry.init({ dsn: 'https://0813d6b162694237800a791622f2b442@sentry.io/1525953' });

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
