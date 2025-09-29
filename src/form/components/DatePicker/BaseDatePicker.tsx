import React, { useContext } from 'react';
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
> = ({ proFieldProps, fieldProps, valueType, ref, ...rest }) => {
  const context = useContext(FieldContext);

  return (
    <ProConfigProvider
      valueTypeMap={{
        [valueType]: {
          render: (text, props) => <FieldDatePicker {...props} text={text} />,
          formItemRender: (text, props) => <FieldDatePicker {...props} text={text} />,
        },
      }}
    >
      <ProFormField
        fieldConfig={{
          valueType,
          customLightMode: true,
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
