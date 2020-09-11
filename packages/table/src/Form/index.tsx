import React, { useContext, useEffect, useRef, useCallback } from 'react';
import { FormInstance, FormItemProps, FormProps } from 'antd/lib/form';
import { Form } from 'antd';
import { useIntl, IntlType } from '@ant-design/pro-provider';
import ProForm, { QueryFilter, ProFormField, BaseQueryFilterProps } from '@ant-design/pro-form';
import classNames from 'classnames';
import { ProFieldValueType } from '@ant-design/pro-field';
import { ConfigContext } from 'antd/lib/config-provider/context';
import { Store } from 'antd/lib/form/interface';
import {
  useDeepCompareEffect,
  ProSchemaComponentTypes,
  conversionSubmitValue,
  transformKeySubmitValue,
  SearchTransformKeyFn,
} from '@ant-design/pro-utils';
import warningOnce from 'rc-util/lib/warning';

import { genColumnKey } from '../utils';
import Container from '../container';
import { ProColumns } from '../index';
import './index.less';

export interface TableFormItem<T> extends Omit<FormItemProps, 'children' | 'onReset'> {
  onSubmit?: (value: T) => void;
  onReset?: (value: T) => void;
  form?: Omit<FormProps, 'form'>;
  type?: ProSchemaComponentTypes;
  dateFormatter?: 'string' | 'number' | false;
  search?: false | BaseQueryFilterProps;
  formRef?: React.MutableRefObject<FormInstance | undefined> | ((actionRef: FormInstance) => void);
}

export type SearchConfig = BaseQueryFilterProps;

export const formInputRender: React.FC<{
  item: ProColumns<any>;
  value?: any;
  form?: FormInstance;
  type: ProSchemaComponentTypes;
  intl: IntlType;
  onChange?: (value: any) => void;
  onSelect?: (value: any) => void;
  [key: string]: any;
}> = (props, ref: any) => {
  const { item, intl, form, type, formItemProps, ...rest } = props;
  const { valueType: itemValueType = 'text' } = item;
  // if function， run it
  const valueType =
    ((typeof itemValueType === 'function'
      ? (itemValueType({}) as ProFieldValueType)
      : itemValueType) as ProFieldValueType) || 'text';

  /**
   * 自定义 render
   */
  if (item.renderFormItem) {
    /**
     *删除 renderFormItem 防止重复的 dom 渲染
     */
    const { renderFormItem, ...restItem } = item;
    const defaultRender = (newItem: ProColumns<any>) =>
      formInputRender({
        ...({
          ...props,
          item: newItem,
        } || null),
      });

    // 自动注入 onChange 和 value，用户自己很有可能忘记
    const dom = renderFormItem(
      restItem,
      { ...rest, type, defaultRender },
      form as any,
    ) as React.ReactElement;

    // 有可能不是一个组件
    if (!React.isValidElement(dom)) {
      return dom;
    }
    const defaultProps = dom.props as any;
    if (defaultProps.isDefaultDom) {
      return dom;
    }
    // 已用户的为主，不然过于 magic
    return (
      <ProFormField
        key={`${item.dataIndex || ''}-${item.key || ''}-${item.index}`}
        {...rest}
        ref={ref}
        initialValue={item.initialValue}
        name={item.key || item.dataIndex}
      >
        {React.cloneElement(dom, { ...rest, ...defaultProps })}
      </ProFormField>
    );
  }

  const { onChange, ...restFieldProps } = item.fieldProps || {};

  return (
    <ProFormField
      ref={ref}
      isDefaultDom
      valueEnum={item.valueEnum}
      name={item.key || item.dataIndex}
      onChange={onChange}
      // @ts-ignore
      fieldProps={restFieldProps || item.formItemProps}
      // valueType = textarea，但是在 查询表单这里，应该是个 input 框
      valueType={
        !valueType || (['textarea', 'jsonCode', 'code'].includes(valueType) && type === 'table')
          ? 'text'
          : valueType
      }
      initialValue={item.initialValue}
      {...rest}
      rules={type === 'form' ? rest.rules : undefined}
      key={`${item.dataIndex || ''}-${item.key || ''}-${item.index}`}
    />
  );
};

export const proFormItemRender: (props: {
  item: ProColumns<any>;
  isForm: boolean;
  type: ProSchemaComponentTypes;
  intl: IntlType;
  formInstance?: FormInstance;
}) => null | JSX.Element = ({ item, intl, formInstance, type }) => {
  const {
    valueType,
    dataIndex,
    valueEnum,
    renderFormItem,
    render,
    hideInForm,
    hideInSearch,
    search,
    hideInTable,
    renderText,
    order,
    width,
    sorter,
    formItemProps,
    initialValue,
    ellipsis,
    index,
    filters,
    ...rest
  } = item;

  // 支持 function 的 title
  const getTitle = () => {
    if (rest.title && typeof rest.title === 'function') {
      return rest.title(item, 'form', '');
    }
    return rest.title;
  };
  const dom = formInputRender({
    item,
    type,
    intl,
    form: formInstance,
    label: getTitle(),
    ...formItemProps,
  });
  if (!dom) {
    return null;
  }

  return dom;
};

const FormSearch = <T, U = any>({
  onSubmit,
  formRef,
  dateFormatter = 'string',
  type,
  onReset,
  search: searchConfig,
  form: formConfig = {},
}: TableFormItem<T>) => {
  /**
   * 为了支持 dom 的消失，支持了这个 api
   */
  const intl = useIntl();

  const [form] = Form.useForm();

  const formInstanceRef = useRef<FormInstance | undefined>(form as any);

  const counter = Container.useContainer();

  /**
   * 保存 valueTypeRef，用于分辨是用什么方式格式化数据
   */
  const valueTypeRef = useRef<{
    [key: string]: ProFieldValueType;
  }>({});

  /**
   * 保存 transformKeyRef，用于对表单key transform
   */
  const transformKeyRef = useRef<{
    [key: string]: SearchTransformKeyFn;
  }>({});

  // 这么做是为了在用户修改了输入的时候触发一下子节点的render
  const [, updateState] = React.useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const isForm = type === 'form';

  // 触发onSubmit
  const triggerSubmit = (value: Store) => {
    if (onSubmit) {
      const finalValue = transformKeySubmitValue(
        conversionSubmitValue(value, dateFormatter, valueTypeRef.current) as T,
        transformKeyRef.current,
      );
      onSubmit(finalValue);
    }
  };

  /**
   *提交表单，根据两种模式不同，方法不相同
   */
  const submit = async () => {
    // 如果不是表单模式，不用进行验证
    if (!isForm) {
      const value = form.getFieldsValue();
      triggerSubmit(value);
      return;
    }
    try {
      const value = await form.validateFields();
      triggerSubmit(value);
    } catch (error) {
      // console.log(error)
    }
  };

  useEffect(() => {
    if (!formRef) {
      return;
    }
    if (typeof formRef === 'function') {
      formRef(form);
    }
    if (formRef && typeof formRef !== 'function') {
      // eslint-disable-next-line no-param-reassign
      formRef.current = {
        ...form,
        submit: () => {
          submit();
          form.submit();
        },
      };
    }
  }, []);

  useDeepCompareEffect(() => {
    if (counter.proColumns.length < 1) {
      return;
    }
    const tempMap = {};
    const transformKeyMap = {};

    counter.proColumns.forEach((item) => {
      const { key, dataIndex, index, valueType, search, hideInSearch, formItemProps } = item;
      warningOnce(
        typeof hideInSearch !== 'boolean',
        `'hideInSearch' will be deprecated, please use 'search'`,
      );
      warningOnce(!formItemProps, `'formItemProps' will be deprecated, please use 'fieldProps'`);

      // 以key为主,理论上key唯一
      const finalKey = genColumnKey((key || dataIndex) as string, index);
      // 如果是() => ValueType
      const finalValueType = typeof valueType === 'function' ? valueType(item) : valueType;

      tempMap[finalKey] = finalValueType;
      transformKeyMap[finalKey] =
        typeof search === 'boolean' || !search
          ? undefined
          : (value: any, fieldName: string, target: any) =>
              search?.transform(value, fieldName, target);
    });
    valueTypeRef.current = tempMap;
    transformKeyRef.current = transformKeyMap;
  }, [counter.proColumns]);

  const { getPrefixCls } = useContext(ConfigContext);

  const columnsList = counter.proColumns
    .filter((item) => {
      const { valueType } = item;
      if ((item.hideInSearch || item.search === false) && type !== 'form') {
        return false;
      }
      if (type === 'form' && item.hideInForm) {
        return false;
      }
      if (
        valueType !== 'index' &&
        valueType !== 'indexBorder' &&
        valueType !== 'option' &&
        (item.key || item.dataIndex)
      ) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      if (a && b) {
        return (b.order || 0) - (a.order || 0);
      }
      if (a && a.order) {
        return -1;
      }
      if (b && b.order) {
        return 1;
      }
      return 0;
    });

  const domList = columnsList
    .map((item, index) =>
      proFormItemRender({
        isForm,
        formInstance: formInstanceRef.current,
        item: {
          key: item.dataIndex?.toString() || index,
          index,
          ...item,
        },
        type,
        intl,
      }),
    )
    .filter((item) => !!item);

  const className = getPrefixCls('pro-table-search');
  const formClassName = getPrefixCls('pro-table-form');
  const FormCompetent = isForm ? ProForm : QueryFilter;

  return (
    <div
      className={classNames(className, {
        [formClassName]: isForm,
      })}
    >
      <FormCompetent
        defaultCollapsed
        {...(searchConfig || {})}
        {...formConfig}
        form={form}
        onValuesChange={(change, all) => {
          forceUpdate();
          if (formConfig.onValuesChange) {
            formConfig.onValuesChange(change, all);
          }
        }}
        onReset={() => {
          if (onReset) {
            const value = form.getFieldsValue() as T;
            onReset(value);
          }
        }}
        onFinish={() => {
          submit();
        }}
        initialValues={formConfig.initialValues}
        labelWidth={searchConfig ? searchConfig?.labelWidth : undefined}
      >
        {domList}
      </FormCompetent>
    </div>
  );
};

export default FormSearch;
