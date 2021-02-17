import React, { useRef, useEffect, useImperativeHandle, useState } from 'react';
import type { FormProps, FormItemProps, FormInstance } from 'antd';
import { ConfigProvider } from 'antd';
import { Form } from 'antd';
import { ConfigProviderWrap } from '@ant-design/pro-provider';
import type { ProFieldValueType, SearchTransformKeyFn } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import {
  conversionSubmitValue,
  transformKeySubmitValue,
  useMountMergeState,
} from '@ant-design/pro-utils';
import { useUrlSearchParams } from '@umijs/use-params';

import namePathSet from 'rc-util/lib/utils/set';
import FieldContext from '../FieldContext';
import type { SubmitterProps } from '../components/Submitter';
import Submitter from '../components/Submitter';
import type { GroupProps, FieldProps } from '../interface';

export type CommonFormProps<T extends Record<string, any> = Record<string, any>> = {
  submitter?:
    | SubmitterProps<{
        form?: FormInstance<any>;
      }>
    | false;

  /**
   * 支持异步操作，更加方便
   *
   * @name 表单结束后调用
   */
  onFinish?: (formData: T) => Promise<boolean | void>;

  /** @name 获取真正的可以获得值的 from */
  formRef?: React.MutableRefObject<FormInstance | undefined>;
  /** @name 同步结果到 url 中 */
  syncToUrl?: true | ((values: T, type: 'get' | 'set') => T);
  /**
   * 如果为 false,会原样保存。
   *
   * @default true
   * @param 要不要值中的 Null 和 undefined
   */

  omitNil?: boolean;
};

export type BaseFormProps<T = Record<string, any>> = {
  contentRender?: (
    items: React.ReactNode[],
    submitter: React.ReactElement<SubmitterProps> | undefined,
    form: FormInstance<any>,
  ) => React.ReactNode;
  fieldProps?: FieldProps;
  onInit?: (values: T) => void;
  dateFormatter?: 'number' | 'string' | false;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
} & Omit<FormProps, 'onFinish'> &
  CommonFormProps<T>;

const genParams = (
  syncUrl: BaseFormProps<any>['syncToUrl'],
  params: Record<string, any>,
  type: 'get' | 'set',
) => {
  if (syncUrl === true) {
    return params;
  }
  return runFunction(syncUrl, params, type);
};

function BaseForm<T = Record<string, any>>(props: BaseFormProps<T>) {
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
    onInit,
    syncToUrl,
    onReset,
    omitNil = true,
    ...rest
  } = props;

  const [form] = Form.useForm();
  /** 同步 url 上的参数 */
  const [urlSearch, setUrlSearch] = useUrlSearchParams({});
  const formRef = useRef<FormInstance>(userForm || form);

  // 初始化给一个默认的 form
  useImperativeHandle(propsFormRef, () => formRef.current, []);

  const fieldsValueType = useRef<Record<string, ProFieldValueType>>({});
  /** 保存 transformKeyRef，用于对表单key transform */
  const transformKeyRef = useRef<Record<string, SearchTransformKeyFn | undefined>>({});

  const [loading, setLoading] = useMountMergeState<boolean>(false);

  /** 因为 protable 里面的值无法保证刚开始就存在 所以多进行了一次触发，这样可以解决部分问题 */
  const [isUpdate, updateState] = useMountMergeState(false);

  const items = React.Children.toArray(children);
  const submitterProps: SubmitterProps =
    typeof submitter === 'boolean' || !submitter ? {} : submitter;

  const transformKey = (values: any, omit: boolean) =>
    transformKeySubmitValue(
      conversionSubmitValue(values, dateFormatter, fieldsValueType.current, omit),
      transformKeyRef.current,
    );

  /** 渲染提交按钮与重置按钮 */
  const submitterNode =
    submitter === false ? undefined : (
      <Submitter
        key="submitter"
        {...submitterProps}
        onReset={() => {
          const finalValues = transformKey(formRef.current.getFieldsValue(), omitNil);
          submitterProps?.onReset?.(finalValues);
          onReset?.(finalValues);
          // 如果 syncToUrl，清空一下数据
          if (syncToUrl) {
            setUrlSearch(transformKey(formRef.current.getFieldsValue(), false));
          }
        }}
        form={userForm || form}
        submitButtonProps={{
          loading,
          ...submitterProps.submitButtonProps,
        }}
      />
    );

  const content = contentRender ? contentRender(items, submitterNode, formRef.current) : items;

  const forgetUpdate = () => {
    setTimeout(() => updateState(true));
  };
  useEffect(() => {
    if (isUpdate) {
      setTimeout(() => {
        const finalValues = transformKey(formRef.current.getFieldsValue(), omitNil);
        onInit?.(finalValues);
      }, 0);
    }
  }, [dateFormatter, isUpdate]);

  // 如果为 false，不需要触发设置进去
  const [urlParamsMergeInitialValues] = useState(() => {
    if (!syncToUrl) {
      return {};
    }
    return genParams(syncToUrl, urlSearch, 'get');
  });
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
            }
          },
        }}
      >
        <ConfigProvider.SizeContext.Provider value={rest.size}>
          <Form
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                formRef.current?.submit();
              }
            }}
            form={userForm || form}
            {...rest}
            // 组合 urlSearch 和 initialValues
            initialValues={{
              ...urlParamsMergeInitialValues,
              ...rest.initialValues,
            }}
            onFinish={async () => {
              if (!rest.onFinish) {
                return;
              }
              setLoading(true);
              try {
                const finalValues = transformKey(formRef.current.getFieldsValue(), omitNil);
                await rest.onFinish(finalValues);

                if (syncToUrl) {
                  // 把没有的值设置为未定义可以删掉 url 的参数
                  const params = Object.keys(
                    transformKey(formRef.current.getFieldsValue(), false),
                  ).reduce((pre, next) => {
                    return {
                      ...pre,
                      [next]: finalValues[next] || undefined,
                    };
                  }, {});
                  /** 在同步到 url 上时对参数进行转化 */
                  setUrlSearch(genParams(syncToUrl, params, 'set'));
                }

                setLoading(false);
              } catch (error) {
                // console.log(error);
                setLoading(false);
              }
            }}
          >
            <input
              type="text"
              style={{
                display: 'none',
              }}
            />
            <Form.Item noStyle shouldUpdate>
              {(formInstance) => {
                // 支持 fromRef，这里 ref 里面可以随时拿到最新的值
                if (propsFormRef && !isUpdate) forgetUpdate();
                if (propsFormRef) propsFormRef.current = formInstance as FormInstance;
                formRef.current = formInstance as FormInstance;
                return null;
              }}
            </Form.Item>
            {content}
          </Form>
        </ConfigProvider.SizeContext.Provider>
      </FieldContext.Provider>
    </ConfigProviderWrap>
  );
}

export type { FormProps, FormItemProps, FormInstance };

export default BaseForm;
