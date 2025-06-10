import { FieldMoney, FieldMoneyProps } from '@ant-design/pro-field';
import { ProConfigProvider } from '@ant-design/pro-provider';
import type { InputNumberProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

export type ProFormMoneyProps = ProFormFieldItemProps<
  Omit<FieldMoneyProps, 'valueType' | 'text'> & InputNumberProps<number>
> & {
  customSymbol?: string; // 自定义货币符号
  locale?: string; // 单独设置国际化，设置之后优先级高于全局国际化
  min?: InputNumberProps<number>['min'];
  max?: InputNumberProps<number>['min'];
  placeholder?: string;
};
/**
 * 金额输入框
 *
 * @param
 */
const ProFormMoney: React.ForwardRefRenderFunction<any, ProFormMoneyProps> = (
  { fieldProps, proFieldProps, locale, min, max, ...rest },
  ref,
) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        money: {
          render: (text, props) => (
            <FieldMoney
              {...props}
              placeholder={props.placeholder as string}
              text={text}
            />
          ),
          formItemRender: (text, props) => (
            <FieldMoney
              {...props}
              placeholder={props.placeholder as string}
              text={text}
            />
          ),
        },
      }}
    >
      <ProFormField
        valueType={{
          type: 'money',
          locale,
        }}
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

export default React.forwardRef(ProFormMoney);
