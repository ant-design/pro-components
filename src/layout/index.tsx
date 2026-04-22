import type {
  AppItemProps,
  AppListProps,
} from './components/AppsLogoComponents/types';
import type { FooterProps } from './components/Footer';
import { DefaultFooter } from './components/Footer';
import { FooterToolbar } from './components/FooterToolbar';
import { GridContent } from './components/GridContent';
import type { HeaderViewProps as HeaderProps } from './components/Header';
import { DefaultHeader } from './components/Header';
import type { PageContainerProps } from './components/PageContainer';
import {
  PageContainer,
  ProBreadcrumb,
  ProPageHeader,
} from './components/PageContainer';
import type { PageHeaderProps } from './components/PageHeader';
import { PageHeader } from './components/PageHeader';
import { PageLoading } from './components/PageLoading';
import type { BaseMenuProps } from './components/SiderMenu/BaseMenu';
import { BaseMenu } from './components/SiderMenu/BaseMenu';
import type { ProLayoutNavMenuProps } from './components/SiderMenu/ProLayoutNavMenu';
import type {
  MenuMode,
  NavMenuDividerNode,
  NavMenuGroupNode,
  NavMenuLeafNode,
  NavMenuNode,
  NavMenuSubmenuNode,
  ProLayoutNavMenuDomProps,
  ProLayoutNavMenuSelectInfo,
} from './components/SiderMenu/types';
import type { TopNavHeaderProps } from './components/TopNavHeader';
import { TopNavHeader } from './components/TopNavHeader';
import type { RouteContextType } from './context/RouteContext';
import { RouteContext } from './context/RouteContext';
import { getPageTitle } from './getPageTitle';
import type {
  ProLayoutLayoutMode,
  ProLayoutMenuRenderCallbackProps,
  ProLayoutProps,
} from './ProLayout';
import { ProLayout } from './ProLayout';
import { getMenuData } from './utils/getMenuData';

// WaterMark component has been removed, please use antd Watermark directly
export type { ProSettings, ProSettings as Settings } from './defaultSettings';
export type { MenuDataItem } from './typing';
export {
  BaseMenu,
  DefaultFooter,
  DefaultHeader,
  FooterToolbar,
  getMenuData,
  getPageTitle,
  GridContent,
  PageContainer,
  PageHeader,
  PageLoading,
  ProBreadcrumb,
  ProLayout,
  ProPageHeader,
  RouteContext,
  TopNavHeader,
};
export type {
  AppItemProps,
  AppListProps,
  BaseMenuProps,
  FooterProps,
  HeaderProps,
  MenuMode,
  NavMenuDividerNode,
  NavMenuGroupNode,
  NavMenuLeafNode,
  NavMenuNode,
  NavMenuSubmenuNode,
  PageContainerProps,
  PageHeaderProps,
  ProLayoutNavMenuDomProps,
  ProLayoutNavMenuProps,
  ProLayoutNavMenuSelectInfo,
  ProLayoutLayoutMode,
  ProLayoutMenuRenderCallbackProps,
  ProLayoutProps,
  RouteContextType,
  TopNavHeaderProps,
};
export default ProLayout;
