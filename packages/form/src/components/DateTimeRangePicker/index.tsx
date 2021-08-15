import React from 'react';
import ProField from '@ant-design/pro-field';
import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import type { Moment } from 'moment';

import type { ProFormFieldItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'dateTimeRange';

/**
 * 日期时间区间选择组件
 *
 * @param
 */
const ProFormDateTimeRangePicker: React.FC<ProFormFieldItemProps<RangePickerProps<Moment>>> =
  React.forwardRef(({ fieldProps, proFieldProps }, ref) => (
    <ProField
      ref={ref}
      text={fieldProps?.value}
      mode="edit"
      fieldProps={fieldProps}
      valueType={valueType}
      {...proFieldProps}
    />
  ));

export default createField<ProFormFieldItemProps<RangePickerProps<Moment>>>(
  ProFormDateTimeRangePicker,
  {
    valueType,
    lightFilterLabelFormatter: (value) => dateArrayFormatter(value, 'YYYY-MM-DD HH:mm:ss'),
  },
);
