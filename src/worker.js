import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

const setupLogRocket = () => {
  LogRocket.init('ii7gar/comp30022-frontend');
  setupLogRocketReact(LogRocket);
};

export default setupLogRocket;
