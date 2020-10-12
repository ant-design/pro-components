import React from 'react';
import { InputProps, PasswordProps } from 'antd/lib/input';
import ProField from '@ant-design/pro-field';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

const valueType = 'text';
/**
 * 文本组件
 * @param
 */
const ProFormText = createField<ProFormItemProps<InputProps>>(
  React.forwardRef(({ fieldProps, proFieldProps }, ref) => {
    return (
      <ProField
        mode="edit"
        valueType={valueType}
        fieldProps={fieldProps}
        ref={ref}
        {...proFieldProps}
      />
    );
  }),
  {
    valueType,
  },
);

const Password = createField<ProFormItemProps<PasswordProps>>(
  React.forwardRef(({ fieldProps, proFieldProps }, ref) => {
    return (
      <ProField
        mode="edit"
        valueType="password"
        fieldProps={fieldProps}
        ref={ref}
        {...proFieldProps}
      />
    );
  }),
  {
    valueType,
  },
);

const WrappedProFormText: typeof ProFormText & {
  PassWord: typeof PassWord;
} = ProFormText as any;

WrappedProFormText.Password = Password;

export default WrappedProFormText;
