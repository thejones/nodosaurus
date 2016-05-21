/*
This file uses the inert plugin to serve our public directory.
The public directory uses Vue.js and is a 'static site' so you
can remove this completely and serve it with heroku or surge
and keep this projet 'API' only. The benifit of this approach is
that it is easier to reason about in the same project.
*/
exports.register = function (plugin, options, next) {
  plugin.route([
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'public',
          redirectToSlash: true,
          index: true
        }
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'static-router'
};
