import type { DatePickerProps } from 'antd';
import React, { useContext } from 'react';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

const valueType = 'date' as const;
/**
 * 日期选择组件
 *
 * @param
 */
const ProFormDatePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> =
  React.forwardRef(({ proFieldProps, fieldProps, ...rest }, ref) => {
    const context = useContext(FieldContext);

    return (
      <ProFormField
        ref={ref}
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
      />
    );
  });

export default ProFormDatePicker;
