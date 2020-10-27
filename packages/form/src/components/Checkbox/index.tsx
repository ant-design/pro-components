import React from 'react';
import { Checkbox } from 'antd';
import ProField from '@ant-design/pro-field';
import { ProSchema } from '@ant-design/pro-utils';
import { CheckboxGroupProps, CheckboxProps } from 'antd/lib/checkbox';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

export type ProFormCheckboxGroupProps = ProFormItemProps<CheckboxGroupProps> & {
  layout?: 'horizontal' | 'vertical';
  options: CheckboxGroupProps['options'];
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
};

const Group: React.FC<ProFormCheckboxGroupProps> = React.forwardRef(
  ({ options, fieldProps, ...rest }, ref) => (
    <ProField
      ref={ref}
      valueType="checkbox"
      mode="edit"
      {...rest}
      fieldProps={{
        options,
        ...fieldProps,
      }}
    />
  ),
);

export type ProFormCheckboxProps = ProFormItemProps<CheckboxProps>;

/**
 * 多选框的
 * @param
 */
const ProFormCheckbox: React.FC<ProFormCheckboxProps> = ({ fieldProps }) => {
  return <Checkbox {...fieldProps} />;
};

const WrappedProFormCheckbox: React.ComponentType<ProFormCheckboxProps> & {
  Group: typeof Group;
} = createField<ProFormCheckboxProps>(ProFormCheckbox, {
  valuePropName: 'checked',
  ignoreFelidWidth: true,
}) as any;

WrappedProFormCheckbox.Group = createField(Group) as typeof Group;

export default WrappedProFormCheckbox;
