import type { RangePickerProps } from 'antd/lib/date-picker';
import React, { useContext } from 'react';
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
    return (
      <ProConfigProvider
        valueTypeMap={{
          [valueType]: {
            render: (text, props) => (
              <FieldRangePicker {...props} text={text} />
            ),
            formItemRender: (text, props) => (
              <FieldRangePicker {...props} text={text} />
            ),
          },
        }}
      >
        <ProField
          fieldProps={{
            getPopupContainer: context.getPopupContainer,
            ...fieldProps,
          }}
          valueType={valueType}
          proFieldProps={proFieldProps}
          fieldConfig={{
            valueType,
            customLightMode: true,
            lightFilterLabelFormatter: (value) =>
              dateArrayFormatter(value, fieldProps?.format || 'YYYY-MM'),
          }}
          {...rest}
          ref={ref}
        />
      </ProConfigProvider>
    );
  },
);
