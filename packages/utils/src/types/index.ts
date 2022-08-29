import type { SketchPickerProps } from '@chenshuai2144/sketch-color';
import type {
  AvatarProps,
  CascaderProps,
  CheckboxProps,
  DatePickerProps,
  FormInstance,
  ImageProps,
  InputNumberProps,
  InputProps,
  PopoverProps,
  ProgressProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderSingleProps,
  SwitchProps,
  TimeRangePickerProps,
  TreeSelectProps,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { PasswordProps, TextAreaProps } from 'antd/es/input';
import type { SliderRangeProps } from 'antd/es/slider';
import type { ProFieldRequestData, ProSchema } from '../typing';

export interface ProFieldValueTypeWithFieldProps {
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
}

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

type FieldPropsTypeBase<Entity, ComponentsType, ExtraProps, FieldPropsType> =
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

type ValueTypeWithFieldPropsBase<Entity, ComponentsType, ExtraProps, Type> = {
  valueType?:
    | Type
    | ProFieldValueObject<Type>
    | ((entity: Entity, type: ComponentsType) => Type | ProFieldValueObject<Type>);
  fieldProps?: FieldPropsTypeBase<
    Entity,
    ComponentsType,
    ExtraProps,
    ProFieldValueTypeWithFieldProps[ProFieldValueType]
  >;
};

type UnionSameValueType<Type> = Type extends any
  ? Type extends ProFieldValueType
    ? never
    : Type
  : never;

export type ValueTypeWithFieldProps<Entity, ComponentsType, ExtraProps, ValueType> =
  ValueTypeWithFieldPropsBase<
    Entity,
    ComponentsType,
    ExtraProps,
    ProFieldValueType | UnionSameValueType<ValueType> | undefined
  >;
