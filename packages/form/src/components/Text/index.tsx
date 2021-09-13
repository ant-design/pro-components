import React from 'react';
import type { InputProps } from 'antd';
import type { PasswordProps } from 'antd/lib/input';
import ProField from '../Field';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'text' as const;
/**
 * 文本组件
 *
 * @param
 */
const ProFormText: React.FC<ProFormFieldItemProps<InputProps>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormFieldItemProps<InputProps>) => {
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
      filedConfig={
        {
          valueType,
        } as const
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

const Password: React.FC<ProFormFieldItemProps<PasswordProps>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormFieldItemProps<InputProps>) => {
  return (
    <ProField
      mode="edit"
      valueType="password"
      fieldProps={fieldProps}
      proFieldProps={proFieldProps}
      filedConfig={
        {
          valueType,
        } as const
      }
      {...rest}
    />
  );
};

const WrappedProFormText: typeof ProFormText & {
  Password: typeof Password;
} = ProFormText as any;

WrappedProFormText.Password = Password;

export default WrappedProFormText;
