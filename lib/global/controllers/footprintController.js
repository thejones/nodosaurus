export default class FootprintController {
  constructor(options = {}) {
    console.log('Base constructor called');
  }

  find(request, reply) {
    const db = request.server.app.db;
    console.log(`The model has been set to ${this.model}`);
    db[this.model].find(request.params, (err, blocks) => {
      if (err !== null)  reply(err);
      request.result = blocks;
      reply();
    });

  }

  get(request, reply) {
    const db = request.server.app.db;
    console.log(`The model has been set to ${this.model}`);
    db[this.model].findOne({gid: request.params.id}, (err, data) => {
      if (err) reply(err);
      request.result = data;
      reply();
    });
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
