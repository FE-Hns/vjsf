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
      // items里是对象
      staticArray: {
        type: 'array',
        items: [{ type: 'string' }, { type: 'number' }],
      },
      //
      singleTypeArray: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            age: {
              type: 'number',
            },
          },
        },
      },
      // enum类型
      multiSelectArray: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['123', '456', '789'],
        },
      },
    },
    required: ['firstName', 'lastName'],
  },
  uiSchema: {
    // name: 'uiSchema',
    // type: 'object',
    // description: 'A simple uiSchema demo',
    // properties: {
    //   firstName: {
    //     type: 'string',
    //     default: 'David',
    //   },
    //   lastName: {
    //     type: 'string',
    //     default: 'Beckham',
    //   },
    //   telephone: {
    //     type: 'number',
    //     default: 15931893881,
    //   },
    // },
  },
  default: {
    firstName: 'David',
    lastName: 'Beckham',
    telephone: 123456789,
    singleTypeArray: [{ name: 'lee', age: 20 }],
  },
};
