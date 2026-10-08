import type { InputNumberProps } from 'antd';
import React from 'react';
import FieldDigit from '../../../field/components/Digit';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

const FORM_VALUE_TYPE_MAP: Record<string, ProRenderFieldPropsType> = {
  digit: {
    render: (text, props) => (
      <FieldDigit
        {...props}
        text={text}
        placeholder={props.placeholder as string}
      />
    ),
    formItemRender: (text, props) => (
      <FieldDigit
        {...props}
        text={text}
        placeholder={props.placeholder as string}
      />
    ),
  },
};

export type ProFormDigitProps = ProFormFieldItemProps<
  InputNumberProps<number>
> & {
  min?: InputNumberProps['min'];
  max?: InputNumberProps['max'];
};
/**
 * 数字输入组件
 *
 * @param fieldProps
 * @param min
 * @param proFieldProps
 * @param max
 * @param rest
 * @param ref
 */
const ProFormDigit: React.ForwardRefRenderFunction<any, ProFormDigitProps> = (
  { fieldProps, min, proFieldProps, max, ...rest },
  ref,
) => {
  return (
    <ProConfigProvider valueTypeMap={FORM_VALUE_TYPE_MAP}>
      <ProFormField
        valueType="digit"
        fieldProps={{
          min,
          max,
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
