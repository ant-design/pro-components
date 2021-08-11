import React from 'react';
import type { RangePickerProps } from 'antd/lib/date-picker';
import ProField from '@ant-design/pro-field';
import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'dateRange';

/**
 * 日期区间选择组件
 *
 * @param
 */
const ProFormDateRangePicker: React.FC<
  ProFormItemProps<RangePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps }, ref) => (
  <ProField
    ref={ref}
    text={fieldProps?.value}
    mode="edit"
    fieldProps={fieldProps}
    valueType={valueType}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<RangePickerProps>>(ProFormDateRangePicker, {
  valueType,
  lightFilterLabelFormatter: (value) => dateArrayFormatter(value, 'YYYY-MM-DD'),
});
