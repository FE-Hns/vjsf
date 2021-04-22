import { defineComponent, inject, ref, watch, DefineComponent } from 'vue';
import { FieldPropType } from '../types/type';
import { SchemaFormItemContextKey } from '../context';

export default defineComponent({
  name: 'StringField',
  props: FieldPropType,
  setup(props) {
    const handleOnChange = (e: any) => {
      props.onChange(e.target.value);
    };
    // // v-model绑定本组件的localValue
    // const localValueRef = ref(props.value);

    // // 监听数据，可以直接监听响应式的数据
    // watch(localValueRef, (nv, ov) => {
    //   if (nv !== props.value) {
    //     props.onChange(nv);
    //   }
    // });

    // // 当改变数据源
    // watch(
    //   () => props.value,
    //   (nv, ov) => {
    //     if (nv !== localValueRef.value) {
    //       localValueRef.value = nv;
    //     }
    //   }
    // );

    return () => {
      return <input type="text" value={props.value} onInput={handleOnChange} />;
      // v-model绑定ref.value才会触发
      // return <input type="text" v-model={localValueRef.value} />;
    };
  },
});
