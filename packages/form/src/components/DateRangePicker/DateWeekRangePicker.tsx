import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { RangePickerProps } from 'antd/es/date-picker';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import { BaseDateRanger } from './BaseDateRanger';

const valueType = 'dateWeekRange' as const;

/**
 * 周区间选择组件
 *
 * @param
 */
export const ProFormDateWeekRangePicker: React.FC<
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
      filedConfig={{
        valueType,
        customLightMode: true,
        lightFilterLabelFormatter: (value) =>
          dateArrayFormatter(value, fieldProps?.format || 'YYYY-MM-DD'),
      }}
      {...rest}
    />
  );
});
