import { MenuOutlined } from '@ant-design/icons';
import type { AvatarProps } from 'antd';
import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';
import type { PureSettings } from '../../defaultSettings';
import type { MenuDataItem } from '../../index';
import type { WithFalse } from '../../typing';
import { clearMenuItem } from '../../utils/utils';
import { AppsLogoComponents, defaultRenderLogo } from '../AppsLogoComponents';
import type { HeaderViewProps } from '../Header';
import type { PrivateSiderMenuProps, SiderMenuProps } from '../SiderMenu/SiderMenu';
import { renderLogoAndTitle } from '../SiderMenu/SiderMenu';
import { TopNavHeader } from '../TopNavHeader';
import { RightContent } from './RightContent';
import { useStyle } from './style';
import type {
  AppsLogoComponentsAppList,
  AppsLogoComponentsAppItem,
} from '../AppsLogoComponents/types';

export type GlobalHeaderProps = {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  /**
   * @name 虽然叫menuRender，但是其实是整个 SiderMenu 面板的渲染函数
   *
   * @example 收起时完成不展示菜单 menuRender={(props,defaultDom)=> props.collapsed ? null : defaultDom}
   * @example 不展示菜单 menuRender={false}
   */
  menuRender?: WithFalse<(props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode>;
  /**
   * @name 右侧顶部操作区域的渲染逻辑,一般会展示一个头像和一些操作
   *
   * @example 展示一个头像: rightRender={(props) => <Avatar shape="square" size="small" icon={<UserOutlined />} />}
   * @example 展示一些操作: rightRender={(props) => [<Button type="primary">操作</Button>,<Button type="primary">管理控制台</Button>]}
   */
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  className?: string;
  prefixCls?: string;
  /** 相关品牌的列表 */
  appList?: AppsLogoComponentsAppList;
  /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
  itemClick?: (item: AppsLogoComponentsAppItem) => void;
  menuData?: MenuDataItem[];
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  menuHeaderRender?: SiderMenuProps['menuHeaderRender'];

  /**
   * @name 顶部区域的渲染，包含内部的 menu
   *
   * @example headerContentRender={(props) => <div>管理控制台 </div>}
   */
  headerContentRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  collapsedButtonRender?: SiderMenuProps['collapsedButtonRender'];

  splitMenus?: boolean;
  /** Layout的操作功能列表，不同的 layout 会放到不同的位置 */
  actionsRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode[]>;

  /** 头像的设置 */
  avatarProps?: WithFalse<
    AvatarProps & {
      title?: React.ReactNode;
    }
  >;
  children?: React.ReactNode;
} & Partial<PureSettings>;

const renderLogo = (
  menuHeaderRender: SiderMenuProps['menuHeaderRender'],
  logoDom: React.ReactNode,
) => {
  if (menuHeaderRender === false) {
    return null;
  }
  if (menuHeaderRender) {
    return menuHeaderRender(logoDom, null);
  }
  return logoDom;
};

const GlobalHeader: React.FC<GlobalHeaderProps & PrivateSiderMenuProps> = (props) => {
  const {
    isMobile,
    logo,
    collapsed,
    onCollapse,
    rightContentRender,
    menuHeaderRender,
    onMenuHeaderClick,
    className: propClassName,
    style,
    layout,
    children,
    splitMenus,
    menuData,
    prefixCls,
  } = props;
  const { direction } = useContext(ConfigProvider.ConfigContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const baseClassName = `${prefixCls || getPrefixCls('pro')}-global-header`;

  const { wrapSSR, hashId } = useStyle(baseClassName);

  const className = classNames(propClassName, baseClassName, hashId);

  if (layout === 'mix' && !isMobile && splitMenus) {
    const noChildrenMenuData = (menuData || []).map((item) => ({
      ...item,
      children: undefined,
      routes: undefined,
    }));
    const clearMenuData = clearMenuItem(noChildrenMenuData);
    return (
      <TopNavHeader mode="horizontal" {...props} splitMenus={false} menuData={clearMenuData} />
    );
  }

  const logoClassNames = classNames(`${baseClassName}-logo`, hashId, {
    [`${baseClassName}-logo-rtl`]: direction === 'rtl',
    [`${baseClassName}-logo-mix`]: layout === 'mix',
    [`${baseClassName}-logo-mobile`]: isMobile,
  });

  const logoDom = (
    <span className={logoClassNames} key="logo">
      <a>{defaultRenderLogo(logo)}</a>
    </span>
  );
  return wrapSSR(
    <div className={className} style={{ ...style }}>
      {isMobile && (
        <span
          className={`${baseClassName}-collapsed-button ${hashId}`}
          onClick={() => {
            onCollapse?.(!collapsed);
          }}
        >
          <MenuOutlined />
        </span>
      )}
      {isMobile && renderLogo(menuHeaderRender, logoDom)}
      {layout === 'mix' && !isMobile && (
        <>
          <AppsLogoComponents {...props} />
          <div className={logoClassNames} onClick={onMenuHeaderClick}>
            {renderLogoAndTitle({ ...props, collapsed: false }, 'headerTitleRender')}
          </div>
        </>
      )}
      <div style={{ flex: 1 }}>{children}</div>
      {(rightContentRender || props.actionsRender || props.avatarProps) && (
        <RightContent rightContentRender={rightContentRender} {...props} />
      )}
    </div>,
  );
};

export { GlobalHeader };
