import { defineComponent } from 'vue';
import { FieldPropType } from '../types/type';
import { Schema } from '../types/type';

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropType,
  setup(props) {
    return () => {
      const { schema } = props;
      const properties: Schema = (schema as any).properties || {};
      return Object.keys(properties).map((k, i) => {
        console.log(k, i);
      });
    };
  },
});
