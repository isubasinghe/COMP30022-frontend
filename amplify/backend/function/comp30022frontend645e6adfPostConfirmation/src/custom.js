const { Client } = require('pg');

const writeUser = async (client, name, email) => {
  try {
    await client.connect();
    await client.query('INSERT INTO "User"(name, email) VALUES($1, $2)', [name, email]);
    await client.end();
  } catch (err) {
    console.error('[ERROR] UNABLE TO WRITE ', err);
  }
};

exports.handler = async (event, context, callback) => {
  const basicConnOpts = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PWD
  };
  const databases = process.env.DBS;
  if (databases === null || databases === undefined) {
    callback(null, event);
    console.error('[ERROR] DATABASE LIST NOT SUPPLIED');
    return;
  }
  const databaseList = databases.split(',').map(db => db.trim());
  if (databaseList.length < 1) {
    console.error('[ERROR] NO DATABASES GIVEN TO WRITE USER TO ');
    callback(null, event);
    return;
  }
  const clients = databaseList.map(database => {
    const config = basicConnOpts;
    config.database = database;
    return new Client(config);
  });

  const writePromises = clients.map(client => {
    return writeUser(client, event.request.userAttributes.name, event.userName);
  });

  await Promise.all(writePromises);
};
