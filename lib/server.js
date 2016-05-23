import Glue from 'glue';

exports.init = (manifest, composeOptions, next) => {
  Glue.compose(manifest, composeOptions,  (err, server) => {
    if (err) {
      return next(err);
    }
    server.start((err) => {
      return next(err, server);
    });
  });
};
