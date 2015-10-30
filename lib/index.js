// Load modules

var Glue = require('glue');
var Hapi = require('hapi');
var Config = require('config');
var chalk = require('chalk');
var mongoose = require('mongoose');
var Server = require('./server');

// Internals

var internals = {
    manifest: {
        connections: [
            {
            port: 8000,
            labels: ['web']
        },
        {
            routes: {
                cors: {
                    origin: ['*']
                }

            },
            port: Config.apiPort,
            labels: ['api'],
            tls: Config.tls
        }],
        plugins: {
            bell: [{ 'select': 'api' }],
            'hapi-auth-jwt2': [{ 'select': 'api' }],
            './authentication': [{'select': 'api'}],
            './user.routes': [{ 'select': ['api']}],
            './article.routes': [{ 'select': ['api']}],
            good: {
                opsInterval: 15000,
                requestPayload: true,
                reporters: [
                    {
                        reporter: require('good-console'),
                        events: { log: '*', response: '*' , request: '*'}
                    },
                    {
                        reporter: require('good-file'),
                        events: { ops: '*' },
                        config: './logs/monitor_log'
                    }
                ]
            }
        }
    }
};
if (!process.env.PRODUCTION) {
    internals.manifest.plugins['blipp'] = [{}];
    internals.manifest.plugins['good'].reporters[0].events['ops'] =  '*';
}

// Bootstrap db connection
var db = mongoose.connect(Config.db.uri, Config.db.options, function(err) {
    if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
    }
});
mongoose.connection.on('error', function(err) {
    console.error(chalk.red('MongoDB connection error: ' + err));
    process.exit(-1);
    }
);

Server.init(internals.manifest, { relativeTo: __dirname }, function (err, server){
        if (err) {
            console.log(chalk.red('server.register err:', err));
        }
        //console.log(chalk.green('✅  Server is listening on ' + server.info.uri.toLowerCase()));
        console.log(chalk.green('Database:\t\t' + Config.db.uri));
});
