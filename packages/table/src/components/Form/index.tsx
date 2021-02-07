import React, { useContext, useRef, useCallback, useState, useMemo } from 'react';
import type { FormInstance, FormItemProps } from 'antd';
import { ConfigProvider } from 'antd';
import type { IntlType } from '@ant-design/pro-provider';
import { useIntl } from '@ant-design/pro-provider';
import type { BaseQueryFilterProps, QueryFilterProps, ProFormProps } from '@ant-design/pro-form';
import ProForm, { QueryFilter, LightFilter, ProFormField } from '@ant-design/pro-form';
import classNames from 'classnames';
import omit from 'omit.js';
import type { ProSchemaComponentTypes, ProFieldValueType } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import { useDeepCompareEffect, getFieldPropsOrFormItemProps } from '@ant-design/pro-utils';
import type { ProColumns } from '../../index';
import './index.less';

export type SearchConfig = BaseQueryFilterProps & {
  filterType?: 'query' | 'light';
};

/**
 * 获取当前选择的 Form Layout 配置
 *
 * @param isForm
 * @param searchConfig
 * @returns LightFilter | QueryFilter | ProForm
 */
const getFormCompetent = (isForm: boolean, searchConfig?: SearchConfig | false) => {
  if (!isForm && searchConfig !== false) {
    if (searchConfig?.filterType === 'light') {
      return {
        Competent: LightFilter,
        competentName: 'light-filter',
      };
    }
    return {
      Competent: QueryFilter,
      competentName: 'query-filter',
    };
  }
  return {
    Competent: ProForm,
    competentName: 'form',
  };
};

/**
 * 获取需要传给相应表单的props
 *
 * @param searchConfig
 * @param name
 */
const getFromProps = (isForm: boolean, searchConfig: any, name: string) => {
  if (!isForm && name === 'light-filter') {
    // 传给 lightFilter 的问题
    return omit(
      {
        ...searchConfig,
      },
      ['labelWidth', 'defaultCollapsed', 'filterType'],
    );
  }

  if (!isForm) {
    // 传给 QueryFilter 的配置
    return omit(
      {
        labelWidth: searchConfig ? searchConfig?.labelWidth : undefined,
        defaultCollapsed: true,
        ...searchConfig,
      },
      ['filterType'],
    );
  }
  return {};
};

/**
 * 从formConfig中获取传给相应表单的配置
 *
 * @param isForm
 * @param formConfig
 */
const getFormConfigs = (isForm: boolean, formConfig: any) => {
  if (isForm) {
    // 传给Form的配置
    return omit(formConfig, ['ignoreRules']);
  }
  // 传给Filter的配置
  return { ignoreRules: true, ...formConfig };
};

export type TableFormItem<T, U = any> = {
  onSubmit?: (value: T, firstLoad: boolean) => void;
  onReset?: (value: T) => void;
  form?: Omit<ProFormProps, 'form'>;
  type?: ProSchemaComponentTypes;
  dateFormatter?: 'string' | 'number' | false;
  search?: false | SearchConfig;
  columns: ProColumns<U, any>[];
  formRef: React.MutableRefObject<FormInstance | undefined>;
  submitButtonLoading?: boolean;
  manualRequest?: boolean;
  bordered?: boolean;
} & Omit<FormItemProps, 'children' | 'onReset'>;

/**
 * 把配置转化为输入控件
 *
 * @param props
 * @param ref
 */
export const formInputRender: React.FC<{
  item: ProColumns<any>;
  value?: any;
  form?: FormInstance<any>;
  type: ProSchemaComponentTypes;
  intl: IntlType;
  onChange?: (value: any) => void;
  onSelect?: (value: any) => void;
  [key: string]: any;
}> = (props, ref: any) => {
  const { item, intl, form, type, formItemProps: propsFormItemProps, ...rest } = props;
  const formItemProps = getFieldPropsOrFormItemProps(
    propsFormItemProps,
    form,
    item,
  ) as FormItemProps<any>;

  const { valueType: itemValueType = 'text' } = item;
  // if function， run it
  const valueType =
    ((typeof itemValueType === 'function'
      ? (itemValueType({}, type) as ProFieldValueType)
      : itemValueType) as ProFieldValueType) || 'text';

  const { onChange, ...restFieldProps } = getFieldPropsOrFormItemProps(
    item.fieldProps || {},
    form,
    item,
  ) as any;

  /** 公共的 props */
  const initialProps = {
    name: item.key || item.dataIndex,
    initialValue: item.initialValue,
    params: item.params,
    key: `${item.dataIndex || ''}-${item.key || ''}-${item.index}`,
    formItemProps,
    transform: item.search ? item.search?.transform : undefined,
  };

  /** 自定义 render */
  if (item.renderFormItem && form) {
    /** 删除 renderFormItem 防止重复的 dom 渲染 */
    const { renderFormItem, ...restItem } = item;
    const defaultRender = (newItem: ProColumns<any>) =>
      formInputRender({
        ...{
          ...props,
          item: newItem,
        },
      });

    /** 拼接 renderFormItem 的配置 */
    const renderFormItemProps = omit(
      {
        ...rest,
        type,
        defaultRender,
      } as any,
      ['colSize'],
    ) as any;

    // 自动注入 onChange 和 value，用户自己很有可能忘记
    const dom = renderFormItem(
      {
        ...restItem,
        type: 'form',
      },
      renderFormItemProps,
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
    return (
      <ProFormField
        {...rest}
        {...initialProps}
        ref={ref}
        fieldProps={{
          style: {
            width: undefined,
          },
          ...item.fieldProps,
        }}
      >
        {React.cloneElement(dom, omit({ ...rest, ...defaultProps }, ['colSize']))}
      </ProFormField>
    );
  }

  const finalValueType =
    !valueType || (['textarea', 'jsonCode', 'code'].includes(valueType) && type === 'table')
      ? 'text'
      : (valueType as 'text');

  return (
    <ProFormField
      ref={ref}
      tooltip={item.tooltip || item.tip}
      isDefaultDom
      valueEnum={runFunction<[undefined]>(item.valueEnum, undefined)}
      onChange={onChange}
      fieldProps={{
        style: {
          width: undefined,
        },
        ...restFieldProps,
      }}
      {...rest}
      {...initialProps}
      // valueType = textarea，但是在 查询表单这里，应该是个 input 框
      valueType={finalValueType}
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
    request,
    params,
    colSize,
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
    request,
    params,
    formItemProps,
    colSize,
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
  columns,
  manualRequest,
  onReset,
  submitButtonLoading,
  search: searchConfig,
  form: formConfig = {},
  bordered,
}: TableFormItem<T, U>) => {
  /** 为了支持 dom 的消失，支持了这个 api */
  const intl = useIntl();

  const isForm = type === 'form';
  /** 提交表单，根据两种模式不同，方法不相同 */
  const submit = async (values: T, firstLoad: boolean) => {
    if (onSubmit) {
      onSubmit(values, firstLoad);
    }
  };

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const columnsList = useMemo(() => {
    return columns
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
        if (b.order || a.order) {
          return (b.order || 0) - (a.order || 0);
        }
        return (b.index || 0) - (a.index || 0);
      });
  }, [columns, type]);

  const columnsListRef = useRef<JSX.Element[]>([]);

  const updateDomList = useCallback(
    (list: ProColumns<any>[]) => {
      const newFormItemList = list
        .map((item, index) =>
          proFormItemRender({
            isForm,
            formInstance: formRef.current || undefined,
            item: {
              index,
              ...item,
            },
            type,
            intl,
          }),
        )
        .filter((item) => !!item) as JSX.Element[];
      columnsListRef.current = newFormItemList;
      return newFormItemList;
    },
    [formRef, intl, isForm, type],
  );

  const [domList, setDomList] = useState<JSX.Element[]>(() => updateDomList(columnsList));

  useDeepCompareEffect(() => {
    if (columnsList.length < 1) return;
    setDomList(updateDomList(columnsList));
  }, [columnsList]);

  const className = getPrefixCls('pro-table-search');
  const formClassName = getPrefixCls('pro-table-form');

  const { Competent, competentName } = useMemo(
    () =>
      getFormCompetent(isForm, searchConfig) as {
        Competent: React.FC<QueryFilterProps>;
        competentName: string;
      },
    [searchConfig, isForm],
  );

  // 传给每个表单的配置，理论上大家都需要
  const loadingProps: any = useMemo(
    () => ({
      submitter: {
        submitButtonProps: {
          loading: submitButtonLoading,
        },
      },
    }),
    [submitButtonLoading],
  );
  return (
    <div
      className={classNames(className, {
        [formClassName]: isForm,
        [getPrefixCls(`pro-table-search-${competentName}`)]: true,
        [`${getPrefixCls('card')}-bordered`]: !!bordered,
      })}
    >
      <Competent
        {...loadingProps}
        {...getFromProps(isForm, searchConfig, competentName)}
        {...getFormConfigs(isForm, formConfig)}
        formRef={formRef}
        onValuesChange={(change, all) => {
          setDomList(updateDomList(columnsList));
          if (formConfig.onValuesChange) {
            formConfig.onValuesChange(change, all);
          }
        }}
        dateFormatter={dateFormatter}
        onInit={(values: T) => {
          // 触发一个 submit，之所以这里触发是为了保证 value 都被 format了
          if (type !== 'form') {
            // 重新计算一下dom
            setDomList(updateDomList(columnsList));
            /** 如果是手动模式不需要提交 */
            if (manualRequest) return;
            submit(values, true);
          }
        }}
        onReset={(values: T) => {
          onReset?.(values);
        }}
        onFinish={(values: T) => {
          submit(values, false);
        }}
        initialValues={formConfig.initialValues}
      >
        {domList}
      </Competent>
    </div>
  );
};

export default React.memo(FormSearch) as typeof FormSearch;
