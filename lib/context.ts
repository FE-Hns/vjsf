import { inject, DefineComponent } from 'vue';
import { FieldPropType } from './types/type';

export const SchemaFormItemContextKey = Symbol('SchemaFormItemContextKey');

type SchemaFormItemType = DefineComponent<typeof FieldPropType>;

export const getContext = ():
  | { SchemaFormItem: SchemaFormItemType }
  | undefined => {
  const context: { SchemaFormItem: SchemaFormItemType } | undefined = inject(
    SchemaFormItemContextKey
  );
  if (!context) {
    throw new Error('SchemaForm should be used');
  }
  return context;
};