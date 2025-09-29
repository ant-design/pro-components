import type { InputNumberProps } from 'antd';
import React from 'react';
import { FieldDigitRange } from '../../../field';
import { ProConfigProvider } from '../../../provider';
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

export type ProFormDigitRangeProps = ProFormFieldItemProps<RangeInputNumberProps> & {
  separator?: string;
  separatorWidth?: number;
};
/**
 * 数组选择组件
 *
 * @param
 */
const ProFormDigit: React.FC<ProFormDigitRangeProps> = ({ fieldProps, proFieldProps, ref, ...rest }) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        digitRange: {
          render: (text, props) => <FieldDigitRange {...props} placeholder={props.placeholder as string} text={text} />,
          formItemRender: (text, props) => (
            <FieldDigitRange {...props} placeholder={props.placeholder as string} text={text} />
          ),
        },
      }}
    >
      <ProFormField
        ref={ref}
        fieldConfig={{
          defaultProps: {
            width: '100%',
          },
        }}
        fieldProps={{
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        valueType="digitRange"
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormDigit;
