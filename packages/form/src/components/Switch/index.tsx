import React from 'react';
import { Form, Switch } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { SwitchProps } from 'antd/lib/switch';
import { createField } from '../../BaseForm';

export type ProFormSwitchProps = FormItemProps &
  SwitchProps & { value: boolean };

/**
 * 单选 Switch
 * @param
 */
const ProFormSwitch: React.FC<ProFormSwitchProps> = ({
  value,
  ...restProps
}) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <Switch {...restProps} />
    </Form.Item>
  );
};

export default createField<ProFormSwitchProps>(ProFormSwitch);
