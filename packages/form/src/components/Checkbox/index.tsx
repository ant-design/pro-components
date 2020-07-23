import React from 'react';
import { Form, Checkbox } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { CheckboxGroupProps, CheckboxProps } from 'antd/lib/checkbox';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { createField } from '../../BaseForm';

export type ProFormCheckboxGroupProps = FormItemProps &
  CheckboxGroupProps & {
    layout: 'horizontal' | 'vertical';
  };

const Group: React.FC<ProFormCheckboxGroupProps> = ({
  value,
  layout,
  options,
  children,
  ...restProps
}) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <CheckboxGroup {...restProps}>
        {options
          ? options.map((option) => {
              if (typeof option === 'string') {
                return <Checkbox value={option}>{option}</Checkbox>;
              }
              return (
                <Checkbox
                  style={
                    layout === 'vertical'
                      ? {
                          display: 'block',
                          marginLeft: 0,
                        }
                      : undefined
                  }
                  value={option?.value}
                >
                  {option?.label}
                </Checkbox>
              );
            })
          : children}
      </CheckboxGroup>
    </Form.Item>
  );
};

/**
 * 多选框的
 * @param
 */
const ProFormCheckbox: React.FC<FormItemProps & CheckboxProps> = ({
  value,
  ...restProps
}) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <Checkbox {...restProps} />
    </Form.Item>
  );
};

// @ts-expect-error
const WrappedProFormCheckbox: React.ComponentType<
  FormItemProps & CheckboxProps
> & {
  Group: React.ComponentType<ProFormCheckboxGroupProps>;
} = createField<FormItemProps & CheckboxProps>(ProFormCheckbox);

WrappedProFormCheckbox.Group = createField(Group);

export default WrappedProFormCheckbox;
