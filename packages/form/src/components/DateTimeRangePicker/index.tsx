import React from 'react';

import ProField from '@ant-design/pro-field';
import { DatePickerProps } from 'antd/lib/date-picker';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

const valueType = 'dateTimeRange';

/**
 * 日期时间区间选择组件
 * @param
 */
const ProFormDateTimeRangePicker: React.FC<ProFormItemProps<DatePickerProps>> = ({
  fieldProps,
  proFieldProps,
}) => (
  <ProField
    {...proFieldProps}
    text={fieldProps?.value}
    mode="edit"
    fieldProps={fieldProps}
    valueType={valueType}
  />
);

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDateTimeRangePicker, {
  valueType,
  customLightMode: true,
});
