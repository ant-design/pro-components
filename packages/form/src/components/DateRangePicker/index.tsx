import React from 'react';
import ProField from '@ant-design/pro-field';
import { Form } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

/**
 * 日期区间选择组件
 * @param
 */
const ProFormDatePicker: React.FC<ProFormItemProps<DatePickerProps>> = ({
  fieldProps,
  proFieldProps,
  ...restProps
}) => {
  return (
    <Form.Item {...restProps}>
      <ProField
        text={fieldProps?.value}
        mode="edit"
        fieldProps={fieldProps}
        valueType="dateRange"
        {...proFieldProps}
      />
    </Form.Item>
  );
};

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDatePicker);
