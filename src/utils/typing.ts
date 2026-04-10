import type {
  AvatarProps,
  CascaderProps,
  CheckboxProps,
  ColorPickerProps,
  DatePickerProps,
  DividerProps,
  ImageProps,
  InputNumberProps,
  InputProps,
  PopoverProps,
  ProgressProps,
  RadioProps,
  RateProps,
  SegmentedProps,
  SelectProps,
  SliderSingleProps,
  SpaceProps,
  SwitchProps,
  TimeRangePickerProps,
  TreeSelectProps,
} from 'antd';
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { FormInstance, FormItemProps } from 'antd/lib/form';
import type { NamePath } from 'antd/lib/form/interface';
import type { PasswordProps, TextAreaProps } from 'antd/lib/input';
import type { SliderRangeProps } from 'antd/lib/slider';
import type { ReactNode } from 'react';
import type { ProSchemaValueEnumType } from '../provider';
import type { UseEditableUtilType } from './useEditableArray';

// 兼容 antd 6.x 版本
export type LabelTooltipType = any;
export type WrapperTooltipProps = any;

export type ProFormBaseGroupProps = {
  /**
   * @name 分组的标题
   */
  title?: React.ReactNode;
  /**
   * @name 分组的标题，与 title 等价，兼容旧写法
   */
  label?: React.ReactNode;
  /**
   * @name 标题旁边的？号提示展示的信息
   *
   * @example 自定义提示信息
   * <ProForm.Group title="标题"  tooltip="自定义提示信息">
   *  @example 自定义Icon
   * <ProForm.Group title="标题"  tooltip={{icon:<Info/>,title:自定义提示信息}}>
   */
  tooltip?: LabelTooltipType | string;
  /**
   * @name 额外的内容配置,在标题的另外一边
   *
   * @example 额外的内容配置
   * <ProForm.Group title="标题" extra={<ProFormSwitch name="open"/>} />
   */
  extra?: React.ReactNode;
  /**
   * @name 组件之前的间隔
   */
  size?: SpaceProps['size'];
  /**
   * @name 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * @name 自定义 title 样式
   * @example 增加背景颜色
   * <ProForm.Group titleStyle={{ backgroundColor: '#f0f0f0' }} />
   */
  titleStyle?: React.CSSProperties;
  /**
   * @name 自定义title
   * @example 自定义标题
   * <ProForm.Group title={(_,props)=><span>自定义标题</span>}>
   */
  titleRender?: (
    title: React.ReactNode,
    props: ProFormBaseGroupProps,
  ) => React.ReactNode;
  /** 子项的对齐方式 */
  align?: SpaceProps['align'];
  spaceProps?: SpaceProps;
  /**
   * @name 子项的排列方式
   */
  direction?: SpaceProps['orientation'];
  /**
   * @name 布局方式，键值对模式和两行模式
   * @default inline
   */
  labelLayout?: 'inline' | 'twoLine';
  /**
   * @name 是否折叠
   */
  collapsed?: boolean;
  /**
   * @name 是否可折叠
   */
  collapsible?: boolean;
  /**
   * @name 默认的折叠状态
   *  */
  defaultCollapsed?: boolean;
  /**
   * @name 折叠修改的事件
   *  */
  onCollapse?: (collapsed: boolean) => void;
  /**
   * @name 自定选中一个input，只能有一个生效
   */
  autoFocus?: boolean;

  children?: React.ReactNode;
};
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
  color: ColorPickerProps & {
    value?: string;
    popoverProps?: PopoverProps;
    mode?: 'read' | 'edit';
    onChange?: (color: string) => void;
    colors?: string[];
    /** 是否使用旧版本 */
    old?: boolean;
  };
  /** 分段器 */
  segmented: SegmentedProps;
  /** 分组 */
  group: ProFormBaseGroupProps;
  /** 表单列表 */
  formList: Record<string, any>;
  /** 表单集合 */
  formSet: Record<string, any>;
  /** 分割线 */
  divider: DividerProps;
  /** 显示/隐藏 */
  dependency: FormItemProps;
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
 */
export type ProFieldValueType = keyof ProFieldValueTypeWithFieldProps;

/** Schema 布局用（group、formList…）；与 {@link ProFieldBuiltinValueType} 并集为 {@link ProFieldValueType} */
export const PRO_FIELD_SCHEMA_LAYOUT_VALUE_TYPES = [
  'group',
  'formList',
  'formSet',
  'divider',
  'dependency',
] as const;

export type ProFieldSchemaLayoutValueType =
  (typeof PRO_FIELD_SCHEMA_LAYOUT_VALUE_TYPES)[number];

/** 内置 Field 映射键（= 全量 valueType 去掉布局类） */
export type ProFieldBuiltinValueType = Exclude<
  ProFieldValueType,
  ProFieldSchemaLayoutValueType
>;

/** fieldProps：固定类型、函数 `(form, config) => …` 或宽松 Record */
type FieldPropsTypeBase<
  Entity = Record<string, any>,
  ComponentsType = 'text',
  ExtraProps = Record<string, any>,
  FieldPropsType = ProFieldValueTypeWithFieldProps['text'],
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

/** 泛型：仅 progress | money | percent | image 时有属性，否则 never */
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

/** ProColumns / ProSchema：`valueType` + 按类型收窄的 `fieldProps` */
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
    ValueType extends ProFieldValueType
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
  /**
   * 选项的文本内容，可以是一个 React 组件。
   */
  label?: React.ReactNode;
  /**
   * 选项的值，可以是一个字符串或数字类型。
   */
  value?: string | number | boolean;
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

/** `PureProField` / `ProFormField` 的 `valueType`：全部字符串类型，或 money/percent 等对象简写 */
export type ProFieldValueTypeInput =
  | ProFieldValueType
  | ProFieldValueObjectType;

/**
 * 支持 Map 和 Record<string,any>
 *
 * @name ValueEnum 的类型
 */
export type ProSchemaValueEnumMap = Map<
  string | number | boolean,
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
  namePath: string[],
  allValues: any,
) => any;
export type SearchConvertKeyFn = (
  value: any,
  field: NamePath,
) => string | boolean | Record<string, any>;

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
  dataIndex?: unknown;

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
   * Render 方法只管理的只读模式，编辑模式需要使用 formItemRender
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
  formItemRender?: (
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
   *  @name 忽略 FormItem，必须要和 formItemRender 组件一起使用
   */
  ignoreFormItem?: boolean;

  /** @name 在 descriptions 隐藏 */
  hideInDescriptions?: boolean;
  /** @name 在 Form 中隐藏 */
  hideInForm?: boolean;
  /** @name 在 table 中隐藏 */
  hideInTable?: boolean;

  /** 设置到 ProField 上面的 Props，内部属性 */
  proFieldProps?: ProFieldProps & Record<string, any>;
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
