import React from 'react';
import ProField from '../Field';
import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import type { Moment } from 'moment';
import type { ProFormFieldItemProps } from '../../interface';

const valueType = 'dateTimeRange' as const;

/**
 * 日期时间区间选择组件
 *
 * @param
 */
const ProFormDateTimeRangePicker: React.FC<ProFormFieldItemProps<RangePickerProps<Moment>>> =
  React.forwardRef(({ fieldProps, proFieldProps, ...rest }, ref) => (
    <ProField
      ref={ref}
      mode="edit"
      fieldProps={fieldProps}
      valueType={valueType}
      proFieldProps={proFieldProps}
      filedConfig={{
        valueType,
        lightFilterLabelFormatter: (value) => dateArrayFormatter(value, 'YYYY-MM-DD HH:mm:ss'),
      }}
      {...rest}
    />
  ));

export default ProFormDateTimeRangePicker;
