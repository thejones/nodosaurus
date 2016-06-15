const exports = module.exports =  {
  connections: [
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
      plugin: './plugins/good'
    },
    {
      plugin: 'hapi-auth-jwt2'
    },
    {
      plugin: './plugins/events'
    },
    {
      plugin: './plugins/stripe'
    },
    {
      plugin: './plugins/neighborhoods'
    },
    {
      plugin: './plugins/census-blocks'
    },
    {
      plugin: './plugins/stripe/webhooks'
    },
    {
      plugin: './plugins/authentication',
      options: {
        select: ['main']
      }
    },
    {
      plugin: './plugins/users',
      options: {
        select: ['main'],
        routes: {
          prefix: '/api/v1'
        }
      }
    },
    // Static directory server
    {
      plugin: './plugins/static',
      options: {
        select: ['main']
      }
    }
  ]
};
