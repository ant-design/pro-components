import React from 'react';
import ProField from '@ant-design/pro-field';
import { MonthPickerProps } from 'antd/lib/date-picker';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

const valueType = 'dateMonth';
/**
 * 周选择组件
 * @param
 */
const ProFormDatePickerMonth: React.FC<ProFormItemProps<MonthPickerProps>> = ({
  proFieldProps,
  fieldProps,
}) => {
  return (
    <ProField
      text={fieldProps?.value}
      mode="edit"
      valueType={valueType}
      fieldProps={fieldProps}
      {...proFieldProps}
    />
  );
};

export default createField<ProFormItemProps<MonthPickerProps>>(ProFormDatePickerMonth, {
  valueType,
  customLightMode: true,
});
