import { applyMiddleware, createStore, compose } from 'redux';
import reducers from './reducers';
import api from './middleware/api';

// dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(api)));

export default store;
