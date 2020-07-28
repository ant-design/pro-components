import React from 'react';
import { Descriptions, Space } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import Field, {
  ProFieldValueType,
  ProFieldValueEnumMap,
  ProFieldValueEnumObj,
  ProFieldFCMode,
  ProRenderFieldFC,
} from '@ant-design/pro-field';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import { DescriptionsProps } from 'antd/lib/descriptions';

export type ProDescriptionsProps = DescriptionsProps & {
  /**
   * 获取数据的方法
   */
  request?: () => Promise<Object>;
};

export type ProDescriptionsItemProps = DescriptionsItemProps &
  ProRenderFieldFC & {
    valueType?: ProFieldValueType;
    // 隐藏这个字段，是个语法糖，方便一下权限的控制
    hide?: boolean;
    plain?: boolean;
    mode?: ProFieldFCMode;
    /**
     * 从全局数据中取数据的key
     */
    dataIndex?: React.ReactText | React.ReactText[];

    /**
     * 映射值的类型
     */
    valueEnum?: ProFieldValueEnumMap | ProFieldValueEnumObj;
  };

const ProDescriptionsItem: React.FC<ProDescriptionsItemProps> = (props) => {
  return <Descriptions.Item {...props}>{props.children}</Descriptions.Item>;
};

const ProDescriptions: React.FC<ProDescriptionsProps> & {
  Item: typeof ProDescriptionsItem;
} = (props) => {
  const options: JSX.Element[] = [];
  // 因为 Descriptions 只是个语法糖，children 是不会执行的，所以需要这里处理一下
  const mergeChildren = toArray(props.children).map((item) => {
    const {
      valueType,
      children,
      valueEnum,
      render,
      mode,
      renderFormItem,
      plain,
      ...rest
    } = item.props as ProDescriptionsItemProps;
    if (!valueType) {
      return item;
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
      <Descriptions.Item {...rest}>
        <Field
          valueEnum={valueEnum}
          mode={mode || 'read'}
          render={render}
          renderFormItem={renderFormItem}
          valueType={valueType}
          plain={plain}
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
