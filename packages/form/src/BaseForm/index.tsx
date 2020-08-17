import React, { ReactElement, useRef } from 'react';
import { Form } from 'antd';
import { FormProps, FormInstance } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form';
import { TooltipProps } from 'antd/lib/tooltip';
import { ConfigProviderWarp } from '@ant-design/pro-provider';
import { LabelIconTip, pickProProps, conversionSubmitValue } from '@ant-design/pro-utils';
import FieldContext from '../FieldContext';
import Submitter, { SubmitterProps } from '../components/Submitter';
import { GroupProps, FieldProps, ProFormItemProps } from '../interface';

export interface CommonFormProps {
  submitter?: Omit<SubmitterProps, 'form'> | boolean;
}

export interface BaseFormProps extends FormProps, CommonFormProps {
  contentRender?: (
    items: React.ReactNode[],
    submitter: ReactElement<Omit<SubmitterProps, 'form'>> | undefined,
  ) => React.ReactNode;
  fieldProps?: FieldProps;
  dateFormatter?: 'number' | 'string' | false;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
  formRef?: React.MutableRefObject<FormInstance>;
}

// 给控件扩展的通用的属性
export interface ExtendsProps {
  secondary?: boolean;
  colSize?: number;
  tip?: string | TooltipProps;
}

export function createField<P extends ProFormItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
): React.ComponentType<P & ExtendsProps> {
  const FieldWithContext: React.FC<P> = (props: P & ExtendsProps) => {
    const { label, tip, placeholder, ...rest } = props;
    /**
     * 从 context 中拿到的值
     */
    const { fieldProps, formItemProps } = React.useContext(FieldContext);
    // @ts-ignore
    const restProps = Field.type === 'ProField' ? (rest as P) : (pickProProps(rest) as P);
    return (
      <Field
        fieldProps={pickProProps({
          placeholder,
          ...(fieldProps || {}),
          ...(rest.fieldProps || {}),
        })}
        {...formItemProps}
        {...restProps}
        // title 是用于提升读屏的能力的，没有参与逻辑
        title={label}
        // 全局的提供一个 tip 功能，可以减少代码量
        label={label && <LabelIconTip label={label} tip={tip} />}
      />
    );
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
    dateFormatter = 'string',
    form: userForm,
    ...rest
  } = props;

  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(userForm || form);

  const items = React.Children.toArray(children);
  const submitterProps: Omit<SubmitterProps, 'form'> =
    typeof submitter === 'boolean' || !submitter ? {} : submitter;

  const submitterNode =
    submitter === false ? undefined : <Submitter {...submitterProps} form={userForm || form} />;

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
        <Form
          form={userForm || form}
          {...rest}
          onFinish={(values) => {
            if (rest.onFinish) {
              rest.onFinish(conversionSubmitValue(values, dateFormatter, {}));
            }
          }}
        >
          <Form.Item noStyle shouldUpdate>
            {(formInstance) => {
              // 不 setTimeout 一下拿到的是比较旧的
              setTimeout(() => {
                // 支持 fromRef，这里 ref 里面可以随时拿到最新的值
                if (rest.formRef) {
                  rest.formRef.current = formInstance as FormInstance;
                }
                formRef.current = formInstance as FormInstance;
              }, 0);
            }}
          </Form.Item>
          {content}
        </Form>
      </FieldContext.Provider>
    </ConfigProviderWarp>
  );
};

export default BaseForm;
