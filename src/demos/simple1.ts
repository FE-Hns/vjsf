export default {
  name: 'Simple1',
  schema: {
    type: 'object',
    description: 'A simple schema demo',
    properties: {
      age: {
        type: 'number',
      },
    },
  },
  uiSchema: {
    // name: 'uiSchema',
    // type: 'object',
    // description: 'A simple uiSchema demo',
    // properties: {
    //   name: {
    //     type: 'string',
    //   },
    // },
  },
  default: {
    age: 10,
    name: 'jack',
  },
};
