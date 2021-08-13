import React from 'react';

import ProField from '@ant-design/pro-field';
import type { DatePickerProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'dateTime';

/**
 * 时间日期选择组件
 *
 * @param
 */
const ProFormDateTimePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = React.forwardRef(
  ({ fieldProps, proFieldProps }, ref) => (
    <ProField
      ref={ref}
      text={fieldProps?.value}
      mode="edit"
      fieldProps={fieldProps}
      valueType={valueType}
      {...proFieldProps}
    />
  ),
);

export default createField<ProFormFieldItemProps<DatePickerProps>>(ProFormDateTimePicker, {
  valueType,
  customLightMode: true,
});
