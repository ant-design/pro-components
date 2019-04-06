import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import pathToRegexp from 'path-to-regexp';
import { formatMessage } from 'umi-plugin-react/locale';
import { MenuDataItem } from './SiderMenu/BaseMenu';
import { Settings } from './defaultSettings';

export const matchParamsPath = (
  pathname: string,
  breadcrumbNameMap: { [path: string]: MenuDataItem },
): MenuDataItem => {
  const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
  return breadcrumbNameMap[pathKey!];
};

const getPageTitle = (
  pathname: string,
  breadcrumbNameMap: { [path: string]: MenuDataItem },
  settings: Settings,
): string => {
  const { menu, title } = settings;
  const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currRouterData) {
    return title;
  }
  const pageName = menu.disableLocal
    ? currRouterData.name
    : formatMessage({
        id: currRouterData.locale || currRouterData.name!,
        defaultMessage: currRouterData.name,
      });

  return `${pageName} - ${title}`;
};

export default memoizeOne(getPageTitle, isEqual);
