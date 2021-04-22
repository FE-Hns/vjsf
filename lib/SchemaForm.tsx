import { defineComponent, PropType, provide } from 'vue';
import { Schema, FieldPropType } from './types/type';
import SchemaFormItem from './SchemaFormItem';
import { SchemaFormItemContextKey } from './context';

export default defineComponent({
  name: 'SchemaForm',
  props: FieldPropType,
  setup(props) {
    const context = {
      SchemaFormItem,
    };
    // 将组件向子孙组件传递
    provide(SchemaFormItemContextKey, context);
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
