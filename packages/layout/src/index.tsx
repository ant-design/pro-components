import BasicLayout, { BasicLayoutProps } from './BasicLayout';
import DefaultHeader, { HeaderViewProps as HeaderProps } from './Header';
import TopNavHeader, { TopNavHeaderProps } from './TopNavHeader';
import SettingDrawer, {
  SettingDrawerProps,
  SettingDrawerState,
} from './SettingDrawer';

import DefaultFooter, { FooterProps } from './Footer';
import GridContent from './GridContent';
import PageContainer from './PageContainer';
import RouteContext, { RouteContextType } from './RouteContext';
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
