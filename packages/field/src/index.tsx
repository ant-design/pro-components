import React, { ReactNode } from 'react';
import { Avatar, DatePicker } from 'antd';
import moment from 'moment';
import Percent from './component/percent';
import IndexColumn from './component/indexColumn';
import Progress from './component/progress';
import FieldMoney from './component/money';

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
  | 'code';

export type FieldFCType = 'read' | 'edit' | 'update';

type BaseFieldFC = {
  text: React.ReactNode;
  formItemProps?: any;
  type: FieldFCType;
};

/**
 * render 第二个参数，里面包含了一些常用的参数
 */
export type FieldFCRenderProps = {
  type?: FieldFCType;
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
  text: string | number,
  valueType: ProColumnsValueObjectType,
  props: RenderProps = { type: 'read' },
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
  props: RenderProps = { type: 'read', emptyText: '-' },
): React.ReactNode => {
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
    return moment(text).format('YYYY-MM-DD');
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
    // 值不存在的时候显示 "-"
    const [startText, endText] = text;
    if (props.type === 'edit') {
      return (
        <DatePicker.RangePicker
          defaultValue={[moment(startText), moment(endText)]}
        />
      );
    }
    return (
      <div>
        <div>{startText ? moment(startText).format('YYYY-MM-DD') : '-'}</div>
        <div>{endText ? moment(endText).format('YYYY-MM-DD') : '-'}</div>
      </div>
    );
  }

  /**
   *如果是日期加时间类型的值
   */
  if (valueType === 'dateTime' && text) {
    if (props.type === 'edit') {
      return <DatePicker defaultValue={moment(text)} />;
    }
    return moment(text).format('YYYY-MM-DD HH:mm:ss');
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
    const [startText, endText] = text;
    if (props.type === 'edit') {
      return (
        <DatePicker.RangePicker
          showTime
          defaultValue={[moment(startText), moment(endText)]}
        />
      );
    }
    return (
      <div>
        <div>
          {startText ? moment(startText).format('YYYY-MM-DD HH:mm:ss') : '-'}
        </div>
        <div>
          {endText ? moment(endText).format('YYYY-MM-DD HH:mm:ss') : '-'}
        </div>
      </div>
    );
  }

  /**
   *如果是时间类型的值
   */
  if (valueType === 'time' && text) {
    return moment(text).format('HH:mm:ss');
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
    return (
      <pre
        style={{
          padding: 16,
          overflow: 'auto',
          fontSize: '85%',
          lineHeight: 1.45,
          backgroundColor: '#f6f8fa',
          borderRadius: 3,
        }}
      >
        <code>{text}</code>
      </pre>
    );
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
