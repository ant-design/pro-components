import { createContext } from 'react';
import { BreadcrumbListReturn } from './PageHeaderWrapper/Breadcrumb';
import { Settings } from './defaultSettings';

interface RouteContextType extends BreadcrumbListReturn, Partial<Settings> {}

const routeContext: React.Context<RouteContextType> = createContext({});

export default routeContext;
