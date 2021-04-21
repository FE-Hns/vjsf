import { defineComponent } from 'vue';
import { FieldPropType } from '../../src/types/type';

export default defineComponent({
  name: 'NumberField',
  props: FieldPropType,
  setup(props) {
    const handleOnChange = (e: any) => {
      let val: any = Number(e.target.value);
      if (Number.isNaN(val)) {
        val = 0;
      }
      props.onChange(val);
    };
    return () => {
      return (
        <input type="number" value={props.value} onInput={handleOnChange} />
      );
    };
  },
});
