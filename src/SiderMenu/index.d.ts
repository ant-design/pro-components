import { MenuMode, MenuTheme } from 'antd/lib/menu';
import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from '../typings';

import { Settings } from '../defaultSettings';

export interface BaseMenuProps
  extends Partial<RouterTypes<Route>>,
    Partial<Settings> {
  className?: string;
  collapsed?: boolean;
  flatMenuKeys?: string[];
  handleOpenChange?: (openKeys: string[]) => void;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  onOpenChange?: (openKeys: string[]) => void;
  openKeys?: string[];
  style?: React.CSSProperties;
  theme?: MenuTheme;
  formatMessage?: (message: MessageDescriptor) => string;
  menuItemRender?: WithFalse<
    (item: MenuDataItem, defaultDom: React.ReactNode) => React.ReactNode
  >;
}
