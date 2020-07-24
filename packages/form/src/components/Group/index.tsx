import React from 'react';
import { Space } from 'antd';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
import FieldContext from '../../FieldContext';
import { GroupProps } from '../../interface';
import './index.less';

const Group: React.FC<GroupProps> = (props) => {
  const { groupProps } = React.useContext(FieldContext);
  const { children, style, title, titleStyle, titleRender } = {
    ...groupProps,
    ...props,
  };
  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const className = getPrefixCls('pro-form-group');
        return (
          <div style={style}>
            <div className={`${className}-title`} style={titleStyle}>
              {titleRender ? titleRender(title, props) : title}
            </div>
            <Space size={32}>{children}</Space>
          </div>
        );
      }}
    </ConfigConsumer>
  );
};

export default Group;
