import React from 'react';
import { Descriptions, Space } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import Field, {
  ProFieldValueType,
  ProFieldValueEnumMap,
  ProFieldValueEnumObj,
  ProFieldFCMode,
  ProRenderFieldProps,
} from '@ant-design/pro-field';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import { DescriptionsProps } from 'antd/lib/descriptions';
import useFetchData from './useFetchData';

export type ProDescriptionsProps = DescriptionsProps & {
  /**
   * 获取数据的方法
   */
  request?: () => Promise<Object>;
  columns?: any;
};

export type ProDescriptionsItemProps = Omit<DescriptionsItemProps, 'children'> &
  ProRenderFieldProps & {
    valueType?: ProFieldValueType;
    // 隐藏这个字段，是个语法糖，方便一下权限的控制
    hide?: boolean;
    plain?: boolean;
    mode?: ProFieldFCMode;
    /**
     * 从全局数据中取数据的key
     */
    dataIndex?: string;
    // dataIndex?: React.ReactText | React.ReactText[];

    /**
     * 映射值的类型
     */
    valueEnum?: ProFieldValueEnumMap | ProFieldValueEnumObj;
    /**
     * 远程获取枚举值
     */
    request?: () => Promise<any>;

    children?: React.ReactNode;
  };

const ProDescriptionsItem: React.FC<ProDescriptionsItemProps> = (props) => {
  return <Descriptions.Item {...props}>{props.children}</Descriptions.Item>;
};

const ProDescriptions: React.FC<ProDescriptionsProps> & {
  Item: typeof ProDescriptionsItem;
} = (props) => {
  const { request, columns } = props;

  const action = useFetchData(async () => {
    const msg = request ? await request() : {};
    return msg;
  });

  if (request && columns && !props.children) {
    const { dataSource = {} } = action;
    const dataKeys = Object.keys(dataSource);
    const dom: any[] = [];
    dataKeys.forEach((itemKey: any, index: number) => {
      columns.forEach((itemColumn: any) => {
        if (itemColumn.dataIndex === itemKey) {
          dom.push(
            <Descriptions.Item key={itemColumn.title?.toString() || index} label={itemColumn.title}>
              <Field
                valueEnum={itemColumn.valueEnum}
                mode="read"
                // render={render}
                // renderFormItem={renderFormItem}
                valueType={itemColumn.valueType}
                // plain={plain}
                // request={itemColumn.request}
                text={dataSource[itemKey] || itemColumn.title}
              />
            </Descriptions.Item>,
          );
        }
      });
    });
    return <Descriptions {...props}>{dom}</Descriptions>;
  }

  const options: JSX.Element[] = [];
  // 因为 Descriptions 只是个语法糖，children 是不会执行的，所以需要这里处理一下
  const mergeChildren = toArray(props.children).map((item, index) => {
    const {
      valueType,
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
    if (!valueType && !valueEnum && !request) {
      return item;
    }

    if (request && !columns && dataIndex) {
      const { dataSource = {} } = action;
      return (
        <Descriptions.Item {...restItem} key={restItem.label?.toString() || index}>
          <Field
            valueEnum={valueEnum}
            mode={mode || 'read'}
            render={render}
            renderFormItem={renderFormItem}
            valueType={valueType}
            plain={plain}
            request={requestItem}
            text={children || dataSource[dataIndex] || restItem.label}
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
      <Descriptions.Item {...restItem} key={restItem.label?.toString() || index}>
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
    <Descriptions extra={<Space>{options}</Space>} {...props}>
      {mergeChildren}
    </Descriptions>
  );
};

ProDescriptions.Item = ProDescriptionsItem;

export default ProDescriptions;
