import React from 'react';
import ProField from '../Field';
import type { DatePickerProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'dateTime' as const;

/**
 * 时间日期选择组件
 *
 * @param
 */
const ProFormDateTimePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = React.forwardRef(
  ({ fieldProps, proFieldProps, ...rest }, ref) => (
    <ProField
      ref={ref}
      mode="edit"
      fieldProps={fieldProps}
      valueType={valueType}
      proFieldProps={proFieldProps}
      filedConfig={{
        valueType,
        customLightMode: true,
      }}
      {...rest}
    />
  ),
);

export default ProFormDateTimePicker;
