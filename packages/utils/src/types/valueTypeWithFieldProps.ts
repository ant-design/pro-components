import type {
  InputProps,
  SelectProps,
  TreeSelectProps,
  PopoverProps,
  DatePickerProps,
  TimeRangePickerProps,
  CheckboxProps,
  RateProps,
  RadioProps,
  ProgressProps,
  AvatarProps,
  InputNumberProps,
  SwitchProps,
  CascaderProps,
  FormInstance,
  ImageProps,
} from 'antd';
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { PasswordProps, TextAreaProps } from 'antd/lib/input';
import type { SketchPickerProps } from 'react-color';
import type { ProFieldValueObjectType, ProSchema } from '../typing';

type FieldPropsCommonType = Record<string, any>;

export type ProFieldValueTypeWithFieldProps =
  | {
      valueType: 'text';
      fieldProps: InputProps;
    }
  | {
      valueType: 'password';
      fieldProps: PasswordProps;
    }
  | {
      valueType: 'money';
      fieldProps: FieldPropsCommonType;
    }
  | {
      valueType: 'textarea';
      fieldProps: TextAreaProps;
    }
  | {
      valueType: 'option';
      fieldProps: FieldPropsCommonType;
    }
  | {
      valueType: 'date';
      fieldProps: DatePickerProps;
    }
  | {
      valueType: 'dateWeek';
      fieldProps: DatePickerProps;
    }
  | {
      valueType: 'dateMonth';
      fieldProps: DatePickerProps;
    }
  | {
      valueType: 'dateQuarter';
      fieldProps: DatePickerProps;
    }
  | {
      valueType: 'dateYear';
      fieldProps: DatePickerProps;
    }
  | {
      valueType: 'dateRange';
      fieldProps: RangePickerProps;
    }
  | {
      valueType: 'dateTimeRange';
      fieldProps: RangePickerProps;
    }
  | {
      valueType: 'dateTime';
      fieldProps: DatePickerProps;
    }
  | {
      valueType: 'time';
      fieldProps: TimeRangePickerProps;
    }
  | {
      valueType: 'timeRange';
      fieldProps: TimeRangePickerProps;
    }
  | {
      valueType: 'select';
      fieldProps: SelectProps;
    }
  | {
      valueType: 'checkbox';
      fieldProps: CheckboxProps;
    }
  | {
      valueType: 'rate';
      fieldProps: RateProps;
    }
  | {
      valueType: 'radio';
      fieldProps: RadioProps;
    }
  | {
      valueType: 'radioButton';
      fieldProps: RadioProps;
    }
  | {
      valueType: 'index';
      fieldProps: FieldPropsCommonType;
    }
  | {
      valueType: 'indexBorder';
      fieldProps: FieldPropsCommonType;
    }
  | {
      valueType: 'progress';
      fieldProps: ProgressProps;
    }
  | {
      valueType: 'percent';
      fieldProps: InputNumberProps;
    }
  | {
      valueType: 'digit';
      fieldProps: InputNumberProps;
    }
  | {
      valueType: 'digitRange';
      fieldProps: InputNumberProps;
    }
  | {
      valueType: 'second';
      fieldProps: InputNumberProps;
    }
  | {
      valueType: 'code';
      fieldProps: InputProps | TextAreaProps;
    }
  | {
      valueType: 'jsonCode';
      fieldProps: InputProps | TextAreaProps;
    }
  | {
      valueType: 'avatar';
      fieldProps: AvatarProps;
    }
  | {
      valueType: 'switch';
      fieldProps: SwitchProps;
    }
  | {
      valueType: 'fromNow';
      fieldProps: DatePickerProps;
    }
  | {
      valueType: 'image';
      fieldProps: ImageProps | InputProps;
    }
  | {
      valueType: 'cascader';
      fieldProps: CascaderProps<any>;
    }
  | {
      valueType: 'treeSelect';
      fieldProps: TreeSelectProps;
    }
  | {
      valueType: 'color';
      fieldProps: SketchPickerProps & {
        value?: string;
        popoverProps?: PopoverProps;
        mode?: 'read' | 'edit';
        onChange?: (color: string) => void;
        colors?: string[];
      };
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
export type ProFieldValueType = ProFieldValueTypeWithFieldProps['valueType'];

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

type PickFieldPropsByValueType<Type> = [ProFieldValueTypeWithFieldProps] extends [infer Item]
  ? Item extends { valueType: any; fieldProps: any }
    ? Type extends Item['valueType']
      ? Item['fieldProps']
      : never
    : never
  : never;

type GetValueType<T> = T extends { type: infer Type } ? Type : T;

type ValueTypeWithFieldPropsBase<Entity, ComponentsType, ExtraProps, ValueType> = {
  valueType?: ValueType extends (...args: any) => any ? never : ValueType;
  fieldProps?: FieldPropsTypeBase<
    Entity,
    ComponentsType,
    ExtraProps,
    PickFieldPropsByValueType<GetValueType<ValueType>>
  >;
};

type ValueTypeWithFieldPropsBaseFunction<Entity, ComponentsType, ExtraProps, ValueType> = {
  valueType?: (entity: Entity, type: ComponentsType) => ValueType;
  fieldProps?: FieldPropsTypeBase<
    Entity,
    ComponentsType,
    ExtraProps,
    PickFieldPropsByValueType<GetValueType<ValueType>>
  >;
};

type UnionSameValueType<ValueType> = [ValueType] extends [infer Type]
  ? Type extends ProFieldValueType
    ? never
    : Type
  : ValueType;

export type ValueTypeWithFieldProps<Entity, ComponentsType, ExtraProps, ValueType> =
  | ValueTypeWithFieldPropsBase<Entity, ComponentsType, ExtraProps, ProFieldValueObjectType>
  | ValueTypeWithFieldPropsBase<Entity, ComponentsType, ExtraProps, ProFieldValueType | undefined>
  | ValueTypeWithFieldPropsBase<Entity, ComponentsType, ExtraProps, UnionSameValueType<ValueType>>
  | ValueTypeWithFieldPropsBaseFunction<Entity, ComponentsType, ExtraProps, ProFieldValueType>
  | ValueTypeWithFieldPropsBaseFunction<
      Entity,
      ComponentsType,
      ExtraProps,
      ProFieldValueObjectType
    >;
