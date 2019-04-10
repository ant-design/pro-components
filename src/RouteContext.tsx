import { createContext } from 'react';
import { BreadcrumbListReturn } from './PageHeaderWrapper/Breadcrumb';
import settings, { Settings } from './defaultSettings';

interface RouteContextType extends BreadcrumbListReturn {
  settings: Settings;
}

const routeContext: React.Context<RouteContextType> = createContext({ settings });

export default routeContext;
