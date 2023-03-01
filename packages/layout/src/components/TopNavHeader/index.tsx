import { ProProvider } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';
import classNames from 'classnames';
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

export type TopNavHeaderProps = SiderMenuProps & GlobalHeaderProps & PrivateSiderMenuProps;

const TopNavHeader: React.FC<TopNavHeaderProps> = (props: TopNavHeaderProps) => {
  const ref = useRef(null);
  const {
    onMenuHeaderClick,
    contentWidth,
    rightContentRender,
    className: propsClassName,
    style,
    headerContentRender,
    layout,
    actionsRender,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { token } = useContext(ProProvider);

  const prefixCls = `${props.prefixCls || getPrefixCls('pro')}-top-nav-header`;

  const { wrapSSR, hashId } = useStyle(prefixCls);
  let renderKey: HeaderRenderKey | undefined = undefined;
  if (props['menuHeaderRender'] !== undefined) {
    renderKey = 'menuHeaderRender';
  } else if (layout === 'mix' || layout === 'top') {
    renderKey = 'headerTitleRender';
  }
  const headerDom = renderLogoAndTitle({ ...props, collapsed: false }, renderKey);
  const contentDom = useMemo(() => {
    const defaultDom = (
      <ConfigProvider
        theme={{
          hashed: process.env.NODE_ENV?.toLowerCase() !== 'test',
          components: {
            Menu: {
              colorItemBg: token?.layout?.header?.colorBgHeader || 'transparent',
              colorSubItemBg: token?.layout?.header?.colorBgHeader || 'transparent',
              radiusItem: 4,
              colorItemBgSelected:
                token?.layout?.header?.colorBgMenuItemSelected || token?.colorBgTextHover,
              colorItemBgActive:
                token?.layout?.header?.colorBgMenuItemHover || token?.colorBgTextHover,
              colorItemBgSelectedHorizontal:
                token?.layout?.header?.colorBgMenuItemSelected || token?.colorBgTextHover,
              colorActiveBarWidth: 0,
              colorActiveBarHeight: 0,
              colorActiveBarBorderSize: 0,
              colorItemText: token?.layout?.header?.colorTextMenu || token?.colorTextSecondary,
              colorItemTextHover: token?.layout?.header?.colorTextMenuActive || token?.colorText,
              colorItemTextSelected:
                token?.layout?.header?.colorTextMenuSelected || token?.colorTextBase,
            },
          },
        }}
      >
        <BaseMenu
          theme="light"
          {...props}
          className={`${prefixCls}-base-menu ${hashId}`}
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
    token?.layout?.header?.colorBgHeader,
    token?.layout?.header?.colorBgMenuItemSelected,
    token?.layout?.header?.colorBgMenuItemHover,
    token?.layout?.header?.colorTextMenu,
    token?.layout?.header?.colorTextMenuActive,
    token?.layout?.header?.colorTextMenuSelected,
    token?.colorBgTextHover,
    token?.colorTextSecondary,
    token?.colorText,
    token?.colorTextBase,
    props,
    prefixCls,
    hashId,
    headerContentRender,
  ]);

  return wrapSSR(
    <div
      className={classNames(prefixCls, hashId, propsClassName, {
        [`${prefixCls}-light`]: true,
      })}
      style={style}
    >
      <div
        ref={ref}
        className={classNames(`${prefixCls}-main`, hashId, {
          [`${prefixCls}-wide`]: contentWidth === 'Fixed',
        })}
      >
        {headerDom && (
          <div
            className={classNames(`${prefixCls}-main-left ${hashId}`)}
            onClick={onMenuHeaderClick}
          >
            <AppsLogoComponents {...props} />
            <div className={`${prefixCls}-logo ${hashId}`} key="logo" id="logo">
              {headerDom}
            </div>
          </div>
        )}
        <div style={{ flex: 1 }} className={`${prefixCls}-menu ${hashId}`}>
          {contentDom}
        </div>
        {(rightContentRender || actionsRender || props.avatarProps) && (
          <ActionsContent
            rightContentRender={rightContentRender}
            {...props}
            prefixCls={prefixCls}
          />
        )}
      </div>
    </div>,
  );
};

export { TopNavHeader };
