import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ProField, { ProFieldValueType } from '@ant-design/pro-field';
import { Form } from 'antd';
import { InputProps } from 'antd/lib/input';
import { ProSchema, pickProProps } from '@ant-design/pro-utils';

import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

/**
 * 最普通的 Text 组件
 * @param
 */
const ProFormText = React.forwardRef<
  any,
  ProSchema<string, ProFieldValueType, ProFormItemProps<InputProps>>
>(({ fieldProps, hasFeedback, render, renderFormItem, valueType, ...restProps }, ref) => (
  <Form.Item {...pickProProps(restProps)}>
    <ProField
      text={fieldProps?.value as string}
      ref={ref}
      mode="edit"
      formItemProps={fieldProps}
      valueType={(valueType as 'text') || 'text'}
      {...restProps}
    />
  </Form.Item>
));

// @ts-ignore
ProFormText.type = 'ProField';

export default createField<ProSchema<string, ProFieldValueType, ProFormItemProps<InputProps>>>(
  ProFormText,
);
