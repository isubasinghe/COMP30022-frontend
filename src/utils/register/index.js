import authFetchRequest from '../auth/cognitoFetchRequest';

export const getRegisters = () => {
  return authFetchRequest('https://api.airloom.xyz/api/v1/register/', {}).then(res => {
    const results = Object.values(res);
    if (results.length === 0) {
      return null;
    }
    return results.sort((a, b) => {
      const { name: aName } = a,
        { name: bName } = b;
      const aNameUpper = aName.toUpperCase(),
        bNameUpper = bName.toUpperCase();
      return aNameUpper === bNameUpper ? 0 : aNameUpper < bNameUpper ? -1 : 1;
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
