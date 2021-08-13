import React from 'react';
import ProField from '@ant-design/pro-field';
import type { DatePickerProps } from 'antd';
import createField from '../../BaseForm/createField';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'dateYear';
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerYear: React.FC<ProFormFieldItemProps<DatePickerProps>> = React.forwardRef(
  ({ proFieldProps, fieldProps }, ref: any) => {
    return (
      <ProField
        ref={ref}
        text={fieldProps?.value}
        mode="edit"
        valueType={valueType}
        fieldProps={fieldProps}
        {...proFieldProps}
      />
    );
  },
);

export default createField<ProFormFieldItemProps<DatePickerProps>>(ProFormDatePickerYear, {
  valueType,
  customLightMode: true,
});
