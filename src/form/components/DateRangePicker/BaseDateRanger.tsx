import type { RangePickerProps } from 'antd/es/date-picker';
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
> = ({ fieldProps, proFieldProps, valueType, ref, ...rest }) => {
  const context = useContext(FieldContext);
  return (
    <ProConfigProvider
      valueTypeMap={{
        [valueType]: {
          render: (text, props) => <FieldRangePicker {...props} text={text} />,
          formItemRender: (text, props) => <FieldRangePicker {...props} text={text} />,
        },
      }}
    >
      <ProField
        fieldConfig={{
          valueType,
          customLightMode: true,
          lightFilterLabelFormatter: (value) => dateArrayFormatter(value, fieldProps?.format || 'YYYY-MM'),
        }}
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        valueType={valueType}
        {...rest}
        ref={ref}
      />
    </ProConfigProvider>
  );
};
