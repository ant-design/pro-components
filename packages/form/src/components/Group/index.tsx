import React from 'react';
import { Space } from 'antd';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
import './index.less';

export interface GroupProps {
  title?: React.ReactNode;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
}

const Group: React.FC<GroupProps> = props => {
  const { children, style, title, titleStyle } = props;
  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const className = getPrefixCls('pro-form-group');
        return (
          <div style={style}>
            <div className={`${className}-title`} style={titleStyle}>
              {title}
            </div>
            <Space size={32}>{children}</Space>
          </div>
        );
      }}
    </ConfigConsumer>
  );
};

export default Group;
