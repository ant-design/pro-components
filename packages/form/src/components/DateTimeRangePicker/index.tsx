import React, { useContext } from 'react';
import ProField from '../Field';
import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import type { Moment } from 'moment';
import type { ProFormFieldItemProps } from '../../interface';
import FieldContext from '../../FieldContext';

const valueType = 'dateTimeRange' as const;

/**
 * 日期时间区间选择组件
 *
 * @param
 */
const ProFormDateTimeRangePicker: React.FC<ProFormFieldItemProps<RangePickerProps<Moment>>> =
  React.forwardRef(({ fieldProps, proFieldProps, ...rest }, ref) => {
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
          lightFilterLabelFormatter: (value) => dateArrayFormatter(value, 'YYYY-MM-DD HH:mm:ss'),
        }}
        {...rest}
      />
    );
  });

export default ProFormDateTimeRangePicker;
