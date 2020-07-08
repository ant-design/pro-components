import React, { ReactNode } from 'react';
import { Avatar } from 'antd';
import Percent from './component/percent';
import IndexColumn from './component/indexColumn';
import Progress from './component/progress';
import FieldMoney from './component/money';
import FieldDatePicker from './component/datePicker';
import FieldRangePicker from './component/rangePicker';
import FieldCode from './component/code';
import FieldTimePicker from './component/timePicker';

export type ColumnEmptyText = string;

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
export type ProColumnsValueType =
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

export type FieldFCMode = 'read' | 'edit' | 'update';

type BaseFieldFC = {
  /**
   * 值的类型
   */
  text: React.ReactNode;
  formItemProps?: any;
  mode: FieldFCMode;
  /**
   *简约模式
   */
  plain?: boolean;
};

/**
 * render 第二个参数，里面包含了一些常用的参数
 */
export type FieldFCRenderProps = {
  mode?: FieldFCMode;
  value?: any;
  onChange?: (value: any) => void;
} & BaseFieldFC;

type RenderFieldFC = {
  render?: (
    text: any,
    props: Omit<FieldFCRenderProps, 'value' | 'onChange'>,
    dom: JSX.Element,
  ) => JSX.Element;
  renderFormItem?: (
    text: any,
    props: FieldFCRenderProps,
    dom: JSX.Element,
  ) => JSX.Element;
};

/**
 * 默认的 Field 需要实现的功能
 */
export type FieldFC<T> = React.FC<BaseFieldFC & RenderFieldFC & T>;

// function return type
export type ProColumnsValueObjectType = {
  type: 'progress' | 'money' | 'percent';
  status?: 'normal' | 'active' | 'success' | 'exception' | undefined;
  locale?: string;
  /** percent */
  showSymbol?: boolean;
  precision?: number;
};

/**
 * value type by function
 */
export type ProColumnsValueTypeFunction<T> = (
  item: T,
) => ProColumnsValueType | ProColumnsValueObjectType;

type RenderProps = Omit<FieldFCRenderProps, 'text'> &
  RenderFieldFC & {
    emptyText?: React.ReactNode;
    [key: string]: any;
  };

/**
 * render valueType object
 * @param text string | number
 * @param valueType ProColumnsValueObjectType
 */
const defaultRenderTextByObject = (
  text: string | number | React.ReactText[],
  valueType: ProColumnsValueObjectType,
  props: RenderProps = { mode: 'read', plain: false },
) => {
  if (valueType.type === 'progress') {
    return (
      <Progress
        {...props}
        text={text as number}
        formItemProps={{
          status: valueType.status ? valueType.status : undefined,
          ...props.formItemProps,
        }}
      />
    );
  }
  if (valueType.type === 'money') {
    return (
      <FieldMoney {...props} text={text as number} locale={valueType.locale} />
    );
  }
  if (valueType.type === 'percent') {
    return (
      <Percent
        {...props}
        text={text as number}
        showSymbol={valueType.showSymbol}
        precision={valueType.precision}
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
  text: string | number | React.ReactText[],
  valueType: ProColumnsValueType,
  props: RenderProps = { mode: 'read', emptyText: '-' },
): React.ReactNode => {
  if (typeof valueType === 'object') {
    return defaultRenderTextByObject(text, valueType, props);
  }
  /**
   * 如果是金额的值
   */
  if (valueType === 'money' && (text || text === 0)) {
    return <FieldMoney {...props} text={text as number} />;
  }

  /**
   *如果是日期的值
   */
  if (valueType === 'date' && text) {
    return (
      <FieldDatePicker text={text as string} format="YYYY-MM-DD" {...props} />
    );
  }

  /**
   *如果是日期范围的值
   */
  if (
    valueType === 'dateRange' &&
    text &&
    Array.isArray(text) &&
    text.length === 2
  ) {
    return (
      <FieldRangePicker
        text={text as string[]}
        format="YYYY-MM-DD"
        {...props}
      />
    );
  }

  /**
   *如果是日期加时间类型的值
   */
  if (valueType === 'dateTime' && text) {
    return (
      <FieldDatePicker
        text={text as string}
        format="YYYY-MM-DD HH:mm:ss"
        showTime
        {...props}
      />
    );
  }

  /**
   *如果是日期加时间类型的值的值
   */
  if (
    valueType === 'dateTimeRange' &&
    text &&
    Array.isArray(text) &&
    text.length === 2
  ) {
    // 值不存在的时候显示 "-"
    return (
      <FieldRangePicker
        text={text as string[]}
        format="YYYY-MM-DD HH:mm:ss"
        showTime
        {...props}
      />
    );
  }

  /**
   *如果是时间类型的值
   */
  if (valueType === 'time' && text) {
    return (
      <FieldTimePicker text={text as string} format="HH:mm:ss" {...props} />
    );
  }

  if (valueType === 'index') {
    return <IndexColumn>{(text as number) + 1}</IndexColumn>;
  }

  if (valueType === 'indexBorder') {
    return <IndexColumn border>{(text as number) + 1}</IndexColumn>;
  }

  if (valueType === 'progress') {
    return <Progress {...props} text={text as number} />;
  }
  /** 百分比, 默认展示符号, 不展示小数位 */
  if (valueType === 'percent') {
    return <Percent text={text as number} {...props} />;
  }

  if (valueType === 'avatar' && typeof text === 'string') {
    return <Avatar src={text as string} size={22} shape="circle" />;
  }

  if (valueType === 'code' && text) {
    return <FieldCode text={text as string} {...props} />;
  }

  if (valueType === 'jsonCode' && text) {
    return <FieldCode text={text as string} language="json" {...props} />;
  }

  const { emptyText } = props;
  if (emptyText !== false) {
    if (typeof text !== 'boolean' && typeof text !== 'number' && !text) {
      return emptyText || '-';
    }
  }

  return text;
};

export { defaultRenderText };

const Field: React.FC<{
  text: string | number | React.ReactText[];
  valueType: ProColumnsValueType;
} & RenderProps> = ({ text, valueType, ...rest }) => {
  return <>{defaultRenderText(text, valueType, rest)}</>;
};

export default Field;
