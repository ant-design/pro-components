import type { FormInstance, FormItemProps } from 'antd/lib/form';
import type { ReactNode } from 'react';
import type { UseEditableUtilType } from './useEditableArray';

/**
 * password 密码框
 * money 金额
 * option 操作 需要返回一个数组
 * date 日期 YYYY-MM-DD
 * dateRange 日期范围 YYYY-MM-DD[]
 * dateTime 日期和时间 YYYY-MM-DD HH:mm:ss
 * dateTimeRange 范围日期和时间 YYYY-MM-DD HH:mm:ss[]
 * time: 时间 HH:mm:ss
 * index：序列
 * progress: 进度条
 * percent: 百分比
 * digit 数值
 * avatar 头像
 * code 代码块
 * jsonCode json 的代码块，格式化了一下
 */
export type ProFieldValueType =
  | 'password'
  | 'money'
  | 'textarea'
  | 'option'
  | 'date'
  | 'dateWeek'
  | 'dateMonth'
  | 'dateQuarter'
  | 'dateYear'
  | 'dateRange'
  | 'dateTimeRange'
  | 'dateTime'
  | 'time'
  | 'text'
  | 'select'
  | 'checkbox'
  | 'rate'
  | 'radio'
  | 'radioButton'
  | 'index'
  | 'indexBorder'
  | 'progress'
  | 'percent'
  | 'digit'
  | 'second'
  | 'avatar'
  | 'code'
  | 'switch'
  | 'fromNow'
  | 'jsonCode';

export type ProFieldRequestData<U = any> = (
  params: U,
  props: any,
) => Promise<
  {
    label: React.ReactNode;
    value: React.ReactText;
    [key: string]: any;
  }[]
>;

export type ProFieldValueEnumType = ProSchemaValueEnumMap | ProSchemaValueEnumObj;

// function return type
export type ProFieldValueObjectType = {
  type: 'progress' | 'money' | 'percent';
  status?: 'normal' | 'active' | 'success' | 'exception' | undefined;
  locale?: string;
  /** percent */
  showSymbol?: boolean;
  showColor?: boolean;
  precision?: number;
  request?: ProFieldRequestData;
};

export type ProSchemaValueEnumType = {
  /**
   * @name 演示的文案
   */
  text: ReactNode;

  /**
   * @name 预定的颜色
   */
  status: string;
  /**
   * @name 自定义的颜色
   */
  color?: string;
  /**
   * @name 是否禁用
   */
  disabled?: boolean;
};

export type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | ReactNode>;

/**
 * @name ValueEnum 的类型
 * @description 支持 Map 和 Object
 */
export type ProSchemaValueEnumMap = Map<React.ReactText, ProSchemaValueEnumType | ReactNode>;

export type SearchTransformKeyFn = (
  value: any,
  field: string,
  object: any,
) => string | Record<string, any>;

export type ProTableEditableFnType<T> = (_: any, record: T, index: number) => boolean;

// 支持的变形，还未完全支持完毕
/**
 * 支持的变形，还未完全支持完毕
 */
export type ProSchemaComponentTypes =
  | 'form'
  | 'list'
  | 'descriptions'
  | 'table'
  | 'cardList'
  | undefined;

/**
 * 操作类型
 */
export type ProCoreActionType<T = {}> = {
  /**
   * @name 刷新
   */
  reload: (resetPageIndex?: boolean) => void;
  /**
   * @name 刷新并清空
   */
  reloadAndRest?: () => void;
  /**
   * @name 重置
   */
  reset?: () => void;

  /**
   * @name 清空选择
   */
  clearSelected?: () => void;
} & Omit<
  UseEditableUtilType,
  'newLineRecord' | 'editableKeys' | 'actionRender' | 'setEditableRowKeys'
> &
  T;

type ProSchemaValueType = ProFieldValueType | ProFieldValueObjectType;

/**
 * 各个组件公共支持的 render
 */
export type ProSchema<T = unknown, Extra = unknown, V = ProSchemaComponentTypes> = {
  /**
   * @name 确定这个列的唯一值
   */
  key?: React.ReactText;
  /**
   * @name 与实体映射的key
   * @description 支持一个数字，[a,b] 会转化为 obj.a.b
   */
  dataIndex?: string | number | (string | number)[];

  /**
   * 选择如何渲染相应的模式
   */
  valueType?: ((entity: T, type: V) => ProSchemaValueType) | ProSchemaValueType;

  /**
   * @name 标题
   * @description 支持 ReactNode 和 方法
   */
  title?:
    | ((schema: ProSchema<T, Extra>, type: V, dom: React.ReactNode) => React.ReactNode)
    | React.ReactNode;

  /**
   *@name 展示一个 icon，hover 是展示一些提示信息
   */
  tooltip?: string;

  /**
   * @deprecated 你可以使用 tooltip，这个更改是为了与 antd 统一
   */
  tip?: string;

  render?: (
    dom: React.ReactNode,
    entity: T,
    index: number,
    action: ProCoreActionType,
    schema: ProSchema<T, Extra> & { isEditable?: boolean; type: V },
  ) => React.ReactNode;

  /**
   * @name 自定义编辑模式
   * @description 返回一个node，会自动包裹 value 和 onChange
   */
  renderFormItem?: (
    schema: ProSchema<T, Extra> & {
      isEditable?: boolean;
      index?: number;
      type: V;
    },
    config: {
      onSelect?: (value: any) => void;
      type: V;
      isEditable?: boolean;
      defaultRender: (newItem: ProSchema<T, Extra>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => React.ReactNode;

  /**
   * @name 自定义 render
   * @description 必须要返回 string
   */
  renderText?: (text: any, record: T, index: number, action: ProCoreActionType) => any;
  /**
   * 自定义的 fieldProps render
   */
  fieldProps?:
    | ((
        form: FormInstance<any>,
        config: ProSchema<T, Extra> & {
          type: V;
          isEditable?: boolean;
          rowKey?: string;
        },
      ) => Object)
    | Object;

  /**
   * 自定义的 formItemProps render
   */
  formItemProps?:
    | FormItemProps
    | ((
        form: FormInstance<any>,
        config: ProSchema<T, Extra> & {
          type: V;
          isEditable?: boolean;
          rowKey?: string;
        },
      ) => FormItemProps);

  /**
   * 可编辑表格是否可编辑
   */
  editable?: false | ProTableEditableFnType<T>;
  /**
   * @name 映射值的类型
   */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;

  /**
   * @name 从服务器请求枚举
   */
  request?: ProFieldRequestData<ProSchema>;

  /**
   * @name 从服务器请求的参数，改变了会触发 reload
   */
  params?: Record<string, any>;
  /**
   * @name 隐藏在 descriptions
   */
  hideInDescriptions?: boolean;
} & Extra;
