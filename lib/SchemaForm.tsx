import { defineComponent, PropType, provide } from 'vue';
import { Schema, Theme } from './types/type';
import { SchemaFormItem } from './index';
import { SchemaFormItemContextKey } from './context';

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      type: (Number || String) as PropType<number | string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    // 将theme也通过provide的形式，向子孙组件传递过去
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
