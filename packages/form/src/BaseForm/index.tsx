import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import Submiter, { SubmiterProps } from '../components/Submiter';

export interface CommonFormProps {
  submiterProps?: Omit<SubmiterProps, 'form'>;
}

export interface BaseFormProps extends FormProps, CommonFormProps {
  contentRender?: (
    items: React.ReactNode[],
    submiter: React.ReactNode,
  ) => React.ReactNode;
  fieldRender?: (item: React.ReactNode) => React.ReactNode;
}

const BaseForm: React.FC<BaseFormProps> = (props) => {
  const {
    children,
    contentRender,
    submiterProps,
    fieldRender,
    ...rest
  } = props;
  const [form] = Form.useForm();
  const items =
    React.Children.map(children, (item) => {
      return fieldRender ? fieldRender(item) : item;
    }) || [];
  const submiter = <Submiter {...submiterProps} form={form} />;
  const content = contentRender ? contentRender(items, submiter) : items;
  return (
    <Form form={form} {...rest}>
      {content}
    </Form>
  );
};

export default BaseForm;
