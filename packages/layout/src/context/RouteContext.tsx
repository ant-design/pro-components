import type { BreadcrumbProps } from 'antd';
import { createContext } from 'react';
import type { WaterMarkProps } from '../components/WaterMark';
import type { PureSettings } from '../defaultSettings';
import type { MenuDataItem } from '../typing';
import type { BreadcrumbListReturn } from '../utils/getBreadcrumbProps';

export type RouteContextType = {
  breadcrumb?: BreadcrumbListReturn;
  menuData?: MenuDataItem[];
  isMobile?: boolean;
  prefixCls?: string;
  collapsed?: boolean;
  hasSiderMenu?: boolean;
  hasHeader?: boolean;
  siderWidth?: number;
  isChildrenLayout?: boolean;
  hasFooterToolbar?: boolean;
  hasFooter?: boolean;
  hasPageContainer?: number;
  setHasFooterToolbar?: React.Dispatch<React.SetStateAction<boolean>>;
  setHasPageContainer?: React.Dispatch<React.SetStateAction<number>>;
  pageTitleInfo?: {
    title: string;
    id: string;
    pageName: string;
  };
  matchMenus?: MenuDataItem[];
  matchMenuKeys?: string[];
  currentMenu?: PureSettings & MenuDataItem;
  /** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
  breadcrumbProps?: BreadcrumbProps;
  waterMarkProps?: WaterMarkProps;
} & Partial<PureSettings>;

export const RouteContext: React.Context<RouteContextType> = createContext({});
