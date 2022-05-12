import React from 'react';
import type { CheckboxProps } from 'antd';
import { Checkbox } from 'antd';
import ProFormField from '../Field';
import { runFunction } from '@ant-design/pro-utils';
import type { CheckboxGroupProps } from 'antd/lib/checkbox';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../interface';
import { createField } from '../../BaseForm/createField';

export type ProFormCheckboxGroupProps = ProFormFieldItemProps<
  CheckboxGroupProps,
  HTMLInputElement
> & {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & ProFormFieldRemoteProps;

const CheckboxGroup: React.FC<ProFormCheckboxGroupProps> = React.forwardRef(
  ({ options, fieldProps, proFieldProps, valueEnum, ...rest }, ref) => (
    <ProFormField
      ref={ref}
      valueType="checkbox"
      mode="edit"
      valueEnum={runFunction<[any]>(valueEnum, undefined)}
      fieldProps={{
        options,
        ...fieldProps,
      }}
      proFieldProps={proFieldProps}
      {...rest}
    />
  ),
);

export type ProFormCheckboxProps = ProFormFieldItemProps<CheckboxProps, HTMLInputElement>;

/**
 * 多选框的
 *
 * @param
 */
const ProFormCheckboxComponents: React.FC<ProFormCheckboxProps> = React.forwardRef<
  any,
  ProFormCheckboxProps
>(({ fieldProps, children }, ref) => {
  return (
    <Checkbox ref={ref} {...fieldProps}>
      {children}
    </Checkbox>
  );
});

const ProFormCheckbox = createField<ProFormCheckboxProps>(ProFormCheckboxComponents, {
  valuePropName: 'checked',
});

const WrappedProFormCheckbox: typeof ProFormCheckboxComponents & {
  Group: typeof CheckboxGroup;
} = ProFormCheckbox as any;

WrappedProFormCheckbox.Group = CheckboxGroup;

export default WrappedProFormCheckbox;
