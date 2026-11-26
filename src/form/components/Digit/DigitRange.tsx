import type { InputNumberProps } from 'antd';
import React, { useContext, useMemo } from 'react';
import { FieldDigitRange } from '../../../field/FieldLoaders';
import {
  mergeFormValueTypeMap,
  type ValueTypeRenderFallback,
} from '../../../field/ValueTypeToComponent';
import { ProConfigProvider, ProProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

const FALLBACK_VALUE_TYPE_MAP: Record<string, ValueTypeRenderFallback> = {
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
  const proContext = useContext(ProProvider);
  const valueTypeMap = useMemo(
    () =>
      mergeFormValueTypeMap(proContext.valueTypeMap, FALLBACK_VALUE_TYPE_MAP),
    [proContext.valueTypeMap],
  );
  return (
    <ProConfigProvider valueTypeMap={valueTypeMap}>
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
