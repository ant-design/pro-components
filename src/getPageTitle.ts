import pathToRegexp from 'path-to-regexp';
import { Settings } from './defaultSettings';
import { MenuDataItem } from './typings';

export const matchParamsPath = (
  pathname: string,
  breadcrumbNameMap?: { [path: string]: MenuDataItem },
): MenuDataItem => {
  if (breadcrumbNameMap) {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey!];
  }
  return {
    path: '',
  };
};

interface GetPageTitleProps {
  pathname?: string;
  breadcrumbNameMap?: { [path: string]: MenuDataItem };
  settings: Settings;
  formatMessage: (data: { id: string; defaultMessage?: string }) => string;
}

const getPageTitle = (props: GetPageTitleProps): string => {
  const {
    settings: { menu, title },
    pathname,
    breadcrumbNameMap,
    formatMessage,
  } = props;

  if (!pathname) {
    return title;
  }
  const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currRouterData) {
    return title;
  }
  const pageName = !menu.locale
    ? currRouterData.name
    : formatMessage({
        id: currRouterData.locale || currRouterData.name!,
        defaultMessage: currRouterData.name,
      });

  return `${pageName} - ${title}`;
};

export default getPageTitle;
