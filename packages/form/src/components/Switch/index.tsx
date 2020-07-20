import React from 'react';
import { Form, Switch } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { SwitchProps } from 'antd/lib/switch';

/**
 * 单选 Switch
 * @param
 */
const ProFormSwitch: React.FC<FormItemProps &
  SwitchProps & { value: boolean }> = ({ value, ...restProps }) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <Switch {...restProps} />
    </Form.Item>
  );
};

export default ProFormSwitch;
