import type { RangePickerProps } from 'antd/lib/date-picker';
import React, { useCallback, useContext, useMemo } from 'react';
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

      if (
        valueType === 'dateTimeRange' &&
        nextFieldProps.showTime === undefined
      ) {
        nextFieldProps.showTime = true;
      }

      return nextFieldProps;
    }, [fieldProps, valueType]);
    const lightFilterFormat = useMemo(() => {
      if (mergedFieldProps.format) return mergedFieldProps.format;
      switch (valueType) {
        case 'dateTimeRange':
          return 'YYYY-MM-DD HH:mm:ss';
        case 'dateWeekRange':
          return 'gggg-wo';
        case 'dateMonthRange':
          return 'YYYY-MM';
        case 'dateQuarterRange':
          return 'YYYY-[Q]Q';
        case 'dateYearRange':
          return 'YYYY';
        default:
          return 'YYYY-MM-DD';
      }
    }, [mergedFieldProps.format, valueType]);
    const renderFieldRangePicker = useCallback(
      (text: any, props: any) => {
        const fieldPropsFromContext =
          (props.fieldProps as any) ?? mergedFieldProps;
        const fieldFormat = fieldPropsFromContext?.format;

        let format: string;
        let picker:
          | 'time'
          | 'date'
          | 'week'
          | 'month'
          | 'quarter'
          | 'year'
          | undefined;

        switch (valueType) {
          case 'dateTimeRange':
            format = fieldFormat ?? 'YYYY-MM-DD HH:mm:ss';
            break;
          case 'dateWeekRange':
            picker = 'week';
            format = fieldFormat ?? 'gggg-wo';
            break;
          case 'dateMonthRange':
            picker = 'month';
            format = fieldFormat ?? 'YYYY-MM';
            break;
          case 'dateQuarterRange':
            picker = 'quarter';
            format = fieldFormat ?? 'YYYY-[Q]Q';
            break;
          case 'dateYearRange':
            picker = 'year';
            format = fieldFormat ?? 'YYYY';
            break;
          case 'dateRange':
          default:
            format = fieldFormat ?? 'YYYY-MM-DD';
            break;
        }

        return (
          <FieldRangePicker
            {...props}
            format={format}
            picker={picker}
            text={text}
          />
        );
      },
      [mergedFieldProps, valueType],
    );

    return (
      <ProConfigProvider
        valueTypeMap={{
          [valueType]: {
            render: renderFieldRangePicker,
            formItemRender: renderFieldRangePicker,
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
