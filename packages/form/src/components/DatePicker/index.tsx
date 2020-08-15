import React from 'react';
import ProField from '@ant-design/pro-field';
import { Form } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { pickProProps } from '@ant-design/pro-utils';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

/**
 * 日期选择组件
 * @param
 */
const ProFormDatePicker: React.FC<ProFormItemProps<DatePickerProps>> = ({
  fieldProps,
  ...restProps
}) => {
  return (
    <Form.Item {...pickProProps(restProps)}>
      <ProField text={fieldProps?.value} mode="edit" valueType="date" formItemProps={fieldProps} {...restProps} />
    </Form.Item>
  );
};

// @ts-ignore
ProFormDatePicker.type = 'ProField';

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDatePicker);
