// 将theme从schemaform中解耦出来
import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  PropType,
  provide,
} from 'vue';
import { Theme } from '../types/type';

const THEME_PROVIDER_KEY = Symbol();

export enum widgetName {
  SELECTIONWIDGET = 'SelectionWidget',
  TEXTWIDGET = 'SelectionWidget',
  NUMBERWIDGET = 'SelectionWidget',
}

export default defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme);
    provide(THEME_PROVIDER_KEY, context);
    return () => {
      return slots.default && slots.default();
    };
  },
});

export function getWidget(name: widgetName) {
  const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(
    THEME_PROVIDER_KEY
  );
  if (!context) {
    throw new Error('themeprovider should be used');
  }
  const widgetRef = computed(() => {
    return context.value.widgets[name];
  });
  return widgetRef;
}
