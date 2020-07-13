import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';

export interface FormRenderProps extends FormProps {
  contentRender?: (content: React.ReactNode) => React.ReactNode;
  itemsRender?: (items: React.ReactNode[]) => React.ReactNode;
  formRender?: (form: React.ReactNode) => React.ReactNode;
  itemRender?: (item: React.ReactNode) => React.ReactNode;
}

const FormRender: React.FC<FormRenderProps> = props => {
  const {
    children,
    contentRender,
    formRender,
    itemsRender,
    itemRender,
    ...rest
  } = props;
  const items =
    React.Children.map(children, item => {
      return itemRender ? itemRender(item) : item;
    }) || [];
  const content = itemsRender ? itemsRender(items) : children;
  const form = (
    <Form {...rest}>{contentRender ? contentRender(content) : content}</Form>
  );
  return <>{formRender ? formRender(form) : form}</>;
};

export default FormRender;
