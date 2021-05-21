import { DefineComponent, PropType } from 'vue';

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'BOOLEAN' = 'boolean',
  'ARRAY' = 'array',
  'OBJECT' = 'object',
  'NULL' = 'null',
}

// 创建好需要的Schema格式
export interface Schema {
  type?: SchemaTypes | string; // json类型
  title?: string; // json-schema标题
  description?: string; // 描述
  maximum?: boolean; // 最大值（包含当前最大值）
  minimum?: boolean; // 最小值（包含当前最小值）
  exclusiveMaximum?: boolean; // 最大值（不包含）
  exclusiveMinimum?: boolean; // 最小值（不包含）
  multipleOf?: boolean; // 当前值的倍数
  maxLength?: number; // 最大长度
  minLength?: number; // 最小长度
  format?: string; // 格式化方法
  maxItems?: boolean; // 数组最多有几项
  minItems?: boolean; // 数组最少有几项
  uniqueItems?: any; // 数组每一项是否唯一
  items?: Schema | Schema[]; // 数组的每一项格式
  prefixItems?: Schema | Schema[]; // 没看明白文档
  additionalItems?: boolean; // 没看明白文档
  contains?: Schema; // 数组需要包含某些东西
  maxContains?: number; // 至多包含几项
  minContains?: number; // 至少包含几项
  required?: string[]; // 哪些项目是必填
  properties?: { [propName: string]: Schema }; // 对象的属性
  dependencies?: { [key: string]: string[] | Schema }; // 文档说明已废弃
  propertyNames?: { [key: string]: string }; // 属性名称格式
  enum?: any[]; // 枚举类型
  enumNames?: any[];
  enumKeyValue?: any[];
  const?: any; // 固定值
  not?: Schema; // 匹配不是给定的格式
  oneOf?: Schema[]; // 匹配给定的格式
  anyOf?: Schema[]; // 只要有一个匹配
  allOf?: Schema[]; // 所有的都需要匹配
  default?: any; // 默认值
  additionalProperties?: any;
}

export interface UISchema {
  widget?: string | CommonWidgetDefine;
  properties?: {
    [key: string]: UISchema;
  };
  items?: UISchema | UISchema[];
}

export const FieldPropType = {
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
  uiSchema: {
    type: Object as PropType<UISchema>,
    required: true,
  },
} as const;

// 定义通用的CommonWidget的prop类型
export const CommonWidgetPropDefine = {
  value: {
    type: (Number || String) as PropType<number | string>,
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
} as const;

type option = {
  label: string;
  value: any;
};
// 定义SelectionWidget的prop类型
export const SelectionWidgetPropDefine = {
  ...CommonWidgetPropDefine,
  options: {
    type: Array as PropType<option[]>,
    required: true,
  },
} as const;

// 利用DefineComponent将对象转换为类型
export type CommonWidgetDefine = DefineComponent<
  typeof CommonWidgetPropDefine,
  {},
  {}
>;
export type SelectionWidgetDefine = DefineComponent<
  typeof SelectionWidgetPropDefine,
  {},
  {}
>;

export enum SelectionWidgetNames {
  SELECTIONWIDGET = 'SelectionWidget',
}

export enum CommonWidgetNames {
  TEXTWIDGET = 'TextWidget',
  NUMBERWIDGET = 'NumberWidget',
}

// 定义接口类型
export interface Theme {
  widgets: {
    [SelectionWidgetNames.SELECTIONWIDGET]: SelectionWidgetDefine;
    [CommonWidgetNames.TEXTWIDGET]: CommonWidgetDefine;
    [CommonWidgetNames.NUMBERWIDGET]: CommonWidgetDefine;
  };
}
