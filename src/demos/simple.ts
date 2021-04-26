export default {
  name: 'Simple',
  schema: {
    type: 'object',
    title: 'object schema',
    description: 'A simple schema demo',
    properties: {
      firstName: {
        type: 'string',
        default: 'David',
      },
      lastName: {
        type: 'string',
        default: 'Beckham',
      },
      telephone: {
        type: 'number',
        default: 15931893881,
      },
    },
    required: ['firstName', 'lastName'],
  },
  uiSchema: {
    name: 'uiSchema',
    type: 'object',
    description: 'A simple uiSchema demo',
    properties: {
      firstName: {
        type: 'string',
        default: 'David',
      },
      lastName: {
        type: 'string',
        default: 'Beckham',
      },
      telephone: {
        type: 'number',
        default: 15931893881,
      },
    },
  },
  default: {
    firstName: 'David',
    lastName: 'Beckham',
    telephone: 123456789,
  },
};
