import { FieldDigitRange } from '../../../field';
import { ProConfigProvider } from '../../../provider';
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
 * 数组选择组件
 *
 * @param
 */
const ProFormDigit: React.ForwardRefRenderFunction<
  any,
  ProFormDigitRangeProps
> = ({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        digitRange: {
          render: (text, props) => (
            <FieldDigitRange
              {...props}
              text={text}
              placeholder={props.placeholder as string}
            />
          ),
          formItemRender: (text, props) => (
            <FieldDigitRange
              {...props}
              text={text}
              placeholder={props.placeholder as string}
            />
          ),
        },
      }}
    >
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
    </ProConfigProvider>
  );
};

const ForwardRefProFormDigit = React.forwardRef(ProFormDigit);

export default ForwardRefProFormDigit;
