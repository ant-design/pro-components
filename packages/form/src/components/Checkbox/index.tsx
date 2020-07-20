import React from 'react';
import { Form, Checkbox } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { CheckboxGroupProps, CheckboxProps } from 'antd/lib/checkbox';
import CheckboxGroup from 'antd/lib/checkbox/Group';

const Group: React.FC<FormItemProps &
  CheckboxGroupProps & {
    layout: 'horizontal' | 'vertical';
  }> = ({ value, layout, options, children, ...restProps }) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <CheckboxGroup {...restProps}>
        {options
          ? options.map(option => {
              if (typeof option === 'string') {
                return <Checkbox value={value}>{value}</Checkbox>;
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
                  value={value}
                >
                  {value}
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
const ProFormCheckbox: React.FC<FormItemProps & CheckboxProps> & {
  Group: typeof Group;
} = ({ value, ...restProps }) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <Checkbox {...restProps} />
    </Form.Item>
  );
};

ProFormCheckbox.Group = Group;

export default ProFormCheckbox;
