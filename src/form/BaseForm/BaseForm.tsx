/* eslint-disable react-hooks/exhaustive-deps */ import { omit } from '@rc-component/util';
import { ConfigProvider, Form, Spin } from 'antd';
import classNames from 'classnames';
import React, {
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { nanoid, useMountMergeState, useStyle } from '../../utils';
import { ProFormFieldProviders } from '../context/ProFormFieldProviders';
import { requestFormCacheId } from '../initial/defaultFormKey';
import { useProFormInitialValuesMerge } from '../initial/useProFormInitialValuesMerge';
import { useProFormRequestData } from '../initial/useProFormRequestData';
import { useRequestFormCacheBump } from '../initial/useRequestFormCacheBump';
import { useProFormFinishHandler } from '../submit/useProFormFinishHandler';
import { useProFormTransformKey } from '../submit/useProFormTransformKey';
import { useUrlFormSync } from '../sync/useUrlFormSync';
import { BaseFormComponents, defaultExtraUrlParams } from './BaseFormComponents';
import type { BaseFormProps, ProFormRef } from './BaseFormTypes';

export type {
  BaseFormProps,
  CommonFormProps,
  ProFormInstance,
  ProFormRef,
} from './BaseFormTypes';

export function BaseForm<T = Record<string, any>, U = Record<string, any>>(
  props: BaseFormProps<T, U>,
) {
  const {
    extraUrlParams = defaultExtraUrlParams,
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
  const formRef = useRef<ProFormRef<any>>({} as any);
  const [loading, setLoading] = useMountMergeState<boolean>(false, {
    onChange: onLoadingChange,
    value: propsLoading,
  });

  const { urlSearch, setUrlSearch, urlParamsMergeInitialValues } =
    useUrlFormSync({
      syncToUrl,
      extraUrlParams,
      syncToInitialValues,
    });

  const curFormKey = useRef<string>(nanoid());

  useRequestFormCacheBump();

  const {
    initialData,
    initialDataLoading,
    shouldShowRequestSpin,
    requestPendingEmpty,
  } = useProFormRequestData<T, U>({
    request,
    params,
    formKey,
  });

  const { formInitialValues, componentsInitialValues } =
    useProFormInitialValuesMerge({
      syncToUrlAsImportant,
      initialValues: initialValues as Record<string, any> | undefined,
      initialData: initialData as Record<string, any> | undefined,
      urlParamsMergeInitialValues,
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
            '@media screen and (max-width: 575px)': {
              // 减少了 form 的 padding
              maxWidth: 'calc(93vw - 48px)',
            },
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

  const { transformKey, setFieldValueType } =
    useProFormTransformKey(dateFormatter);

  const getPopupContainer = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    // 如果在 drawerForm 和  modalForm 里就渲染dom到父节点里
    // modalForm 可能高度太小不适合
    if (formComponentType && ['DrawerForm'].includes(formComponentType)) {
      return (e: HTMLElement) => e.parentNode || document.body;
    }
    return undefined;
  }, [formComponentType]);

  const onFinish = useProFormFinishHandler({
    formRef,
    loading,
    setLoading,
    userOnFinish: propRest.onFinish,
    syncToUrl,
    extraUrlParams,
    urlSearch,
    setUrlSearch,
  });

  const fieldContextValue = useMemo(
    () => ({
      formRef,
      fieldProps,
      proFieldProps,
      formItemProps,
      groupProps,
      formComponentType,
      getPopupContainer,
      formKey: curFormKey.current,
      setFieldValueType,
    }),
    [
      fieldProps,
      proFieldProps,
      formItemProps,
      groupProps,
      formComponentType,
      getPopupContainer,
      setFieldValueType,
    ],
  );

  // 初始化给一个默认的 form
  useImperativeHandle(propsFormRef, () => {
    return formRef.current;
  }, [!initialData]);

  if (shouldShowRequestSpin) {
    return (
      <div style={{ paddingTop: 50, paddingBottom: 50, textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  return wrapSSR(
    <ProFormFieldProviders
      readonly={props.readonly}
      fieldContextValue={fieldContextValue}
    >
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
          'ref',
          'labelWidth',
          'autoFocusFirstInput',
        ] as any[])}
        ref={(instance) => {
          if (!formRef.current) return;
          formRef.current.nativeElement = instance?.nativeElement;
          formRef.current.focus = () => {
            const firstInput = instance?.nativeElement?.querySelector(
              'input, textarea, select',
            ) as HTMLElement;
            firstInput?.focus();
          };
        }}
        initialValues={formInitialValues}
        onValuesChange={(changedValues, values) => {
          propRest?.onValuesChange?.(
            transformKey(changedValues, !!omitNil),
            transformKey(values, !!omitNil),
          );
        }}
        className={classNames(props.className, prefixCls, hashId)}
        onFinish={onFinish}
      >
        <BaseFormComponents<T, U>
          transformKey={transformKey}
          autoComplete="off"
          loading={loading || requestPendingEmpty}
          onUrlSearchChange={setUrlSearch}
          {...props}
          formRef={formRef}
          initialValues={componentsInitialValues}
        />
      </Form>
    </ProFormFieldProviders>,
  );
}
