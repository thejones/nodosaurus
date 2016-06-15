import SpatialFootprint  from './spatialFootprint';

export default class Point extends SpatialFootprint {
  constructor(options = {}) {
    super();
    console.log('constructor called');
  }

}
