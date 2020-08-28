import React, { ReactNode } from 'react';
import { Avatar } from 'antd';
import { Moment } from 'moment';
import { pickProProps, pickUndefined } from '@ant-design/pro-utils';
import { useIntl } from '@ant-design/pro-provider';
import FieldPercent from './components/Percent';
import FieldIndexColumn from './components/IndexColumn';
import FieldProgress from './components/Progress';
import FieldMoney from './components/Money';
import FieldDatePicker from './components/DatePicker';
import FieldRangePicker from './components/RangePicker';
import FieldCode from './components/Code';
import FieldTimePicker from './components/TimePicker';
import FieldText from './components/Text';
import FieldTextArea from './components/TextArea';
import FieldStatus from './components/Status';
import FieldOptions from './components/Options';
import FiledSelect, {
  ProFieldValueEnumType,
  ProFieldRequestData,
  proFieldParsingText,
  proFieldParsingValueEnumToArray,
} from './components/Select';
import FieldDigit from './components/Digit';

export type ProFieldTextType = string | number | React.ReactText[] | Moment | Moment[] | null;

export type { ProFieldValueEnumType };
export type ProFieldEmptyText = string | false;

/**
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
  | 'money'
  | 'textarea'
  | 'option'
  | 'date'
  | 'dateRange'
  | 'dateTimeRange'
  | 'dateTime'
  | 'time'
  | 'text'
  | 'index'
  | 'indexBorder'
  | 'progress'
  | 'percent'
  | 'digit'
  | 'avatar'
  | 'code'
  | 'jsonCode';

export type ProFieldFCMode = 'read' | 'edit' | 'update';

type BaseProFieldFC = {
  /**
   * 值的类型
   */
  text: React.ReactNode;

  fieldProps?: any;
  /**
   * 模式类型
   */
  mode: ProFieldFCMode;
  /**
   * 简约模式
   */
  plain?: boolean;
  /**
   * 轻量模式
   */
  light?: boolean;
  /**
   * label
   */
  label?: React.ReactNode;

  /**
   * 映射值的类型
   */
  valueEnum?: ProFieldValueEnumType;
};

/**
 * render 第二个参数，里面包含了一些常用的参数
 */
export type ProFieldFCRenderProps = {
  mode?: ProFieldFCMode;
  value?: any;
  onChange?: (value: any) => void;
} & BaseProFieldFC;

export type ProRenderFieldProps = {
  render?:
    | ((
        text: any,
        props: Omit<ProFieldFCRenderProps, 'value' | 'onChange'>,
        dom: JSX.Element,
      ) => JSX.Element)
    | undefined;
  renderFormItem?:
    | ((text: any, props: ProFieldFCRenderProps, dom: JSX.Element) => JSX.Element)
    | undefined;
};

/**
 * 默认的 Field 需要实现的功能
 */
export type ProFieldFC<T> = React.ForwardRefRenderFunction<
  any,
  BaseProFieldFC & ProRenderFieldProps & T
>;

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

/**
 * value type by function
 */
export type ProFieldValueTypeFunction<T> = (item: T) => ProFieldValueType | ProFieldValueObjectType;

type RenderProps = Omit<ProFieldFCRenderProps, 'text'> &
  ProRenderFieldProps & {
    emptyText?: React.ReactNode;
    [key: string]: any;
  };

/**
 * render valueType object
 * @param text string | number
 * @param valueType ProColumnsValueObjectType
 */
const defaultRenderTextByObject = (
  text: ProFieldTextType,
  valueType: ProFieldValueObjectType,
  props: RenderProps = { mode: 'read', plain: false, light: false },
) => {
  const pickFormItemProps = pickProProps(props.fieldProps);
  if (valueType.type === 'progress') {
    return (
      <FieldProgress
        {...props}
        text={text as number}
        fieldProps={{
          status: valueType.status ? valueType.status : undefined,
          ...pickFormItemProps,
        }}
      />
    );
  }
  if (valueType.type === 'money') {
    return (
      <FieldMoney
        locale={valueType.locale}
        {...props}
        fieldProps={pickFormItemProps}
        text={text as number}
      />
    );
  }
  if (valueType.type === 'percent') {
    return (
      <FieldPercent
        {...props}
        text={text as number}
        showSymbol={valueType.showSymbol}
        precision={valueType.precision}
        fieldProps={pickFormItemProps}
        showColor={valueType.showColor}
      />
    );
  }
  return text;
};

/**
 * 根据不同的类型来转化数值
 * @param text
 * @param valueType
 */
const defaultRenderText = (
  text: ProFieldTextType,
  valueType: ProFieldValueType | ProFieldValueObjectType,
  props: RenderProps,
): React.ReactNode => {
  if (typeof valueType === 'object') {
    return defaultRenderTextByObject(text, valueType, props);
  }

  const { mode = 'read', emptyText } = props;
  if (emptyText !== false && mode === 'read' && valueType !== 'option') {
    if (typeof text !== 'boolean' && typeof text !== 'number' && !text) {
      return emptyText || '-';
    }
  }

  /**
   * 如果是金额的值
   */
  if (valueType === 'money') {
    return <FieldMoney {...props} text={text as number} />;
  }

  /**
   *如果是日期的值
   */
  if (valueType === 'date') {
    return <FieldDatePicker text={text as string} format="YYYY-MM-DD" {...props} />;
  }

  /**
   *如果是日期范围的值
   */
  if (valueType === 'dateRange') {
    return <FieldRangePicker text={text as string[]} format="YYYY-MM-DD" {...props} />;
  }

  /**
   *如果是日期加时间类型的值
   */
  if (valueType === 'dateTime') {
    return (
      <FieldDatePicker text={text as string} format="YYYY-MM-DD HH:mm:ss" showTime {...props} />
    );
  }

  /**
   *如果是日期加时间类型的值的值
   */
  if (valueType === 'dateTimeRange') {
    // 值不存在的时候显示 "-"
    return (
      <FieldRangePicker text={text as string[]} format="YYYY-MM-DD HH:mm:ss" showTime {...props} />
    );
  }

  /**
   *如果是时间类型的值
   */
  if (valueType === 'time') {
    return <FieldTimePicker text={text as string} format="HH:mm:ss" {...props} />;
  }

  if (valueType === 'index') {
    return <FieldIndexColumn>{(text as number) + 1}</FieldIndexColumn>;
  }

  if (valueType === 'indexBorder') {
    return <FieldIndexColumn border>{(text as number) + 1}</FieldIndexColumn>;
  }

  if (valueType === 'progress') {
    return <FieldProgress {...props} text={text as number} />;
  }
  /** 百分比, 默认展示符号, 不展示小数位 */
  if (valueType === 'percent') {
    return <FieldPercent text={text as number} {...props} />;
  }

  if (valueType === 'avatar' && typeof text === 'string' && props.mode === 'read') {
    return <Avatar src={text as string} size={22} shape="circle" />;
  }

  if (valueType === 'code') {
    return <FieldCode text={text as string} {...props} />;
  }

  if (valueType === 'jsonCode') {
    return <FieldCode text={text as string} language="json" {...props} />;
  }

  if (valueType === 'textarea') {
    return <FieldTextArea text={text as string} {...props} />;
  }

  if (valueType === 'digit') {
    return <FieldDigit text={text as number} {...props} />;
  }

  if (props.valueEnum || props.request) {
    return <FiledSelect text={text as string} {...props} />;
  }

  if (valueType === 'option') {
    return <FieldOptions text={text} {...props} />;
  }

  return <FieldText text={text as string} {...props} />;
};

export { defaultRenderText };

const Field: React.ForwardRefRenderFunction<
  any,
  {
    text?: ProFieldTextType;
    valueType?: ProFieldValueType | ProFieldValueObjectType;
  } & RenderProps
> = ({ text = '', valueType = 'text', onChange, value, ...rest }, ref) => {
  const intl = useIntl();
  const fieldProps = (value || onChange || rest?.fieldProps) && {
    value,
    onChange,
    // fieldProps 优先级更高，在类似 LightFilter 场景下需要覆盖默认的 value 和 onChange
    ...pickUndefined(rest?.fieldProps),
  };
  return (
    <React.Fragment>
      {defaultRenderText(text, valueType, {
        ...rest,
        mode: rest.mode || 'read',
        ref,
        placeholder: intl.getMessage('tableForm.inputPlaceholder', '请输入'),
        fieldProps: pickProProps(fieldProps),
      })}
    </React.Fragment>
  );
};

export type { ProFieldRequestData };

export {
  FieldPercent,
  FieldIndexColumn,
  FieldProgress,
  FieldMoney,
  FieldDatePicker,
  FieldRangePicker,
  FieldCode,
  FieldTimePicker,
  FieldText,
  FieldStatus,
  FiledSelect,
  proFieldParsingText,
  proFieldParsingValueEnumToArray,
};

export default React.forwardRef(Field) as typeof Field;
