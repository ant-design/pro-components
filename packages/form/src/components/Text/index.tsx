import React from 'react';
import { Form } from 'antd';
import { InputProps } from 'antd/lib/input';
import ProField from '@ant-design/pro-field';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

const valueType = 'text';
/**
 * 文本选择组件
 * @param
 */
const ProFormText: React.ForwardRefRenderFunction<any, ProFormItemProps<InputProps>> = (
  { fieldProps, proFieldProps },
  ref,
) => {
  return (
    <ProField
      mode="edit"
      valueType={valueType}
      fieldProps={fieldProps}
      ref={ref}
      {...proFieldProps}
    />
  );
};

export default createField<ProFormItemProps<InputProps>>(React.forwardRef(ProFormText), {
  valueType,
});
