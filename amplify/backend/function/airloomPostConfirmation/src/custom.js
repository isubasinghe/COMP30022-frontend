const { Client } = require('pg');
const AWS = require('aws-sdk');

const buildClients = dbOptions => {
  const databases = process.env.DBS.split(',').map(db => db.trim());
  const clients = databases.map(database => {
    const connectOpts = dbOptions;
    connectOpts.database = database;
    return new Client(connectOpts);
  });
  return clients;
};

const writeUser = async (client, name, email) => {
  try {
    await client.connect();
    await client.query('INSERT INTO UserData(name, email) VALUES($1, $2)', [name, email]);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
};

const postConfirmationWriteToDBS = (cb, event) => {
  const region = 'ap-southeast-2';
  const secretName = 'AirLoom';
  let secret;
  let decodedBinarySecret;

  const client = new AWS.SecretsManager({
    region
  });

  client.getSecretValue({ SecretId: secretName }, async (err, data) => {
    let secretJSON = {};
    if (err) {
      cb(err, event);
    } else {
      // Decrypts secret using the associated KMS CMK.
      // Depending on whether the secret is a string or binary, one of these fields will be populated.
      // eslint-disable-next-line no-lonely-if
      if ('SecretString' in data) {
        secret = data.SecretString;
        secretJSON = JSON.parse(secret);
      } else {
        // eslint-disable-next-line no-buffer-constructor
        const buff = new Buffer(data.SecretBinary, 'base64');
        decodedBinarySecret = buff.toString('ascii');
        secretJSON = JSON.parse(decodedBinarySecret);
      }
      const clients = buildClients(secretJSON);
      const writePromises = clients.map(dbClient => {
        return writeUser(
          dbClient,
          event.request.userAttributes.name,
          event.request.userAttributes.email
        );
      });
      await Promise.all(writePromises);
      cb(null, event);
    }
  });
};

exports.handler = (event, context, callback) => {
  postConfirmationWriteToDBS(callback, event);
};
