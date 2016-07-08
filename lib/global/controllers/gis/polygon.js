import SpatialFootprint  from './spatialFootprint';

export default class Polygon extends SpatialFootprint {
  constructor(options = {}) {
    super();
    console.log('constructor called');
  }

  contains(request, reply) {
    const db = request.server.app.db;
    console.log(`${request.recordById.geom}, ${request.query.geometry}`)
    console.log(`The model has been set to ${this.model}`);
    db.contains([request.recordById.geom, request.query.geometry],
      (err, contained) => {
        if (err !== null) {
          console.log(`ERROR ${err}`);
          return reply(err);
        }
        // console.log(`Resolving as: ${contained[0].st_contains}`);
        request.result = contained;
        reply();
      });
  }

  within(request, reply) {
    console.log('find called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  area(request, reply) {
    console.log('find called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }
}
