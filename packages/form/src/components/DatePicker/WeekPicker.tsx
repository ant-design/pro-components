import React from 'react';
import ProField from '@ant-design/pro-field';
import type { WeekPickerProps } from 'antd/lib/date-picker';
import createField from '../../BaseForm/createField';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'dateWeek';
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerWeek: React.FC<ProFormFieldItemProps<WeekPickerProps>> = React.forwardRef(
  ({ proFieldProps, fieldProps }, ref: any) => (
    <ProField
      ref={ref}
      text={fieldProps?.value}
      mode="edit"
      valueType={valueType}
      fieldProps={fieldProps}
      {...proFieldProps}
    />
  ),
);

export default createField<ProFormFieldItemProps<WeekPickerProps>>(ProFormDatePickerWeek, {
  valueType,
  customLightMode: true,
});
