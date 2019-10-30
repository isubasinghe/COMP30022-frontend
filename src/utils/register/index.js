import authFetchRequest from '../auth/cognitoFetchRequest';

export const getRegisters = () => {
  return authFetchRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/register/`, {}).then(
    res => {
      const results = Object.values(res);
      return results;
    }
  );
};

export const getDefaultRegister = () => {
  return getRegisters().then(results => {
    if (results === null) {
      return results;
    }
    return results[0];
  });
};
