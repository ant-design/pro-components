import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form';
import { TooltipProps } from 'antd/lib/tooltip';
import { ConfigProviderWarp } from '@ant-design/pro-provider';
import { LabelIconTip } from '@ant-design/pro-utils';
import FieldContext from '../FieldContext';
import Submitter, { SubmitterProps } from '../components/Submitter';
import { GroupProps, FieldProps } from '../interface';

export interface CommonFormProps {
  submitter?: Omit<SubmitterProps, 'form'> | boolean;
}

export interface BaseFormProps extends FormProps, CommonFormProps {
  contentRender?: (items: React.ReactNode[], submitter: React.ReactNode) => React.ReactNode;
  fieldProps?: FieldProps;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
}

// 给控件扩展的通用的属性
export interface ExtendsProps {
  secondary?: boolean;
  colSize?: number;
  tip?: string | TooltipProps;
}

export function createField<P extends FormItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
): React.ComponentType<P & ExtendsProps> {
  const FieldWithContext: React.FC<P> = (props: P & ExtendsProps) => {
    const { label, tip, ...rest } = props;
    let labelDom = label;
    if (tip) {
      labelDom = <LabelIconTip label={label} tip={tip} />;
    }
    const { fieldProps, formItemProps } = React.useContext(FieldContext);

    return <Field fieldProps={fieldProps} {...formItemProps} {...(rest as P)} label={labelDom} />;
  };
  return FieldWithContext;
}

const BaseForm: React.FC<BaseFormProps> = (props) => {
  const {
    children,
    contentRender,
    submitter,
    fieldProps,
    formItemProps,
    groupProps,
    form: userForm,
    ...rest
  } = props;
  const [form] = Form.useForm();
  const realForm = userForm || form;
  const items = React.Children.toArray(children);
  const submitterProps: Omit<SubmitterProps, 'form'> =
    typeof submitter === 'boolean' || !submitter ? {} : submitter;
  const submitterNode =
    submitter === false ? null : <Submitter {...submitterProps} form={realForm} />;
  const content = contentRender ? contentRender(items, submitterNode) : items;
  return (
    // 增加国际化的能力，与 table 组件可以统一
    <ConfigProviderWarp>
      <FieldContext.Provider
        value={{
          fieldProps,
          formItemProps,
          groupProps,
        }}
      >
        <Form form={realForm} {...rest}>
          {content}
        </Form>
      </FieldContext.Provider>
    </ConfigProviderWarp>
  );
};

export default BaseForm;
