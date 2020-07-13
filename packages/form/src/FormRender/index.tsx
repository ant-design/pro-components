import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';

export interface FormRenderProps extends FormProps {
  formContentRender: (content: React.ReactNode) => React.ReactNode;
}

const FormRender: React.FC<FormRenderProps> = props => {
  const { children, formContentRender, ...rest } = props;
  return <Form {...rest}>{formContentRender(children)}</Form>;
};

export default FormRender;
