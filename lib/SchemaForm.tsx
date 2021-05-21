import {
  defineComponent,
  PropType,
  provide,
  Ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue';
import { Schema, Theme } from './types/type';
import { SchemaFormItem } from './index';
import { SchemaFormItemContextKey } from './context';
import Ajv, { Options } from 'ajv';

interface ContextRef {
  doValidate: () => {
    errors: any[];
    valid: boolean;
  };
}

const defaultOptions: Options = {
  allErrors: true,
};

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      type: (Number || String) as PropType<number | string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
  },
  setup(props) {
    // 将theme也通过provide的形式，向子孙组件传递过去
    const context = {
      SchemaFormItem,
    };

    const validatorRef: Ref<Ajv> = shallowRef() as any;

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultOptions,
        ...props.ajvOptions,
      });
    });

    watch(
      () => props.contextRef,
      () => {
        // 由于props.contextRef可能不存在
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              console.log('===================>');
              const valid = validatorRef.value.validate(
                props.schema,
                props.value
              );
              return {
                errors: validatorRef.value.errors || [],
                valid: valid,
              };
            },
          };
        }
      },
      {
        immediate: true,
      }
    );

    // 将组件向子孙组件传递
    provide(SchemaFormItemContextKey, context);
    return () => {
      return (
        <div>
          <SchemaFormItem
            schema={props.schema}
            onChange={props.onChange}
            value={props.value}
          />
        </div>
      );
    };
  },
});
