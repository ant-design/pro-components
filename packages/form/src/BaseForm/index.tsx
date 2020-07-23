import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form';
import FieldContext from '../FieldContext';
import Submiter, { SubmiterProps } from '../components/Submiter';
import { GroupProps } from '../interface';

export interface CommonFormProps {
  submiterProps?: Omit<SubmiterProps, 'form'>;
}

export interface BaseFormProps extends FormProps, CommonFormProps {
  contentRender?: (
    items: React.ReactNode[],
    submiter: React.ReactNode,
  ) => React.ReactNode;
  fieldStyle?: React.CSSProperties;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
}

// TODO fix typescript
export function createField<P = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
): React.ComponentType<P> {
  const FieldWithContext: React.FC<P> = (props: P) => {
    const { fieldStyle, formItemProps } = React.useContext(FieldContext);
    return (
      <Field style={fieldStyle} formItemProps={formItemProps} {...props} />
    );
  };
  return FieldWithContext;
}

const BaseForm: React.FC<BaseFormProps> = props => {
  const {
    children,
    contentRender,
    submiterProps,
    fieldStyle,
    formItemProps,
    groupProps,
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
        groupProps,
      }}
    >
      <Form form={form} {...rest}>
        {content}
      </Form>
    </FieldContext.Provider>
  );
};

export default BaseForm;
