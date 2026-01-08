import { ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useMemo, useRef } from 'react';
import { isNeedOpenHash, ProProvider } from '../../../provider';

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
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { dark } = useContext(ProProvider);

  const prefixCls = `${props.prefixCls || getPrefixCls('pro')}-top-nav-header`;

  const { wrapSSR, hashId } = useStyle(prefixCls);
  let renderKey: HeaderRenderKey | undefined = undefined;
  if (props.menuHeaderRender !== undefined) {
    renderKey = 'menuHeaderRender';
  } else if (layout === 'mix' || layout === 'top') {
    renderKey = 'headerTitleRender';
  }
  const headerDom = renderLogoAndTitle(
    { ...props, collapsed: false },
    renderKey,
  );
  const { token } = useContext(ProProvider);

  const contentDom = useMemo(() => {
    const defaultDom = (
      <ConfigProvider // @ts-ignore
        theme={{
          hashed: isNeedOpenHash(),
          components: {
            Layout: {
              headerBg: 'transparent',
              bodyBg: 'transparent',
            },
            Menu: {
              itemBg: token.layout?.header?.colorBgHeader || 'transparent',
              subMenuItemBg:
                token.layout?.header?.colorBgHeader || 'transparent',
              itemBorderRadius: token.borderRadius,
              itemSelectedBg:
                token.layout?.header?.colorBgMenuItemSelected ||
                token?.colorBgTextHover,
              horizontalItemSelectedBg:
                token.layout?.header?.colorBgMenuItemSelected ||
                token?.colorBgTextHover,
              activeBarWidth: 0,
              activeBarHeight: 0,
              activeBarBorderWidth: 0,
              itemColor:
                token.layout?.header?.colorTextMenu ||
                token?.colorTextSecondary,
              horizontalItemHoverColor:
                token.layout?.header?.colorTextMenuActive || token?.colorText,
              horizontalItemSelectedColor:
                token.layout?.header?.colorTextMenuSelected ||
                token?.colorTextBase,
              horizontalItemBorderRadius: 4,
              itemHoverColor:
                token.layout?.header?.colorTextMenuActive ||
                'rgba(0, 0, 0, 0.85)',
              horizontalItemHoverBg:
                token.layout?.header?.colorBgMenuItemHover ||
                'rgba(0, 0, 0, 0.04)',
              itemSelectedColor:
                token.layout?.header?.colorTextMenuSelected ||
                'rgba(0, 0, 0, 1)',
              popupBg: token?.colorBgElevated,
              darkSubMenuItemBg: 'transparent',
              darkPopupBg: token?.colorBgElevated,
            },
          },
          token: {
            colorBgElevated:
              token.layout?.header?.colorBgHeader || 'transparent',
          },
        }}
      >
        <BaseMenu
          theme={dark ? 'dark' : 'light'}
          {...props}
          className={`${prefixCls}-base-menu ${hashId}`.trim()}
          {...props.menuProps}
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
  }, [
    token.layout?.header?.colorBgHeader,
    token.layout?.header?.colorBgMenuItemSelected,
    token.layout?.header?.colorBgMenuItemHover,
    token.layout?.header?.colorTextMenu,
    token.layout?.header?.colorTextMenuActive,
    token.layout?.header?.colorTextMenuSelected,
    token.layout?.header?.colorBgMenuElevated,
    token.borderRadius,
    token?.colorBgTextHover,
    token?.colorTextSecondary,
    token?.colorText,
    token?.colorTextBase,
    token.colorBgElevated,
    dark,
    props,
    prefixCls,
    hashId,
    headerContentRender,
  ]);

  return wrapSSR(
    <div
      className={clsx(prefixCls, hashId, propsClassName, {
        [`${prefixCls}-light`]: true,
      })}
      style={style}
    >
      <div
        ref={ref}
        className={clsx(`${prefixCls}-main`, hashId, {
          [`${prefixCls}-wide`]: contentWidth === 'Fixed' && layout === 'top',
        })}
      >
        {headerDom && (
          <div
            className={clsx(`${prefixCls}-main-left ${hashId}`)}
            onClick={onMenuHeaderClick}
          >
            <AppsLogoComponents {...props} />
            <div
              className={`${prefixCls}-logo ${hashId}`.trim()}
              key="logo"
              id="logo"
            >
              {headerDom}
            </div>
          </div>
        )}
        <div
          style={{ flex: 1 }}
          className={`${prefixCls}-menu ${hashId}`.trim()}
        >
          {contentDom}
        </div>
        {(actionsRender || props.avatarProps) && (
          <ActionsContent {...props} prefixCls={prefixCls} />
        )}
      </div>
    </div>,
  );
};

export { TopNavHeader };
