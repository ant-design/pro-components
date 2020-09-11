import React from 'react';
import ProField from '@ant-design/pro-field';
import { DatePickerProps } from 'antd/lib/date-picker';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

const valueType = 'dateQuarter';
/**
 * 周选择组件
 * @param
 */
const ProFormDatePickerQuarter: React.FC<ProFormItemProps<DatePickerProps>> = ({
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

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDatePickerQuarter, {
  valueType,
  customLightMode: true,
});
