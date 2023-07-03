import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import ProForm, { ProFormField } from '@ant-design/pro-form';
import ProSkeleton from '@ant-design/pro-skeleton';
import type {
  ProCoreActionType,
  ProFieldValueType,
  ProSchema,
  ProSchemaComponentTypes,
  RowEditableConfig,
  UseEditableMapUtilType,
} from '@ant-design/pro-utils';
import {
  ErrorBoundary,
  genCopyable,
  getFieldPropsOrFormItemProps,
  InlineErrorFormItem,
  LabelIconTip,
  useEditableMap,
} from '@ant-design/pro-utils';
import type { DescriptionsProps, FormInstance, FormProps } from 'antd';
import { ConfigProvider, Descriptions, Space } from 'antd';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import toArray from 'rc-util/lib/Children/toArray';
import get from 'rc-util/lib/utils/get';
import React, { useContext, useEffect } from 'react';
import { stringify } from 'use-json-comparison';
import type { RequestData } from './useFetchData';
import useFetchData from './useFetchData';

// 兼容代码-----------
import type { ProFieldFCMode } from '@ant-design/pro-provider';
import { proTheme } from '@ant-design/pro-provider';
import 'antd/lib/descriptions/style';
//----------------------

// todo remove it
export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  children: React.ReactNode;
  span?: number;
}

/**
 * 定义列表属性的类型定义，用于定义列表的一列
 * @typedef {Object} ProDescriptionsItemProps
 * @property {ProSchema} schema - 用于生成表格项的 schema 配置对象
 * @property {boolean} [hide] - 是否隐藏该列，可用于权限控制
 * @property {boolean} [plain] - 是否只展示文本，不展示标签
 * @property {boolean} [copyable] - 是否可以拷贝该列的内容
 * @property {boolean | { showTitle?: boolean }} [ellipsis] - 是否展示省略号，如果是一个对象，可以设置鼠标悬浮时是否展示完整的内容
 * @property {ProFieldFCMode} [mode] - ProField 组件的模式
 * @property {React.ReactNode} [children] - 表格项的子组件
 * @property {number} [order] - 表格项的排序
 * @property {number} [index] - 表格项的索引
 * @template T - 表格数据的类型
 * @template ValueType - 表格项的值类型
 */
export type ProDescriptionsItemProps<
  T = Record<string, any>,
  ValueType = 'text',
> = ProSchema<
  T,
  Omit<DescriptionsItemProps, 'children'> & {
    // 隐藏这个字段，是个语法糖，方便一下权限的控制
    hide?: boolean;
    plain?: boolean;
    copyable?: boolean;
    ellipsis?: boolean | { showTitle?: boolean };
    mode?: ProFieldFCMode;
    children?: React.ReactNode;
    /**
     * 子项的排序
     */
    order?: number;
    /**
     * 子项的索引
     */
    index?: number;
  },
  ProSchemaComponentTypes,
  ValueType
>;

export type ProDescriptionsActionType = ProCoreActionType;
export type ProDescriptionsProps<
  RecordType = Record<string, any>,
  ValueType = 'text',
> = DescriptionsProps & {
  /** Params 参数 params 改变的时候会触发 reload */
  params?: Record<string, any>;
  /** 网络请求报错 */
  onRequestError?: (e: Error) => void;
  /** 获取数据的方法 */
  request?: (params: Record<string, any>) => Promise<RequestData>;

  columns?: ProDescriptionsItemProps<RecordType, ValueType>[];

  /** 一些简单的操作 */
  actionRef?: React.MutableRefObject<ProCoreActionType<any> | undefined>;

  loading?: boolean;

  onLoadingChange?: (loading?: boolean) => void;

  tooltip?: LabelTooltipType | string;
  /** @deprecated 你可以使用 tooltip，这个更改是为了与 antd 统一 */
  tip?: string;
  /** Form props 的相关配置 */
  formProps?: FormProps;
  /** @name 编辑相关的配置 */
  editable?: RowEditableConfig<RecordType>;
  /** 默认的数据源 */
  dataSource?: RecordType;
  /** 受控数据源改变 */
  onDataSourceChange?: (value: RecordType) => void;
};

/**
 * 根据 dataIndex 获取值，支持 dataIndex 为数组
 *
 * @param item
 * @param entity
 */
const getDataFromConfig = (item: ProDescriptionsItemProps, entity: any) => {
  const { dataIndex } = item;
  if (dataIndex) {
    const data = Array.isArray(dataIndex)
      ? get(entity, dataIndex as string[])
      : entity[dataIndex as string];

    if (data !== undefined || data !== null) {
      return data;
    }
  }
  return item.children as string;
};

/**
 * 这里会处理编辑的功能
 *
 * @param props
 */
export const FieldRender: React.FC<
  ProDescriptionsItemProps<any> & {
    text: any;
    valueType: ProFieldValueType;
    entity: any;
    action: ProCoreActionType<any>;
    index: number;
    editableUtils?: UseEditableMapUtilType;
  }
> = (props) => {
  const {
    valueEnum,
    action,
    index,
    text,
    entity,
    mode,
    render,
    editableUtils,
    valueType,
    plain,
    dataIndex,
    request,
    renderFormItem,
    params,
  } = props;
  const form = ProForm.useFormInstance();

  const { token } = proTheme.useToken?.();

  const fieldConfig = {
    text,
    valueEnum,
    mode: mode || 'read',
    proFieldProps: {
      render: render
        ? () =>
            render?.(text, entity, index, action, {
              ...props,
              type: 'descriptions',
            })
        : undefined,
    },
    ignoreFormItem: true,
    valueType,
    request,
    params,
    plain,
  };

  /** 如果是只读模式，fieldProps 的 form是空的，所以需要兜底处理 */
  if (mode === 'read' || !mode || valueType === 'option') {
    const fieldProps = getFieldPropsOrFormItemProps(
      props.fieldProps,
      undefined,
      {
        ...props,
        rowKey: dataIndex,
        isEditable: false,
      },
    );
    return (
      <ProFormField name={dataIndex} {...fieldConfig} fieldProps={fieldProps} />
    );
  }

  const renderDom = () => {
    const formItemProps = getFieldPropsOrFormItemProps(
      props.formItemProps,
      form as FormInstance<any>,
      {
        ...props,
        rowKey: dataIndex,
        isEditable: true,
      },
    );
    const fieldProps = getFieldPropsOrFormItemProps(
      props.fieldProps,
      form as FormInstance<any>,
      {
        ...props,
        rowKey: dataIndex,
        isEditable: true,
      },
    );
    const dom = renderFormItem
      ? renderFormItem?.(
          {
            ...props,
            type: 'descriptions',
          },
          {
            isEditable: true,
            recordKey: dataIndex,
            record: form.getFieldValue(
              [dataIndex].flat(1) as (string | number)[],
            ),
            defaultRender: () => (
              <ProFormField {...fieldConfig} fieldProps={fieldProps} />
            ),
            type: 'descriptions',
          },
          form as FormInstance<any>,
        )
      : undefined;
    return (
      <div
        style={{ display: 'flex', gap: token.marginXS, alignItems: 'center' }}
      >
        <InlineErrorFormItem
          name={dataIndex}
          {...formItemProps}
          style={{
            margin: 0,
            ...(formItemProps?.style || {}),
          }}
          initialValue={text || formItemProps?.initialValue}
        >
          {dom || (
            <ProFormField
              {...fieldConfig}
              // @ts-ignore
              proFieldProps={{ ...fieldConfig.proFieldProps }}
              fieldProps={fieldProps}
            />
          )}
        </InlineErrorFormItem>
        {editableUtils?.actionRender?.(dataIndex || index, {
          cancelText: <CloseOutlined />,
          saveText: <CheckOutlined />,
          deleteText: false,
        })}
      </div>
    ) as React.ReactNode;
  };

  return (
    <div
      style={{
        marginTop: -5,
        marginBottom: -5,
        marginLeft: 0,
        marginRight: 0,
      }}
    >
      {renderDom()}
    </div>
  );
};

const schemaToDescriptionsItem = (
  items: ProDescriptionsItemProps<any, any>[],
  entity: any,
  action: ProCoreActionType<any>,
  editableUtils?: UseEditableMapUtilType,
) => {
  const options: JSX.Element[] = [];
  // 因为 Descriptions 只是个语法糖，children 是不会执行的，所以需要这里处理一下
  const children = items
    ?.map?.((item, index) => {
      if (React.isValidElement(item)) {
        return item;
      }
      const {
        valueEnum,
        render,
        renderText,
        mode,
        plain,
        dataIndex,
        request,
        params,
        editable,
        ...restItem
      } = item as ProDescriptionsItemProps;

      const defaultData = getDataFromConfig(item, entity) ?? restItem.children;
      const text = renderText
        ? renderText(defaultData, entity, index, action)
        : defaultData;

      const title =
        typeof restItem.title === 'function'
          ? restItem.title(item, 'descriptions', null)
          : restItem.title;

      //  dataIndex 无所谓是否存在
      // 有些时候不需要 dataIndex 可以直接 render
      const valueType =
        typeof restItem.valueType === 'function'
          ? (restItem.valueType(
              entity || {},
              'descriptions',
            ) as ProFieldValueType)
          : (restItem.valueType as ProFieldValueType);

      const isEditable = editableUtils?.isEditable(dataIndex || index);

      const fieldMode = mode || isEditable ? 'edit' : 'read';

      const showEditIcon =
        editableUtils &&
        fieldMode === 'read' &&
        editable !== false &&
        editable?.(text, entity, index) !== false;

      const Component = showEditIcon ? Space : React.Fragment;

      const contentDom: React.ReactNode =
        fieldMode === 'edit' ? text : genCopyable(text, item, text);

      const field = (
        <Descriptions.Item
          {...restItem}
          key={restItem.key || restItem.label?.toString() || index}
          label={
            (title || restItem.label || restItem.tooltip || restItem.tip) && (
              <LabelIconTip
                label={title || restItem.label}
                tooltip={restItem.tooltip || restItem.tip}
                ellipsis={item.ellipsis}
              />
            )
          }
        >
          <Component>
            <FieldRender
              {...item}
              dataIndex={item.dataIndex || index}
              mode={fieldMode}
              text={contentDom}
              valueType={valueType}
              entity={entity}
              index={index}
              action={action}
              editableUtils={editableUtils}
            />
            {showEditIcon && valueType !== 'option' && (
              <EditOutlined
                onClick={() => {
                  editableUtils?.startEditable(dataIndex || index);
                }}
              />
            )}
          </Component>
        </Descriptions.Item>
      );
      // 如果类型是 option 自动放到右上角
      if (valueType === 'option') {
        options.push(field);
        return null;
      }
      return field;
    })
    .filter((item) => item);
  return {
    // 空数组传递还是会被判定为有值
    options: options?.length ? options : null,
    children,
  };
};

const ProDescriptionsItem: React.FC<ProDescriptionsItemProps> = (props) => {
  return <Descriptions.Item {...props}>{props.children}</Descriptions.Item>;
};

const DefaultProDescriptionsDom = (dom: { children: any }) => dom.children;

const ProDescriptions = <
  RecordType extends Record<string, any>,
  ValueType = 'text',
>(
  props: ProDescriptionsProps<RecordType, ValueType>,
) => {
  const {
    request,
    columns,
    params = {},
    dataSource,
    onDataSourceChange,
    formProps,
    editable,
    loading,
    onLoadingChange,
    actionRef,
    onRequestError,
    ...rest
  } = props;

  const context = useContext(ConfigProvider.ConfigContext);

  const action = useFetchData<RequestData>(
    async () => {
      const data = request ? await request(params) : { data: {} };
      return data;
    },
    {
      onRequestError,
      effects: [stringify(params)],
      manual: !request,
      dataSource,
      loading,
      onLoadingChange,
      onDataSourceChange,
    },
  );

  /*
   * 可编辑行的相关配置
   */
  const editableUtils = useEditableMap<any>({
    ...props.editable,
    childrenColumnName: undefined,
    dataSource: action.dataSource,
    setDataSource: action.setDataSource,
  });

  /** 支持 reload 的功能 */
  useEffect(() => {
    if (actionRef) {
      actionRef.current = {
        reload: action.reload,
        ...editableUtils,
      };
    }
  }, [action, actionRef, editableUtils]);

  // loading 时展示
  // loading =  undefined 但是 request 存在时也应该展示
  if (action.loading || (action.loading === undefined && request)) {
    return <ProSkeleton type="descriptions" list={false} pageHeader={false} />;
  }

  const getColumns = (): ProDescriptionsItemProps<RecordType, ValueType>[] => {
    // 因为 Descriptions 只是个语法糖，children 是不会执行的，所以需要这里处理一下
    const childrenColumns = toArray(props.children)
      .filter(Boolean)
      .map((item) => {
        if (!React.isValidElement(item)) {
          return item;
        }
        const {
          valueEnum,
          valueType,
          dataIndex,
          ellipsis,
          copyable,
          request: itemRequest,
        } = item?.props as ProDescriptionsItemProps;

        if (
          !valueType &&
          !valueEnum &&
          !dataIndex &&
          !itemRequest &&
          !ellipsis &&
          !copyable
        ) {
          return item;
        }

        return {
          ...(item?.props as ProDescriptionsItemProps),
          entity: dataSource,
        };
      }) as ProDescriptionsItemProps<RecordType, ValueType>[];
    return [...(columns || []), ...childrenColumns]
      .filter((item) => {
        if (!item) return false;
        if (
          item?.valueType &&
          ['index', 'indexBorder'].includes(item?.valueType as string)
        ) {
          return false;
        }
        return !item?.hideInDescriptions;
      })
      .sort((a, b) => {
        if (b.order || a.order) {
          return (b.order || 0) - (a.order || 0);
        }
        return (b.index || 0) - (a.index || 0);
      });
  };

  const { options, children } = schemaToDescriptionsItem(
    getColumns(),
    action.dataSource || {},
    actionRef?.current || action,
    editable ? editableUtils : undefined,
  );

  /** 如果不是可编辑模式，没必要注入 ProForm */
  const FormComponent = editable ? ProForm : DefaultProDescriptionsDom;

  /** 即使组件返回null了, 在传递的过程中还是会被Description检测到为有值 */
  let title = null;
  if (rest.title || rest.tooltip || rest.tip) {
    title = (
      <LabelIconTip label={rest.title} tooltip={rest.tooltip || rest.tip} />
    );
  }

  const className = context.getPrefixCls('pro-descriptions');
  return (
    <ErrorBoundary>
      <FormComponent
        key="form"
        form={props.editable?.form}
        component={false}
        submitter={false}
        {...formProps}
        onFinish={undefined}
      >
        <Descriptions
          className={className}
          {...rest}
          extra={
            rest.extra ? (
              <Space>
                {options}
                {rest.extra}
              </Space>
            ) : (
              options
            )
          }
          title={title}
        >
          {children}
        </Descriptions>
      </FormComponent>
    </ErrorBoundary>
  );
};

ProDescriptions.Item = ProDescriptionsItem;

export { ProDescriptions };

export default ProDescriptions;
