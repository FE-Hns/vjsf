import { defineComponent } from 'vue';
import { FieldPropType, Schema } from '../types/type';
import { getContext } from '../context';
import Selection from '../widget/selection';

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropType,
  setup(props) {
    const context = getContext();

    const handleStaticArrayChange = (val: any, index: number) => {
      const value = Array.isArray(props.value) ? props.value : [];
      value[index] = val;
      props.onChange(value);
    };

    const handleSingleTypeArrayChange = (v: any, i: number) => {
      const value = Array.isArray(props.value) ? props.value : [];
      value[i] = v;
      props.onChange(value);
    };

    const handleMultiSelectArrayChange = (v: any) => {
      props.onChange(v);
    };

    return () => {
      const { schema, value } = props;
      const SchemaFormItem = context.SchemaFormItem;
      const isStaticArray = Array.isArray(schema.items);
      const isMultiSelectArray = schema.items && (schema.items as any).enum;
      if (isStaticArray) {
        const items: Schema[] = schema.items as any;
        const arr = Array.isArray(value) ? value : [];
        return items.map((schema: Schema, index: number) => (
          <SchemaFormItem
            schema={schema}
            key={index}
            value={arr[index]}
            onChange={(v: any) => handleStaticArrayChange(v, index)}
          />
        ));
      } else if (!isMultiSelectArray) {
        const items = Array.isArray(value) ? value : [];
        return items.map((v: any, i: number) => (
          <SchemaFormItem
            schema={schema.items as any}
            key={i}
            value={v}
            onChange={(v: any) => handleSingleTypeArrayChange(v, i)}
          />
        ));
      } else {
        const items: any[] = (schema.items as any).enum;
        const options = items.map((v) => {
          return {
            label: v,
            value: v,
          };
        });
        return (
          <Selection
            options={options}
            value={props.value}
            onChange={(v: any) => handleMultiSelectArrayChange(v)}
          />
        );
      }
    };
  },
});
