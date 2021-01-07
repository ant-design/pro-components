import React, { useContext } from 'react';
import { Space, ConfigProvider } from 'antd';
import FieldContext from '../../FieldContext';
import type { GroupProps } from '../../interface';
import './index.less';

const Group: React.FC<GroupProps> = React.forwardRef((props, ref: any) => {
  const { groupProps } = React.useContext(FieldContext);
  const { children, style, title, size = 32, titleStyle, titleRender } = {
    ...groupProps,
    ...props,
  };
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-form-group');
  const titleDom = titleRender ? titleRender(title, props) : title;
  return (
    <div className={className} style={style} ref={ref}>
      {titleDom && (
        <div className={`${className}-title`} style={titleStyle}>
          {titleDom}
        </div>
      )}
      <Space className={`${className}-container`} size={size}>
        {children}
      </Space>
    </div>
  );
});

Group.displayName = 'ProForm-Group';

export default Group;
