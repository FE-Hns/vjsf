// 根据类型转发
import { defineComponent } from 'vue';
import { FieldPropType, SchemaTypes } from '../src/types/type';
import StringField from './components/StringField';
import NumberField from './components/NumberField';

export default defineComponent({
  name: 'SchemaFormItem',
  props: FieldPropType,
  setup(props) {
    return () => {
      const { schema } = props;
      console.log(schema);
      let Component: any = null;

      switch (schema.type) {
        case SchemaTypes.STRING: {
          Component = StringField;
          break;
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField;
          break;
        }
        default:
          break;
      }

      return (
        <div>
          <Component {...props} />
        </div>
      );
    };
  },
});
