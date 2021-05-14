import { defineComponent } from 'vue';

export default defineComponent({
  name: 'themeDefault',
  setup() {
    return () => {
      return <div>Hello theme</div>;
    };
  },
});
