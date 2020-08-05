import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import classNames from 'classnames';
import Omit from 'omit.js';
import { getFlatMenus } from '@umijs/route-utils';

import { useDeepCompareEffect } from '@ant-design/pro-utils';
import SiderMenu, { SiderMenuProps } from './SiderMenu';
import MenuCounter from './Counter';

const SiderMenuWrapper: React.FC<SiderMenuProps> = (props) => {
  const {
    isMobile,
    menuData,
    siderWidth,
    collapsed,
    onCollapse,
    style,
    className,
    hide,
    prefixCls,
  } = props;
  const { setFlatMenuKeys } = MenuCounter.useContainer();

  useDeepCompareEffect(() => {
    if (!menuData || menuData.length < 1) {
      return () => null;
    }
    // // 当 menu data 改变的时候重新计算这两个参数
    const newFlatMenus = getFlatMenus(menuData);
    const animationFrameId = requestAnimationFrame(() => {
      setFlatMenuKeys(Object.keys(newFlatMenus));
    });
    return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
  }, [menuData]);

  useEffect(() => {
    if (isMobile === true) {
      if (onCollapse) {
        onCollapse(true);
      }
    }
  }, [isMobile]);

  const omitProps = Omit(props, ['className', 'style']);

  if (hide) {
    return null;
  }

  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      className={classNames(`${prefixCls}-drawer-sider`, className)}
      onClose={() => onCollapse && onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
        ...style,
      }}
      width={siderWidth}
      bodyStyle={{ height: '100vh', padding: 0 }}
    >
      <SiderMenu
        {...omitProps}
        className={classNames(`${prefixCls}-sider`, className)}
        collapsed={isMobile ? false : collapsed}
      />
    </Drawer>
  ) : (
    <SiderMenu
      className={classNames(`${prefixCls}-sider`, className)}
      {...omitProps}
      style={style}
    />
  );
};

SiderMenuWrapper.defaultProps = {
  onCollapse: () => undefined,
};

export default SiderMenuWrapper;
