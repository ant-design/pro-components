import type { RangePickerProps } from 'antd/es/date-picker';
import React from 'react';
import { dateArrayFormatter } from '../../../utils';
import type { ProFormFieldItemProps } from '../../typing';
import { BaseDateRanger } from './BaseDateRanger';

const valueType = 'dateWeekRange' as const;

/**
 * 周区间选择组件
 *
 */
export const ProFormDateWeekRangePicker: React.FC<ProFormFieldItemProps<RangePickerProps>> = ({
  fieldProps,
  proFieldProps,
  ref,
  ...rest
}) => {
  return (
    <BaseDateRanger
      ref={ref}
      fieldConfig={{
        valueType,
        customLightMode: true,
        lightFilterLabelFormatter: (value) => dateArrayFormatter(value, fieldProps?.format || 'YYYY-MM-DD'),
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
