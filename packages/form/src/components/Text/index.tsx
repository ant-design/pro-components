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
  ({ fieldProps, proFieldProps }: ProFormItemProps<InputProps>) => (
    <ProField mode="edit" valueType={valueType} fieldProps={fieldProps} {...proFieldProps} />
  ),
  {
    valueType,
  },
);

const Password = createField<ProFormItemProps<PasswordProps>>(
  ({ fieldProps, proFieldProps }: ProFormItemProps<InputProps>) => {
    return <ProField mode="edit" valueType="password" fieldProps={fieldProps} {...proFieldProps} />;
  },
  {
    valueType,
  },
);

const WrappedProFormText: typeof ProFormText & {
  Password: typeof Password;
} = ProFormText as any;

WrappedProFormText.Password = Password;

export default WrappedProFormText;
