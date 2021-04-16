import React from 'react';

import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';
import type { TextAreaProps } from 'antd/lib/input';
/**
 * 文本选择组件
 *
 * @param
 */
const ProFormTextArea: React.ForwardRefRenderFunction<any, ProFormItemProps<TextAreaProps>> = (
  { fieldProps, proFieldProps },
  ref,
) => {
  return (
    <ProField
      text={fieldProps?.value as string}
      ref={ref}
      mode="edit"
      valueType="textarea"
      fieldProps={fieldProps}
      {...proFieldProps}
    />
  );
};

export default createField<ProFormItemProps<TextAreaProps>>(React.forwardRef(ProFormTextArea));
