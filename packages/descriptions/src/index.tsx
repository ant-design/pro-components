import React, { useEffect } from 'react';
import { Descriptions, Space } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import Field, {
  ProFieldValueType,
  ProFieldFCMode,
  ProRenderFieldProps,
} from '@ant-design/pro-field';
import { LabelIconTip, ProSchema } from '@ant-design/pro-utils';
import get from 'rc-util/lib/utils/get';
import { stringify } from 'use-json-comparison';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import { DescriptionsProps } from 'antd/lib/descriptions';
import useFetchData, { RequestData } from './useFetchData';

export type ActionType = {
  reload: () => void;
};

export type ProDescriptionsItemProps<T = {}> = ProSchema<
  T,
  ProFieldValueType,
  Omit<DescriptionsItemProps, 'children'> &
    ProRenderFieldProps & {
      // 隐藏这个字段，是个语法糖，方便一下权限的控制
      hide?: boolean;
      plain?: boolean;
      mode?: ProFieldFCMode;
      /**
       * 远程获取枚举值
       */
      request?: () => Promise<any>;
      children?: React.ReactNode;
    }
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

  columns?: Omit<ProDescriptionsItemProps<T>, 'renderFormItem'>[];

  /**
   * 一些简单的操作
   */
  actionRef?: React.MutableRefObject<ActionType | undefined>;
};

const ProDescriptionsItem: React.FC<ProDescriptionsItemProps> = (props) => {
  return <Descriptions.Item {...props}>{props.children}</Descriptions.Item>;
};

const ProDescriptions = <T, U>(props: ProDescriptionsProps<T>) => {
  const { request, columns, params = {}, actionRef, onRequestError, ...rest } = props;

  const action = useFetchData<RequestData<T>>(
    async () => {
      const data = request ? await request(params) : { data: {} };
      return data;
    },
    {
      onRequestError,
      effects: [stringify(params)],
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

  if (request && columns && !props.children) {
    const { dataSource = {} } = action;
    const options: JSX.Element[] = [];
    const dom = columns.map((itemColumn, index) => {
      const { dataIndex, render } = itemColumn;
      const data = Array.isArray(dataIndex)
        ? get(dataSource, dataIndex as string[])
        : dataSource[dataIndex as string];

      //  如果 valueType 是 option 的话，应该删除掉
      if (itemColumn.valueType === 'option') {
        options.push(
          <Field
            mode="read"
            render={(text) =>
              render
                ? render(
                    text,
                    data,
                    index,
                    actionRef?.current || { reload: () => null },
                    itemColumn,
                  )
                : text
            }
            valueType="option"
            text={data}
          />,
        );
        return null;
      }
      // title 一定要存在，不然就不展示，因为我们不支持嵌套
      if (!itemColumn.title) {
        return null;
      }
      //  dataIndex 无所谓是否存在
      // 有些时候不需要 dataIndex 可以直接 render
      const valueType =
        typeof itemColumn.valueType === 'function'
          ? itemColumn.valueType(data)
          : itemColumn.valueType;

      return (
        <Descriptions.Item
          key={Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex}
          label={<LabelIconTip label={itemColumn.title} tip={itemColumn.tip} />}
        >
          <Field
            valueEnum={itemColumn.valueEnum}
            mode="read"
            render={(text) =>
              render
                ? render(
                    text,
                    data,
                    index,
                    actionRef?.current || { reload: () => null },
                    itemColumn,
                  )
                : text
            }
            valueType={valueType}
            // request={itemColumn.request}
            text={data || itemColumn.title}
          />
        </Descriptions.Item>
      );
    });

    return (
      <Descriptions extra={<Space>{options}</Space>} {...rest}>
        {dom}
      </Descriptions>
    );
  }

  const options: JSX.Element[] = [];
  // 因为 Descriptions 只是个语法糖，children 是不会执行的，所以需要这里处理一下
  const mergeChildren = toArray(props.children).map((item, index) => {
    const {
      children,
      valueEnum,
      render,
      mode,
      request: requestItem,
      renderFormItem,
      plain,
      dataIndex,
      ...restItem
    } = item.props as ProDescriptionsItemProps;

    //  dataIndex 无所谓是否存在
    // 有些时候不需要 dataIndex 可以直接 render
    const valueType =
      typeof restItem.valueType === 'function' ? restItem.valueType({}) : restItem.valueType;

    if (!valueType && !valueEnum && !request) {
      return item;
    }

    if (request && !columns && dataIndex) {
      const { dataSource = {} } = action;
      const data = Array.isArray(dataIndex)
        ? get(dataSource, dataIndex as string[])
        : dataSource[dataIndex as string];
      return (
        <Descriptions.Item
          {...restItem}
          key={restItem.label?.toString() || index}
          label={<LabelIconTip label={restItem.label} tip={restItem.tip} />}
        >
          <Field
            valueEnum={valueEnum}
            mode={mode || 'read'}
            render={render}
            renderFormItem={renderFormItem}
            valueType={valueType}
            plain={plain}
            request={requestItem}
            text={children || data || restItem.label}
          />
        </Descriptions.Item>
      );
    }

    if (valueType === 'option') {
      options.push(
        <Field
          valueEnum={valueEnum}
          mode={mode || 'read'}
          render={render}
          renderFormItem={renderFormItem}
          valueType={valueType}
          plain={plain}
          text={children as string}
        />,
      );
      return null;
    }

    const field = (
      <Descriptions.Item
        {...restItem}
        key={restItem.label?.toString() || index}
        label={<LabelIconTip label={restItem.label} tip={restItem.tip} />}
      >
        <Field
          valueEnum={valueEnum}
          mode={mode || 'read'}
          render={render}
          renderFormItem={renderFormItem}
          valueType={valueType}
          plain={plain}
          request={requestItem}
          text={children as string}
        />
      </Descriptions.Item>
    );
    return field;
  });
  return (
    <Descriptions extra={<Space>{options}</Space>} {...rest}>
      {mergeChildren}
    </Descriptions>
  );
};

ProDescriptions.Item = ProDescriptionsItem;

export default ProDescriptions;
