const Config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Server = require('./server');

import manifest from './manifest';

const internals = {
  manifest: manifest
};
if (!process.env.PRODUCTION) {
  internals.manifest.registrations.push({
    plugin: 'blipp'
  });
}
  // Bootstrap db connection
mongoose.connect(Config.db.uri, Config.db.options, (err) => {
  if (err) {
    console.error(chalk.red(`Could not connect to MongoDB! ${err}`));
    console.log(chalk.red(err));
  }
});
mongoose.connection.on('error', (err) => {
  console.error(chalk.red(`MongoDB connection error: ${err}`));
  process.exit(-1);
});

Server.init(internals.manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log(chalk.red('server.register err:', err));
  }
  server.connections.forEach((connection) => {
    console.log(chalk.green(`✅  Server is listening on  ${connection.info.uri}`));
  });
  console.log(chalk.green(`Database: ${Config.db.uri}`));
});
