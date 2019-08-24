import { API_REQUEST } from './actions';

const api = ({ dispatch }) => next => action => {
  if (action.type === API_REQUEST) {
    const { method, url, onSuccess, onError } = action.meta;
    fetch(url, { method })
      .then(res => {
        return res.json();
      })
      .then(data => {
        dispatch({ type: onSuccess, payload: data });
      })
      .catch(err => {
        dispatch({ type: onError, payload: err });
      });
  }
  return next(action);
};

export default api;
