import { defineComponent, PropType, ref, watch } from 'vue';

type option = {
  label: string;
  value: any;
};
export default defineComponent({
  name: 'Selction',
  props: {
    value: {
      required: true,
    },
    options: {
      type: Array as PropType<option[]>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
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
