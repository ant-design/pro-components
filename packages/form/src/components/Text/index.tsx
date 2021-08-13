import React from 'react';
import type { InputProps } from 'antd';
import type { PasswordProps } from 'antd/lib/input';
import ProField from '@ant-design/pro-field';
import type { ProFormFieldItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'text';
/**
 * 文本组件
 *
 * @param
 */
const ProFormText = createField<ProFormFieldItemProps<InputProps>>(
  ({ fieldProps, proFieldProps, ...rest }: ProFormFieldItemProps<InputProps>) => {
    return (
      <ProField
        mode="edit"
        valueType={valueType}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            (rest as any)?.onChange?.(...restParams);
          },
        }}
        {...proFieldProps}
      />
    );
  },
  {
    valueType,
  },
);

const Password = createField<ProFormFieldItemProps<PasswordProps>>(
  ({ fieldProps, proFieldProps }: ProFormFieldItemProps<InputProps>) => {
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
