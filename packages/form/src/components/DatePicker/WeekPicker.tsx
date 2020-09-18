import React from 'react';
import ProField from '@ant-design/pro-field';
import { WeekPickerProps } from 'antd/lib/date-picker';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

const valueType = 'dateWeek';
/**
 * 周选择组件
 * @param
 */
const ProFormDatePickerWeek: React.FC<ProFormItemProps<
  WeekPickerProps
>> = React.forwardRef(({ proFieldProps, fieldProps }, ref: any) => (
  <ProField
    ref={ref}
    text={fieldProps?.value}
    mode="edit"
    valueType={valueType}
    fieldProps={fieldProps}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<WeekPickerProps>>(ProFormDatePickerWeek, {
  valueType,
  customLightMode: true,
  ignoreFelidWidth: true,
});
