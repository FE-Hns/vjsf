// 根据类型转发
import { defineComponent } from 'vue';
import { FieldPropType, SchemaTypes } from '../src/types/type';
import StringField from './components/StringField';

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
