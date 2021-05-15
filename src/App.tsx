import { defineComponent, reactive, Ref, ref, watchEffect } from 'vue';
import MonacoEditor from './components/MonacoEditor';
import { toJSONString } from '../lib/utils/index';
import { createUseStyles } from 'vue-jss';
import { Schema } from '../lib/types/type';
import demos from './demos/index';
import SchemaForm from '../lib';

import themeDefault from '../lib/theme/index';
import ThemeProvider from '../lib/theme/ThemeProvider';

const useStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      padding: 0,
    },
    '*': {
      boxSizing: 'border-box',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#3fb983',
    '& h1': {
      textAlign: 'center',
      color: '#fff',
    },
  },
  btnWrapper: {
    padding: 10,
  },
  btn: {
    appearance: 'none',
    borderWidth: 0,
    cursor: 'pointer',
    padding: 10,
    backgroundColor: 'transparent',
    color: '#fff',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3fb983',
    },
  },
  btnSelected: {
    backgroundColor: '#fff',
    color: '#3fb983',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3fb983',
    },
  },
  content: {
    display: 'flex',
    width: 1400,
    margin: '0 auto',
  },
  editorWrapperOuter: {
    display: 'flex',
    flexDirection: 'column',
    width: 1000,
  },
  editorWrapperInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 1000,
  },
  codePanel: {
    minHeight: 400,
    flex: 1,
    margin: 5,
  },
  formWrapper: {
    width: 400,
  },
});

export default defineComponent({
  name: 'App',
  // props: {},
  setup() {
    const classRef = useStyles();

    const selectedRef: Ref<number> = ref(0);

    // 设计数据的格式
    // 首先分成三部分
    // 1. schema-editor对应的结构
    // 2. uiSchema-editor对应的结构
    // 3. data-editor对应的结构
    const demo: {
      schema: Schema | null;
      uiSchema: Schema | null;
      data: any;
      schemaCode: string;
      uiSchemaCode: string;
      dataCode: string;
    } = reactive({
      schema: {},
      uiSchema: {},
      data: {},
      schemaCode: '',
      uiSchemaCode: '',
      dataCode: '',
    });

    // watchEffect在初始化的时候就会收集一次依赖
    // 响应式的值发生变化的时候，就会触发watchEffect
    watchEffect(() => {
      const index: number = selectedRef.value;
      const d = demos[index];
      demo.schema = d.schema;
      demo.uiSchema = d.uiSchema;
      demo.data = d.default;
      demo.schemaCode = toJSONString(d.schema);
      demo.uiSchemaCode = toJSONString(d.uiSchema);
      demo.dataCode = toJSONString(d.default);
    });

    // 点击按钮切换当前的index
    const changeIndex = (index: number) => {
      selectedRef.value = index;
    };

    // // schema-editor 变化时候需要给对应的数据赋值
    // const changeSchemaCode = (v: string, e: any) => {
    //   try {
    //     demo.schemaCode = v;
    //     demo.schema = JSON.parse(v);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // };
    // // uiSchema-editor 变化时候需要给对应的数据赋值
    // const changeUISchemaCode = (v: string, e: any) => {
    //   try {
    //     demo.uiSchemaCode = v;
    //     demo.uiSchema = JSON.parse(v);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // };
    // // data-editor 变化时候需要给对应的数据赋值
    // const changeDataSchemaCode = (v: string, e: any) => {
    //   try {
    //     demo.dataCode = v;
    //     demo.data = JSON.parse(v);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // };

    // 上述三种函数可以提取出一个公共的函数 即 工厂函数
    const changeCode = (field: 'schema' | 'uiSchema' | 'data', v: string) => {
      (demo as any)[`${field}Code`] = v;
      demo[field] = JSON.parse(v);
    };
    // schema-editor 变化时候需要给对应的数据赋值
    const changeSchemaCode = (v: string) => changeCode('schema', v);
    // uiSchema-editor 变化时候需要给对应的数据赋值
    const changeUISchemaCode = (v: string) => changeCode('uiSchema', v);
    // data-editor 变化时候需要给对应的数据赋值
    const changeDataSchemaCode = (v: string) => changeCode('data', v);

    // SchemaForm 组件 onChange事件
    const handleOnChange = (value: any) => {
      demo.data = value;
      demo.dataCode = toJSONString(value);
    };

    return () => {
      const classes = classRef.value;
      const selectedValue = selectedRef.value;
      return (
        <div>
          <div class={classes.container}>
            <div class={classes.header}>
              <h1>Another Vue3 JSONSchema Form</h1>
              <div class={classes.btnWrapper}>
                {demos.map((d, index) => (
                  <button
                    // class可以通过数组的形式赋值
                    class={{
                      [classes.btn]: true,
                      [classes.btnSelected]: selectedValue === index,
                    }}
                    onClick={() => changeIndex(index)}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
            <div class={classes.content}>
              <div class={classes.editorWrapperOuter}>
                <div>
                  <MonacoEditor
                    title="Schema"
                    class={classes.codePanel}
                    code={demo.schemaCode}
                    onChange={changeSchemaCode}
                  />
                </div>
                <div class={classes.editorWrapperInner}>
                  <MonacoEditor
                    title="UISchema"
                    class={classes.codePanel}
                    code={demo.uiSchemaCode}
                    onChange={changeUISchemaCode}
                  />
                  <MonacoEditor
                    title="Data"
                    class={classes.codePanel}
                    code={demo.dataCode}
                    onChange={changeDataSchemaCode}
                  />
                </div>
              </div>
              <div class={classes.formWrapper}>
                <ThemeProvider theme={themeDefault as any}>
                  <SchemaForm
                    schema={demo.schema!}
                    value={demo.data}
                    onChange={handleOnChange}
                  />
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
});
