import type { TextAreaProps } from 'antd/es/input';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import React from 'react';
import { FieldTextArea } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

/**
 * 文本选择组件
 *
 * @param
 */
const ProFormTextArea: React.FC<ProFormFieldItemProps<TextAreaProps, TextAreaRef>> = ({
  fieldProps,
  proFieldProps,
  ref,
  ...rest
}) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        textarea: {
          render: (text, props) => <FieldTextArea {...props} text={text} />,
          formItemRender: (text, props) => <FieldTextArea {...props} text={text} />,
        },
      }}
    >
      <ProField ref={ref} fieldProps={fieldProps} proFieldProps={proFieldProps} valueType="textarea" {...rest} />
    </ProConfigProvider>
  );
};

export default ProFormTextArea;
