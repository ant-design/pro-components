import React, { useEffect } from 'react';
import { Descriptions, Space } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import Field, {
  ProFieldValueType,
  ProFieldFCMode,
  ProFieldValueObjectType,
} from '@ant-design/pro-field';
import { LabelIconTip, ProSchema } from '@ant-design/pro-utils';
import get from 'rc-util/lib/utils/get';
import { stringify } from 'use-json-comparison';
import ProSkeleton from '@ant-design/pro-skeleton';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import { DescriptionsProps } from 'antd/lib/descriptions';
import useFetchData, { RequestData } from './useFetchData';

export type ActionType = {
  reload: () => void;
};

export type ProDescriptionsItemProps<T = {}> = Omit<
  ProSchema<
    T,
    ProFieldValueType | ProFieldValueObjectType,
    Omit<DescriptionsItemProps, 'children'> & {
      // 隐藏这个字段，是个语法糖，方便一下权限的控制
      hide?: boolean;
      plain?: boolean;
      mode?: ProFieldFCMode;
      children?: React.ReactNode;
    }
  >,
  'renderFormItem'
>;

export type ProDescriptionsProps<T = {}> = DescriptionsProps & {
  /**
   * params 参数
   * params 改变的时候会触发 reload
   */
  params?: { [key: string]: any };
  /**
   * 网络请求报错
   */
  onRequestError?: (e: Error) => void;
  /**
   * 获取数据的方法
   */
  request?: (params: { [key: string]: any }) => Promise<RequestData<T>>;

  columns?: ProDescriptionsItemProps<T>[];

  /**
   * 一些简单的操作
   */
  actionRef?: React.MutableRefObject<ActionType | undefined>;

  loading?: boolean;

  tip?: string;
};

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

const conversionProProSchemaToDescriptionsItem = (
  items: ProDescriptionsItemProps<any>[],
  entity: any,
  action: ActionType,
) => {
  const options: JSX.Element[] = [];
  // 因为 Descriptions 只是个语法糖，children 是不会执行的，所以需要这里处理一下
  const children = items.map((item, index) => {
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
      ...restItem
    } = item as ProDescriptionsItemProps;
    const title =
      typeof restItem.title === 'function'
        ? restItem.title(item, 'descriptions', restItem.title)
        : restItem.title;

    const defaultData = getDataFromConfig(item, entity);
    const text = renderText ? renderText(defaultData, entity, index, action) : defaultData;

    //  dataIndex 无所谓是否存在
    // 有些时候不需要 dataIndex 可以直接 render
    const valueType =
      typeof restItem.valueType === 'function'
        ? (restItem.valueType(entity || {}) as ProFieldValueType)
        : (restItem.valueType as ProFieldValueType);

    const field = (
      <Descriptions.Item
        {...restItem}
        key={restItem.label?.toString() || index}
        label={<LabelIconTip label={title || restItem.label} tip={restItem.tip} />}
      >
        <Field
          valueEnum={valueEnum}
          mode={mode || 'read'}
          render={
            // 虽然有点丑，但是不用自己拼类型了
            render
              ? (_, props, dom) => (
                  <React.Fragment>
                    {render(dom, entity, index, action, {
                      ...item,
                      ...props,
                    })}
                  </React.Fragment>
                )
              : undefined
          }
          valueType={valueType}
          plain={plain}
          text={text}
          request={request}
          params={request}
        />
      </Descriptions.Item>
    );
    // 如果类型是 option 自动放到右上角
    if (valueType === 'option') {
      options.push(field);
      return null;
    }
    return field;
  });
  return {
    options,
    children,
  };
};

const ProDescriptionsItem: React.FC<ProDescriptionsItemProps> = (props) => {
  return <Descriptions.Item {...props}>{props.children}</Descriptions.Item>;
};

const ProDescriptions = <T extends {}>(props: ProDescriptionsProps<T>) => {
  const { request, columns, params = {}, actionRef, onRequestError, ...rest } = props;

  const action = useFetchData<RequestData<T>>(
    async () => {
      const data = request ? await request(params) : { data: {} };
      return data;
    },
    {
      onRequestError,
      effects: [stringify(params)],
      manual: !request,
    },
  );

  /**
   * 支持 reload 的功能
   */
  useEffect(() => {
    if (actionRef) {
      actionRef.current = { reload: action.reload };
    }
  }, [action]);

  // loading 时展示
  // loading =  undefined 但是 request 存在时也应该展示
  if (action.loading || (action.loading === undefined && request)) {
    return <ProSkeleton type="descriptions" list={false} pageHeader={false} />;
  }

  const { dataSource = {} } = action;

  const getColumns = () => {
    // 因为 Descriptions 只是个语法糖，children 是不会执行的，所以需要这里处理一下
    const childrenColumns = toArray(props.children).map((item) => {
      const {
        valueEnum,
        valueType,
        dataIndex,
        request: itemRequest,
      } = item.props as ProDescriptionsItemProps;

      if (!valueType && !valueEnum && !dataIndex && !itemRequest) {
        return item;
      }
      return item.props;
    });
    return [...childrenColumns, ...(columns || [])].filter((item) => {
      if (['index', 'indexBorder'].includes(item.valueType)) {
        return false;
      }
      return !item.hideInDescriptions;
    });
  };

  const { options, children } = conversionProProSchemaToDescriptionsItem(
    getColumns(),
    dataSource,
    actionRef?.current || action,
  );
  return (
    <Descriptions
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
      title={<LabelIconTip label={rest.title} tip={rest.tip} />}
    >
      {children}
    </Descriptions>
  );
};

ProDescriptions.Item = ProDescriptionsItem;

export default ProDescriptions;
