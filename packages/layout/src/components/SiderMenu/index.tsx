import { compareVersions } from '@ant-design/pro-utils';
import { getFlatMenus } from '@umijs/route-utils';
import { Drawer, version } from 'antd';
import classNames from 'classnames';
import Omit from 'omit.js';
import React, { useEffect } from 'react';
import { MenuCounter } from './Counter';
import type { PrivateSiderMenuProps, SiderMenuProps } from './SiderMenu';
import { SiderMenu } from './SiderMenu';
import { useStyle } from './style/index';

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
      return;
    }
    // 当 menu data 改变的时候重新计算这两个参数
    const newFlatMenus = getFlatMenus(menuData);
    setFlatMenuKeys(Object.keys(newFlatMenus));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchMenuKeys.join('-')]);

  useEffect(() => {
    if (isMobile === true) {
      onCollapse?.(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const omitProps = Omit(props, ['className', 'style']);

  const { wrapSSR, hashId } = useStyle(`${prefixCls}-sider`, {
    proLayoutCollapsedWidth: 64,
  });

  const siderClassName = classNames(`${prefixCls}-sider`, className, hashId);

  if (hide) {
    return null;
  }

  const drawerOpenProps = compareVersions(version, '4.23.0')
    ? {
        open: !collapsed,
        onClose: () => onCollapse?.(true),
      }
    : {
        visible: !collapsed,
        onClose: () => onCollapse?.(true),
      };

  return wrapSSR(
    isMobile ? (
      <Drawer
        placement="left"
        className={classNames(`${prefixCls}-drawer-sider`, className)}
        {...drawerOpenProps}
        style={{
          padding: 0,
          height: '100vh',
          ...style,
        }}
        closable={false}
        getContainer={getContainer}
        width={siderWidth}
        bodyStyle={{ height: '100vh', padding: 0, display: 'flex', flexDirection: 'row' }}
      >
        <SiderMenu
          {...omitProps}
          isMobile={true}
          className={siderClassName}
          collapsed={isMobile ? false : collapsed}
          splitMenus={false}
          originCollapsed={collapsed}
        />
      </Drawer>
    ) : (
      <SiderMenu
        className={siderClassName}
        originCollapsed={collapsed}
        {...omitProps}
        style={style}
      />
    ),
  );
};

export { SiderMenuWrapper as SiderMenu };
