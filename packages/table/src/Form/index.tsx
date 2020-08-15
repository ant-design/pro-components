import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { FormInstance, FormItemProps, FormProps } from 'antd/lib/form';
import { Form } from 'antd';
import moment, { Moment } from 'moment';
import { useIntl, IntlType } from '@ant-design/pro-provider';
import ProForm, { QueryFilter, ProFormText, BaseQueryFilterProps } from '@ant-design/pro-form';
import classNames from 'classnames';
import { ProFieldValueType } from '@ant-design/pro-field';
import { ConfigContext } from 'antd/lib/config-provider/context';
import { useDeepCompareEffect, ProSchemaComponentTypes } from '@ant-design/pro-utils';

import { genColumnKey } from '../utils';
import Container from '../container';
import { ProColumns, ProColumnsValueType } from '../index';
import './index.less';

export interface TableFormItem<T> extends Omit<FormItemProps, 'children'> {
  onSubmit?: (value: T) => void;
  onReset?: () => void;
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
  const { item, intl, form, type, ...rest } = props;
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

    // 自动注入 onChange 和 value,用户自己很有肯能忘记
    const dom = renderFormItem(
      restItem,
      { ...rest, type, defaultRender },
      form as any,
    ) as React.ReactElement;

    // 有可能不是不是一个组件
    if (!React.isValidElement(dom)) {
      return dom;
    }
    const defaultProps = dom.props as any;
    // 已用户的为主，不然过于 magic
    return React.cloneElement(dom, { ...rest, ...defaultProps });
  }

  if (
    valueType === 'dateTime' ||
    valueType === 'date' ||
    valueType === 'time' ||
    (valueType === 'text' && item.valueEnum)
  ) {
    return (
      <ProFormText
        ref={ref}
        valueEnum={item.valueEnum}
        valueType={valueType}
        formItemProps={{
          allowClear: true,
          placeholder: intl.getMessage('tableForm.selectPlaceholder', '请选择'),
          ...item.formItemProps,
        }}
        {...rest}
      />
    );
  }

  if (valueType === 'dateTimeRange' || valueType === 'dateRange') {
    return (
      <ProFormText
        ref={ref}
        valueType={valueType}
        formItemProps={{
          placeholder: [
            intl.getMessage('tableForm.selectPlaceholder', '请选择'),
            intl.getMessage('tableForm.selectPlaceholder', '请选择'),
          ],
          ...item.formItemProps,
        }}
        {...rest}
      />
    );
  }
  return (
    <ProFormText
      ref={ref}
      formItemProps={item.formItemProps}
      // valueType = textarea，但是在 查询表单这里，应该是个 input 框
      valueType={!valueType || valueType === 'textarea' ? 'text' : valueType}
      plain={type !== 'form'}
      {...rest}
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
    hideInTable,
    renderText,
    order,
    initialValue,
    ellipsis,
    formItemProps,
    index,
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
  });
  if (!dom) {
    return null;
  }

  return dom;
};

const dateFormatterMap = {
  time: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateRange: 'YYYY-MM-DD',
  dateTimeRange: 'YYYY-MM-DD HH:mm:ss',
};

/**
 * 判断 DataType 是不是日期类型
 * @param type
 */
const isDateValueType = (type: ProColumns<{}>['valueType']) => {
  let valueType: ProColumnsValueType = type as ProColumnsValueType;
  if (typeof type === 'function') {
    // 如果是 object 说明是进度条，直接返回 false
    if (typeof type({}) === 'object') {
      return false;
    }
    valueType = type({}) as ProColumnsValueType;
  }
  const dateTypes = ['date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'];
  return dateTypes.includes(valueType);
};

/**
 * 这里主要是来转化一下数据
 * 将 moment 转化为 string
 * 将 all 默认删除
 * @param value
 * @param dateFormatter
 * @param proColumnsMap
 */
const conversionValue = (
  value: any,
  dateFormatter: string | boolean,
  proColumnsMap: { [key: string]: ProColumns<any> },
) => {
  const tmpValue = {};

  Object.keys(value).forEach((key) => {
    const column = proColumnsMap[key || 'null'] || {};
    const valueType = (column.valueType as ProFieldValueType) || 'text';
    const itemValue = value[key];

    // 如果值是 "all"，或者不存在直接删除
    // 下拉框里选 all，会删除
    if (itemValue === undefined || (itemValue === 'all' && column.valueEnum)) {
      return;
    }

    // 如果是日期，再处理这些
    if (!isDateValueType(valueType)) {
      tmpValue[key] = itemValue;
      return;
    }

    // 如果执行到这里，肯定是 ['date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'] 之一
    // 选择日期再清空之后会出现itemValue为 null 的情况，需要删除
    if (!itemValue) {
      return;
    }

    // 如果是 moment 的对象的处理方式
    if (moment.isMoment(itemValue) && dateFormatter) {
      if (dateFormatter === 'string') {
        const formatString = dateFormatterMap[valueType as 'dateTime'];
        tmpValue[key] = (itemValue as Moment).format(formatString || 'YYYY-MM-DD HH:mm:ss');
        return;
      }
      if (dateFormatter === 'number') {
        tmpValue[key] = (itemValue as Moment).valueOf();
        return;
      }
    }

    // 这里是日期数组
    if (Array.isArray(itemValue) && itemValue.length === 2 && dateFormatter) {
      if (dateFormatter === 'string') {
        const formatString = dateFormatterMap[valueType as 'dateTime'];
        const [startValue, endValue] = itemValue;
        // 后端需要日期/时间范围会有[null,date]或者[date,null]的情况
        tmpValue[key] = [
          startValue && moment(startValue as Moment).format(formatString || 'YYYY-MM-DD HH:mm:ss'),
          endValue && moment(endValue as Moment).format(formatString || 'YYYY-MM-DD HH:mm:ss'),
        ];
        return;
      }
      if (dateFormatter === 'number') {
        const [startValue, endValue] = itemValue;
        tmpValue[key] = [
          moment(startValue as Moment).valueOf(),
          moment(endValue as Moment).valueOf(),
        ];
      }
    }

    // 都没命中，原样返回
    tmpValue[key] = itemValue;
  });
  return tmpValue;
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
  const [proColumnsMap, setProColumnsMap] = useState<{
    [key: string]: ProColumns<any>;
  }>({});

  // 这么做是为了在用户修改了输入的时候触发一下子节点的render
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const isForm = type === 'form';

  /**
   *提交表单，根据两种模式不同，方法不相同
   */
  const submit = async () => {
    // 如果不是表单模式，不用进行验证
    if (!isForm) {
      const value = form.getFieldsValue();
      if (onSubmit) {
        onSubmit(conversionValue(value, dateFormatter, proColumnsMap) as T);
      }
      return;
    }
    try {
      const value = await form.validateFields();
      if (onSubmit) {
        onSubmit(conversionValue(value, dateFormatter, proColumnsMap) as T);
      }
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
    counter.proColumns.forEach((item) => {
      tempMap[genColumnKey(item.key, item.index)] = item;
    });
    setProColumnsMap(tempMap);
  }, [counter.proColumns]);

  const { getPrefixCls } = useContext(ConfigContext);

  const columnsList = counter.proColumns
    .filter((item) => {
      const { valueType } = item;
      if (item.hideInSearch && type !== 'form') {
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
        {...(searchConfig || {})}
        {...formConfig}
        form={form}
        onValuesChange={() => {
          forceUpdate();
        }}
        onReset={onReset}
        onFinish={() => {
          submit();
        }}
        defaultCollapsed
        initialValues={columnsList.reduce(
          (pre, item) => {
            const key = item.key || (item.dataIndex as string);
            if (item.initialValue) {
              return {
                ...pre,
                [key]: item.initialValue,
              };
            }
            return pre;
          },
          { ...formConfig.initialValues },
        )}
        labelWidth={searchConfig ? searchConfig?.labelWidth : 80}
      >
        {domList}
      </FormCompetent>
    </div>
  );
};

export default FormSearch;
