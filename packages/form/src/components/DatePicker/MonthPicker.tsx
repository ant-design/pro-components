import React from 'react';
import ProField from '../Field';
import type { MonthPickerProps } from 'antd/lib/date-picker';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'dateMonth';
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerMonth: React.FC<ProFormFieldItemProps<MonthPickerProps>> = React.forwardRef(
  ({ proFieldProps, fieldProps, ...rest }, ref) => {
    return (
      <ProField
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

export default ProFormDatePickerMonth;
