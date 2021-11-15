import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  useState,
  useMemo,
  useCallback,
} from 'react';
import type { FormProps, FormItemProps, FormInstance } from 'antd';
import { Spin } from 'antd';
import { ConfigProvider } from 'antd';
import { Form } from 'antd';
import { ConfigProviderWrap } from '@ant-design/pro-provider';
import type {
  ProFieldValueType,
  SearchTransformKeyFn,
  ProRequestData,
} from '@ant-design/pro-utils';
import {
  conversionMomentValue,
  transformKeySubmitValue,
  useMountMergeState,
  ProFormContext,
  runFunction,
  useFetchData,
  isDeepEqualReact,
  usePrevious,
  useDeepCompareEffect,
} from '@ant-design/pro-utils';

import { useUrlSearchParams } from '@umijs/use-params';
import type { NamePath } from 'antd/lib/form/interface';

import namePathSet from 'rc-util/lib/utils/set';
import FieldContext from '../FieldContext';
import type { SubmitterProps } from '../components/Submitter';
import Submitter from '../components/Submitter';
import type { GroupProps, FieldProps } from '../interface';
import { noteOnce } from 'rc-util/lib/warning';

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
  formRef?: React.MutableRefObject<ProFormInstance<T> | undefined>;

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

  /** 是否回车提交 */
  isKeyPressSubmit?: boolean;

  /** 用于控制form 是否相同的key，高阶用法 */
  formKey?: string;

  /** 自动选中第一项 */
  autoFocusFirstInput?: boolean;
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
  /** 是否回车提交 */
  isKeyPressSubmit?: boolean;

  /** Form 组件的类型，内部使用 */
  formComponentType?: 'DrawerForm' | 'ModalForm' | 'QueryFilter';
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

type ProFormInstance<T = any> = FormInstance<T> & {
  /** 获取格式化之后所有数据 */
  getFieldsFormatValue?: (nameList?: NamePath[] | true) => Record<string, any>;
  /** 获取格式化之后的单个数据 */
  getFieldFormatValue?: (nameList?: NamePath) => Record<string, any>;
  /** 校验字段后返回格式化之后的所有数据 */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
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
    formComponentType,
    extraUrlParams = {},
    syncToUrl,
    syncToInitialValues = true,
    onReset,
    omitNil = true,
    isKeyPressSubmit,
    autoFocusFirstInput,
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

  const items = React.Children.toArray(children).map((item, index) => {
    if (index === 0 && React.isValidElement(item) && autoFocusFirstInput) {
      return React.cloneElement(item, {
        ...item.props,
        autoFocus: autoFocusFirstInput,
      });
    }
    return item;
  });

  /** 计算 props 的对象 */
  const submitterProps: SubmitterProps = useMemo(
    () => (typeof submitter === 'boolean' || !submitter ? {} : submitter),
    [submitter],
  );

  /** 使用 callback 的类型 */
  const transformKey = useCallback(
    (values: any, omit: boolean, parentKey?: NamePath) =>
      transformKeySubmitValue(
        conversionMomentValue(values, dateFormatter, fieldsValueType.current, omit, parentKey),
        transformKeyRef.current,
        omit,
      ),
    [dateFormatter],
  );

  const formatValues = useMemo(
    () => ({
      /** 获取格式化之后所有数据 */
      getFieldsFormatValue: (nameList?: NamePath[] | true) => {
        return transformKey(formRef.current.getFieldsValue(nameList!), omitNil);
      },
      /** 获取格式化之后的单个数据 */
      getFieldFormatValue: (nameList?: NamePath) => {
        return transformKey(formRef.current.getFieldValue(nameList!), omitNil, nameList);
      },
      /** 校验字段后返回格式化之后的所有数据 */
      validateFieldsReturnFormatValue: async (nameList?: NamePath[]) => {
        const values = await formRef.current.validateFields(nameList);
        return transformKey(values, omitNil);
      },
    }),
    [omitNil, transformKey],
  );

  // 初始化给一个默认的 form
  useImperativeHandle(propsFormRef, () => ({
    ...formRef.current,
    ...formatValues,
  }));

  /** 渲染提交按钮与重置按钮 */
  const submitterNode = useMemo(() => {
    if (submitter === false) return undefined;
    return (
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
  }, [
    extraUrlParams,
    form,
    loading,
    omitNil,
    onReset,
    setUrlSearch,
    submitter,
    submitterProps,
    syncToUrl,
    transformKey,
    userForm,
  ]);

  const content = useMemo(() => {
    if (contentRender) {
      return contentRender(items, submitterNode, formRef.current);
    }
    return items;
  }, [contentRender, items, submitterNode]);

  const getPopupContainer = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    // 如果在 drawerForm 和  modalForm 里就渲染dom到父节点里
    // modalForm 可能高度太小不适合
    if (formComponentType && ['DrawerForm'].includes(formComponentType)) {
      return (e: HTMLElement) => e.parentNode || document.body;
    }
    return undefined;
  }, [formComponentType]);

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

  const preInitialValues = usePrevious(props.initialValues);

  // 提示一个 initialValues ，问的人实在是太多了
  useEffect(() => {
    if (syncToUrl || !props.initialValues || !preInitialValues || rest.request) return;
    const isEqual = isDeepEqualReact(props.initialValues, preInitialValues);
    noteOnce(
      isEqual,
      `initialValues 只在 form 初始化时生效，如果你需要异步加载推荐使用 request，或者 initialValues ? <Form/> : null `,
    );
    noteOnce(
      isEqual,
      `The initialValues only take effect when the form is initialized, if you need to load asynchronously recommended request, or the initialValues ? <Form/> : null `,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialValues]);

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
          formRef,
          fieldProps,
          formItemProps,
          groupProps,
          formComponentType,
          getPopupContainer,
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
                if (!isKeyPressSubmit) return;
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
                // 没设置 onFinish 就不执行
                if (!rest.onFinish) return;
                // 防止重复提交
                if (loading) return;

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
                    // fix #3547: 当原先在url中存在的字段被删除时，应该讲params中的该字段设置为undefined,以便触发url同步删除
                    Object.keys(urlSearch).forEach((key) => {
                      if (!params[key]) {
                        params[key] = undefined;
                      }
                    });
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
  const { request, params, initialValues, formKey, ...rest } = props;
  const [initialData, reload] = useFetchData({
    request,
    params,
    proFieldKey: formKey,
  });

  /** 如果 params 发生修改重新刷新一下 params */
  useDeepCompareEffect(() => {
    reload();
  }, [params]);

  if (!initialData && props.request) {
    return (
      <div style={{ paddingTop: 50, paddingBottom: 50, textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  return (
    <BaseForm
      autoComplete="off"
      {...rest}
      initialValues={{
        ...initialValues,
        ...initialData,
      }}
    />
  );
}

export type { FormProps, ProFormInstance, FormItemProps, FormInstance };

export default RequestForm;
