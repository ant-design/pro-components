import type { InputNumberProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

export type Value = string | number | undefined;

export type ValuePair = Value[];

export type RangeInputNumberProps = Omit<
  InputNumberProps<number>,
  'value' | 'defaultValue' | 'onChange' | 'placeholder'
> & {
  value?: ValuePair;
  defaultValue?: ValuePair;
  onChange?: (value?: ValuePair) => void;
};

export type ProFormDigitRangeProps =
  ProFormFieldItemProps<RangeInputNumberProps> & {
    separator?: string;
    separatorWidth?: number;
  };
/**
 * 数字范围选择组件
 *
 * @param
 */
const ProFormDigit: React.ForwardRefRenderFunction<
  any,
  ProFormDigitRangeProps
> = ({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <ProFormField
      valueType="digitRange"
      fieldProps={{
        ...fieldProps,
      }}
      ref={ref}
      filedConfig={{
        defaultProps: {
          width: '100%',
        },
      }}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export default React.forwardRef(ProFormDigit);
