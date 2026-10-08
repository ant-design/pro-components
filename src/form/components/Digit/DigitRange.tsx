import type { InputNumberProps } from 'antd';
import React from 'react';
import FieldDigitRange from '../../../field/components/DigitRange';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

const FORM_VALUE_TYPE_MAP: Record<string, ProRenderFieldPropsType> = {
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
};

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
 * 数字范围输入组件
 *
 * @param fieldProps
 * @param proFieldProps
 * @param rest
 * @param ref
 */
const ProFormDigit: React.ForwardRefRenderFunction<
  any,
  ProFormDigitRangeProps
> = ({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <ProConfigProvider valueTypeMap={FORM_VALUE_TYPE_MAP}>
      <ProFormField
        valueType="digitRange"
        fieldProps={{
          ...fieldProps,
        }}
        ref={ref}
        fieldConfig={{
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
