import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import classNames from 'classnames';
import Omit from 'omit.js';
import { getFlatMenus } from '@umijs/route-utils';

import type { PrivateSiderMenuProps, SiderMenuProps } from './SiderMenu';
import SiderMenu from './SiderMenu';
import MenuCounter from './Counter';

const SiderMenuWrapper: React.FC<SiderMenuProps & PrivateSiderMenuProps> = (props) => {
  const {
    isMobile,
    menuData,
    siderWidth,
    collapsed,
    onCollapse,
    style,
    className,
    hide,
    getContainer,
    prefixCls,
    matchMenuKeys,
  } = props;
  const { setFlatMenuKeys } = MenuCounter.useContainer();

  useEffect(() => {
    if (!menuData || menuData.length < 1) {
      return () => null;
    }
    // 当 menu data 改变的时候重新计算这两个参数
    const newFlatMenus = getFlatMenus(menuData);
    const animationFrameId = requestAnimationFrame(() => {
      setFlatMenuKeys(Object.keys(newFlatMenus));
    });
    return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchMenuKeys.join('-')]);

  useEffect(() => {
    if (isMobile === true) {
      onCollapse?.(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      onClose={() => onCollapse?.(true)}
      style={{
        padding: 0,
        height: '100vh',
        ...style,
      }}
      getContainer={getContainer}
      width={siderWidth}
      bodyStyle={{ height: '100vh', padding: 0, display: 'flex', flexDirection: 'row' }}
    >
      <SiderMenu
        {...omitProps}
        className={classNames(`${prefixCls}-sider`, className)}
        collapsed={isMobile ? false : collapsed}
        splitMenus={false}
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

export default SiderMenuWrapper;
