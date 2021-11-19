import type { ProLayoutProps } from './BasicLayout';
import { ProLayout } from './BasicLayout';
import type { HeaderViewProps as HeaderProps } from './Header';
import { DefaultHeader } from './Header';
import type { TopNavHeaderProps } from './components/TopNavHeader';
import { TopNavHeader } from './components/TopNavHeader';
import type { SettingDrawerProps, SettingDrawerState } from './components/SettingDrawer';
import { SettingDrawer } from './components/SettingDrawer';

import type { FooterProps } from './Footer';
import { DefaultFooter } from './Footer';
import { GridContent } from './components/GridContent';
import type { PageContainerProps } from './components/PageContainer';
import type { RouteContextType } from './RouteContext';
import { RouteContext } from './RouteContext';
import { getMenuData } from './utils/getMenuData';
import { getPageTitle } from './getPageTitle';
import { PageLoading } from './components/PageLoading';
import { FooterToolbar } from './components/FooterToolbar';
import { WaterMark } from './components/WaterMark';
import { PageContainer, ProPageHeader, ProBreadcrumb } from './components/PageContainer';

export type { ProSettings as Settings, ProSettings } from './defaultSettings';

export type { MenuDataItem } from './typings';

export {
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
  FooterProps,
  PageContainerProps,
  TopNavHeaderProps,
  ProLayoutProps as BasicLayoutProps,
  RouteContextType,
  HeaderProps,
  SettingDrawerProps,
  SettingDrawerState,
};

export default ProLayout;
