import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '@aws-amplify/auth';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import awsconfig from './aws-exports';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

Auth.configure(awsconfig);
LogRocket.init('ii7gar/comp30022-frontend');
setupLogRocketReact(LogRocket);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
