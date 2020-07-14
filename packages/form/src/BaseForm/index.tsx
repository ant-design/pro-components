import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';

export interface FormRenderProps extends FormProps {
  contentRender?: (items: React.ReactNode[]) => React.ReactNode;
  itemRender?: (item: React.ReactNode) => React.ReactNode;
}

const FormRender: React.FC<FormRenderProps> = (props) => {
  const { children, contentRender, itemRender, ...rest } = props;
  const items =
    React.Children.map(children, (item) => {
      return itemRender ? itemRender(item) : item;
    }) || [];
  const content = contentRender ? contentRender(items) : items;
  return <Form {...rest}>{content}</Form>;
};

export default FormRender;
