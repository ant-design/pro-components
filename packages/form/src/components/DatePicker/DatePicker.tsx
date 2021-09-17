import React, { useContext } from 'react';
import ProFormField from '../Field';
import type { DatePickerProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
import FieldContext from '../../FieldContext';

const valueType = 'date' as const;
/**
 * 日期选择组件
 *
 * @param
 */
const ProFormDatePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = React.forwardRef(
  ({ proFieldProps, fieldProps, ...rest }, ref) => {
    const context = useContext(FieldContext);
    return (
      <ProFormField
        ref={ref}
        mode="edit"
        valueType={valueType}
        fieldProps={{ getPopupContainer: context.getPopupContainer, ...fieldProps }}
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

export default ProFormDatePicker;
