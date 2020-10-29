import { FormInstance } from 'antd/lib/form';
import { ReactNode } from 'react';

type ProSchemaValueEnumType = {
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

export type ProSchemaValueEnumObj = {
  [key: string]: ProSchemaValueEnumType | ReactNode;
};

/**
 * @name ValueEnum 的类型
 * @description 支持 Map 和 Object
 */
export type ProSchemaValueEnumMap = Map<React.ReactText, ProSchemaValueEnumType | ReactNode>;

export type SearchTransformKeyFn = (
  value: any,
  field: string,
  object: any,
) => string | { [key: string]: any };

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

export type ProFieldRequestData<T, U = any> = (
  params: U,
  props: T,
) => Promise<
  {
    label: React.ReactNode;
    value: React.ReactText;
    [key: string]: any;
  }[]
>;

/**
 * 操作类型
 */
export interface ProCoreActionType {
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
}

/**
 * 各个组件公共支持的 render
 */
export type ProSchema<T = unknown, U = string, Extra = unknown> = {
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
  valueType?: ((entity: T, type: ProSchemaComponentTypes) => U) | U;

  /**
   * @name 标题
   * @description 支持 ReactNode 和 方法
   */
  title?:
    | ((
        schema: ProSchema<T, U, Extra>,
        type: ProSchemaComponentTypes,
        dom: React.ReactNode,
      ) => React.ReactNode)
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
    schema: ProSchema<T, U, Extra>,
  ) => React.ReactNode;

  /**
   * @name 自定义编辑模式
   * @description 返回一个node，会自动包裹 value 和 onChange
   */
  renderFormItem?: (
    item: ProSchema<T, U, Extra>,
    config: {
      value?: any;
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      type: ProSchemaComponentTypes;
      defaultRender: (newItem: ProSchema<T, U, Extra>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => React.ReactNode;

  /**
   * @name 自定义 render
   * @description 必须要返回 string
   */
  renderText?: (text: any, record: T, index: number, action: ProCoreActionType) => any;

  fieldProps?: any;
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
  params?: {
    [key: string]: any;
  };
  /**
   * @name 隐藏在 descriptions
   */
  hideInDescriptions?: boolean;
} & Extra;
