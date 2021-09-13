import React from 'react';
import ProField from '../Field';
import type { DatePickerProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'dateQuarter' as const;
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerQuarter: React.FC<ProFormFieldItemProps<DatePickerProps>> = React.forwardRef(
  ({ fieldProps, ...rest }, ref: any) => {
    return (
      <ProField
        ref={ref}
        mode="edit"
        valueType={valueType}
        fieldProps={fieldProps}
        filedConfig={{
          valueType,
          customLightMode: true,
        }}
        {...rest}
      />
    );
  },
);

export default ProFormDatePickerQuarter;
