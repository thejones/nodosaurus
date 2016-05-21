const Config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Server = require('./server');

const internals = {
  manifest: {
    connections: [
      // Example of how you would do this.
      // Does not appear to work with Heroku.
      // {
      //   port: process.env.PORT || 8000,
      //   labels: ['web']
      // },
      {
        routes: {
          cors: {
            origin: ['*']
          }

        },
        port: process.env.PORT || 3000,
        labels: ['main']
      }],
    registrations: [
      {
        plugin: 'vision'
      },
      {
        plugin: 'inert'
      },
      {
        plugin: './good'
      },
      {
        plugin: './router/user',
        options: {
          select: ['main'],
          routes: {
            prefix: '/api/v1'
          }
        }
      },
      // Static directory server
      {
        plugin: './router/static',
        options: {
          select: ['main']
        }
      }
    ]
  }
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
