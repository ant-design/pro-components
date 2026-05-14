import { ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useMemo, useRef } from 'react';
import { AppsLogoComponents } from '../AppsLogoComponents';
import type { GlobalHeaderProps } from '../GlobalHeader';
import { ActionsContent } from '../GlobalHeader/ActionsContent';
import { BaseMenu } from '../SiderMenu/BaseMenu';
import type {
  HeaderRenderKey,
  PrivateSiderMenuProps,
  SiderMenuProps,
} from '../SiderMenu/SiderMenu';
import { renderLogoAndTitle } from '../SiderMenu/SiderMenu';
import { useStyle } from './style';

export type TopNavHeaderProps = SiderMenuProps &
  GlobalHeaderProps &
  PrivateSiderMenuProps;

const TopNavHeader: React.FC<TopNavHeaderProps> = (
  props: TopNavHeaderProps,
) => {
  const ref = useRef(null);
  const {
    onMenuHeaderClick,
    contentWidth,
    className: propsClassName,
    style,
    headerContentRender,
    layout,
    actionsRender,
    avatarProps,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = `${props.prefixCls || getPrefixCls('pro')}-top-nav-header`;

  const { wrapSSR, hashId } = useStyle(prefixCls);
  let renderKey: HeaderRenderKey | undefined = 'headerTitleRender';

  const headerDom = renderLogoAndTitle(
    { ...props, collapsed: false },
    renderKey,
  );
  const hasActionsContent = actionsRender || avatarProps;
  const contentDom = useMemo(() => {
    const defaultDom = (
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              headerBg: 'transparent',
              bodyBg: 'transparent',
            },
          },
        }}
      >
        <BaseMenu
          {...props}
          className={clsx(`${prefixCls}-base-menu`, hashId)}
          data-testid="pro-layout-top-nav-header-base-menu"
          style={{
            width: '100%',
            ...props.menuProps?.style,
          }}
          collapsed={false}
          menuRenderType="header"
          mode="horizontal"
        />
      </ConfigProvider>
    );

    if (headerContentRender) {
      return headerContentRender(props, defaultDom);
    }
    return defaultDom;
  }, [props, prefixCls, hashId, headerContentRender]);

  return wrapSSR(
    <div
      className={clsx(prefixCls, hashId, propsClassName, {
        [`${prefixCls}-light`]: true,
      })}
      style={style}
      data-testid="pro-layout-top-nav-header"
    >
      <div
        ref={ref}
        className={clsx(`${prefixCls}-main`, hashId, {
          [`${prefixCls}-wide`]: contentWidth === 'Fixed' && layout === 'top',
        })}
        data-testid="pro-layout-top-nav-header-main"
      >
        {headerDom && (
          <div
            className={clsx(`${prefixCls}-main-left ${hashId}`)}
            onClick={onMenuHeaderClick}
            data-testid="pro-layout-top-nav-header-main-left"
          >
            <AppsLogoComponents {...props} />
            <div
              className={clsx(`${prefixCls}-logo`, hashId)}
              key="logo"
              id="logo"
              data-testid="pro-layout-top-nav-header-logo"
            >
              {headerDom}
            </div>
          </div>
        )}
        <div
          style={{ flex: 1 }}
          className={clsx(`${prefixCls}-menu`, hashId)}
          data-testid="pro-layout-top-nav-header-menu"
        >
          {contentDom}
        </div>
        {hasActionsContent && (
          <div
            data-testid="pro-layout-top-nav-header-actions"
            style={{ height: '100%' }}
          >
            <ActionsContent {...props} prefixCls={prefixCls} />
          </div>
        )}
      </div>
    </div>,
  );
};

export { TopNavHeader };
