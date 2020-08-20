import React, { ReactElement, useRef, useEffect } from 'react';
import { Form } from 'antd';
import { FormProps, FormInstance } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form';
import { TooltipProps } from 'antd/lib/tooltip';
import { ConfigProviderWarp } from '@ant-design/pro-provider';
import { LabelIconTip, pickProProps, conversionSubmitValue } from '@ant-design/pro-utils';
import { ProFieldValueType } from '@ant-design/pro-field';
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

type ProFormComponent<P, ExtendsProps> = React.ComponentType<
  Omit<P & ExtendsProps, 'proFieldProps'>
>;

export type ProFormItemCreateConfig = {
  valueType?: ProFieldValueType;
};

export function createField<P extends ProFormItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: ProFormItemCreateConfig,
): ProFormComponent<P, ExtendsProps> {
  const FieldWithContext: React.FC<P> = (props: P & ExtendsProps) => {
    const { label, tip, placeholder, proFieldProps, ...rest } = props;
    const { valueType } = config || {};
    /**
     * 从 context 中拿到的值
     */
    const { fieldProps, formItemProps, setFieldValueType } = React.useContext(FieldContext);
    useEffect(() => {
      if (setFieldValueType && props.name) {
        setFieldValueType(String(props.name), valueType);
      }
    }, []);
    // @ts-ignore
    const restProps = Field.type === 'ProField' ? (rest as P) : (pickProProps(rest) as P);

    return (
      <Field
        {...formItemProps}
        {...restProps}
        fieldProps={pickProProps({
          // 轻量筛选模式下默认不显示 FormItem 的 label，label 设置为 placeholder
          placeholder: proFieldProps?.light ? placeholder || label : placeholder,
          ...(fieldProps || {}),
          ...(rest.fieldProps || {}),
        })}
        // title 是用于提升读屏的能力的，没有参与逻辑
        title={label}
        // 是否以轻量模式显示
        proFieldProps={proFieldProps}
        // 全局的提供一个 tip 功能，可以减少代码量
        // 轻量模式下不通过 FormItem 显示 label
        label={
          label && proFieldProps?.light !== true ? (
            <LabelIconTip label={label} tip={tip} />
          ) : undefined
        }
      />
    );
  };
  return FieldWithContext as ProFormComponent<P, ExtendsProps>;
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
    formRef: propsFormRef,
    ...rest
  } = props;

  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(userForm || form);
  const fieldsValueType = useRef<{
    [key: string]: ProFieldValueType;
  }>({});

  const items = React.Children.toArray(children);
  const submitterProps: Omit<SubmitterProps, 'form'> =
    typeof submitter === 'boolean' || !submitter ? {} : submitter;

  const submitterNode =
    submitter === false ? undefined : <Submitter {...submitterProps} form={userForm || form} />;

  const content = contentRender ? contentRender(items, submitterNode) : items;
  const setFieldValueType = (name: string, type?: ProFieldValueType) => {
    fieldsValueType.current[name] = type || 'text';
  };
  return (
    // 增加国际化的能力，与 table 组件可以统一
    <ConfigProviderWarp>
      <FieldContext.Provider
        value={{
          fieldProps,
          formItemProps,
          groupProps,
          setFieldValueType,
        }}
      >
        <Form
          form={userForm || form}
          {...rest}
          onFinish={(values) => {
            if (rest.onFinish) {
              rest.onFinish(conversionSubmitValue(values, dateFormatter, fieldsValueType.current));
            }
          }}
        >
          <Form.Item noStyle shouldUpdate>
            {(formInstance) => {
              // 不 setTimeout 一下拿到的是比较旧的
              setTimeout(() => {
                // 支持 fromRef，这里 ref 里面可以随时拿到最新的值
                if (propsFormRef) {
                  propsFormRef.current = formInstance as FormInstance;
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
