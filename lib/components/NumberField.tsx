import { defineComponent } from 'vue';
import { FieldPropType, CommonWidgetNames } from '../types/type';
import { getWidget } from '../theme/ThemeProvider';

export default defineComponent({
  name: 'NumberField',
  props: FieldPropType,
  setup(props) {
    // const handleOnChange = (e: any) => {
    //   let val: any = Number(e.target.value);
    //   if (Number.isNaN(val)) {
    //     val = 0;
    //   }
    //   props.onChange(val);
    // };
    const widgetRef = getWidget(CommonWidgetNames.NUMBERWIDGET);
    const NumberWidget = widgetRef.value;
    return () => {
      // return (
      //   <input type="number" value={props.value} onInput={handleOnChange} />
      // );
      return <NumberWidget value={props.value} onChange={props.onChange} />;
    };
  },
});
