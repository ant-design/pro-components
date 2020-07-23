import React from 'react';
// import { Avatar, Descriptions } from 'antd';
import ProDescriptionsText from './components/Text';

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

type BaseProDescriptionsFC = {
  /**
   * 值的类型
   */
  text: React.ReactNode;
  formItemProps?: any;
  /**
   *简约模式
   */
  plain?: boolean;
};

/**
 * render 第二个参数，里面包含了一些常用的参数
 */
export type ProDescriptionsFCRenderProps = {
  value?: any;
  onChange?: (value: any) => void;
} & BaseProDescriptionsFC;

type RenderProDescriptionsFC = {
  render?: (
    text: any,
    props: Omit<ProDescriptionsFCRenderProps, 'value' | 'onChange'>,
    dom: JSX.Element,
  ) => JSX.Element;
  renderFormItem?: (
    text: any,
    props: ProDescriptionsFCRenderProps,
    dom: JSX.Element,
  ) => JSX.Element;
};

/**
 * 默认的 ProDescriptions 需要实现的功能
 */
export type ProDescriptionsFC<T> = React.FC<
  BaseProDescriptionsFC & RenderProDescriptionsFC & T
>;

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

type RenderProps = Omit<ProDescriptionsFCRenderProps, 'text'> &
  RenderProDescriptionsFC & {
    emptyText?: React.ReactNode;
    [key: string]: any;
  };

/**
 * 根据不同的类型来转化数值
 * @param text
 * @param valueType
 */
const defaultRenderText = (
  text: string | number | React.ReactText[],
  valueType: ProColumnsValueType,
  props: RenderProps = { emptyText: '-' },
): React.ReactNode => {
  return <ProDescriptionsText text={text as string} {...props} />;
};

const ProDescriptions: React.ForwardRefRenderFunction<
  any,
  {
    text: string | number | React.ReactText[];
    valueType: ProColumnsValueType;
  } & RenderProps
> = ({ text, valueType, onChange, value, ...rest }, ref) => {
  return (
    <React.Fragment>
      {defaultRenderText(text, valueType, {
        ...rest,
        ref,
        formItemProps: (value || onChange || rest?.formItemProps) && {
          ...rest?.formItemProps,
          value,
          onChange,
        },
      })}
    </React.Fragment>
  );
};

export { ProDescriptionsText };

export default React.forwardRef(ProDescriptions);
