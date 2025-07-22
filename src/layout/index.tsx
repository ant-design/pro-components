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
import type {
  SettingDrawerProps,
  SettingDrawerState,
} from './components/SettingDrawer';
import { SettingDrawer } from './components/SettingDrawer';
import type { TopNavHeaderProps } from './components/TopNavHeader';
import { TopNavHeader } from './components/TopNavHeader';
import type { RouteContextType } from './context/RouteContext';
import { RouteContext } from './context/RouteContext';
import { getPageTitle } from './getPageTitle';
import type { ProLayoutProps } from './ProLayout';
import { ProLayout } from './ProLayout';
import { getMenuData } from './utils/getMenuData';

export { Watermark as WaterMark } from 'antd';
export * from './components/Help';
export type { ProSettings, ProSettings as Settings } from './defaultSettings';
export type { MenuDataItem } from './typing';
export {
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
  SettingDrawer,
  TopNavHeader,
};
export type {
  AppItemProps,
  AppListProps,
  FooterProps,
  HeaderProps,
  PageContainerProps,
  PageHeaderProps,
  ProLayoutProps,
  RouteContextType,
  SettingDrawerProps,
  SettingDrawerState,
  TopNavHeaderProps,
};
export default ProLayout;
