import { omit } from '@rc-component/util';
import { ConfigProvider, Drawer, theme } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useEffect, useMemo } from 'react';
import { ProProvider } from '../../../provider';
import type { PrivateSiderMenuProps, SiderMenuProps } from './SiderMenu';
import { SiderMenu } from './SiderMenu';
import { useStyle } from './style/index';
import { getProLayoutSiderCssVarsStyle } from './style/menu';

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

  useEffect(() => {
    if (isMobile === true) {
      onCollapse?.(true);
    }
  }, [isMobile]);

  const omitProps = omit(props, ['className', 'style']);

  const { direction } = React.useContext(ConfigProvider.ConfigContext);
  const { token: proToken } = useContext(ProProvider);
  const { token: antdToken } = theme.useToken();

  const drawerBodyStyle = useMemo(
    () => ({
      ...getProLayoutSiderCssVarsStyle(proToken?.layout, antdToken),
      height: '100vh',
      padding: 0,
      display: 'flex',
      flexDirection: 'row' as const,
      backgroundColor: 'var(--pro-layout-sider-bg)',
    }),
    [proToken?.layout, antdToken],
  );

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
          body: drawerBodyStyle,
        }}
      >
        <SiderMenu
          {...omitProps}
          isMobile={true}
          className={siderClassName}
          data-testid="pro-layout-mobile-sider-menu"
          collapsed={false}
          splitMenus={false}
          originCollapsed={collapsed}
        />
      </Drawer>
    ) : (
      <SiderMenu
        className={siderClassName}
        data-testid="pro-layout-desktop-sider-menu"
        originCollapsed={collapsed}
        {...omitProps}
        style={style}
      />
    ),
  );
};

export { SiderMenuWrapper as SiderMenu };
