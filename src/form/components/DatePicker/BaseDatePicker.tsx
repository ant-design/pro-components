import { FieldDatePicker } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import React, { useContext } from 'react';
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

    return (
      <ProConfigProvider
        valueTypeMap={{
          [valueType]: {
            render: (text, props) => <FieldDatePicker {...props} text={text} />,
            formItemRender: (text, props) => (
              <FieldDatePicker {...props} text={text} />
            ),
          },
        }}
      >
        <ProFormField
          valueType={valueType}
          fieldProps={{
            getPopupContainer: context.getPopupContainer,
            ...fieldProps,
          }}
          proFieldProps={proFieldProps}
          filedConfig={{
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
