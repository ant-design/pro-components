import type { BasicLayoutProps } from './BasicLayout';
import BasicLayout from './BasicLayout';
import type { HeaderViewProps as HeaderProps } from './Header';
import DefaultHeader from './Header';
import type { TopNavHeaderProps } from './TopNavHeader';
import TopNavHeader from './TopNavHeader';
import type { SettingDrawerProps, SettingDrawerState } from './SettingDrawer';
import SettingDrawer from './SettingDrawer';

import type { FooterProps } from './Footer';
import DefaultFooter from './Footer';
import GridContent from './GridContent';
import PageContainer from './PageContainer';
import type { RouteContextType } from './RouteContext';
import RouteContext from './RouteContext';
import getMenuData from './utils/getMenuData';
import getPageTitle from './getPageTitle';
import PageLoading from './PageLoading';
import FooterToolbar from './FooterToolbar';

export type { ProSettings as Settings, ProSettings } from './defaultSettings';

export type { MenuDataItem } from './typings';

const PageHeaderWrapper = PageContainer;

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
};

export type {
  FooterProps,
  TopNavHeaderProps,
  BasicLayoutProps,
  RouteContextType,
  HeaderProps,
  SettingDrawerProps,
  SettingDrawerState,
};

export default BasicLayout;
