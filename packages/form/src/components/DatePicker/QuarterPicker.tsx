import type { DatePickerProps } from 'antd';
import React, { useContext } from 'react';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const valueType = 'dateQuarter' as const;
/**
 * 周选择组件
 *
 * @param
 */
const ProFormDatePickerQuarter: React.FC<
  ProFormFieldItemProps<DatePickerProps>
> = React.forwardRef(({ fieldProps, ...rest }, ref: any) => {
  const context = useContext(FieldContext);

  return (
    <ProField
      ref={ref}
      valueType={valueType}
      fieldProps={{
        getPopupContainer: context.getPopupContainer,
        ...fieldProps,
      }}
      filedConfig={{
        valueType,
        customLightMode: true,
      }}
      {...rest}
    />
  );
});

export default ProFormDatePickerQuarter;
