import type { InputProps } from 'antd';
import type { FormInstance, FormItemProps } from 'antd/lib/form';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type { NamePath } from 'antd/lib/form/interface';
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
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { PasswordProps, TextAreaProps } from 'antd/lib/input';
import type { SliderRangeProps } from 'antd/lib/slider';

/**
 * ProFieldValueTypeWithFieldProps
 * 字段值类型与 ProFieldProps 的映射关系
 */
export type ProFieldValueTypeWithFieldProps = {
  /** 文本输入框 */
  text: InputProps;
  /** 密码输入框 */
  password: PasswordProps;
  /** 金额 */
  money: Record<string, any>;
  /** 索引 */
  index: Record<string, any>;
  /** 索引带边框 */
  indexBorder: Record<string, any>;
  /** 下拉选择 */
  option: Record<string, any>;
  /** 多行文本 */
  textarea: TextAreaProps;
  /** 日期选择器 */
  date: DatePickerProps;
  /** 周选择器 */
  dateWeek: DatePickerProps;
  /** 月选择器 */
  dateMonth: DatePickerProps;
  /** 季度选择器 */
  dateQuarter: DatePickerProps;
  /** 年选择器 */
  dateYear: DatePickerProps;
  /** 日期时间选择器 */
  dateTime: DatePickerProps;
  /** 相对时间 */
  fromNow: DatePickerProps;
  /** 日期范围选择器 */
  dateRange: RangePickerProps;
  /** 日期时间范围选择器 */
  dateTimeRange: RangePickerProps;
  /** 周范围选择器 */
  dateWeekRange: RangePickerProps;
  /** 月范围选择器 */
  dateMonthRange: RangePickerProps;
  /** 季范围选择器 */
  dateQuarterRange: RangePickerProps;
  /** 年范围选择器 */
  dateYearRange: RangePickerProps;
  /** 时间选择器 */
  time: TimeRangePickerProps;
  /** 时间范围选择器 */
  timeRange: TimeRangePickerProps;
  /** 下拉选择器 */
  select: SelectProps;
  /** 复选框 */
  checkbox: CheckboxProps;
  /** 评分 */
  rate: RateProps;
  /** 滑动条 */
  slider: SliderSingleProps | SliderRangeProps;
  /** 单选框 */
  radio: RadioProps;
  /** 单选框按钮 */
  radioButton: RadioProps;
  /** 进度条 */
  progress: ProgressProps;
  /** 百分比输入框 */
  percent: InputNumberProps;
  /** 数字输入框 */
  digit: InputNumberProps;
  /** 数字范围输入框 */
  digitRange: InputNumberProps;
  /** 秒数输入框 */
  second: InputNumberProps;
  /** 代码输入框 */
  code: InputProps | TextAreaProps;
  /** JSON 代码输入框 */
  jsonCode: InputProps | TextAreaProps;
  /** 头像 */
  avatar: AvatarProps;
  /** 开关 */
  switch: SwitchProps;
  /** 图片 */
  image: ImageProps | InputProps;
  /** 级联选择 */
  cascader: CascaderProps<any>;
  /** 树形选择 */
  treeSelect: TreeSelectProps;
  /** 颜色选择器 */
  color: SketchPickerProps & {
    value?: string;
    popoverProps?: PopoverProps;
    mode?: 'read' | 'edit';
    onChange?: (color: string) => void;
    colors?: string[];
  };
  /** 分段器 */
  segmented: SegmentedProps;
  /** 分组 */
  group: any;
  /** 表单列表 */
  formList: any;
  /** 表单集合 */
  formSet: any;
  /** 分割线 */
  divider: any;
  /** 显示/隐藏 */
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
export type ProFieldValueType = Extract<
  keyof ProFieldValueTypeWithFieldProps,
  any
>;

/**
 * 这是一个泛型类型定义，用于定义 FieldPropsTypeBase 类型。该类型包含了以下类型参数：

 * Entity：表示表单项的数据实体类型，默认为 Record<string, any>。
 * ComponentsType：表示表单项对应的组件类型，默认为 'text'。
 * ExtraProps：表示表单项组件的额外属性类型，默认为 Record<string, any>。
 * FieldPropsType：表示表单项组件的属性类型，默认为 Record<string, any>。
 * 
 * 该类型定义了一种联合类型，可以是一个函数类型，也可以是一个对象类型。具体来说：
 * 如果是一个函数类型，它接收两个参数 form 和 config，并返回一个对象类型，该对象类型可以是 FieldPropsType 或 Record<string, any>。
 * 其中，form 是 antd 的 FormInstance 类型，config 是 ProSchema 和其它额外属性的联合类型，并包含了一些表单项相关的信息。
 * 如果不是一个函数类型，它可以是 FieldPropsType 或 Record<string, any> 中的任意一个。
 * 该类型的作用是定义一个通用的表单项属性类型，使得在不同的表单项组件中，可以共用这个属性类型，提高了代码的重用性。
 */
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

/**
 * 这段代码定义了一个泛型类型 ProFieldValueObject<Type>，它的泛型参数 Type 必须是 'progress'、'money'、'percent'、'image' 中的一个。
 * 当 Type 为 'progress'、'money'、'percent'、'image' 中的一种时，这个类型将被定义为一个对象，包含以下属性：
 *
 * - type: Type 类型值，即 'progress'、'money'、'percent'、'image' 中的一种；
 * - status: 字符串类型，表示状态，可选值为 'normal'、'active'、'success'、'exception' 或 undefined；
 * - locale: 字符串类型，表示地区；
 * - showSymbol: 布尔类型或函数类型，表示是否显示符号；
 * - showColor: 布尔类型，表示是否显示颜色；
 * - precision: 数字类型，表示精度；
 * - moneySymbol: 布尔类型，表示是否显示货币符号；
 * - request: ProFieldRequestData 类型，表示请求数据；
 * - width: 数字类型，表示宽度。
 *
 * 如果 Type 不是 'progress'、'money'、'percent'、'image' 中的一种，那么 ProFieldValueObject<Type> 的类型为 never。
 */
export type ProFieldValueObject<Type> = Type extends
  | 'progress'
  | 'money'
  | 'percent'
  | 'image'
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

/**
 * 这段代码定义了一个泛型类型 ValueTypeWithFieldPropsBase，它包含了以下属性：
 * - Entity：泛型类型，表示数据实体对象的类型；
 * - ComponentsType：泛型类型，表示组件的类型；
 * - ExtraProps：泛型类型，表示额外的属性；
 * - ValueType：泛型类型，表示字段的值类型，默认为字符串类型。
 *
 * 该类型的主要作用是用于定义 ProTable 组件的列属性 ProColumns 中的字段属性，包括字段的类型（valueType）和自定义属性（fieldProps）。其中：
 * - valueType 属性可以是字符串类型，也可以是 ProFieldValueType 枚举类型，也可以是一个对象类型 ProFieldValueObject，或者是一个返回值为这些类型之一的函数。它表示字段的类型，如文本、数字、日期等；
 * - fieldProps 属性是一个泛型类型 FieldPropsTypeBase，它表示该字段对应的组件的属性，用于定制组件的展示形式、校验规则、事件等等。根据字段类型的不同，其属性值也会有所不同。
 */
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
      ) =>
        | ValueType
        | ProFieldValueType
        | ProFieldValueObject<ValueType | ProFieldValueType>);
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

/**
 * 这段代码定义了一个泛型类型 ValueTypeWithFieldProps，它有四个类型参数。
 * 这个类型的作用是用来描述在一个数据表格中某个字段的值（value）以及可能需要传递给这个字段的其他属性（fieldProps），以便在 UI 上正确地展示这个字段。
 * 具体来说，这个类型有一个属性 valueType，表示字段的值的类型，可以是 'text'、'money'、'percent'、'image'、ProFieldValueType 中的一个，也可以是一个函数。
 *
 * 它的参数是该行数据和组件类型（例如 'table' 或 'form'），返回值为上述值中的一种。
 *
 * 此外，这个类型还有一个属性 fieldProps，表示需要传递给该字段的其他属性，它的类型是一个泛型 FieldPropsTypeBase。这个泛型有四个类型参数，
 * 分别是：
 *  - Entity 表示该字段所在行的数据类型；
 *  - ComponentsType 表示该字段所在的组件类型；
 *  - ExtraProps 表示传递给该字段的其他属性的类型；
 *  - ValueType 表示该字段的值的类型，可以是 'text'、'money'、'percent'、'image'、ProFieldValueType 中的一种。
 * 最终，fieldProps 属性的类型会根据 valueType 的不同，来选择特定的类型进行限制，以确保传递给该字段的其他属性符合它的值的类型。
 */
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
  /**
   * 选项的文本内容，可以是一个 React 组件。
   */
  label?: React.ReactNode;
  /**
   * 选项的值，可以是一个字符串或数字类型。
   */
  value?: string | number;
  /** 渲染的节点类型 */
  optionType?: 'optGroup' | 'option';
  /**
   * 当节点类型为 optGroup 时，可以使用该属性来定义其包含的子选项，每个子选项也可以使用 RequestOptionsType 类型来定义。
   */
  options?: Omit<RequestOptionsType, 'children' | 'optionType'>[];
  /** 其他自定义属性。 */
  [key: string]: any;
};

export type ProFieldRequestData<U = any> = (
  params: U,
  props: any,
) => Promise<RequestOptionsType[]>;

export type ProFieldValueEnumType =
  | ProSchemaValueEnumMap
  | ProSchemaValueEnumObj;
/**
 * ProFieldValueObjectType 对象，用于描述值为 'progress' | 'money' | 'percent' | 'image' 类型的 ProField 的属性。
 * @typedef {Object} ProFieldValueObjectType
 * @property {('progress' | 'money' | 'percent' | 'image')} type - 值的类型。
 * @property {('normal' | 'active' | 'success' | 'exception' | undefined)} [status] - 状态。
 * @property {string} [locale] - 本地化语言。
 * @property {((value: any) => boolean) | boolean} [showSymbol] - 是否显示符号。
 * @property {boolean} [showColor] - 是否显示颜色。
 * @property {number} [precision] - 精度。
 * @property {boolean} [moneySymbol] - 是否显示货币符号。
 * @property {ProFieldRequestData} [request] - 远程请求数据。
 * @property {number} [width] - 图片的宽度。
 */
export type ProFieldValueObjectType = {
  /**
   * 类型
   * - 'progress': 进度条
   * - 'money': 金钱格式
   * - 'percent': 百分比
   * - 'image': 图片
   */
  type: 'progress' | 'money' | 'percent' | 'image';
  /**
   * 状态
   * - 'normal': 正常
   * - 'active': 活动中
   * - 'success': 成功
   * - 'exception': 异常
   */
  status?: 'normal' | 'active' | 'success' | 'exception' | undefined;
  /** 本地化信息 */
  locale?: string;
  /**
   * 百分比相关
   * - showSymbol?: 是否显示百分号，默认为 true
   * - showColor?: 是否显示颜色条，默认为 false
   * - precision?: 保留几位小数，默认为 2
   */
  showSymbol?: ((value: any) => boolean) | boolean;
  showColor?: boolean;
  precision?: number;
  /**
   * 金钱相关
   * - moneySymbol?: 是否显示货币符号，默认为 true
   */
  moneySymbol?: boolean;
  /** 数据请求 */
  request?: ProFieldRequestData;
  /**
   * width?: 图片宽度，默认为 80
   */
  width?: number;
};

/**
 * 支持 Map 和 Record<string,any>
 *
 * @name ValueEnum 的类型
 */
export type ProSchemaValueEnumMap = Map<
  string | number,
  ProSchemaValueEnumType | ReactNode
>;

export type ProSchemaValueEnumObj = Record<
  string,
  ProSchemaValueEnumType | ReactNode
>;

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
export type SearchConvertKeyFn = (
  value: any,
  field: NamePath,
) => string | Record<string, any>;

export type ProTableEditableFnType<T> = (
  value: any,
  record: T,
  index: number,
) => boolean;

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

export type ProSchemaFieldProps<T> =
  | Record<string, any>
  | T
  | Partial<InputProps>;

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
        schema: ProSchema<
          Entity,
          ExtraProps,
          ComponentsType,
          ValueType,
          ExtraFormItemProps
        >,
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
        config: ProSchema<
          Entity,
          ExtraProps,
          ComponentsType,
          ValueType,
          ExtraFormItemProps
        > & {
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
  renderText?: (
    text: any,
    record: Entity,
    index: number,
    action: ProCoreActionType,
  ) => any;
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
    schema: ProSchema<
      Entity,
      ExtraProps,
      ComponentsType,
      ValueType,
      ExtraFormItemProps
    > & {
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
    schema: ProSchema<
      Entity,
      ExtraProps,
      ComponentsType,
      ValueType,
      ExtraFormItemProps
    > & {
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
    | ((
        record: Entity,
        column: ProSchema<Entity, ExtraProps>,
      ) => Record<string, any>)
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
  /**
   * 是否启用轻量模式
   */
  light?: boolean;
  /**
   * 空文本占位符
   */
  emptyText?: ReactNode;
  /**
   * 标签名称
   */
  label?: React.ReactNode;
  /**
   * 渲染模式
   */
  mode?: 'read' | 'edit';
  /**
   * 设置 useSwr 的 key
   */
  proFieldKey?: string;
  /**
   * 自定义渲染函数
   */
  render?: any;
  /**
   * 是否只读
   */
  readonly?: boolean;
}
