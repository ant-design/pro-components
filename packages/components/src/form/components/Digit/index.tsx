import { FieldDigit } from '@ant-design/pro-field';
import { ProConfigProvider } from '@ant-design/pro-provider';
import type { InputNumberProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

export type ProFormDigitProps = ProFormFieldItemProps<
  InputNumberProps<number>
> & {
  min?: InputNumberProps['min'];
  max?: InputNumberProps['max'];
};
/**
 * 数组选择组件
 *
 * @param
 */
const ProFormDigit: React.ForwardRefRenderFunction<any, ProFormDigitProps> = (
  { fieldProps, min, proFieldProps, max, ...rest },
  ref,
) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
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
      }}
    >
      <ProFormField
        valueType="digit"
        fieldProps={{
          min,
          max,
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
