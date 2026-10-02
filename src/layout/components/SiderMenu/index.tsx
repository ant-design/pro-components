import { omit } from '@rc-component/util';
import { ConfigProvider, Drawer } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useEffect } from 'react';
import { ProProvider } from '../../../provider';
import type { PrivateSiderMenuProps, SiderMenuProps } from './SiderMenu';
import { SiderMenu } from './SiderMenu';
import { useStyle } from './style/index';

let bodyScrollLockCount = 0;
let bodyOverflowBeforeLock = '';

const lockBodyScroll = () => {
  if (bodyScrollLockCount === 0) {
    bodyOverflowBeforeLock = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  bodyScrollLockCount += 1;

  return () => {
    bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
    if (bodyScrollLockCount === 0) {
      document.body.style.overflow = bodyOverflowBeforeLock;
    }
  };
};

const SiderMenuWrapper: React.FC<SiderMenuProps & PrivateSiderMenuProps> = (
  props,
) => {
  const {
    isMobile,
    siderWidth,
    collapsed,
    onCollapse,
    style,
    className,
    hide,
    prefixCls,
    getContainer,
  } = props;

  const { token } = useContext(ProProvider);

  useEffect(() => {
    if (isMobile === true) {
      onCollapse?.(true);
    }
  }, [isMobile]);

  /**
   * #8748/#8672: 移动端抽屉打开时锁定页面滚动。
   * getContainer=false 时 Drawer 渲染在当前位置（inline），
   * 抽屉自身的 body 可滚动，但背后页面不应跟着滚；
   * 关闭（collapsed=true）或卸载时恢复。
   */
  const drawerOpen = isMobile && !collapsed && !hide;
  useEffect(() => {
    if (!drawerOpen) return;
    return lockBodyScroll();
  }, [drawerOpen]);

  const omitProps = omit(props, ['className', 'style']);

  const { direction } = React.useContext(ConfigProvider.ConfigContext);

  // 从 menu 配置中读取 collapsedWidth，默认为 64
  const collapsedWidth = props.menu?.collapsedWidth ?? 64;

  const { wrapSSR, hashId } = useStyle(`${prefixCls}-sider`, {
    proLayoutCollapsedWidth: collapsedWidth,
  });

  const siderClassName = clsx(`${prefixCls}-sider`, className, hashId);

  if (hide) {
    return null;
  }

  return wrapSSR(
    isMobile ? (
      <Drawer
        placement={direction === 'rtl' ? 'right' : 'left'}
        rootClassName={clsx(`${prefixCls}-drawer-sider-root`, hashId)}
        className={clsx(`${prefixCls}-drawer-sider`, className)}
        data-testid="pro-layout-sider"
        open={!collapsed}
        afterOpenChange={(open) => {
          if (!open) {
            onCollapse?.(true);
          }
        }}
        style={{
          padding: 0,
          height: '100vh',
          ...style,
        }}
        onClose={() => {
          onCollapse?.(true);
        }}
        maskClosable
        closable={false}
        getContainer={getContainer || false}
        size={siderWidth}
        styles={{
          body: {
            height: '100vh',
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: token.layout?.sider?.colorMenuBackground,
          },
        }}
      >
        <SiderMenu
          {...omitProps}
          isMobile={true}
          className={siderClassName}
          collapsed={false}
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
