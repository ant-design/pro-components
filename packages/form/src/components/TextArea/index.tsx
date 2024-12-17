import { FieldTextArea } from '@ant-design/pro-field';
import { ProConfigProvider } from '@ant-design/pro-provider';
import type { TextAreaProps } from 'antd/es/input';
import type { TextAreaRef } from 'antd/es/input/TextArea';
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
    <ProConfigProvider
      valueTypeMap={{
        textarea: {
          render: (text, props) => <FieldTextArea {...props} text={text} />,
          formItemRender: (text, props) => (
            <FieldTextArea {...props} text={text} />
          ),
        },
      }}
    >
      <ProField
        ref={ref}
        valueType="textarea"
        fieldProps={fieldProps}
        proFieldProps={proFieldProps}
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default React.forwardRef(ProFormTextArea);
