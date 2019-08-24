import { combineReducers, createStore, applyMiddleware } from 'redux';
import LogRocket from 'logrocket';
import apiMiddleware from './api/middleware';

const store = createStore(
  combineReducers(),
  applyMiddleware(apiMiddleware, LogRocket.reduxMiddleware())
);

export default store;
