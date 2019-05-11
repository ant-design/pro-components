import BasicLayout, { BasicLayoutProps } from './BasicLayout';
import DefaultFooter from './Footer';
import DefaultHeader, { HeaderViewProps as HeaderProps } from './Header';
import RouteContext from './RouteContext';
import GridContent from './GridContent';
import getPageTitle from './getPageTitle';
import getMenuData from './utils/getMenuData';
import SettingDrawer, {
  SettingDrawerProps,
  SettingDrawerState,
} from './SettingDrawer';

export { Settings } from './defaultSettings';

export { MenuDataItem } from './typings';

export {
  BasicLayout,
  BasicLayoutProps,
  HeaderProps,
  RouteContext,
  GridContent,
  DefaultHeader,
  DefaultFooter,
  SettingDrawer,
  SettingDrawerState,
  SettingDrawerProps,
  getPageTitle,
  getMenuData,
};

export default BasicLayout;
