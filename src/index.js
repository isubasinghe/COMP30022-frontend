import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '@aws-amplify/auth';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import awsconfig from './aws-exports';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

LogRocket.init('ii7gar/comp30022-frontend');
setupLogRocketReact(LogRocket);
Auth.configure(awsconfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
