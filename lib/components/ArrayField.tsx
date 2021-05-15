import { defineComponent } from 'vue';
import { FieldPropType, Schema } from '../types/type';
import { getContext } from '../context';
import { getWidget } from '../theme/ThemeProvider';
import { SelectionWidgetNames } from '../types/type';
// import Selection from '../widget/selection';

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropType,
  setup(props) {
    const context = getContext();
    const contextRef = getWidget(SelectionWidgetNames.SELECTIONWIDGET);

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
        return items.map((schema: Schema, index: number) => {
          return (
            <SchemaFormItem
              schema={schema}
              key={index}
              value={arr[index]}
              onChange={(v: any) => handleStaticArrayChange(v, index)}
            />
          );
        });
      } else if (!isMultiSelectArray) {
        const items: any[] = Array.isArray(value) ? value : [];
        return items.map((v: any, i: number) => {
          return (
            <SchemaFormItem
              schema={schema.items as any}
              key={i}
              value={v}
              onChange={(v: any) => handleSingleTypeArrayChange(v, i)}
            />
          );
        });
      } else {
        // 子孙组件通过theme来获取到对应的widget，这样就将子节点的渲染交给theme了
        // const Selection = context.theme.widgets.SelectionWidget;
        const Selection = contextRef.value;
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
