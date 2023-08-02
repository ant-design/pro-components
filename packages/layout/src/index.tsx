// 兼容代码-----------
import 'antd/lib/anchor/style';
import 'antd/lib/avatar/style';
import 'antd/lib/breadcrumb/style';
import 'antd/lib/divider/style';
import 'antd/lib/drawer/style';
import 'antd/lib/layout/style';
import 'antd/lib/list/style';
import 'antd/lib/menu/style';
import 'antd/lib/message/style';
import 'antd/lib/popover/style';
import 'antd/lib/select/style';
import 'antd/lib/space/style';
import 'antd/lib/spin/style';
import 'antd/lib/switch/style';
import 'antd/lib/tabs/style';
import 'antd/lib/tooltip/style';
import 'antd/lib/typography/style';
//----------------------

import type {
  AppItemProps,
  AppListProps,
} from './components/AppsLogoComponents/types';
import { FooterToolbar } from './components/FooterToolbar';
import { GridContent } from './components/GridContent';
import type { PageContainerProps } from './components/PageContainer';
import {
  PageContainer,
  ProBreadcrumb,
  ProPageHeader,
} from './components/PageContainer';
import type { PageHeaderProps } from './components/PageHeader';
import { PageHeader } from './components/PageHeader';

import type { FooterProps } from './components/Footer';
import { DefaultFooter } from './components/Footer';
import type { HeaderViewProps as HeaderProps } from './components/Header';
import { DefaultHeader } from './components/Header';
import { PageLoading } from './components/PageLoading';
import type {
  SettingDrawerProps,
  SettingDrawerState,
} from './components/SettingDrawer';
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

export * from './components/Help';
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
