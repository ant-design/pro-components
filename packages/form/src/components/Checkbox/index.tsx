import React from 'react';
import type { CheckboxProps } from 'antd';
import { Checkbox } from 'antd';
import ProField from '@ant-design/pro-field';
import type { ProSchema } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import type { CheckboxGroupProps } from 'antd/lib/checkbox';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

export type ProFormCheckboxGroupProps = ProFormItemProps<CheckboxGroupProps> & {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
};

const CheckboxGroup: React.FC<ProFormCheckboxGroupProps> = React.forwardRef(
  ({ options, fieldProps, proFieldProps, valueEnum, ...rest }, ref) => (
    <ProField
      ref={ref}
      valueType="checkbox"
      mode="edit"
      valueEnum={runFunction<[any]>(valueEnum, undefined)}
      {...rest}
      fieldProps={{
        options,
        ...fieldProps,
      }}
      {...proFieldProps}
    />
  ),
);

export type ProFormCheckboxProps = ProFormItemProps<CheckboxProps>;

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

const Group = createField(CheckboxGroup);

const WrappedProFormCheckbox: typeof ProFormCheckbox & {
  Group: typeof Group;
} = ProFormCheckbox as any;

WrappedProFormCheckbox.Group = Group;

export default WrappedProFormCheckbox;
