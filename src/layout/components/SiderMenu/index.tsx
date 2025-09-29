import { omit } from '@rc-component/util';
import { ConfigProvider, Drawer } from 'antd';
import classNames from 'classnames';
import React, { useContext, useEffect } from 'react';
import { ProProvider } from '../../../provider';
import type { PrivateSiderMenuProps, SiderMenuProps } from './SiderMenu';
import { SiderMenu } from './SiderMenu';
import { useStyle } from './style/index';

const SiderMenuWrapper: React.FC<SiderMenuProps & PrivateSiderMenuProps> = (props) => {
  const { isMobile, siderWidth, collapsed, onCollapse, style, className, hide, prefixCls, getContainer } = props;

  const { token } = useContext(ProProvider);

  useEffect(() => {
    if (isMobile === true) {
      onCollapse?.(true);
    }
  }, [isMobile]);

  const omitProps = omit(props, ['className', 'style']);

  const { direction } = React.useContext(ConfigProvider.ConfigContext);

  const { wrapSSR, hashId } = useStyle(`${prefixCls}-sider`, {
    proLayoutCollapsedWidth: 64,
  });

  const siderClassName = classNames(`${prefixCls}-sider`, className, hashId);

  if (hide) {
    return null;
  }

  return wrapSSR(
    isMobile ? (
      <Drawer
        maskClosable
        afterOpenChange={() => {
          onCollapse?.(true);
        }}
        className={classNames(`${prefixCls}-drawer-sider`, className)}
        closable={false}
        getContainer={getContainer || false}
        open={!collapsed}
        placement={direction === 'rtl' ? 'right' : 'left'}
        style={{
          padding: 0,
          height: '100vh',
          ...style,
        }}
        styles={{
          body: {
            height: '100vh',
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: token.layout?.sider?.colorMenuBackground,
          },
        }}
        width={siderWidth}
        onClose={() => {
          onCollapse?.(true);
        }}
      >
        <SiderMenu
          {...omitProps}
          className={siderClassName}
          collapsed={isMobile ? false : collapsed}
          isMobile={true}
          originCollapsed={collapsed}
          splitMenus={false}
        />
      </Drawer>
    ) : (
      <SiderMenu className={siderClassName} originCollapsed={collapsed} {...omitProps} style={style} />
    ),
  );
};

export { SiderMenuWrapper as SiderMenu };
