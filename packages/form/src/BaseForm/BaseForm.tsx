/* eslint-disable react-hooks/exhaustive-deps */
import { ProConfigProvider } from '@ant-design/pro-provider';
import type {
  ProFieldProps,
  ProFieldValueType,
  ProFormInstanceType,
  ProRequestData,
  SearchTransformKeyFn,
} from '@ant-design/pro-utils';
import {
  conversionMomentValue,
  isDeepEqualReact,
  nanoid,
  ProFormContext,
  runFunction,
  transformKeySubmitValue,
  useFetchData,
  useMountMergeState,
  usePrevious,
  useRefFunction,
  useStyle,
} from '@ant-design/pro-utils';
import { useUrlSearchParams } from '@umijs/use-params';
import type { FormInstance, FormItemProps, FormProps } from 'antd';
import { ConfigProvider, Form, Spin } from 'antd';

import type { NamePath } from 'antd/lib/form/interface';
import classNames from 'classnames';
import type dayjs from 'dayjs';
import omit from 'omit.js';
import get from 'rc-util/lib/utils/get';
import { default as namePathSet, default as set } from 'rc-util/lib/utils/set';
import { noteOnce } from 'rc-util/lib/warning';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { SubmitterProps } from '../components';
import { Submitter } from '../components';
import { FormListContext } from '../components/List';
import FieldContext from '../FieldContext';
import { GridContext, useGridHelpers } from '../helpers';
import type { FieldProps, GroupProps, ProFormGridConfig } from '../typing';
import { EditOrReadOnlyContext } from './EditOrReadOnlyContext';

export type CommonFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> = {
  /**
   * @name 自定义提交的配置
   *
   * @example 不展示提交按钮和重置按钮
   * submitter={false}
   * @example 修改重置按钮的样式，并且隐藏提交按钮
   * submitter={{resetButtonProps: { type: 'dashed'},submitButtonProps: { style: { display: 'none', }}}}
   *
   * @example 修改提交按钮和重置按钮的顺序
   * submitter={{ render:(props,dom)=> [...dom.reverse()]}}
   *
   * @example 修改提交和重置按钮文字
   * submitter={{ searchConfig: { submitText: '提交2',restText: '重置2'}}}
   */
  submitter?:
    | SubmitterProps<{
        form?: FormInstance<any>;
      }>
    | false;

  /**
   * @name 表单结束后调用
   * @description 支持异步操作，更加方便
   *
   * @example onFinish={async (values) => { await save(values); return true }}
   */
  onFinish?: (formData: T) => Promise<boolean | void>;
  /**
   * @name 表单按钮的 loading 状态
   */
  loading?: boolean;
  /**
   * @name 这是一个可选的属性(onLoadingChange)，它接受一个名为loading的参数，类型为boolean，表示加载状态是否改变。
   * 当loading状态发生变化时，将会调用一个函数，这个函数接受这个loading状态作为参数，并且没有返回值(void)。
   */
  onLoadingChange?: (loading: boolean) => void;

  /**
   * @name 获取 ProFormInstance
   *
   * ProFormInstance 可以用来获取当前表单的一些信息
   *
   * @example 获取 name 的值 formRef.current.getFieldValue("name");
   * @example 获取所有的表单值 formRef.current.getFieldsValue(true);
   */
  formRef?:
    | React.MutableRefObject<ProFormInstance<T> | undefined>
    | React.RefObject<ProFormInstance<T> | undefined>;

  /**
   * @name 同步结果到 url 中
   * */
  syncToUrl?: boolean | ((values: T, type: 'get' | 'set') => T);

  /**
   * @name 当 syncToUrl 为 true，在页面回显示时，以url上的参数为主，默认为false
   */
  syncToUrlAsImportant?: boolean;

  /**
   * @name 额外的 url 参数 中
   * */
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
   * @example  dateFormatter="string" : Moment -> YYYY-MM-DD
   * @example  dateFormatter="YYYY-MM-DD  HH:mm:SS" Moment -> YYYY-MM-DD  HH:mm:SS
   * @example  dateFormatter="HH:mm:SS" Moment -> HH:mm:SS
   * @example  dateFormatter="number" Moment -> timestamp
   * @example  dateFormatter=false Moment -> Moment
   * @example  dateFormatter={(value)=>value.format("YYYY-MM-DD")}
   */
  dateFormatter?:
    | 'string'
    | 'number'
    | ((value: dayjs.Dayjs, valueType: string) => string | number)
    | false;

  /**
   * @name 表单初始化成功，比如布局，label等计算完成
   * @example  (values)=>{ console.log(values) }
   */
  onInit?: (values: T, form: ProFormInstance<any>) => void;

  /**
   * @name 发起网络请求的参数
   *
   * @example  params={{productId: 1}}
   * */
  params?: U;
  /**
   * @name 发起网络请求的参数,返回值会覆盖给 initialValues
   *
   * @example async (params)=>{ return initialValues }
   */
  request?: ProRequestData<T, U>;

  /** 是否回车提交 */
  isKeyPressSubmit?: boolean;

  /** 用于控制form 是否相同的key，高阶用法 */
  formKey?: string;

  /**
   * @name自动选中第一项
   * @description 只对有input的类型有效
   */
  autoFocusFirstInput?: boolean;

  /**
   *  @name 是否只读模式，对所有表单项生效
   *  @description 优先低于表单项的 readonly
   */
  readonly?: boolean;
} & ProFormGridConfig;

export type BaseFormProps<T = Record<string, any>> = {
  contentRender?: (
    items: React.ReactNode[],
    submitter: React.ReactElement<SubmitterProps> | undefined,
    form: FormInstance<any>,
  ) => React.ReactNode;
  fieldProps?: FieldProps<unknown>;
  proFieldProps?: ProFieldProps;
  /** 表单初始化完成，form已经存在，可以进行赋值的操作了 */
  onInit?: (values: T, form: ProFormInstance<any>) => void;
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

type ProFormInstance<T = any> = FormInstance<T> & ProFormInstanceType<T>;

/**
 * It takes a name path and converts it to an array.
 * @param {NamePath} name - The name of the form.
 * @returns string[]
 *
 * a-> [a]
 * [a] -> [a]
 */
const covertFormName = (name?: NamePath) => {
  if (!name) return name;
  if (Array.isArray(name)) return name;
  return [name];
};

function BaseFormComponents<T = Record<string, any>>(
  props: BaseFormProps<T> & {
    loading: boolean;
    onUrlSearchChange: (value: Record<string, string | number>) => void;
    transformKey: (values: any, omit: boolean, parentKey?: NamePath) => any;
  },
) {
  const {
    children,
    contentRender,
    submitter,
    fieldProps,
    formItemProps,
    groupProps,
    transformKey,
    formRef: propsFormRef,
    onInit,
    form,
    loading,
    formComponentType,
    extraUrlParams = {},
    syncToUrl,
    onUrlSearchChange,
    onReset,
    omitNil = true,
    isKeyPressSubmit,
    autoFocusFirstInput = true,
    grid,
    rowProps,
    colProps,
    ...rest
  } = props;

  /**
   * 获取 form 实例
   */
  const formInstance = Form.useFormInstance();

  const { componentSize } = ConfigProvider?.useConfig?.() || {
    componentSize: 'middle',
  };

  /** 同步 url 上的参数 */
  const formRef = useRef<ProFormInstance<any>>((form || formInstance) as any);

  /**
   * 获取布局
   */
  const { RowWrapper } = useGridHelpers({ grid, rowProps });

  const getFormInstance = useRefFunction(() => formInstance);

  const formatValues = useMemo(
    () => ({
      /**
       * 获取被 ProForm 格式化后的所有数据
       * @param allData boolean
       * @returns T
       *
       * @example  getFieldsFormatValue(true) ->返回所有数据，即使没有被 form 托管的
       */
      getFieldsFormatValue: (allData?: true) => {
        return transformKey(
          getFormInstance()?.getFieldsValue(allData!),
          omitNil,
        );
      },
      /**
       * 获取被 ProForm 格式化后的单个数据
       * @param nameList (string|number)[]
       * @returns T
       *
       * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
       */
      /** 获取格式化之后的单个数据 */
      getFieldFormatValue: (paramsNameList: NamePath = []) => {
        const nameList = covertFormName(paramsNameList);
        if (!nameList) throw new Error('nameList is require');
        const value = getFormInstance()?.getFieldValue(nameList!);
        const obj = nameList ? set({}, nameList as string[], value) : value;
        return get(transformKey(obj, omitNil, nameList), nameList as string[]);
      },
      /**
       * 获取被 ProForm 格式化后的单个数据, 包含他的 name
       * @param nameList (string|number)[]
       * @returns T
       *
       * @example  {a:{b:value}} -> getFieldFormatValueObject(['a', 'b']) -> {a:{b:value}}
       */
      /** 获取格式化之后的单个数据 */
      getFieldFormatValueObject: (paramsNameList?: NamePath) => {
        const nameList = covertFormName(paramsNameList);
        const value = getFormInstance()?.getFieldValue(nameList!);
        const obj = nameList ? set({}, nameList as string[], value) : value;
        return transformKey(obj, omitNil, nameList);
      },
      /** 
      /**
       *验字段后返回格式化之后的所有数据
       * @param nameList (string|number)[]
       * @returns T
       * 
       * @example validateFieldsReturnFormatValue -> {a:{b:value}}
       */
      validateFieldsReturnFormatValue: async (nameList?: NamePath[]) => {
        if (!Array.isArray(nameList) && nameList)
          throw new Error('nameList must be array');

        const values = await getFormInstance()?.validateFields(nameList);
        const transformedKey = transformKey(values, omitNil);
        return transformedKey ? transformedKey : {};
      },
    }),
    [omitNil, transformKey],
  );

  const items = useMemo(() => {
    return React.Children.toArray(children as any).map((item, index) => {
      if (index === 0 && React.isValidElement(item) && autoFocusFirstInput) {
        return React.cloneElement(item, {
          ...item.props,
          autoFocus: autoFocusFirstInput,
        });
      }
      return item;
    });
  }, [autoFocusFirstInput, children]);

  /** 计算 props 的对象 */
  const submitterProps: SubmitterProps = useMemo(
    () => (typeof submitter === 'boolean' || !submitter ? {} : submitter),
    [submitter],
  );

  /** 渲染提交按钮与重置按钮 */
  const submitterNode = useMemo(() => {
    if (submitter === false) return undefined;
    return (
      <Submitter
        key="submitter"
        {...submitterProps}
        onReset={() => {
          const finalValues = transformKey(
            formRef.current?.getFieldsValue(),
            omitNil,
          );
          submitterProps?.onReset?.(finalValues);
          onReset?.(finalValues);
          // 如果 syncToUrl，清空一下数据
          if (syncToUrl) {
            // 把没有的值设置为未定义可以删掉 url 的参数
            const params = Object.keys(
              transformKey(formRef.current?.getFieldsValue(), false),
            ).reduce((pre, next) => {
              return {
                ...pre,
                [next]: finalValues[next] || undefined,
              };
            }, extraUrlParams);

            /** 在同步到 url 上时对参数进行转化 */
            onUrlSearchChange(genParams(syncToUrl, params, 'set'));
          }
        }}
        submitButtonProps={{
          loading,
          ...submitterProps.submitButtonProps,
        }}
      />
    );
  }, [
    submitter,
    submitterProps,
    loading,
    transformKey,
    omitNil,
    onReset,
    syncToUrl,
    extraUrlParams,
    onUrlSearchChange,
  ]);

  const content = useMemo(() => {
    const wrapItems = grid ? <RowWrapper>{items}</RowWrapper> : items;
    if (contentRender) {
      return contentRender(wrapItems as any, submitterNode, formRef.current);
    }
    return wrapItems;
  }, [grid, RowWrapper, items, contentRender, submitterNode]);

  const preInitialValues = usePrevious(props.initialValues);

  // 提示一个 initialValues ，问的人实在是太多了
  useEffect(() => {
    if (syncToUrl || !props.initialValues || !preInitialValues || rest.request)
      return;
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

  // 初始化给一个默认的 form
  useImperativeHandle(
    propsFormRef,
    () => {
      return {
        ...formRef.current,
        ...formatValues,
      };
    },
    [formatValues, formRef.current],
  );
  useEffect(() => {
    const finalValues = transformKey(
      formRef.current?.getFieldsValue?.(true),
      omitNil,
    );
    onInit?.(finalValues, {
      ...formRef.current,
      ...formatValues,
    });
  }, []);

  return (
    <ProFormContext.Provider
      value={{
        ...formatValues,
        formRef,
      }}
    >
      <ConfigProvider componentSize={rest.size || componentSize}>
        <GridContext.Provider value={{ grid, colProps }}>
          {rest.component !== false && (
            <input
              type="text"
              style={{
                display: 'none',
              }}
            />
          )}
          {content}
        </GridContext.Provider>
      </ConfigProvider>
    </ProFormContext.Provider>
  );
}

/** 自动的formKey 防止重复 */
let requestFormCacheId = 0;

function BaseForm<T = Record<string, any>>(props: BaseFormProps<T>) {
  const {
    extraUrlParams = {},
    syncToUrl,
    isKeyPressSubmit,
    syncToUrlAsImportant = false,
    syncToInitialValues = true,
    children,
    contentRender,
    submitter,
    fieldProps,
    proFieldProps,
    formItemProps,
    groupProps,
    dateFormatter = 'string',
    formRef: propsFormRef,
    onInit,
    form,
    formComponentType,
    onReset,
    grid,
    rowProps,
    colProps,
    omitNil = true,
    request,
    params,
    initialValues,
    formKey = requestFormCacheId,
    readonly,
    onLoadingChange,
    loading: propsLoading,
    ...propRest
  } = props;
  const formRef = useRef<ProFormInstance<any>>({} as any);
  const [loading, setLoading] = useMountMergeState<boolean>(false, {
    onChange: onLoadingChange,
    value: propsLoading,
  });

  const [urlSearch, setUrlSearch] = useUrlSearchParams(
    {},
    { disabled: !syncToUrl },
  );
  const curFormKey = useRef<string>(nanoid());

  useEffect(() => {
    requestFormCacheId += 0;
  }, []);
  const [initialData] = useFetchData({
    request,
    params,
    proFieldKey: formKey,
  });

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-form');
  // css
  const { wrapSSR, hashId } = useStyle('ProForm', (token) => {
    return {
      [`.${prefixCls}`]: {
        [`> div:not(${token.proComponentsCls}-form-light-filter)`]: {
          '.pro-field': {
            maxWidth: '100%',
            // 适用于短数字，短文本或者选项
            '&-xs': {
              width: 104,
            },
            '&-s': {
              width: 216,
            },
            // 适用于较短字段录入、如姓名、电话、ID 等。
            '&-sm': {
              width: 216,
            },
            '&-m': {
              width: 328,
            },
            // 标准宽度，适用于大部分字段长度
            '&-md': {
              width: 328,
            },
            '&-l': {
              width: 440,
            },
            // 适用于较长字段录入，如长网址、标签组、文件路径等。
            '&-lg': {
              width: 440,
            },
            // 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
            '&-xl': {
              width: 552,
            },
          },
        },
      },
    };
  });

  // 如果为 false，不需要触发设置进去
  const [urlParamsMergeInitialValues, setUrlParamsMergeInitialValues] =
    useState(() => {
      if (!syncToUrl) {
        return {};
      }
      return genParams(syncToUrl, urlSearch, 'get');
    });

  /** 保存 transformKeyRef，用于对表单key transform */
  const transformKeyRef = useRef<
    Record<string, SearchTransformKeyFn | undefined>
  >({});

  const fieldsValueType = useRef<
    Record<
      string,
      {
        valueType: ProFieldValueType;
        dateFormat: string;
      }
    >
  >({});

  /** 使用 callback 的类型 */
  const transformKey = useRefFunction(
    (values: any, paramsOmitNil: boolean, parentKey?: NamePath) => {
      return transformKeySubmitValue(
        conversionMomentValue(
          values,
          dateFormatter,
          fieldsValueType.current,
          paramsOmitNil,
          parentKey,
        ),
        transformKeyRef.current,
        paramsOmitNil,
      );
    },
  );

  useEffect(() => {
    if (syncToInitialValues) return;
    setUrlParamsMergeInitialValues({});
  }, [syncToInitialValues]);

  useEffect(() => {
    if (!syncToUrl) return;
    setUrlSearch({
      ...urlSearch,
      ...extraUrlParams,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraUrlParams, syncToUrl]);

  const getPopupContainer = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    // 如果在 drawerForm 和  modalForm 里就渲染dom到父节点里
    // modalForm 可能高度太小不适合
    if (formComponentType && ['DrawerForm'].includes(formComponentType)) {
      return (e: HTMLElement) => e.parentNode || document.body;
    }
    return undefined;
  }, [formComponentType]);

  const onFinish = useRefFunction(async () => {
    // 没设置 onFinish 就不执行
    if (!propRest.onFinish) return;
    // 防止重复提交
    if (loading) return;
    setLoading(true);
    try {
      const finalValues = formRef?.current?.getFieldsFormatValue?.();
      await propRest.onFinish(finalValues);
      if (syncToUrl) {
        // 把没有的值设置为未定义可以删掉 url 的参数
        const syncToUrlParams = Object.keys(
          formRef?.current?.getFieldsFormatValue?.(undefined, false),
        ).reduce((pre, next) => {
          return {
            ...pre,
            [next]: finalValues[next] ?? undefined,
          };
        }, extraUrlParams);
        // fix #3547: 当原先在url中存在的字段被删除时，应该将 params 中的该字段设置为 undefined,以便触发url同步删除
        Object.keys(urlSearch).forEach((key) => {
          if (
            syncToUrlParams[key] !== false &&
            syncToUrlParams[key] !== 0 &&
            !syncToUrlParams[key]
          ) {
            syncToUrlParams[key] = undefined;
          }
        });
        /** 在同步到 url 上时对参数进行转化 */
        setUrlSearch(genParams(syncToUrl, syncToUrlParams, 'set'));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  // 初始化给一个默认的 form
  useImperativeHandle(
    propsFormRef,
    () => {
      return formRef.current;
    },
    [!initialData],
  );

  if (!initialData && props.request) {
    return (
      <div style={{ paddingTop: 50, paddingBottom: 50, textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  return wrapSSR(
    <EditOrReadOnlyContext.Provider
      value={{
        mode: props.readonly ? 'read' : 'edit',
      }}
    >
      <ProConfigProvider needDeps>
        {/* // 增加国际化的能力，与 table 组件可以统一 */}
        <FieldContext.Provider
          value={{
            formRef,
            fieldProps,
            proFieldProps,
            formItemProps,
            groupProps,
            formComponentType,
            getPopupContainer,
            formKey: curFormKey.current,
            setFieldValueType: (
              name,
              { valueType = 'text', dateFormat, transform },
            ) => {
              if (!Array.isArray(name)) return;

              transformKeyRef.current = namePathSet(
                transformKeyRef.current,
                name,
                transform,
              );

              fieldsValueType.current = namePathSet(
                fieldsValueType.current,
                name,
                {
                  valueType,
                  dateFormat,
                },
              );
            },
          }}
        >
          <FormListContext.Provider value={{}}>
            <Form
              onKeyPress={(event) => {
                if (!isKeyPressSubmit) return;
                if (event.key === 'Enter') {
                  formRef.current?.submit();
                }
              }}
              autoComplete="off"
              form={form}
              {...omit(propRest, [
                'labelWidth',
                'autoFocusFirstInput',
              ] as any[])}
              // 组合 urlSearch 和 initialValues
              initialValues={
                syncToUrlAsImportant
                  ? {
                      ...initialValues,
                      ...initialData,
                      ...urlParamsMergeInitialValues,
                    }
                  : {
                      ...urlParamsMergeInitialValues,
                      ...initialValues,
                      ...initialData,
                    }
              }
              onValuesChange={(changedValues, values) => {
                propRest?.onValuesChange?.(
                  transformKey(changedValues, !!omitNil),
                  transformKey(values, !!omitNil),
                );
              }}
              className={classNames(props.className, prefixCls, hashId)}
              onFinish={onFinish}
            >
              <BaseFormComponents
                transformKey={transformKey}
                autoComplete="off"
                loading={loading}
                onUrlSearchChange={setUrlSearch}
                {...props}
                formRef={formRef}
                initialValues={{
                  ...initialValues,
                  ...initialData,
                }}
              />
            </Form>
          </FormListContext.Provider>
        </FieldContext.Provider>
      </ProConfigProvider>
    </EditOrReadOnlyContext.Provider>,
  );
}

export type { FormProps, ProFormInstance, FormItemProps, FormInstance };
export { BaseForm };
