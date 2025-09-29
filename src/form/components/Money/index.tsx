import type { InputNumberProps } from 'antd';
import React from 'react';
import type { FieldMoneyProps } from '../../../field';
import { FieldMoney } from '../../../field';
import { ProConfigProvider } from '../../../provider';
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
const ProFormMoney: React.FC<ProFormMoneyProps> = ({ fieldProps, proFieldProps, locale, min, max, ref, ...rest }) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        money: {
          render: (text, props) => <FieldMoney {...props} placeholder={props.placeholder as string} text={text} />,
          formItemRender: (text, props) => (
            <FieldMoney {...props} placeholder={props.placeholder as string} text={text} />
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
          min,
          max,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        valueType={{
          type: 'money',
          locale,
        }}
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormMoney;
