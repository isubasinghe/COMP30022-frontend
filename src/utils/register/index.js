import authFetchRequest from '../auth/cognitoFetchRequest';

export const getRegisters = () => {
  return authFetchRequest('https://api.airloom.xyz/api/v1/register/', {}).then(res => {
    const results = Object.values(res);
    if (results.length === 0) {
      return [];
    }
    return results;
  });
};

export const getDefaultRegister = () => {
  return getRegisters().then(results => {
    if (results === null) {
      return results;
    }
    return results[0];
  });
};
