import React from 'react';

import ProField from '../Field';
import type { ProFormFieldItemProps } from '../../interface';
import type { TextAreaProps } from 'antd/lib/input';
import type { TextAreaRef } from 'antd/lib/input/TextArea';
/**
 * 文本选择组件
 *
 * @param
 */
const ProFormTextArea: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<TextAreaProps, TextAreaRef>
> = ({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <ProField
      ref={ref}
      mode="edit"
      valueType="textarea"
      fieldProps={fieldProps}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export default React.forwardRef(ProFormTextArea);
