import React from 'react';
import type { InputProps } from 'antd';
import type { PasswordProps } from 'antd/lib/input';
import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'text';
/**
 * 文本组件
 *
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
  Password: typeof Password;
} = ProFormText as any;

WrappedProFormText.Password = Password;

export default WrappedProFormText;
