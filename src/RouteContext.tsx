import { createContext } from 'react';
import { BreadcrumbListReturn } from './utils/getBreadcrumbProps';
import { Settings } from './defaultSettings';
import { MenuDataItem } from './typings';

interface RouteContextType extends Partial<Settings> {
  breadcrumb?: BreadcrumbListReturn;
  menuData?: MenuDataItem[];
}

const routeContext: React.Context<RouteContextType> = createContext({});

export default routeContext;
