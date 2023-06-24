import type { TextAreaProps } from 'antd/lib/input';
import type { TextAreaRef } from 'antd/lib/input/TextArea';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
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
