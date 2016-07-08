import {reply} from './../controllers';
import GlobalPreware from './../preware'
import Joi from 'joi';

function setup(args) {
  const { basePath, controller } = args;
  return [{
    path: `${basePath}/{id}/within`,
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
    path: `${basePath}/{id}/contains`,
    method: 'GET',
    config: {
      auth: false,
      validate: {
        query: {
          geometry: Joi.string().required()
        }
      },
      pre: [
        {method: GlobalPreware.recordById},
        {method: controller.contains}
      ]
    },
    handler: reply.send
  }];
}

export default {
  setup
};
