import React from 'react';
import { Drawer } from 'antd';
import classNames from 'classnames';
import Omit from 'omit.js';

import SiderMenu, { SiderMenuProps } from './SiderMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';

const SiderMenuWrapper: React.FC<SiderMenuProps> = props => {
  const { isMobile, menuData, collapsed, onCollapse, style, className } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  const omitProps = Omit(props, ['className', 'style']);
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      className={classNames('ant-pro-sider-menu', className)}
      onClose={() => onCollapse && onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
        ...style,
      }}
    >
      <SiderMenu
        {...omitProps}
        flatMenuKeys={flatMenuKeys}
        collapsed={isMobile ? false : collapsed}
      />
    </Drawer>
  ) : (
    <SiderMenu
      className={classNames('ant-pro-sider-menu', className)}
      {...omitProps}
      style={style}
      flatMenuKeys={flatMenuKeys}
    />
  );
};

SiderMenuWrapper.defaultProps = {
  onCollapse: () => undefined,
};

export default SiderMenuWrapper;
