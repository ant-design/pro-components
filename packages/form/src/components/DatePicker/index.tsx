import React from 'react';
import ProField from '@ant-design/pro-field';
import { Form } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

const valueType = 'date';
/**
 * 日期选择组件
 * @param
 */
const ProFormDatePicker: React.FC<ProFormItemProps<DatePickerProps>> = ({
  proFieldProps,
  fieldProps,
  ...restProps
}) => {
  return (
    <Form.Item {...restProps}>
      <ProField
        text={fieldProps?.value}
        mode="edit"
        valueType={valueType}
        fieldProps={fieldProps}
        {...proFieldProps}
      />
    </Form.Item>
  );
};

// @ts-ignore
ProFormDatePicker.type = 'ProField';

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDatePicker, { valueType });
