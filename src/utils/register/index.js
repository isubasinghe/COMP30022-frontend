import authFetchRequest from '../auth/cognitoFetchRequest';

const getDefaultRegister = () => {
  return authFetchRequest('https://api.airloom.xyz/api/v1/register/', {}).then(res => {
    const results = Object.values(res);
    if (results.length === 0) {
      return null;
    }
    return results[0];
  });
};

export default getDefaultRegister;
