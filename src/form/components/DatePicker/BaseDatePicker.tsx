import React, { useContext, useMemo } from 'react';
import { FieldDatePicker } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

/**
 * 日期选择组件
 *
 * @param
 */
export const BaseDatePicker: React.FC<
  ProFormFieldItemProps<any> & {
    ref: any;
    valueType:
      | 'date'
      | 'dateTime'
      | 'dateRange'
      | 'dateTimeRange'
      | 'dateWeek'
      | 'dateMonth'
      | 'dateQuarter'
      | 'dateYear';
  }
> = React.forwardRef(
  ({ proFieldProps, fieldProps, valueType, ...rest }, ref) => {
    const context = useContext(FieldContext);
    const mergedFieldProps = useMemo(() => {
      const nextFieldProps = fieldProps ? { ...fieldProps } : {};

      if (valueType === 'dateTime' && nextFieldProps.showTime === undefined) {
        nextFieldProps.showTime = true;
      }

      return nextFieldProps;
    }, [fieldProps, valueType]);

    return (
      <ProConfigProvider
        valueTypeMap={{
          [valueType]: {
            render: (text, props) => (
              <FieldDatePicker
                {...props}
                format={
                  valueType === 'dateTime'
                    ? props.format ?? 'YYYY-MM-DD HH:mm:ss'
                    : props.format
                }
                text={text}
              />
            ),
            formItemRender: (text, props) => (
              <FieldDatePicker
                {...props}
                format={
                  valueType === 'dateTime'
                    ? props.format ?? 'YYYY-MM-DD HH:mm:ss'
                    : props.format
                }
                text={text}
              />
            ),
          },
        }}
      >
        <ProFormField
          valueType={valueType}
          fieldProps={{
            getPopupContainer: context.getPopupContainer,
            ...mergedFieldProps,
          }}
          proFieldProps={proFieldProps}
          fieldConfig={{
            valueType,
            customLightMode: true,
          }}
          {...rest}
          ref={ref}
        />
      </ProConfigProvider>
    );
  },
);
