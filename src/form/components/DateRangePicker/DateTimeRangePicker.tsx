import type { RangePickerProps } from 'antd/lib/date-picker';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import { BaseDateRanger } from './BaseDateRanger';

const valueType = 'dateTimeRange' as const;

/**
 * 日期时间区间选择组件
 *
 * @param
 */
export const ProFormDateTimeRangePicker: React.FC<
  ProFormFieldItemProps<RangePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <BaseDateRanger
      ref={ref}
      fieldProps={fieldProps}
      valueType={valueType}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
});
