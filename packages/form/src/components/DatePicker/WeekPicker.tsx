import React, { useContext } from 'react';
import ProField from '../Field';
import type { WeekPickerProps } from 'antd/lib/date-picker';
import type { ProFormFieldItemProps } from '../../interface';
import FieldContext from '../../FieldContext';

const valueType = 'dateWeek' as const;
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerWeek: React.FC<ProFormFieldItemProps<WeekPickerProps>> = React.forwardRef(
  ({ proFieldProps, fieldProps, ...rest }, ref: any) => {
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

export default ProFormDatePickerWeek;
