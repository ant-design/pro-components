import type { RangePickerProps } from 'antd/lib/date-picker';
import React from 'react';
import { dateArrayFormatter } from '../../../utils';
import type { ProFormFieldItemProps } from '../../typing';
import { BaseDateRanger } from './BaseDateRanger';

const valueType = 'dateRange' as const;

/**
 * 日期区间选择组件
 *
 * @param
 */
const ProFormDateRangePicker: React.FC<
  ProFormFieldItemProps<RangePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <BaseDateRanger
      ref={ref}
      fieldProps={{
        ...fieldProps,
      }}
      valueType={valueType}
      proFieldProps={proFieldProps}
      fieldConfig={{
        valueType,
        customLightMode: true,
        lightFilterLabelFormatter: (value) =>
          dateArrayFormatter(value, fieldProps?.format || 'YYYY-MM-DD'),
      }}
      {...rest}
    />
  );
});

export default ProFormDateRangePicker;
