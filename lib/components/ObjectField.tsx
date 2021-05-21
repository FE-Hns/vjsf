import { defineComponent } from 'vue';
import { FieldPropType } from '../types/type';
// import { Schema } from '../types/type';
import { getContext } from '../context';
import { isObject } from '../utils/index';

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropType,
  setup(props) {
    const context = getContext();
    const handleOnChange = (v: any, k: string) => {
      const value: any = isObject(props.value) ? props.value : {};
      if (v === undefined) {
        delete value[k];
      } else {
        value[k] = v;
      }
      props.onChange(value);
    };
    return () => {
      const SchemaFormItem = context?.SchemaFormItem;
      const { schema, value, uiSchema } = props;
      const properties = schema.properties || {};
      const currentValue: any = isObject(value) ? value : {};
      return Object.keys(properties).map((k, i) => {
        console.log(k);
        return (
          <SchemaFormItem
            schema={properties[k]}
            uiSchema={uiSchema.properties ? uiSchema.properties[k] || {} : {}}
            key={i}
            value={currentValue[k]}
            onChange={(v: any) => handleOnChange(v, k)}
          />
        );
      });
    };
  },
});
