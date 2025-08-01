import type { WeekPickerProps } from 'antd/lib/date-picker';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import { BaseDatePicker } from './BaseDatePicker';

const valueType = 'dateWeek' as const;
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerWeek: React.FC<ProFormFieldItemProps<WeekPickerProps>> =
  React.forwardRef(({ proFieldProps, fieldProps, ...rest }, ref: any) => {
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

export default ProFormDatePickerWeek;
