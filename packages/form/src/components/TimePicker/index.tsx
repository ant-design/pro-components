import React from 'react';

import ProField from '@ant-design/pro-field';
import type { DatePickerProps } from 'antd';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'time';
/**
 * 时间选择组件
 *
 * @param
 */
const ProFormTimePicker: React.FC<
  ProFormItemProps<DatePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps }, ref: any) => (
  <ProField
    ref={ref}
    text={fieldProps?.value || ''}
    mode="edit"
    fieldProps={fieldProps}
    valueType={valueType}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<DatePickerProps>>(ProFormTimePicker, {
  customLightMode: true,
  valueType,
});
