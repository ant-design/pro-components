import React from 'react';

import ProField from '@ant-design/pro-field';
import { DatePickerProps } from 'antd/lib/date-picker';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

const valueType = 'dateTime';

/**
 * 时间日期选择组件
 * @param
 */
const ProFormDateTimePicker: React.FC<ProFormItemProps<
  DatePickerProps
>> = React.forwardRef(({ fieldProps, proFieldProps }, ref) => (
  <ProField
    ref={ref}
    text={fieldProps?.value}
    mode="edit"
    fieldProps={fieldProps}
    valueType={valueType}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDateTimePicker, {
  valueType,
  customLightMode: true,
  ignoreFelidWidth: true,
});
