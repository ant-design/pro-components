import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form';
import FieldContext from '../FieldContext';
import Submiter, { SubmiterProps } from '../components/Submiter';

export interface CommonFormProps {
  submiterProps?: Omit<SubmiterProps, 'form'>;
}

export interface BaseFormProps extends FormProps, CommonFormProps {
  contentRender?: (
    items: React.ReactNode[],
    submiter: React.ReactNode,
  ) => React.ReactNode;
  fieldStyle?: React.CSSProperties;
  formItemProps?: FormItemProps; // TODO
}

const BaseForm: React.FC<BaseFormProps> = props => {
  const {
    children,
    contentRender,
    submiterProps,
    fieldStyle,
    formItemProps,
    ...rest
  } = props;
  const [form] = Form.useForm();
  const items = React.Children.toArray(children);
  const submiter = <Submiter {...submiterProps} form={form} />;
  const content = contentRender ? contentRender(items, submiter) : items;
  return (
    <FieldContext.Provider
      value={{
        fieldStyle,
        formItemProps,
      }}
    >
      <Form form={form} {...rest}>
        {content}
      </Form>
    </FieldContext.Provider>
  );
};

export default BaseForm;
