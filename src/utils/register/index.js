import authFetchRequest from '../auth/cognitoFetchRequest';

export const getRegisters = () => {
  return authFetchRequest('https://api.airloom.xyz/api/v1/register/', {}).then(res => {
    const results = Object.values(res);
    if (results.length === 0) {
      return null;
    }
    return results.sort((a, b) => {
      const { name: aName } = a;
      const { name: bName } = b;
      return aName.toUpperCase().localeCompare(bName.toUpperCase());
    });
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
