const Config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Server = require('./server');
const massive = require('massive');

import manifest from './manifest';

const internals = {
  manifest: manifest
};
if (!process.env.PRODUCTION) {
  internals.manifest.registrations.push({
    plugin: 'blipp'
  });
}
  // Bootstrap mongoDB connection
mongoose.connect(Config.db.mongoConnection.uri, Config.db.mongoConnection.options, (err) => {
  if (err) {
    console.error(chalk.red(`Could not connect to MongoDB! ${err}`));
    console.log(chalk.red(err));
  }
});
mongoose.connection.on('error', (err) => {
  console.error(chalk.red(`MongoDB connection error: ${err}`));
  process.exit(-1);
});

const massiveInstance = massive.connectSync({connectionString :  Config.db.pgConnection.uri });


Server.init(internals.manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log(chalk.red('server.register err:', err));
  }
  server.app.db = massiveInstance;
  server.connections.forEach((connection) => {
    console.log(chalk.green(`✅  Server is listening on  ${connection.info.uri}`));
  });
  console.log(chalk.green(`Database: ${Config.db.mongoConnection.uri}`));
});
