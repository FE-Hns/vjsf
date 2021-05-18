export default {
  name: 'demo',
  schema: {
    type: 'number',
  },
  uiSchema: {
    name: 'uiSchema',
    type: 'object',
    description: 'A simple uiSchema demo',
    properties: {
      name: {
        type: 'string',
      },
    },
  },
  default: '',
};
