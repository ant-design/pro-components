import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ProField from '@ant-design/pro-field';
import { Form } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

/**
 * 日期选择组件
 * @param
 */
const ProFormDatePicker: React.ForwardRefRenderFunction<any, ProFormItemProps & DatePickerProps> = (
  { value, fieldProps, ...restProps },
  ref,
) => {
  return (
    <Form.Item {...restProps}>
      <ProField text={value} ref={ref} mode="edit" valueType="text" formItemProps={fieldProps} />
    </Form.Item>
  );
};

export default createField<ProFormItemProps & DatePickerProps>(React.forwardRef(ProFormDatePicker));
