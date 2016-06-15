import NeighborhoodsController from './controllers';
import {footprintRouter, spatialFootprintRouter, polygonRouter  } from './../../global/routers';

exports.register = function (server, options, next) {
  const neighborhoodsController = new NeighborhoodsController();

  const bind = {
    model: 'nyc_neighborhoods'
  };

  server.bind(bind);

  const footprintRoutes = footprintRouter.setup({
    basePath: '/neighborhoods',
    controller: neighborhoodsController
  });
  const spatialFootprintRoutes = spatialFootprintRouter.setup({
    basePath: '/neighborhoods',
    controller: neighborhoodsController
  });
  const polygonRoutes = polygonRouter.setup({
    basePath: '/neighborhoods',
    controller: neighborhoodsController
  });
  server.route(polygonRoutes);
  server.route(footprintRoutes);
  server.route(spatialFootprintRoutes);

  next();
};

exports.register.attributes = {
  name: 'neighborhood-routes'
};
