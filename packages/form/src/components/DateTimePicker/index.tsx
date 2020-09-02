import React from 'react';

import ProField from '@ant-design/pro-field';
import { DatePickerProps } from 'antd/lib/date-picker';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

/**
 * 时间日期选择组件
 * @param
 */
const ProFormDateTimePicker: React.FC<ProFormItemProps<DatePickerProps>> = ({
  fieldProps,
  proFieldProps,
}) => {
  return (
    <ProField
      text={fieldProps?.value}
      mode="edit"
      formItemProps={fieldProps}
      valueType="dateTimeRange"
      {...proFieldProps}
    />
  );
};

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDateTimePicker);
