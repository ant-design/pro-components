import React from 'react';
import ProFormField from '../Field';
import type { DatePickerProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'dateYear';
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerYear: React.FC<ProFormFieldItemProps<DatePickerProps>> = React.forwardRef(
  ({ proFieldProps, fieldProps, ...rest }, ref: any) => {
    return (
      <ProFormField
        ref={ref}
        mode="edit"
        valueType={valueType}
        fieldProps={fieldProps}
        proFieldProps={proFieldProps}
        filedConfig={{
          valueType,
          customLightMode: true,
        }}
        {...rest}
      />
    );
  },
);

export default ProFormDatePickerYear;
