import CensusBlocksController from './controllers';
import {footprintRouter, polygonRouter, spatialFootprintRouter } from './../../global/routers';

exports.register = function (server, options, next) {
  const censusBlocksController = new CensusBlocksController();

  const bind = {
    model: 'nyc_census_blocks'
  };

  server.bind(bind);
  const footprintRoutes = footprintRouter.setup({
    basePath: '/census-blocks',
    controller: censusBlocksController,
    authentication: false
  });
  const spatialFootprintRoutes = spatialFootprintRouter.setup({
    basePath: '/census-blocks',
    controller: censusBlocksController,
    authentication: false
  });
  const polygonRoutes = polygonRouter.setup({
    basePath: '/census-blocks',
    controller: censusBlocksController,
    authentication: false
  });
  server.route(footprintRoutes);
  server.route(spatialFootprintRoutes);
  server.route(polygonRoutes);

  next();
};

exports.register.attributes = {
  name: 'census-block-routes'
};
