import { FormInstance } from 'antd/lib/form';
import { ReactNode } from 'react';

export type ProSchemaValueEnumObj = {
  [key: string]:
    | {
        text: ReactNode;
        status: string;
      }
    | ReactNode;
};

export type ProSchemaValueEnumMap = Map<
  React.ReactText,
  | {
      text: ReactNode;
      status: string;
    }
  | ReactNode
>;

// 支持的变形，还未完全支持完毕
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
  reload: () => void;
  reloadAndRest?: () => void;
  reset?: () => void;
  clearSelected?: () => void;
}

/**
 * 各个组件公共支持的 render
 */
export type ProSchema<T = unknown, U = string, Extra = unknown> = {
  key?: React.ReactText;
  dataIndex?: string | number | (string | number)[];
  /**
   * 选择如何渲染相应的模式
   */
  valueType?: ((entity: T) => U) | U;
  title?:
    | ((
        schema: ProSchema<T, U, Extra>,
        type: ProSchemaComponentTypes,
        dom: React.ReactNode,
      ) => React.ReactNode)
    | React.ReactNode;

  /**
   *展示一个 icon，hover 是展示一些提示信息
   */
  tip?: string;

  render?: (
    dom: React.ReactNode,
    entity: T,
    index: number,
    action: ProCoreActionType,
    schema: ProSchema<T, U, Extra>,
  ) => React.ReactNode;
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
   * 自定义 render，但是需要返回 string
   */
  renderText?: (text: any, record: T, index: number, action: ProCoreActionType) => any;

  fieldProps?: any;
  /**
   * 映射值的类型
   */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;

  /**
   * 从服务器请求枚举
   */
  request?: ProFieldRequestData<ProSchema>;

  /**
   * 从服务器请求的参数，改变了会触发 reload
   */
  params?: {
    [key: string]: any;
  };
  /**
   * 隐藏在 descriptions
   */
  hideInDescriptions?: boolean;
} & Extra;
