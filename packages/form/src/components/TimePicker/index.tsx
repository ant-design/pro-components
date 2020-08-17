import React from 'react';

import ProField from '@ant-design/pro-field';
import { Form } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

/**
 * 时间选择组件
 * @param
 */
const ProFormTimePicker: React.FC<ProFormItemProps<DatePickerProps>> = ({
  fieldProps,
  ...restProps
}) => {
  return (
    <Form.Item {...restProps}>
      <ProField
        text={fieldProps?.value || ''}
        mode="edit"
        formItemProps={fieldProps}
        valueType="time"
      />
    </Form.Item>
  );
};

export default createField<ProFormItemProps<DatePickerProps>>(ProFormTimePicker);
