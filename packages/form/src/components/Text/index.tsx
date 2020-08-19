import React from 'react';
import { Form } from 'antd';
import { InputProps } from 'antd/lib/input';
import ProField from '@ant-design/pro-field';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

/**
 * 文本选择组件
 * @param
 */
const ProFormText: React.ForwardRefRenderFunction<any, ProFormItemProps<InputProps>> = (
  { fieldProps, proFieldProps, ...restProps },
  ref,
) => {
  return (
    <Form.Item {...restProps}>
      <ProField
        mode="edit"
        valueType="text"
        formItemProps={fieldProps}
        ref={ref}
        {...proFieldProps}
      />
    </Form.Item>
  );
};

export default createField<ProFormItemProps<InputProps>>(React.forwardRef(ProFormText));
