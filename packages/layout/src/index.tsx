import type { BasicLayoutProps } from './BasicLayout';
import BasicLayout from './BasicLayout';
import FooterToolbar from './components/FooterToolbar';
import GridContent from './components/GridContent';
import type { PageContainerProps } from './components/PageContainer';
import PageContainer, { ProBreadcrumb, ProPageHeader } from './components/PageContainer';
import PageLoading from './components/PageLoading';
import type { SettingDrawerProps, SettingDrawerState } from './components/SettingDrawer';
import SettingDrawer from './components/SettingDrawer';
import type { TopNavHeaderProps } from './components/TopNavHeader';
import TopNavHeader from './components/TopNavHeader';
import WaterMark from './components/WaterMark';
import type { FooterProps } from './Footer';
import DefaultFooter from './Footer';
import getPageTitle from './getPageTitle';
import type { HeaderViewProps as HeaderProps } from './Header';
import DefaultHeader from './Header';
import type { RouteContextType } from './RouteContext';
import RouteContext from './RouteContext';
import getMenuData from './utils/getMenuData';

export type { ProSettings, ProSettings as Settings } from './defaultSettings';
export type { MenuDataItem } from './typings';
export {
  BasicLayout,
  RouteContext,
  PageLoading,
  GridContent,
  DefaultHeader,
  TopNavHeader,
  DefaultFooter,
  SettingDrawer,
  getPageTitle,
  PageHeaderWrapper,
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
  BasicLayoutProps,
  RouteContextType,
  HeaderProps,
  SettingDrawerProps,
  SettingDrawerState,
};

const PageHeaderWrapper = PageContainer;

export default BasicLayout;
