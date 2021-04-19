import { defineComponent, PropType } from 'vue';
import { Schema, FieldPropType } from '../src/types/type';
import SchemaFormItem from './SchemaFormItem';

export default defineComponent({
  name: 'SchemaForm',
  props: FieldPropType,
  setup(props) {
    return () => {
      return (
        <div>
          <SchemaFormItem
            schema={props.schema}
            onChange={props.onChange}
            value={props.value}
          />
        </div>
      );
    };
  },
});
