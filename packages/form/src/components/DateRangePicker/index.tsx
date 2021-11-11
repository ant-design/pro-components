import React, { useContext } from 'react';
import type { RangePickerProps } from 'antd/lib/date-picker';
import ProField from '../Field';
import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { ProFormFieldItemProps } from '../../interface';
import FieldContext from '../../FieldContext';

const valueType = 'dateRange' as const;

/**
 * 日期区间选择组件
 *
 * @param
 */
const ProFormDateRangePicker: React.FC<ProFormFieldItemProps<RangePickerProps>> = React.forwardRef(
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
          lightFilterLabelFormatter: (value) => dateArrayFormatter(value, 'YYYY-MM-DD'),
        }}
        {...rest}
      />
    );
  },
);

export default ProFormDateRangePicker;
