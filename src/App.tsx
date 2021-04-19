import { defineComponent } from 'vue';
import MonacoEditor from './components/MonacoEditor';
import { toJSONString } from './utils/index';
import { createUseStyles } from 'vue-jss';

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
  props: {},
  setup(props) {
    const classRef = useStyles();

    const code = {
      name: 'nnnn',
    };
    // editor值变化会获取到编辑器的值
    const onChange = (v: string, e: any) => {
      console.log(v, e);
    };
    return () => {
      const classes = classRef.value;
      return (
        <div>
          <div class={classes.container}>
            <div class={classes.header}>
              <h1>我是标题</h1>
              <div class={classes.btnWrapper}>
                <button class={classes.btn}>我是按钮</button>
              </div>
            </div>
            <div class={classes.content}>
              <div class={classes.editorWrapperOuter}>
                <div>
                  <MonacoEditor
                    title="Schema"
                    class={classes.codePanel}
                    code={toJSONString(code)}
                    onChange={onChange}
                  />
                </div>
                <div class={classes.editorWrapperInner}>
                  <MonacoEditor
                    title="UISchema"
                    class={classes.codePanel}
                    code={toJSONString(code)}
                    onChange={onChange}
                  />
                  <MonacoEditor
                    title="Data"
                    class={classes.codePanel}
                    code={toJSONString(code)}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div class={classes.formWrapper}>表单区</div>
            </div>
          </div>
        </div>
      );
    };
  },
});
