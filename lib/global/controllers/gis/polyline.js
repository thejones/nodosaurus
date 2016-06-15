import SpatialFootprint  from './spatialFootprint';

export default class Polyline extends SpatialFootprint {
  constructor(options = {}) {
    super();
    console.log('constructor called');
  }
}
