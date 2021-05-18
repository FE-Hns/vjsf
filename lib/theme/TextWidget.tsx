import { defineComponent } from 'vue';
import { CommonWidgetPropDefine, CommonWidgetDefine } from '../types/type';

const TextWidget: CommonWidgetDefine = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetPropDefine,
  setup(props) {
    const handleOnChange = (e: any) => {
      props.onChange(e.target.value);
    };
    return () => {
      return <input type="text" value={props.value} onInput={handleOnChange} />;
    };
  },
});

export default TextWidget;
