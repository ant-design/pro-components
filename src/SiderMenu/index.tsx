import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import classNames from 'classnames';
import useJsonComparison from 'use-json-comparison';
import Omit from 'omit.js';
import SiderMenu, { SiderMenuProps } from './SiderMenu';
import { getFlatMenus } from './SiderMenuUtils';
import MenuCounter from './Counter';

const SiderMenuWrapper: React.FC<SiderMenuProps> = props => {
  const {
    isMobile,
    menuData,
    siderWidth,
    collapsed,
    onCollapse,
    style,
    className,
    hide,
  } = props;
  const { setFlatMenus, setFlatMenuKeys } = MenuCounter.useContainer();

  useJsonComparison(() => {
    if (!menuData || menuData.length < 1) {
      return () => null;
    }
    // 当 menu data 改变的时候重新计算这两个参数
    const newFlatMenus = getFlatMenus(menuData);
    const animationFrameId = requestAnimationFrame(() => {
      setFlatMenus(newFlatMenus);
      setFlatMenuKeys(Object.keys(newFlatMenus));
    });
    return () =>
      window.cancelAnimationFrame &&
      window.cancelAnimationFrame(animationFrameId);
  }, menuData);

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
      className={classNames('ant-pro-drawer-sider-menu', className)}
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
        className={classNames('ant-pro-sider-menu', className)}
        collapsed={isMobile ? false : collapsed}
      />
    </Drawer>
  ) : (
    <SiderMenu
      className={classNames('ant-pro-sider-menu', className)}
      {...omitProps}
      style={style}
    />
  );
};

SiderMenuWrapper.defaultProps = {
  onCollapse: () => undefined,
};

export default SiderMenuWrapper;
