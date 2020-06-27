import { createContext } from 'react';
import { BreadcrumbListReturn } from './utils/getBreadcrumbProps';
import { PureSettings } from './defaultSettings';
import { MenuDataItem } from './typings';

export interface RouteContextType extends Partial<PureSettings> {
  breadcrumb?: BreadcrumbListReturn;
  menuData?: MenuDataItem[];
  isMobile?: boolean;
  prefixCls?: string;
  collapsed?: boolean;
  isChildrenLayout?: boolean;
}

const routeContext: React.Context<RouteContextType> = createContext({});

export default routeContext;
