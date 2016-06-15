// Point, Lines, Polygons. This file don't give a shit.

import FootprintController  from './../footprintController';

export default class SpatialFootprint extends FootprintController {
  constructor(options = {}) {
    super();
    console.log('constructor called');
  }

  distance(request, reply) {
    // Get feature byId
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  touches(request, reply) {
    console.log('touches called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  overlaps(request, reply) {
    console.log('overlaps called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  equals(request, reply) {
    console.log('equals called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  crosses(request, reply) {
    console.log('crosses called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  intersects(request, reply) {
    console.log('intersects called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  disjoint(request, reply) {
    console.log('disjoint called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  centroid(request, reply) {
    console.log('find called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  closestPoint(request, reply) {
    console.log('find called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }
}
