import { ProProvider } from '@ant-design/pro-provider';
import { openVisibleCompatible } from '@ant-design/pro-utils';
import { ConfigProvider, Drawer } from 'antd';
import classNames from 'classnames';
import Omit from 'omit.js';
import React, { useContext, useEffect } from 'react';
import type { PrivateSiderMenuProps, SiderMenuProps } from './SiderMenu';
import { SiderMenu } from './SiderMenu';
import { useStyle } from './style/index';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const omitProps = Omit(props, ['className', 'style']);

  const { direction } = React.useContext(ConfigProvider.ConfigContext);

  const { wrapSSR, hashId } = useStyle(`${prefixCls}-sider`, {
    proLayoutCollapsedWidth: 64,
  });

  const siderClassName = classNames(`${prefixCls}-sider`, className, hashId);

  if (hide) {
    return null;
  }

  const drawerOpenProps = openVisibleCompatible(!collapsed, () =>
    onCollapse?.(true),
  );

  return wrapSSR(
    isMobile ? (
      <Drawer
        placement={direction === 'rtl' ? 'right' : 'left'}
        className={classNames(`${prefixCls}-drawer-sider`, className)}
        {...drawerOpenProps}
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
        width={siderWidth}
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
