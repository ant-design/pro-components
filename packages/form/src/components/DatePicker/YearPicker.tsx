import type { DatePickerProps } from 'antd';
import React, { useContext } from 'react';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

const valueType = 'dateYear' as const;
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerYear: React.FC<ProFormFieldItemProps<DatePickerProps>> =
  React.forwardRef(({ proFieldProps, fieldProps, ...rest }, ref: any) => {
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

export default ProFormDatePickerYear;
