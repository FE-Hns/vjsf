// import ThemeDefault from './ThemeDefault';
import SelectionWidget from './Selection';
import { defineComponent } from 'vue';
import { CommonWidgetPropDefine, CommonWidgetDefine } from '../types/type';

const CommonWidget: CommonWidgetDefine = defineComponent({
  name: 'CommonWidget',
  props: CommonWidgetPropDefine,
  setup() {
    return () => {
      return null;
    };
  },
});

export default {
  widgets: {
    SelectionWidget,
    TextWidget: CommonWidget,
    NumberWidget: CommonWidget,
  },
};
