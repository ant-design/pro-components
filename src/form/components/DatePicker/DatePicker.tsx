import type { DatePickerProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import { BaseDatePicker } from './BaseDatePicker';

const valueType = 'date' as const;
/**
 * 日期选择组件
 *
 * @param
 */
const ProFormDatePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> =
  React.forwardRef(({ proFieldProps, fieldProps, ...rest }, ref) => {
    return (
      <BaseDatePicker
        valueType={valueType}
        ref={ref as any}
        fieldProps={{
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        fieldConfig={{
          valueType,
          customLightMode: true,
        }}
        {...rest}
      />
    );
  });

export default ProFormDatePicker;
