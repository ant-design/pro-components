import React, { useCallback, useContext, useMemo } from 'react';
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
    const renderFieldDatePicker = useCallback(
      (text: any, props: any) => {
        const fieldPropsFromContext =
          (props.fieldProps as any) ?? mergedFieldProps;
        const format =
          valueType === 'dateTime'
            ? (fieldPropsFromContext?.format ?? 'YYYY-MM-DD HH:mm:ss')
            : fieldPropsFromContext?.format;

        return <FieldDatePicker {...props} format={format} text={text} />;
      },
      [mergedFieldProps, valueType],
    );

    return (
      <ProConfigProvider
        valueTypeMap={{
          [valueType]: {
            render: renderFieldDatePicker,
            formItemRender: renderFieldDatePicker,
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
