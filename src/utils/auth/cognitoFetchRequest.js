import Auth from '@aws-amplify/auth';

function authFetchRequest(url, fetchOptions) {
  return Auth.currentSession()
    .then(res => {
      return res.idToken.jwtToken;
    })
    .then(token => {
      const modifiedFetchOptions = fetchOptions;
      if (modifiedFetchOptions.headers === undefined) {
        modifiedFetchOptions.headers = {};
      }
      modifiedFetchOptions.headers.authorization = token;
      return fetch(url, modifiedFetchOptions);
    })
    .then(fetchRes => {
      return fetchRes.json();
    })
    .then(jsonData => {
      return jsonData;
    });
}

export default authFetchRequest;
