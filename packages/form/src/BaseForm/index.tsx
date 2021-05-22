import React, { useRef, useEffect, useImperativeHandle, useState } from 'react';
import { FormProps, FormItemProps, FormInstance, Spin } from 'antd';
import { ConfigProvider } from 'antd';
import { Form } from 'antd';
import { ConfigProviderWrap } from '@ant-design/pro-provider';
import type {
  ProFieldValueType,
  SearchTransformKeyFn,
  ProRequestData,
} from '@ant-design/pro-utils';
import {
  conversionSubmitValue,
  transformKeySubmitValue,
  useMountMergeState,
  ProFormContext,
  runFunction,
  useFetchData,
} from '@ant-design/pro-utils';
import { useUrlSearchParams } from '@umijs/use-params';
import type { NamePath } from 'antd/lib/form/interface';

import namePathSet from 'rc-util/lib/utils/set';
import FieldContext from '../FieldContext';
import type { SubmitterProps } from '../components/Submitter';
import Submitter from '../components/Submitter';
import type { GroupProps, FieldProps } from '../interface';

export type CommonFormProps<
  T extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
> = {
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
  formRef?: React.MutableRefObject<
    | (FormInstance & {
        getFieldsFormatValue?: () => T;
      })
    | undefined
  >;

  /** @name 同步结果到 url 中 */
  syncToUrl?: boolean | ((values: T, type: 'get' | 'set') => T);
  /** @name 额外的 url 参数 中 */
  extraUrlParams?: Record<string, any>;
  /**
   * 同步结果到 initialValues,默认为true如果为false，reset的时将会忽略从url上获取的数据
   *
   * @name 是否将 url 参数写入 initialValues
   */
  syncToInitialValues?: boolean;
  /**
   * 如果为 false,会原样保存。
   *
   * @default true
   * @param 要不要值中的 Null 和 undefined
   */

  omitNil?: boolean;
  /**
   * 格式化 Date 的方式，默认转化为 string
   *
   * @see date -> YYYY-MM-DD
   * @see dateTime -> YYYY-MM-DD  HH:mm:SS
   * @see time -> HH:mm:SS
   */
  dateFormatter?: 'number' | 'string' | false;
  /** 表单初始化成功，比如布局，label等计算完成 */
  onInit?: (values: T) => void;

  /** 发起网络请求的参数 */
  params?: U;
  /** 发起网络请求的参数,返回值会覆盖给 initialValues */
  request?: ProRequestData<T, U>;
};

export type BaseFormProps<T = Record<string, any>> = {
  contentRender?: (
    items: React.ReactNode[],
    submitter: React.ReactElement<SubmitterProps> | undefined,
    form: FormInstance<any>,
  ) => React.ReactNode;
  fieldProps?: FieldProps;
  onInit?: (values: T) => void;
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
    extraUrlParams = {},
    syncToUrl,
    syncToInitialValues = true,
    onReset,
    omitNil = true,
    ...rest
  } = props;

  const [form] = Form.useForm();
  /** 同步 url 上的参数 */
  const [urlSearch, setUrlSearch] = useUrlSearchParams({});
  const formRef = useRef<FormInstance>(userForm || form);

  const fieldsValueType = useRef<
    Record<
      string,
      {
        valueType: ProFieldValueType;
        dateFormat: string;
      }
    >
  >({});
  /** 保存 transformKeyRef，用于对表单key transform */
  const transformKeyRef = useRef<Record<string, SearchTransformKeyFn | undefined>>({});

  const [loading, setLoading] = useMountMergeState<boolean>(false);

  const items = React.Children.toArray(children);
  const submitterProps: SubmitterProps =
    typeof submitter === 'boolean' || !submitter ? {} : submitter;

  const transformKey = (values: any, omit: boolean) =>
    transformKeySubmitValue(
      conversionSubmitValue(values, dateFormatter, fieldsValueType.current, omit),
      transformKeyRef.current,
    );

  const formatValues = {
    /** 获取格式化之后所有数据 */
    getFieldsFormatValue: (nameList?: NamePath[] | true) => {
      return transformKey(formRef.current.getFieldsValue(nameList!), omitNil);
    },
    /** 获取格式化之后的单个数据 */
    getFieldFormatValue: (nameList?: NamePath) => {
      return transformKey(formRef.current.getFieldValue(nameList!), omitNil);
    },
  };
  // 初始化给一个默认的 form
  useImperativeHandle(propsFormRef, () => ({
    ...formRef.current,
    ...formatValues,
  }));
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
            // 把没有的值设置为未定义可以删掉 url 的参数
            const params = Object.keys(
              transformKey(formRef.current.getFieldsValue(), false),
            ).reduce((pre, next) => {
              return {
                ...pre,
                [next]: finalValues[next] || undefined,
              };
            }, extraUrlParams);

            /** 在同步到 url 上时对参数进行转化 */
            setUrlSearch(genParams(syncToUrl, params, 'set'));
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

  useEffect(() => {
    const finalValues = transformKey(formRef.current.getFieldsValue(true), omitNil);
    onInit?.(finalValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 如果为 false，不需要触发设置进去
  const [urlParamsMergeInitialValues, setUrlParamsMergeInitialValues] = useState(() => {
    if (!syncToUrl) {
      return {};
    }
    return genParams(syncToUrl, urlSearch, 'get');
  });

  useEffect(() => {
    if (syncToInitialValues) return;
    window.requestAnimationFrame(() => {
      setUrlParamsMergeInitialValues({});
    });
  }, [syncToInitialValues]);

  useEffect(() => {
    if (!syncToUrl) return;
    setUrlSearch({
      ...urlSearch,
      ...extraUrlParams,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraUrlParams, syncToUrl]);

  return (
    // 增加国际化的能力，与 table 组件可以统一
    <ConfigProviderWrap>
      <FieldContext.Provider
        value={{
          fieldProps,
          formItemProps,
          groupProps,
          setFieldValueType: (name, { valueType = 'text', dateFormat, transform }) => {
            if (Array.isArray(name)) {
              transformKeyRef.current = namePathSet(transformKeyRef.current, name, transform);
              fieldsValueType.current = namePathSet(fieldsValueType.current, name, {
                valueType,
                dateFormat,
              });
            }
          },
        }}
      >
        <ProFormContext.Provider value={formatValues}>
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
              onValuesChange={(changedValues, values) => {
                rest?.onValuesChange?.(
                  transformKey(changedValues, omitNil),
                  transformKey(values, omitNil),
                );
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
                    }, extraUrlParams);
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
              {rest.component !== false && (
                <input
                  type="text"
                  style={{
                    display: 'none',
                  }}
                />
              )}
              <Form.Item noStyle shouldUpdate>
                {(formInstance) => {
                  if (propsFormRef)
                    propsFormRef.current = {
                      ...(formInstance as FormInstance),
                      ...formatValues,
                    };
                  formRef.current = formInstance as FormInstance;
                  return null;
                }}
              </Form.Item>
              {content}
            </Form>
          </ConfigProvider.SizeContext.Provider>
        </ProFormContext.Provider>
      </FieldContext.Provider>
    </ConfigProviderWrap>
  );
}

function RequestForm<T = Record<string, any>>(props: BaseFormProps<T>) {
  const { request, params, initialValues, ...rest } = props;
  const [initialData] = useFetchData({
    request,
    params,
  });

  if (!initialData && props.request) {
    return (
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <BaseForm
      {...rest}
      initialValues={{
        ...initialValues,
        ...initialData,
      }}
    />
  );
}

export type { FormProps, FormItemProps, FormInstance };

export default RequestForm;
