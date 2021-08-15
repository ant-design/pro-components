import React from 'react';
import ProField from '@ant-design/pro-field';
import type { MonthPickerProps } from 'antd/lib/date-picker';
import createField from '../../BaseForm/createField';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'dateMonth';
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerMonth: React.FC<ProFormFieldItemProps<MonthPickerProps>> = React.forwardRef(
  ({ proFieldProps, fieldProps }, ref) => {
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

export default createField<ProFormFieldItemProps<MonthPickerProps>>(ProFormDatePickerMonth, {
  valueType,
  customLightMode: true,
});
