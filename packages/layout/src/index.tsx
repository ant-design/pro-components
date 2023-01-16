// 兼容代码-----------
import 'antd/es/anchor/style';
import 'antd/es/avatar/style';
import 'antd/es/breadcrumb/style';
import 'antd/es/divider/style';
import 'antd/es/drawer/style';
import 'antd/es/layout/style';
import 'antd/es/list/style';
import 'antd/es/menu/style';
import 'antd/es/message/style';
import 'antd/es/popover/style';
import 'antd/es/select/style';
import 'antd/es/space/style';
import 'antd/es/spin/style';
import 'antd/es/switch/style';
import 'antd/es/tabs/style';
import 'antd/es/tooltip/style';
//----------------------

import { FooterToolbar } from './components/FooterToolbar';
import { GridContent } from './components/GridContent';
import type { PageContainerProps } from './components/PageContainer';
import { PageContainer, ProBreadcrumb, ProPageHeader } from './components/PageContainer';
import type { PageHeaderProps } from './components/PageHeader';
import { PageHeader } from './components/PageHeader';
import type { AppItemProps, AppListProps } from './components/AppsLogoComponents/types';

import type { FooterProps } from './components/Footer';
import { DefaultFooter } from './components/Footer';
import type { HeaderViewProps as HeaderProps } from './components/Header';
import { DefaultHeader } from './components/Header';
import { PageLoading } from './components/PageLoading';
import type { SettingDrawerProps, SettingDrawerState } from './components/SettingDrawer';
import { SettingDrawer } from './components/SettingDrawer';
import type { TopNavHeaderProps } from './components/TopNavHeader';
import { TopNavHeader } from './components/TopNavHeader';
import type { WaterMarkProps } from './components/WaterMark';
import { WaterMark } from './components/WaterMark';
import type { RouteContextType } from './context/RouteContext';
import { RouteContext } from './context/RouteContext';
import { getPageTitle } from './getPageTitle';
import type { ProLayoutProps } from './ProLayout';
import { ProLayout } from './ProLayout';
import { getMenuData } from './utils/getMenuData';

export type { ProSettings, ProSettings as Settings } from './defaultSettings';
export type { MenuDataItem } from './typing';
export {
  PageHeader,
  ProLayout,
  RouteContext,
  PageLoading,
  GridContent,
  DefaultHeader,
  TopNavHeader,
  DefaultFooter,
  SettingDrawer,
  getPageTitle,
  getMenuData,
  PageContainer,
  FooterToolbar,
  WaterMark,
  ProPageHeader,
  ProBreadcrumb,
};
export type {
  WaterMarkProps,
  FooterProps,
  PageHeaderProps,
  PageContainerProps,
  TopNavHeaderProps,
  ProLayoutProps,
  RouteContextType,
  HeaderProps,
  SettingDrawerProps,
  SettingDrawerState,
  AppItemProps,
  AppListProps,
};

export default ProLayout;
