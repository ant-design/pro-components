import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type { Moment } from 'moment';
import React, { useContext } from 'react';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../interface';
import ProField from '../Field';

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
