import {reply} from './../controllers';
// import Joi from 'joi';

function setup(args) {

  const { basePath, controller, authentication } = args;

  return [{
    path: basePath,
    method: 'GET',
    config: {
      auth: authentication,
      pre: [
        {method: controller.find}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}`,
    method: 'GET',
    config: {
      auth: authentication,
      pre: [
        {method: controller.get}
      ]
    },
    handler: reply.send
  },
  {
    path: basePath,
    method: 'POST',
    config: {
      auth: authentication,
      pre: [
        {method: controller.create}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}`,
    method: 'PUT',
    config: {
      auth: authentication,
      pre: [
        {method: controller.update}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}`,
    method: 'DELETE',
    config: {
      auth: authentication,
      pre: [
        {method: controller.destroy}
      ]
    },
    handler: reply.send
  }];
}

export default {
  setup
};
