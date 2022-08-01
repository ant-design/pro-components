import type { InputProps } from 'antd';
import type { FormInstance, FormItemProps } from 'antd/es/form';
import type { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import type { NamePath } from 'antd/es/form/interface';
import type { ReactNode } from 'react';
import type {
  ProFieldValueType,
  ProFieldValueTypeWithFieldProps,
  ValueTypeWithFieldProps,
} from './types';
import type { UseEditableUtilType } from './useEditableArray';

export type PageInfo = {
  pageSize: number;
  total: number;
  current: number;
};

export type { ProFieldValueType, ProFieldValueTypeWithFieldProps };

export type RequestOptionsType = {
  label?: React.ReactNode;
  value?: React.ReactText;
  /** 渲染的节点类型 */
  optionType?: 'optGroup' | 'option';
  options?: Omit<RequestOptionsType, 'children' | 'optionType'>[];
  [key: string]: any;
};

export type ProFieldRequestData<U = any> = (params: U, props: any) => Promise<RequestOptionsType[]>;

export type ProFieldValueEnumType = ProSchemaValueEnumMap | ProSchemaValueEnumObj;

export type ProFieldValueObjectType = {
  type: 'progress' | 'money' | 'percent' | 'image';
  status?: 'normal' | 'active' | 'success' | 'exception' | undefined;
  locale?: string;
  /** Percent */
  showSymbol?: ((value: any) => boolean) | boolean;
  showColor?: boolean;
  precision?: number;
  moneySymbol?: boolean;
  request?: ProFieldRequestData;
  /** Image */
  width?: number;
};

export type ProSchemaValueEnumType = {
  /** @name 演示的文案 */
  text: ReactNode;

  /** @name 预定的颜色 */
  status?: string;
  /** @name 自定义的颜色 */
  color?: string;
  /** @name 是否禁用 */
  disabled?: boolean;
};

/**
 * 支持 Map 和 Record<string,any>
 *
 * @name ValueEnum 的类型
 */
export type ProSchemaValueEnumMap = Map<React.ReactText, ProSchemaValueEnumType | ReactNode>;

export type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | ReactNode>;

export type ProFieldTextType =
  | React.ReactNode
  | React.ReactNode[]
  | Record<string, any>
  | Record<string, any>[];

export type SearchTransformKeyFn = (
  value: any,
  namePath: string,
  allValues: any,
) => string | Record<string, any>;
export type SearchConvertKeyFn = (value: any, field: NamePath) => string | Record<string, any>;

export type ProTableEditableFnType<T> = (value: any, record: T, index: number) => boolean;

// 支持的变形，还未完全支持完毕
/** 支持的变形，还未完全支持完毕 */
export type ProSchemaComponentTypes =
  | 'form'
  | 'list'
  | 'descriptions'
  | 'table'
  | 'cardList'
  | undefined;

/** 操作类型 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ProCoreActionType<T = {}> = {
  /** @name 刷新 */
  reload: (resetPageIndex?: boolean) => Promise<void>;
  /** @name 刷新并清空，只清空页面，不包括表单 */
  reloadAndRest?: () => Promise<void>;
  /** @name 重置任何输入项，包括表单 */
  reset?: () => void;
  /** @name 清空选择 */
  clearSelected?: () => void;
  /** @name p页面的信息都在里面 */
  pageInfo?: PageInfo;
} & Omit<
  UseEditableUtilType,
  'newLineRecord' | 'editableKeys' | 'actionRender' | 'setEditableRowKeys'
> &
  T;

/** @deprecated */
export type ProSchemaValueType<ValueType> =
  | (ValueType | ProFieldValueType)
  | ProFieldValueObjectType;

export type ProSchemaFieldProps<T> = Record<string, any> | T | Partial<InputProps>;

/** 各个组件公共支持的 render */
export type ProSchema<
  Entity = Record<string, any>,
  ExtraProps = unknown,
  ComponentsType = ProSchemaComponentTypes,
  ValueType = 'text',
  ExtraFormItemProps = unknown,
> = {
  /** @name 确定这个列的唯一值,一般用于 dataIndex 重复的情况 */
  key?: React.Key;
  /**
   * 支持一个数字，[a,b] 会转化为 obj.a.b
   *
   * @name 与实体映射的key
   */
  dataIndex?: string | number | (string | number)[];

  /**
   * 支持 ReactNode 和 方法
   *
   * @name 标题
   */
  title?:
    | ((
        schema: ProSchema<Entity, ExtraProps>,
        type: ComponentsType,
        dom: React.ReactNode,
      ) => React.ReactNode)
    | React.ReactNode;

  /** @name 展示一个 icon，hover 是展示一些提示信息 */
  tooltip?: LabelTooltipType | string;

  /** @deprecated 你可以使用 tooltip，这个更改是为了与 antd 统一 */
  tip?: string;

  /**
   * 支持 object 和Map，Map 是支持其他基础类型作为 key
   *
   * @name 映射值的类型
   */
  valueEnum?:
    | ((row: Entity) => ProSchemaValueEnumObj | ProSchemaValueEnumMap)
    | ProSchemaValueEnumObj
    | ProSchemaValueEnumMap;

  /**
   * @name 自定义的 formItemProps
   */
  formItemProps?:
    | (FormItemProps & ExtraFormItemProps)
    | ((
        form: FormInstance<any>,
        config: ProSchema<Entity, ExtraProps> & {
          type: ComponentsType;
          isEditable?: boolean;
          rowKey?: string;
          rowIndex: number;
          entity: Entity;
        },
      ) => FormItemProps & ExtraFormItemProps);

  /**
   * 修改的数据是会被 valueType 消费
   *
   * @name 自定义 render 内容
   */
  renderText?: (text: any, record: Entity, index: number, action: ProCoreActionType) => any;
  /**
   * Render 方法只管理的只读模式，编辑模式需要使用 renderFormItem
   *
   * @name 自定义只读模式的dom
   */
  render?: (
    dom: React.ReactNode,
    entity: Entity,
    index: number,
    action: ProCoreActionType | undefined,
    schema: ProSchema<Entity, ExtraProps, ComponentsType, ValueType> & {
      isEditable?: boolean;
      type: ComponentsType;
    },
  ) =>
    | React.ReactNode
    | {
        children: React.ReactNode;
        props: any;
      };

  /**
   * 返回一个 ReactNode，会自动包裹 value 和 onChange
   *
   * @name 自定义编辑模式
   */
  renderFormItem?: (
    schema: ProSchema<Entity, ExtraProps, ComponentsType, ValueType> & {
      isEditable?: boolean;
      index?: number;
      type: ComponentsType;
      originProps?: any;
    },
    config: {
      onSelect?: (value: any) => void;
      onChange?: <T = any>(value: T) => void;
      value?: any;
      type: ComponentsType;
      recordKey?: React.Key | React.Key[];
      record?: Entity;
      isEditable?: boolean;
      defaultRender: (
        newItem: ProSchema<Entity, ExtraProps, ComponentsType, ValueType>,
      ) => JSX.Element | null;
    },
    form: FormInstance,
    action?: Omit<
      UseEditableUtilType,
      'newLineRecord' | 'editableKeys' | 'actionRender' | 'setEditableRowKeys'
    >,
  ) => React.ReactNode;

  /**
   *  @name 可编辑表格是否可编辑
   *
   * @example 不允许编辑
   * editable=false
   *
   * @example 如果id=1不允许编辑
   * editable={(value,row,index)=> row.id !==1 }
   */
  editable?: false | ProTableEditableFnType<Entity>;

  /** @name 从服务器请求枚举 */
  request?: ProFieldRequestData;
  /** @name request防抖动时间 默认10 单位ms */
  debounceTime?: number;
  /** @name 从服务器请求的参数，改变了会触发 reload */
  params?:
    | ((record: Entity, column: ProSchema<Entity, ExtraProps>) => Record<string, any>)
    | Record<string, any>;
  /** @name 依赖字段的name，暂时只在拥有 request 的项目中生效，会自动注入到 params 中 */
  dependencies?: NamePath[];

  /**
   *  @name 忽略 FormItem，必须要和 renderFormItem 组件一起使用
   */
  ignoreFormItem?: boolean;

  /** @name 在 descriptions 隐藏 */
  hideInDescriptions?: boolean;
  /** @name 在 Form 中隐藏 */
  hideInForm?: boolean;
  /** @name 在 table 中隐藏 */
  hideInTable?: boolean;
  /** @name 在 table的查询表单 中隐藏 */
  hideInSearch?: boolean;
  /** 设置到 ProField 上面的 Props，内部属性 */
  proFieldProps?: ProFieldProps & any;
} & ExtraProps &
  ValueTypeWithFieldProps<Entity, ComponentsType, ExtraProps, ValueType>;

export interface ProFieldProps {
  light?: boolean;
  emptyText?: ReactNode;
  label?: React.ReactNode;
  mode?: 'read' | 'edit';
  /** 这个属性可以设置useSwr的key */
  proFieldKey?: string;
  render?: any;
  readonly?: boolean;
}
