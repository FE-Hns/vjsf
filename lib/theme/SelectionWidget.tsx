import { defineComponent, ref, watch } from 'vue';

import {
  SelectionWidgetPropDefine,
  SelectionWidgetDefine,
} from '../types/type';

// 为了解决定义的问题，所以改成这种方式 利用 SelectionWidgetDefine 设置类型
const SelectionWidget: SelectionWidgetDefine = defineComponent({
  name: 'Selction',
  props: SelectionWidgetPropDefine,
  setup(props) {
    // 绑定的本地值
    const currentValue = ref(props.value);

    watch(currentValue, (v) => {
      if (props.value !== v) {
        props.onChange(v);
      }
    });

    watch(
      () => props.value,
      (v) => {
        if (currentValue.value !== v) {
          currentValue.value = v;
        }
      }
    );

    return () => {
      const { options } = props;
      return (
        <select v-model={currentValue.value}>
          {options.map((op, index) => (
            <option key={index} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      );
    };
  },
});

export default SelectionWidget;
