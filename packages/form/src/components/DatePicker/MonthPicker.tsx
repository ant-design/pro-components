import React, { useContext } from 'react';
import ProField from '../Field';
import type { MonthPickerProps } from 'antd/lib/date-picker';
import type { ProFormFieldItemProps } from '../../interface';
import FieldContext from '../../FieldContext';

const valueType = 'dateMonth' as const;
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerMonth: React.FC<ProFormFieldItemProps<MonthPickerProps>> = React.forwardRef(
  ({ proFieldProps, fieldProps, ...rest }, ref) => {
    const context = useContext(FieldContext);
    return (
      <ProField
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

export default ProFormDatePickerMonth;
