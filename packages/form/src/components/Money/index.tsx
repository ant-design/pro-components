import type { ProFieldMoneyProps } from '@ant-design/pro-field';
import type { InputNumberProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

export type ProFormMoneyProps = ProFormFieldItemProps<
  Omit<ProFieldMoneyProps, 'valueType' | 'text'> & InputNumberProps<number>
> & {
  customSymbol?: string; // 自定义货币符号
  locale?: string; // 单独设置国际化，设置之后优先级高于全局国际化
  min?: InputNumberProps<number>['min'];
  max?: InputNumberProps<number>['min'];
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
  );
};

export default React.forwardRef(ProFormMoney);
