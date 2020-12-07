import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
  useImperativeHandle,
  useMemo,
} from 'react';
import { FormInstance, FormItemProps } from 'antd/lib/form';
import { ConfigProvider } from 'antd';
import { useIntl, IntlType } from '@ant-design/pro-provider';
import ProForm, {
  QueryFilter,
  LightFilter,
  ProFormField,
  BaseQueryFilterProps,
  QueryFilterProps,
  ProFormProps,
} from '@ant-design/pro-form';
import classNames from 'classnames';
import { ProFieldValueType } from '@ant-design/pro-field';
import warningOnce from 'rc-util/lib/warning';
import omit from 'omit.js';

import {
  useDeepCompareEffect,
  ProSchemaComponentTypes,
  conversionSubmitValue,
  transformKeySubmitValue,
  SearchTransformKeyFn,
} from '@ant-design/pro-utils';

import { genColumnKey, getFieldPropsOrFormItemProps } from '../utils';
import { ProColumns } from '../index';
import './index.less';

export type SearchConfig = BaseQueryFilterProps & {
  filterType?: 'query' | 'light';
};

/**
 *  获取当前选择的 Form Layout 配置
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

export interface TableFormItem<T, U = any> extends Omit<FormItemProps, 'children' | 'onReset'> {
  onSubmit?: (value: T, firstLoad: boolean) => void;
  onReset?: (value: T) => void;
  form?: Omit<ProFormProps, 'form'>;
  type?: ProSchemaComponentTypes;
  dateFormatter?: 'string' | 'number' | false;
  search?: false | SearchConfig;
  columns: ProColumns<U>[];
  formRef?: React.MutableRefObject<FormInstance | undefined> | ((formRef: FormInstance) => void);
  submitButtonLoading?: boolean;
}

/**
 * 把配置转化为输入控件
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
        ...{
          ...props,
          item: newItem,
        },
      });

    // 自动注入 onChange 和 value，用户自己很有可能忘记
    const dom = renderFormItem(
      restItem,
      {
        ...rest,
        type,
        defaultRender,
      },
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
        key={`${item.dataIndex || ''}-${item.key || ''}-${item.index}`}
        {...rest}
        ref={ref}
        initialValue={item.initialValue}
        name={item.key || item.dataIndex}
        params={item.params}
        fieldProps={{
          style: {
            width: undefined,
          },
          ...item.fieldProps,
        }}
        formItemProps={formItemProps}
      >
        {React.cloneElement(dom, { ...rest, ...defaultProps })}
      </ProFormField>
    );
  }

  const { onChange, ...restFieldProps } = getFieldPropsOrFormItemProps(
    item.fieldProps || {},
    form,
    item,
  );

  const finalValueType =
    !valueType || (['textarea', 'jsonCode', 'code'].includes(valueType) && type === 'table')
      ? 'text'
      : (valueType as 'text');

  return (
    <ProFormField
      ref={ref}
      tooltip={item.tooltip || item.tip}
      isDefaultDom
      valueEnum={item.valueEnum}
      name={item.key || item.dataIndex}
      onChange={onChange}
      fieldProps={{
        style: {
          width: undefined,
        },
        ...restFieldProps,
      }}
      // valueType = textarea，但是在 查询表单这里，应该是个 input 框
      valueType={finalValueType}
      initialValue={item.initialValue}
      {...rest}
      formItemProps={{
        ...formItemProps,
        rules: type === 'form' ? rest?.rules || formItemProps?.rules : undefined,
      }}
      rules={undefined}
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
    request,
    params,
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
  onReset,
  submitButtonLoading,
  search: searchConfig,
  form: formConfig = {},
}: TableFormItem<T, U>) => {
  /**
   * 为了支持 dom 的消失，支持了这个 api
   */
  const intl = useIntl();

  const formInstanceRef = useRef<FormInstance | undefined>();

  /**
   * 保存 valueTypeRef，用于分辨是用什么方式格式化数据
   */
  const valueTypeRef = useRef<{
    [key: string]: ProFieldValueType;
  }>();

  /**
   * 保存 transformKeyRef，用于对表单key transform
   */
  const transformKeyRef = useRef<{
    [key: string]: SearchTransformKeyFn;
  }>({});

  const isForm = type === 'form';
  /**
   *提交表单，根据两种模式不同，方法不相同
   */
  const submit = useCallback(
    async (firstLoad: boolean) => {
      let value;
      // 如果不是表单模式，不用进行验证
      if (!isForm) {
        value = formInstanceRef.current?.getFieldsValue();
      } else {
        try {
          value = await formInstanceRef.current?.validateFields();
        } catch (error) {
          // console.log(error)
        }
      }
      if (onSubmit && valueTypeRef.current) {
        // 转化值
        // moment -> string
        // key: [value, value] -> { key:value, key: value }
        const finalValue = transformKeySubmitValue(
          conversionSubmitValue(value, dateFormatter, valueTypeRef.current) as T,
          transformKeyRef.current,
        );
        onSubmit(finalValue, firstLoad);
      }
    },
    [formInstanceRef.current, onSubmit],
  );

  useImperativeHandle(
    formRef,
    () =>
      ({
        ...formInstanceRef.current,
        submit: () => {
          submit(false);
          formInstanceRef.current?.submit();
        },
      } as any),
    [formInstanceRef.current],
  );

  useEffect(() => {
    if (!formRef) {
      return;
    }
    if (typeof formRef === 'function' && formInstanceRef.current) {
      formRef(formInstanceRef.current);
    }
  }, [formInstanceRef.current]);

  useDeepCompareEffect(() => {
    const tempMap = {};
    const transformKeyMap = {};

    columns.forEach((item) => {
      const { key, dataIndex, index, valueType, search, hideInSearch } = item;
      warningOnce(
        typeof hideInSearch !== 'boolean',
        `'hideInSearch' will be deprecated, please use 'search'`,
      );
      // 以key为主,理论上key唯一
      const finalKey = genColumnKey((key || dataIndex) as string, index);
      // 如果是() => ValueType 需要特殊处理一下
      tempMap[finalKey] =
        typeof valueType === 'function' ? valueType(item as any, type) : valueType;

      if (search !== false && search) {
        transformKeyMap[finalKey] = (value: any, fieldName: string, target: any) =>
          search?.transform(value, fieldName, target);
      }
    });
    // 触发一个 submit，之所以这里触发是为了保证 value 都被 format了
    if (!valueTypeRef.current && type !== 'form') {
      // 下面才去赋值，所以用 setTimeout 延时一下，略微性能好一点
      setTimeout(() => {
        submit(true);
      }, 0);
    }
    valueTypeRef.current = tempMap;
    transformKeyRef.current = transformKeyMap;
  }, [columns]);

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
      .sort((a, b) => (b.order || 0) - (a.order || 0));
  }, [columns]);

  const [domList, setDomList] = useState<JSX.Element[]>([]);
  const columnsListRef = useRef(domList);

  const updateDomList = useCallback(
    (list: ProColumns<any>[]) => {
      const newFormItemList = list
        .map((item, index) =>
          proFormItemRender({
            isForm,
            formInstance: formInstanceRef.current,
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
      setDomList(newFormItemList);
    },
    [formInstanceRef.current],
  );

  useDeepCompareEffect(() => {
    if (columnsList.length < 1 || !formInstanceRef.current) return;
    updateDomList(columnsList);
  }, [columnsList, formInstanceRef.current]);

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
      })}
    >
      <Competent
        {...loadingProps}
        {...getFromProps(isForm, searchConfig, competentName)}
        {...formConfig}
        formRef={formInstanceRef}
        onValuesChange={(change, all) => {
          updateDomList(columnsList);
          if (formConfig.onValuesChange) {
            formConfig.onValuesChange(change, all);
          }
        }}
        onReset={() => {
          if (onReset && valueTypeRef.current) {
            const value = formInstanceRef.current?.getFieldsValue() as T;
            const finalValue = transformKeySubmitValue(
              conversionSubmitValue(value, dateFormatter, valueTypeRef.current) as T,
              transformKeyRef.current,
            );
            onReset(finalValue);
          }
        }}
        onFinish={() => {
          submit(false);
        }}
        initialValues={formConfig.initialValues}
      >
        {domList}
      </Competent>
    </div>
  );
};

export default React.memo(FormSearch) as typeof FormSearch;
