import React, { ReactElement, useRef, useEffect, useContext } from 'react';
import { Form } from 'antd';
import { FormProps, FormInstance } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form';
import { TooltipProps } from 'antd/lib/tooltip';
import { ConfigProviderWarp } from '@ant-design/pro-provider';
import { LabelIconTip, conversionSubmitValue, pickProFormItemProps } from '@ant-design/pro-utils';
import { ProFieldValueType } from '@ant-design/pro-field';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import FieldContext from '../FieldContext';
import Submitter, { SubmitterProps } from '../components/Submitter';
import LightWrapper from './LightWrapper';
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
  formRef?: React.MutableRefObject<FormInstance | undefined>;
}

const WIDTH_SIZE_ENUM = {
  // 适用于短数字，短文本或者选项
  xs: 104,
  // 适用于较短字段录入、如姓名、电话、ID 等。
  s: 216,
  // 标准宽度，适用于大部分字段长度。
  m: 328,
  // 适用于较长字段录入，如长网址、标签组、文件路径等。
  l: 440,
  // 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
  xl: 552,
};
// 给控件扩展的通用的属性
export interface ExtendsProps {
  secondary?: boolean;
  bordered?: boolean;
  colSize?: number;
  tip?: string | TooltipProps;
}

type ProFormComponent<P, ExtendsProps> = React.ComponentType<
  Omit<P & ExtendsProps, 'proFieldProps'>
>;

export type ProFormItemCreateConfig = {
  valueType?: ProFieldValueType;
  customLightMode?: boolean;
  lightFilterLabelFormatter?: (value: any) => string;
} & FormItemProps;

export function createField<P extends ProFormItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: ProFormItemCreateConfig,
): ProFormComponent<P, ExtendsProps> {
  const FieldWithContext: React.FC<P> = (props: P & ExtendsProps) => {
    const size = useContext(SizeContext);
    const { label, tip, placeholder, width = 'm', proFieldProps, bordered, ...rest } = props;
    const {
      valueType,
      customLightMode,
      lightFilterLabelFormatter,
      valuePropName = 'value',
      ...defaultFormItemProps
    } = config || {};
    /**
     * 从 context 中拿到的值
     */
    const { fieldProps, formItemProps, setFieldValueType } = React.useContext(FieldContext);
    useEffect(() => {
      if (setFieldValueType && props.name) {
        // Field.type === 'ProField' 时 props 里面是有 valueType 的，所以要设置一下
        // 写一个 ts 比较麻烦，用 any 顶一下
        setFieldValueType(String(props.name), valueType || (rest as any).valueType || 'text');
      }
    }, []);
    // restFormItemProps is user props pass to Form.Item
    const restFormItemProps = pickProFormItemProps(rest);

    const realFieldProps = {
      disabled: props.disabled,
      // 轻量筛选模式下默认不显示 FormItem 的 label，label 设置为 placeholder
      placeholder: proFieldProps?.light ? placeholder || label : placeholder,
      ...(fieldProps || {}),
      ...(rest.fieldProps || {}),
      style: {
        width: WIDTH_SIZE_ENUM[width as 'm'] || width,
        ...rest.fieldProps?.style,
        ...fieldProps?.style,
      },
    };

    const field = (
      <Field
        {...(rest as P)} // ProXxx 上面的 props 透传给 Filed，可能包含 Field 自定义的 props，比如 ProFormSelect 的 request
        fieldProps={realFieldProps}
        proFieldProps={proFieldProps}
      />
    );

    return (
      <Form.Item
        // title 是用于提升读屏的能力的，没有参与逻辑
        // @ts-expect-error
        title={label}
        // 全局的提供一个 tip 功能，可以减少代码量
        // 轻量模式下不通过 FormItem 显示 label
        label={
          label && proFieldProps?.light !== true ? (
            <LabelIconTip label={label} tip={tip} />
          ) : undefined
        }
        valuePropName={valuePropName}
        {...defaultFormItemProps}
        {...formItemProps}
        {...restFormItemProps}
      >
        <LightWrapper
          {...realFieldProps}
          bordered={bordered}
          size={size}
          light={proFieldProps?.light}
          customLightMode={customLightMode}
          label={label}
          labelFormatter={lightFilterLabelFormatter}
          valuePropName={valuePropName}
        >
          {field}
        </LightWrapper>
      </Form.Item>
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

  const setFieldValueType = (name: string, type?: ProFieldValueType) => {
    fieldsValueType.current[name] = type || 'text';
  };

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
          setFieldValueType,
        }}
      >
        <SizeContext.Provider value={rest.size}>
          <Form
            form={userForm || form}
            {...rest}
            onFinish={(values) => {
              if (rest.onFinish) {
                rest.onFinish(
                  conversionSubmitValue(values, dateFormatter, fieldsValueType.current),
                );
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
        </SizeContext.Provider>
      </FieldContext.Provider>
    </ConfigProviderWarp>
  );
};

export default BaseForm;
