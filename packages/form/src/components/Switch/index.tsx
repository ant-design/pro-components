import React from 'react';
import { Form, Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

export type ProFormSwitchProps = ProFormItemProps<SwitchProps>;

/**
 * 单选 Switch
 * @param
 */
const ProFormSwitch: React.FC<ProFormSwitchProps> = ({
  fieldProps,
  proFieldProps,
  ...restProps
}) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <Switch {...fieldProps} />
    </Form.Item>
  );
};

export default createField<ProFormSwitchProps>(ProFormSwitch);
