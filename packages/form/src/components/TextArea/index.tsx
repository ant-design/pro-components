import React from 'react';

import ProField from '@ant-design/pro-field';
import { Form } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

/**
 * 文本选择组件
 * @param
 */
const ProFormTextArea: React.ForwardRefRenderFunction<any, ProFormItemProps<TextAreaProps>> = (
  { fieldProps, proFieldProps, ...restProps },
  ref,
) => {
  return (
    <Form.Item {...restProps}>
      <ProField
        text={fieldProps?.value as string}
        ref={ref}
        mode="edit"
        valueType="textarea"
        fieldProps={fieldProps}
        {...proFieldProps}
      />
    </Form.Item>
  );
};

export default createField<ProFormItemProps<TextAreaProps>>(React.forwardRef(ProFormTextArea));
