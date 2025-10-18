import type { RangePickerProps } from 'antd/lib/date-picker';
import React, { useContext, useMemo } from 'react';
import { FieldRangePicker } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import { dateArrayFormatter } from '../../../utils';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

export const BaseDateRanger: React.FC<
  ProFormFieldItemProps<RangePickerProps> & {
    ref: any;
    valueType:
      | 'dateQuarterRange'
      | 'dateMonthRange'
      | 'dateYearRange'
      | 'dateRange'
      | 'dateWeekRange'
      | 'dateTimeRange';
  }
> = React.forwardRef(
  ({ fieldProps, proFieldProps, valueType, ...rest }, ref) => {
    const context = useContext(FieldContext);
    const mergedFieldProps = useMemo(() => {
      const nextFieldProps = fieldProps ? { ...fieldProps } : {};

      if (valueType === 'dateTimeRange' && nextFieldProps.showTime === undefined) {
        nextFieldProps.showTime = true;
      }

      return nextFieldProps;
    }, [fieldProps, valueType]);
    const lightFilterFormat =
      mergedFieldProps.format ||
      (valueType === 'dateTimeRange' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM');

    return (
      <ProConfigProvider
        valueTypeMap={{
          [valueType]: {
            render: (text, props) => (
              <FieldRangePicker
                {...props}
                format={
                  valueType === 'dateTimeRange'
                    ? props.format ?? 'YYYY-MM-DD HH:mm:ss'
                    : props.format
                }
                text={text}
              />
            ),
            formItemRender: (text, props) => (
              <FieldRangePicker
                {...props}
                format={
                  valueType === 'dateTimeRange'
                    ? props.format ?? 'YYYY-MM-DD HH:mm:ss'
                    : props.format
                }
                text={text}
              />
            ),
          },
        }}
      >
        <ProField
          fieldProps={{
            getPopupContainer: context.getPopupContainer,
            ...mergedFieldProps,
          }}
          valueType={valueType}
          proFieldProps={proFieldProps}
          fieldConfig={{
            valueType,
            customLightMode: true,
            lightFilterLabelFormatter: (value) =>
              dateArrayFormatter(value, lightFilterFormat),
          }}
          {...rest}
          ref={ref}
        />
      </ProConfigProvider>
    );
  },
);
