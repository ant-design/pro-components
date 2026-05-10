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
          case 'dateTime':
            format = fieldFormat ?? 'YYYY-MM-DD HH:mm:ss';
            break;
          case 'dateWeek':
            picker = 'week';
            format = fieldFormat ?? 'YYYY-wo';
            break;
          case 'dateMonth':
            picker = 'month';
            format = fieldFormat ?? 'YYYY-MM';
            break;
          case 'dateQuarter':
            picker = 'quarter';
            format = fieldFormat ?? 'YYYY-[Q]Q';
            break;
          case 'dateYear':
            picker = 'year';
            format = fieldFormat ?? 'YYYY';
            break;
          case 'date':
          default:
            format = fieldFormat ?? 'YYYY-MM-DD';
            break;
        }

        return (
          <FieldDatePicker
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
