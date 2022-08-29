import type { TextAreaProps } from 'antd/es/input';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import React from 'react';
import type { ProFormFieldItemProps } from '../../interface';
import ProField from '../Field';

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
      valueType="textarea"
      fieldProps={fieldProps}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export default React.forwardRef(ProFormTextArea);
