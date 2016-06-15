import {reply} from './../controllers';
import Joi from 'joi';

function setup(args) {
  const { basePath, controller } = args;
  return [{
    path: `${basePath}/{id}/distance`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: controller.within}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}/touches`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: controller.contains}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}/equals`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: controller.contains}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}/crosses`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: controller.contains}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}/intersects`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: controller.contains}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}/disjoint`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: controller.contains}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}/centroid`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: controller.contains}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}/overlaps`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: controller.contains}
      ]
    },
    handler: reply.send
  },
  {
    path: `${basePath}/{id}/closest-point`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: controller.contains}
      ]
    },
    handler: reply.send
  },];
}

export default {
  setup
};
