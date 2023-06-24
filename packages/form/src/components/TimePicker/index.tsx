import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';
import React, { useContext } from 'react';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const valueType = 'time' as const;

/** 时间区间选择器 */
const TimeRangePicker: React.FC<ProFormFieldItemProps<RangePickerProps>> =
  React.forwardRef(({ fieldProps, proFieldProps, ...rest }, ref: any) => {
    const context = useContext(FieldContext);
    return (
      <ProField
        ref={ref}
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        valueType="timeRange"
        proFieldProps={proFieldProps}
        filedConfig={
          {
            valueType: 'timeRange',
            customLightMode: true,
            lightFilterLabelFormatter: (value) =>
              dateArrayFormatter(value, 'HH:mm:ss'),
          } as const
        }
        {...rest}
      />
    );
  });

/**
 * 时间选择组件
 *
 * @param
 */
const ProFormTimePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}) => {
  const context = useContext(FieldContext);
  return (
    <ProField
      fieldProps={{
        getPopupContainer: context.getPopupContainer,
        ...fieldProps,
      }}
      valueType={valueType}
      proFieldProps={proFieldProps}
      filedConfig={
        {
          customLightMode: true,
          valueType,
        } as const
      }
      {...rest}
    />
  );
};

const WrappedProFormTimePicker: typeof ProFormTimePicker & {
  RangePicker: typeof TimeRangePicker;
} = ProFormTimePicker as any;

WrappedProFormTimePicker.RangePicker = TimeRangePicker;

export default WrappedProFormTimePicker;
