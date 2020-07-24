import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ProField from '@ant-design/pro-field';
import { Form } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

/**
 * 文本选择组件
 * @param
 */
const ProFormTextArea: React.ForwardRefRenderFunction<
  any,
  ProFormItemProps & DatePickerProps
> = ({ value, fieldProps, ...restProps }, ref) => {
  return (
    <Form.Item {...restProps}>
      <ProField
        text={value}
        ref={ref}
        mode="edit"
        valueType="textarea"
        formItemProps={fieldProps}
      />
    </Form.Item>
  );
};

export default createField<ProFormItemProps & DatePickerProps>(
  React.forwardRef(ProFormTextArea),
);
