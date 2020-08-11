import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { FormInstance, FormItemProps, FormProps } from 'antd/lib/form';
import { Form, Row, Col } from 'antd';
import moment, { Moment } from 'moment';
import RcResizeObserver from 'rc-resize-observer';
import useMediaQuery from 'use-media-antd-query';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { ConfigContext } from 'antd/lib/config-provider';
import { DownOutlined } from '@ant-design/icons';
import { useIntl, IntlType } from '@ant-design/pro-provider';
import classNames from 'classnames';
import ProField, { ProFieldValueType } from '@ant-design/pro-field';
import { useDeepCompareEffect, ProSchemaComponentTypes } from '@ant-design/pro-utils';

import { genColumnKey } from '../utils';
import Container from '../container';
import { ProColumnsValueTypeFunction } from '../defaultRender';
import { ProColumns, ProColumnsValueType } from '../index';
import FormOption, { FormOptionProps } from './FormOption';
import './index.less';

/**
 * 默认的查询表单配置
 */
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

/**
 * 默认的新建表单配置
 */
const defaultFormColConfig = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
  xxl: 24,
};

/**
 * 用于配置操作栏
 */
export interface SearchConfig {
  /**
   * 查询按钮的文本
   */
  searchText?: string;
  /**
   * 重置按钮的文本
   */
  resetText?: string;

  /**
   * 配置列数
   */
  span?: number | typeof defaultColConfig;
  /**
   * 收起按钮的 render
   */
  collapseRender?: (
    collapsed: boolean,
    /**
     * 是否应该展示，有两种情况
     * 列只有三列，不需要收起
     * form 模式 不需要收起
     */
    showCollapseButton?: boolean,
  ) => React.ReactNode;
  /**
   * 底部操作栏的 render
   * searchConfig 基础的配置
   * props 更加详细的配置
   * {
      type?: 'form' | 'list' | 'table' | 'cardList' | undefined;
      form: FormInstance;
      submit: () => void;
      collapse: boolean;
      setCollapse: (collapse: boolean) => void;
      showCollapseButton: boolean;
   * }
   */
  optionRender?:
    | ((
        searchConfig: Omit<SearchConfig, 'optionRender'>,
        props: Omit<FormOptionProps, 'searchConfig'>,
      ) => React.ReactNode)
    | false;
  /**
   * 是否收起
   */
  collapsed?: boolean;
  /**
   * 收起按钮的事件
   */
  onCollapse?: (collapsed: boolean) => void;
  /**
   * 提交按钮的文本
   */
  submitText?: string;
}

/**
 * 获取最后一行的 offset，保证在最后一列
 * @param length
 * @param span
 */
const getOffset = (length: number, span: number = 8) => {
  const cols = 24 / span;
  return (cols - 1 - (length % cols)) * span;
};

/**
 * 默认的设置
 */
const defaultSearch: SearchConfig = {
  searchText: '查询',
  resetText: '重置',
  span: defaultColConfig,
  collapseRender: (collapsed: boolean) => (collapsed ? '展开' : '收起'),
};

export interface TableFormItem<T> extends Omit<FormItemProps, 'children'> {
  onSubmit?: (value: T) => void;
  onReset?: () => void;
  form?: Omit<FormProps, 'form'>;
  type?: ProSchemaComponentTypes;
  dateFormatter?: 'string' | 'number' | false;
  search?: boolean | SearchConfig;
  formRef?: React.MutableRefObject<FormInstance | undefined> | ((actionRef: FormInstance) => void);
}

export const FormInputRender: React.FC<{
  item: ProColumns<any>;
  value?: any;
  form?: FormInstance;
  type: ProSchemaComponentTypes;
  intl: IntlType;
  onChange?: (value: any) => void;
  onSelect?: (value: any) => void;
}> = React.forwardRef((props, ref: any) => {
  const { item, intl, form, type, ...rest } = props;
  const { valueType: itemValueType } = item;
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
    const defaultRender = (newItem: ProColumns<any>) => (
      <FormInputRender
        {...({
          ...props,
          item: newItem,
        } || null)}
      />
    );

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

  if (!valueType || valueType === 'text') {
    const { valueEnum } = item;
    if (valueEnum) {
      return (
        <ProField
          valueEnum={valueEnum}
          valueType={valueType}
          ref={ref}
          plain={type !== 'form'}
          mode="edit"
          allowClear
          style={{
            width: '100%',
          }}
          formItemProps={{
            style: { width: '100%' },
            ...item.formItemProps,
          }}
          placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
          {...rest}
        />
      );
    }
  }

  if (valueType === 'dateTime' || valueType === 'date' || valueType === 'time') {
    return (
      <ProField
        ref={ref}
        mode="edit"
        valueType={valueType}
        formItemProps={{
          style: { width: '100%' },
          placeholder: intl.getMessage('tableForm.selectPlaceholder', '请选择'),
          ...item.formItemProps,
        }}
        {...rest}
      />
    );
  }

  if (valueType === 'dateTimeRange' || valueType === 'dateRange') {
    return (
      <ProField
        ref={ref}
        mode="edit"
        valueType={valueType}
        formItemProps={{
          style: { width: '100%' },
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
    <ProField
      mode="edit"
      ref={ref}
      formItemProps={{
        placeholder: intl.getMessage('tableForm.inputPlaceholder', '请输入'),
        style: { width: '100%' },
        ...item.formItemProps,
      }}
      // valueType = textarea，但是在 查询表单这里，应该是个 input 框
      valueType={!valueType || valueType === 'textarea' ? 'text' : valueType}
      plain={type !== 'form'}
      {...rest}
    />
  );
});

export const proFormItemRender: (props: {
  item: ProColumns<any>;
  isForm: boolean;
  type: ProSchemaComponentTypes;
  intl: IntlType;
  formInstance?: FormInstance;
  colConfig:
    | {
        lg: number;
        md: number;
        xxl: number;
        xl: number;
        sm: number;
        xs: number;
      }
    | {
        span: number;
      }
    | undefined;
}) => null | JSX.Element = ({ item, intl, formInstance, type, isForm, colConfig }) => {
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
  const key = genColumnKey(rest.key, index);
  const dom = <FormInputRender item={item} type={type} intl={intl} form={formInstance} />;
  if (!dom) {
    return null;
  }

  // 支持 function 的 title
  const getTitle = () => {
    if (rest.title && typeof rest.title === 'function') {
      return rest.title(item, 'form', '');
    }
    return rest.title;
  };
  return (
    <Col {...colConfig} key={key}>
      <Form.Item
        labelAlign="right"
        label={getTitle()}
        name={Array.isArray(dataIndex) ? dataIndex : key}
        {...(isForm && rest)}
      >
        {dom}
      </Form.Item>
    </Col>
  );
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
const isDateValueType = (type: ProColumnsValueType | ProColumnsValueTypeFunction<any>) => {
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

const getDefaultSearch = (
  search: boolean | SearchConfig | undefined,
  intl: IntlType,
  isForm: boolean,
): SearchConfig => {
  const config = {
    collapseRender: (collapsed: boolean) => {
      if (collapsed) {
        return (
          <>
            {intl.getMessage('tableForm.collapsed', '展开')}
            <DownOutlined
              style={{
                marginLeft: '0.5em',
                transition: '0.3s all',
                transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
              }}
            />
          </>
        );
      }
      return (
        <>
          {intl.getMessage('tableForm.expand', '收起')}
          <DownOutlined
            style={{
              marginLeft: '0.5em',
              transition: '0.3s all',
              transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
            }}
          />
        </>
      );
    },
    searchText: intl.getMessage('tableForm.search', defaultSearch.searchText || '查询'),
    resetText: intl.getMessage('tableForm.reset', defaultSearch.resetText || '重置'),
    submitText: intl.getMessage('tableForm.submit', defaultSearch.submitText || '提交'),
    span: isForm ? defaultFormColConfig : defaultColConfig,
  };

  if (search === undefined || search === true) {
    return config;
  }

  return { ...config, ...search } as Required<SearchConfig>;
};

/**
 * 合并用户和默认的配置
 * @param span
 * @param size
 */
const getSpanConfig = (
  span: number | typeof defaultColConfig,
  size: keyof typeof defaultColConfig,
): number => {
  if (typeof span === 'number') {
    return span;
  }
  const config = {
    ...defaultColConfig,
    ...span,
  };
  return config[size];
};

const FormSearch = <T, U = any>({
  onSubmit,
  formRef,
  dateFormatter = 'string',
  search: propsSearch,
  type,
  form: formConfig = {},
  onReset,
}: TableFormItem<T>) => {
  /**
   * 为了支持 dom 的消失，支持了这个 api
   */
  const intl = useIntl();

  const [form] = Form.useForm();
  const formInstanceRef = useRef<FormInstance | undefined>();
  const searchConfig = getDefaultSearch(propsSearch, intl, type === 'form');
  const { span } = searchConfig;

  const counter = Container.useContainer();
  const [collapse, setCollapse] = useMergedState<boolean>(true, {
    value: searchConfig.collapsed,
    onChange: searchConfig.onCollapse,
  });
  const [proColumnsMap, setProColumnsMap] = useState<{
    [key: string]: ProColumns<any>;
  }>({});

  const windowSize = useMediaQuery();
  const [colSize, setColSize] = useState(getSpanConfig(span || 8, windowSize));
  const [formHeight, setFormHeight] = useState<number | undefined>(88);
  const rowNumber = 24 / colSize || 3;

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

  useEffect(() => {
    setColSize(getSpanConfig(span || 8, windowSize));
  }, [windowSize]);

  useDeepCompareEffect(() => {
    const tempMap = {};
    counter.proColumns.forEach((item) => {
      tempMap[genColumnKey(item.key, item.index)] = item;
    });
    setProColumnsMap(tempMap);
  }, [counter.proColumns]);

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

  const colConfig = typeof span === 'number' ? { span } : span;

  // 这么做是为了在用户修改了输入的时候触发一下子节点的render
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const domList = formInstanceRef.current
    ? columnsList
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
            colConfig,
            intl,
          }),
        )
        .filter((_, index) => (collapse && type !== 'form' ? index < (rowNumber - 1 || 1) : true))
        .filter((item) => !!item)
    : [];
  const { getPrefixCls } = useContext(ConfigContext);

  const className = getPrefixCls('pro-table-search');
  const formClassName = getPrefixCls('pro-table-form');
  return (
    <div
      className={classNames(className, {
        [formClassName]: isForm,
      })}
      style={
        isForm
          ? undefined
          : {
              height: formHeight,
            }
      }
    >
      <RcResizeObserver
        onResize={({ height }) => {
          if (type === 'form') {
            return;
          }
          setFormHeight(height + 24);
        }}
      >
        <div>
          <Form
            {...formConfig}
            form={form}
            onValuesChange={() => forceUpdate()}
            initialValues={columnsList.reduce(
              (pre, item) => {
                const key = genColumnKey(item.key, item.index);
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
          >
            <Form.Item shouldUpdate noStyle>
              {(formInstance) => {
                setTimeout(() => {
                  formInstanceRef.current = formInstance as FormInstance;
                }, 0);
                return null;
              }}
            </Form.Item>
            <Row gutter={16} justify="start">
              <Form.Item label={isForm && ' '} shouldUpdate noStyle>
                <>{domList}</>
              </Form.Item>
              <Col
                {...colConfig}
                offset={getOffset(domList.length, colSize)}
                key="option"
                className={classNames(`${className}-option`, {
                  [`${className}-form-option`]: isForm,
                })}
              >
                <Form.Item label={isForm && ' '}>
                  <FormOption
                    showCollapseButton={columnsList.length > rowNumber - 1 && !isForm}
                    searchConfig={searchConfig}
                    submit={submit}
                    onReset={onReset}
                    form={{
                      ...form,
                      submit: () => {
                        submit();
                        form.submit();
                      },
                    }}
                    type={type}
                    collapse={collapse}
                    setCollapse={setCollapse}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </RcResizeObserver>
    </div>
  );
};

export default FormSearch;
