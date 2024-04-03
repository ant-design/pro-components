import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { RangePickerProps } from 'antd/lib/date-picker';
import React, { useContext } from 'react';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const valueType = 'dateRange' as const;

/**
 * 日期区间选择组件
 *
 * @param
 */
const ProFormDateRangePicker: React.FC<
  ProFormFieldItemProps<RangePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps, ...rest }, ref) => {
  const context = useContext(FieldContext);
  return (
    <ProField
      ref={ref}
      fieldProps={{
        getPopupContainer: context.getPopupContainer,
        ...fieldProps,
      }}
      valueType={valueType}
      proFieldProps={proFieldProps}
      filedConfig={{
        valueType,
        customLightMode: true,
        lightFilterLabelFormatter: (value) =>
          dateArrayFormatter(value, fieldProps?.format || 'YYYY-MM-DD'),
      }}
      {...rest}
    />
  );
});

export default ProFormDateRangePicker;
