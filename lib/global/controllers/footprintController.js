export default class FootprintController {
  constructor(options = {}) {
    console.log('Base constructor called');
  }

  find(request, reply) {
    // Get feature byId
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  get(request, reply) {
    console.log('find called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  create(request, reply) {
    console.log('find called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  update(request, reply) {
    console.log('find called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }

  destroy(request, reply) {
    console.log('find called');
    console.log(`The model has been set to ${this.model}`);
    reply();
  }
}
