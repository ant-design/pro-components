import React, { ReactElement, useRef, useEffect, useContext, useState } from 'react';
import { Form } from 'antd';
import { FormProps, FormInstance } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form';
import { ConfigProviderWrap } from '@ant-design/pro-provider';
import {
  conversionSubmitValue,
  pickProFormItemProps,
  SearchTransformKeyFn,
  transformKeySubmitValue,
} from '@ant-design/pro-utils';
import { ProFieldValueType } from '@ant-design/pro-field';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import { Store } from 'antd/lib/form/interface';
import namePathSet from 'rc-util/lib/utils/set';
import { ButtonProps } from 'antd/lib/button';
import FieldContext from '../FieldContext';
import Submitter, { SubmitterProps } from '../components/Submitter';
import LightWrapper from './LightWrapper';
import { GroupProps, FieldProps, ProFormItemProps } from '../interface';

export interface CommonFormProps {
  submitter?: Omit<SubmitterProps, 'form'> | false;

  /**
   * @name 表单结束后调用
   * @description  支持异步操作，更加方便
   */
  onFinish?: (formData: Store) => Promise<boolean | void>;

  /**
   * @name 获取真正的可以获得值的 from
   */
  formRef?: React.MutableRefObject<FormInstance | undefined>;
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
  /**
   * @name 表单结束后调用
   * @description  支持异步操作，更加方便
   */
  onFinish?: (formData: Store) => Promise<boolean | void>;
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
  /**
   * @name 网络请求用的输出，会触发reload
   * @description 需要与 request 配合使用
   */
  params?: any;

  /**
   * @name 需要放在formItem 时使用
   */
  ignoreFormItem?: boolean;

  /**
   * @name 提交时转化值，一般用于数组类型
   */
  transform?: SearchTransformKeyFn;
}

type ProFormComponent<P, Extends> = React.ComponentType<Omit<P & Extends, 'proFieldProps'>>;

export type ProFormItemCreateConfig = {
  /**
   * 自定义类型
   */
  valueType?: ProFieldValueType;
  /**
   * 自定义 lightMode
   */
  customLightMode?: boolean;
  /**
   * light mode 自定义的 label 模式
   */
  lightFilterLabelFormatter?: (value: any) => string;

  /**
   * 忽略默认的 felidWidth
   */
  ignoreFelidWidth?: true;
} & FormItemProps;

export function createField<P extends ProFormItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: ProFormItemCreateConfig,
): ProFormComponent<P, ExtendsProps> {
  const FieldWithContext: React.FC<P> = (props: P & ExtendsProps) => {
    const size = useContext(SizeContext);
    const {
      label,
      tooltip,
      placeholder,
      width,
      proFieldProps,
      bordered,
      messageVariables,
      ignoreFormItem,
      transform,
      ...rest
    } = props;
    const {
      valueType,
      customLightMode,
      lightFilterLabelFormatter,
      valuePropName = 'value',
      ignoreFelidWidth,
      ...defaultFormItemProps
    } = config || {};
    /**
     * 从 context 中拿到的值
     */
    const { fieldProps, formItemProps, setFieldValueType } = React.useContext(FieldContext);
    useEffect(() => {
      // 如果 setFieldValueType 和 props.name 不存在不存入
      if (!setFieldValueType || !props.name) {
        return;
      }
      // Field.type === 'ProField' 时 props 里面是有 valueType 的，所以要设置一下
      // 写一个 ts 比较麻烦，用 any 顶一下
      setFieldValueType(props.name, {
        valueType: valueType || (rest as any).valueType || 'text',
        transform,
      });
    }, []);

    // restFormItemProps is user props pass to Form.Item
    const restFormItemProps = pickProFormItemProps(rest);
    const myWidth = ignoreFelidWidth ? width : width || 'm';

    const formNeedProps = {
      value: (rest as any).value,
      onChange: (rest as any).onChange,
    };
    const realFieldProps = {
      ...(ignoreFormItem ? formNeedProps : {}),
      disabled: props.disabled,
      // 轻量筛选模式下默认不显示 FormItem 的 label，label 设置为 placeholder
      placeholder: proFieldProps?.light ? placeholder || label : placeholder,
      ...(fieldProps || {}),
      ...(rest.fieldProps || {}),
      style: {
        // 有些组件是不需要自带的 width
        width: myWidth ? WIDTH_SIZE_ENUM[myWidth] || width : width,
        ...rest.fieldProps?.style,
        ...fieldProps?.style,
      },
    };

    const otherProps = {
      messageVariables,
      ...defaultFormItemProps,
      ...formItemProps,
      ...restFormItemProps,
    };

    const field = (
      <Field
        // ProXxx 上面的 props 透传给 Filed，可能包含 Field 自定义的 props，
        // 比如 ProFormSelect 的 request
        {...(rest as P)}
        fieldProps={realFieldProps}
        proFieldProps={{
          params: rest.params,
          proFieldKey: otherProps?.name,
          ...proFieldProps,
        }}
      />
    );

    /**
     * 被放到 FormSet 的时候
     */
    if (ignoreFormItem) {
      return field;
    }

    return (
      <Form.Item
        // 全局的提供一个 tip 功能，可以减少代码量
        // 轻量模式下不通过 FormItem 显示 label
        label={label && proFieldProps?.light !== true ? label : undefined}
        tooltip={proFieldProps?.light !== true && tooltip}
        valuePropName={valuePropName}
        {...otherProps}
        messageVariables={{
          label: label as string,
          ...otherProps?.messageVariables,
        }}
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
  /**
   * 保存 transformKeyRef，用于对表单key transform
   */
  const transformKeyRef = useRef<{
    [key: string]: SearchTransformKeyFn | undefined;
  }>({});

  const [loading, setLoading] = useState<ButtonProps['loading']>(false);

  /**
   * 因为 protable 里面的值无法保证刚开始就存在
   * 所以多进行了一次触发，这样可以解决部分问题
   */
  const [formInit, forgetUpdate] = useState(false);

  const items = React.Children.toArray(children);

  const submitterProps: Omit<SubmitterProps, 'form'> =
    typeof submitter === 'boolean' || !submitter ? {} : submitter;

  /**
   * 渲染提交按钮与重置按钮
   */
  const submitterNode =
    submitter === false ? undefined : (
      <Submitter
        {...submitterProps}
        form={userForm || form}
        submitButtonProps={{
          loading,
          ...submitterProps.submitButtonProps,
        }}
      />
    );

  const content = contentRender ? contentRender(items, submitterNode) : items;

  return (
    // 增加国际化的能力，与 table 组件可以统一
    <ConfigProviderWrap>
      <FieldContext.Provider
        value={{
          fieldProps,
          formItemProps,
          groupProps,
          setFieldValueType: (name, { valueType = 'text', transform }) => {
            if (Array.isArray(name)) {
              transformKeyRef.current = namePathSet(transformKeyRef.current, name, transform);
              fieldsValueType.current = namePathSet(fieldsValueType.current, name, valueType);
            } else {
              fieldsValueType.current[String(name)] = valueType;
              transformKeyRef.current[String(name)] = transform;
            }
          },
        }}
      >
        <SizeContext.Provider value={rest.size}>
          <Form
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                formRef.current?.submit();
              }
            }}
            form={userForm || form}
            {...rest}
            onFinish={async (values) => {
              if (!rest.onFinish) {
                return;
              }
              setLoading({
                delay: 100,
              });
              await rest.onFinish(
                transformKeySubmitValue(
                  conversionSubmitValue(values, dateFormatter, fieldsValueType.current),
                  transformKeyRef.current,
                ),
              );
              setLoading(false);
            }}
          >
            <Form.Item noStyle shouldUpdate>
              {(formInstance) => {
                // 不 setTimeout 一下拿到的是比较旧的
                setTimeout(() => {
                  // 支持 fromRef，这里 ref 里面可以随时拿到最新的值
                  if (propsFormRef) {
                    if (!formInit) {
                      forgetUpdate(true);
                    }
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
    </ConfigProviderWrap>
  );
};

export default BaseForm;
