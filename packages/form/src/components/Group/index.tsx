import React, { useContext } from 'react';
import { Space } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider';
import FieldContext from '../../FieldContext';
import { GroupProps } from '../../interface';
import './index.less';

const Group: React.FC<GroupProps> = (props) => {
  const { groupProps } = React.useContext(FieldContext);
  const { children, style, title, size = 32, titleStyle, titleRender } = {
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
      <Space className={`${className}-container`} size={size}>
        {children}
      </Space>
    </div>
  );
};

export default Group;
