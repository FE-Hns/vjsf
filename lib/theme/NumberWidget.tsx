import { defineComponent } from 'vue';
import { CommonWidgetPropDefine, CommonWidgetDefine } from '../types/type';

const NumberWidget: CommonWidgetDefine = defineComponent({
  name: 'NumberWidget',
  props: CommonWidgetPropDefine,
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

export default NumberWidget;
