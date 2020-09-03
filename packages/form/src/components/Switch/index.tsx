import React from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

export type ProFormSwitchProps = ProFormItemProps<SwitchProps>;

/**
 * 单选 Switch
 * @param
 */
const ProFormSwitch: React.FC<ProFormSwitchProps> = ({ fieldProps }) => {
  return <Switch {...fieldProps} />;
};

export default createField<ProFormSwitchProps>(ProFormSwitch, {
  valuePropName: 'checked',
});
