import React, { useContext } from 'react';
import ProField from '../Field';
import type { DatePickerProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
import FieldContext from '../../FieldContext';

const valueType = 'dateTime' as const;

/**
 * 时间日期选择组件
 *
 * @param
 */
const ProFormDateTimePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = React.forwardRef(
  ({ fieldProps, proFieldProps, ...rest }, ref) => {
    const context = useContext(FieldContext);

    return (
      <ProField
        ref={ref}
        mode="edit"
        fieldProps={{ getPopupContainer: context.getPopupContainer, ...fieldProps }}
        valueType={valueType}
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

export default ProFormDateTimePicker;
