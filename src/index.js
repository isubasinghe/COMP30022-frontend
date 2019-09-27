import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

Auth.configure(awsconfig);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
