import React from 'react';
import ProField from '../Field';
import type { WeekPickerProps } from 'antd/lib/date-picker';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'dateWeek' as const;
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerWeek: React.FC<ProFormFieldItemProps<WeekPickerProps>> = React.forwardRef(
  ({ proFieldProps, fieldProps, ...rest }, ref: any) => (
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
  ),
);

export default ProFormDatePickerWeek;
