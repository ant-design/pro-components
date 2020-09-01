import React, { useContext } from 'react';
import { Space } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider';
import FieldContext from '../../FieldContext';
import { GroupProps } from '../../interface';
import './index.less';

const Group: React.FC<GroupProps> = (props) => {
  const { groupProps } = React.useContext(FieldContext);
  const { children, style, title, titleStyle, titleRender } = {
    ...groupProps,
    ...props,
  };
  const { getPrefixCls } = useContext(ConfigContext);
  const className = getPrefixCls('pro-form-group');

  return (
    <div style={style}>
      <div className={`${className}-title`} style={titleStyle}>
        {titleRender ? titleRender(title, props) : title}
      </div>
      <Space className={`${className}-container`} size={32}>
        {children}
      </Space>
    </div>
  );
};

export default Group;
