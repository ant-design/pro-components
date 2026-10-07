import React from 'react';
import FieldTextArea from '../../../field/components/TextArea';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
import type { TextAreaProps, TextAreaRef } from '../../../utils/antdTypes';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';
/**
 * 文本选择组件
 *
 * @param
 */

const FORM_VALUE_TYPE_MAP: Record<string, ProRenderFieldPropsType> = {
  textarea: {
    render: (text, props) => <FieldTextArea {...props} text={text} />,
    formItemRender: (text, props) => <FieldTextArea {...props} text={text} />,
  },
};

const ProFormTextArea: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<TextAreaProps, TextAreaRef>
> = ({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <ProConfigProvider valueTypeMap={FORM_VALUE_TYPE_MAP}>
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
