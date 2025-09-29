import type { DatePickerProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import { BaseDatePicker } from './BaseDatePicker';

const valueType = 'dateQuarter' as const;

/**
 * 周选择组件
 *
 */
const ProFormDatePickerQuarter: React.FC<ProFormFieldItemProps<DatePickerProps>> = ({
  proFieldProps,
  fieldProps,
  ref,
  ...rest
}) => {
  return (
    <BaseDatePicker
      ref={ref as any}
      fieldConfig={{
        valueType,
        customLightMode: true,
      }}
      fieldProps={{
        ...fieldProps,
      }}
      proFieldProps={proFieldProps}
      valueType={valueType}
      {...rest}
    />
  );
};

export default ProFormDatePickerQuarter;
