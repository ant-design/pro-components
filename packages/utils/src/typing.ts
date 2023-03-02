import type { InputProps } from 'antd';
import type { FormInstance, FormItemProps } from 'antd/es/form';
import type { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import type { NamePath } from 'antd/es/form/interface';
import type { ReactNode } from 'react';

import type { UseEditableUtilType } from './useEditableArray';

//@ts-ignore
import type { SketchPickerProps } from '@chenshuai2144/sketch-color';

import type { ProSchemaValueEnumType } from '@ant-design/pro-provider';
import type {
  AvatarProps,
  CascaderProps,
  CheckboxProps,
  DatePickerProps,
  ImageProps,
  InputNumberProps,
  PopoverProps,
  ProgressProps,
  RadioProps,
  RateProps,
  SegmentedProps,
  SelectProps,
  SliderSingleProps,
  SwitchProps,
  TimeRangePickerProps,
  TreeSelectProps,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { PasswordProps, TextAreaProps } from 'antd/es/input';
import type { SliderRangeProps } from 'antd/es/slider';

export type ProFieldValueTypeWithFieldProps = {
  text: InputProps;
  password: PasswordProps;
  money: Record<string, any>;
  index: Record<string, any>;
  indexBorder: Record<string, any>;
  option: Record<string, any>;
  textarea: TextAreaProps;
  date: DatePickerProps;
  dateWeek: DatePickerProps;
  dateMonth: DatePickerProps;
  dateQuarter: DatePickerProps;
  dateYear: DatePickerProps;
  dateTime: DatePickerProps;
  fromNow: DatePickerProps;
  dateRange: RangePickerProps;
  dateTimeRange: RangePickerProps;
  time: TimeRangePickerProps;
  timeRange: TimeRangePickerProps;
  select: SelectProps;
  checkbox: CheckboxProps;
  rate: RateProps;
  slider: SliderSingleProps | SliderRangeProps;
  radio: RadioProps;
  radioButton: RadioProps;
  progress: ProgressProps;
  percent: InputNumberProps;
  digit: InputNumberProps;
  digitRange: InputNumberProps;
  second: InputNumberProps;
  code: InputProps | TextAreaProps;
  jsonCode: InputProps | TextAreaProps;
  avatar: AvatarProps;
  switch: SwitchProps;
  image: ImageProps | InputProps;
  cascader: CascaderProps<any>;
  treeSelect: TreeSelectProps;
  color: SketchPickerProps & {
    value?: string;
    popoverProps?: PopoverProps;
    mode?: 'read' | 'edit';
    onChange?: (color: string) => void;
    colors?: string[];
  };
  segmented: SegmentedProps;
  group: any;
  formList: any;
  formSet: any;
  divider: any;
  dependency: any;
};

/**
 * @param textarea 文本框
 * @param password 密码框
 * @param money 金额 option 操作 需要返回一个数组
 * @param date 日期 YYYY-MM-DD
 * @param dateWeek 周选择器
 * @param dateMonth 月选择器
 * @param dateQuarter 季度选择器
 * @param dateYear 年选择器
 * @param dateRange 日期范围 YYYY-MM-DD[]
 * @param dateTime 日期和时间 YYYY-MM-DD HH:mm:ss
 * @param dateTimeRange 范围日期和时间 YYYY-MM-DD HH:mm:ss[]
 * @param time: 时间 HH:mm:ss
 * @param timeRange: 时间区间 HH:mm:ss[]
 * @param index：序列
 * @param indexBorder：序列
 * @param progress: 进度条
 * @param percent: 百分比
 * @param digit 数值
 * @param second 秒速
 * @param fromNow 相对于当前时间
 * @param avatar 头像
 * @param code 代码块
 * @param image 图片设置
 * @param jsonCode Json 的代码块，格式化了一下
 * @param color 颜色选择器
 * @param color 颜色选择器
 */
export type ProFieldValueType = Extract<keyof ProFieldValueTypeWithFieldProps, any>;

type FieldPropsTypeBase<
  Entity = Record<string, any>,
  ComponentsType = 'text',
  ExtraProps = Record<string, any>,
  FieldPropsType = Record<string, any>,
> =
  | ((
      form: FormInstance<any>,
      config: ProSchema<Entity, ExtraProps> & {
        type: ComponentsType;
        isEditable?: boolean;
        rowKey?: string;
        rowIndex: number;
        entity: Entity;
      },
    ) => FieldPropsType | Record<string, any>)
  | FieldPropsType
  | Record<string, any>;

export type ProFieldValueObject<Type> = Type extends 'progress' | 'money' | 'percent' | 'image'
  ? {
      type: Type;
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
    }
  : never;

type ValueTypeWithFieldPropsBase<
  Entity = Record<string, any>,
  ComponentsType = 'form',
  ExtraProps = Record<string, any>,
  ValueType = 'text',
> = {
  valueType?:
    | ValueType
    | ProFieldValueType
    | ProFieldValueObject<ValueType | ProFieldValueType>
    | ((
        entity: Entity,
        type: ComponentsType,
      ) => ValueType | ProFieldValueType | ProFieldValueObject<ValueType | ProFieldValueType>);
  fieldProps?: FieldPropsTypeBase<
    Entity,
    ComponentsType,
    ExtraProps,
    ValueType extends any
      ? ProFieldValueTypeWithFieldProps['text']
      : ValueType extends ProFieldValueType
      ? ProFieldValueTypeWithFieldProps[ValueType]
      : ProFieldValueTypeWithFieldProps['text']
  >;
};

export type ValueTypeWithFieldProps<
  Entity,
  ComponentsType,
  ExtraProps,
  ValueType = 'text',
> = ValueTypeWithFieldPropsBase<Entity, ComponentsType, ExtraProps, ValueType>;

export type PageInfo = {
  pageSize: number;
  total: number;
  current: number;
};

export type RequestOptionsType = {
  label?: React.ReactNode;
  value?: string | number;
  /** 渲染的节点类型 */
  optionType?: 'optGroup' | 'option';
  options?: Omit<RequestOptionsType, 'children' | 'optionType'>[];
  [key: string]: any;
};

export type ProFieldRequestData<U = any> = (params: U, props: any) => Promise<RequestOptionsType[]>;

export type ProFieldValueEnumType = ProSchemaValueEnumMap | ProSchemaValueEnumObj;

export type ProFieldValueObjectType = {
  type: 'progress' | 'money' | 'percent' | 'image';
  status?: 'normal' | 'active' | 'success' | 'exception';
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

/**
 * 支持 Map 和 Record<string,any>
 *
 * @name ValueEnum 的类型
 */
export type ProSchemaValueEnumMap = Map<string | number, ProSchemaValueEnumType | ReactNode>;

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
  ComponentsType extends ProSchemaComponentTypes = 'form',
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
  dataIndex?: React.Key | React.Key[];

  /**
   * 支持 ReactNode 和 方法
   *
   * @name 标题
   */
  title?:
    | ((
        schema: ProSchema<Entity, ExtraProps, ComponentsType, ValueType, ExtraFormItemProps>,
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
        config: ProSchema<Entity, ExtraProps, ComponentsType, ValueType, ExtraFormItemProps> & {
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
    schema: ProSchema<Entity, ExtraProps, ComponentsType, ValueType, ExtraFormItemProps> & {
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
    schema: ProSchema<Entity, ExtraProps, ComponentsType, ValueType, ExtraFormItemProps> & {
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
