import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

export const addMember = (registerId, email, isAdmin) => {
  const data = {
    register_id: registerId,
    email,
    is_admin: isAdmin
  };

  return authFetchRequest('https://api.airloom.xyz/api/v1/register/addmember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });  
};

export const delMember = (registerId, email) => {
  const data = {
    register_id: registerId,
    email
  };

  return authFetchRequest('https://api.airloom.xyz/api/v1/register/delmember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });  
};

export const updateMember = (registerId, email, isAdmin) => {
  const data = {
    register_id: registerId,
    email,
    is_admin: isAdmin
  };

  return authFetchRequest('https://api.airloom.xyz/api/v1/register/updatemember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });  
};
