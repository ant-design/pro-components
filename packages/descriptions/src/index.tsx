import React, { useRef } from 'react';
import { Descriptions, Space } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import Field, {
  ProFieldValueType,
  ProFieldValueEnumMap,
  ProFieldValueEnumObj,
  ProFieldFCMode,
  ProFieldRequestData,
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

export type ProDescriptionsItemProps = DescriptionsItemProps &
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
    request?: () => Promise<T>;
  };

const ProDescriptionsItem: React.FC<ProDescriptionsItemProps> = props => {
  return <Descriptions.Item {...props}>{props.children}</Descriptions.Item>;
};

const ProDescriptions: React.FC<ProDescriptionsProps> & {
  Item: typeof ProDescriptionsItem;
} = props => {
  const { request, columns } = props;

  const Ref = useRef(columns);
  console.log(Ref, 'ref');

  const action = useFetchData(async () => {
    const msg = request ? await request() : {};
    return msg;
  });

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
    console.log(columns, 'ccc', Ref);
    // 取不到columns的指

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

    if (request && columns) {
      const { dataSource = {} } = action;
      const dataKeys = Object.keys(dataSource);
      dataKeys.forEach((itemKey: any) => {
        columns.map((itemC: any) => {
          if (itemC.dataIndex === itemKey) {
            return (
              <Descriptions.Item
                {...restItem}
                key={itemC.title?.toString() || index}
                label={itemC.title}
              >
                <Field
                  valueEnum={valueEnum}
                  mode={mode || 'read'}
                  render={render}
                  renderFormItem={renderFormItem}
                  valueType={itemC.valueType}
                  plain={plain}
                  request={requestItem}
                  text={children || dataSource[itemKey] || itemC.title}
                />
              </Descriptions.Item>
            );
          }
          return null;
        });
      });
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
          text={children}
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
          text={children}
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
