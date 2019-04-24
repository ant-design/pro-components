import pathToRegexp from 'path-to-regexp';
import { Settings } from './defaultSettings';
import { MenuDataItem } from './typings';

export const matchParamsPath = (
  pathname: string,
  breadcrumbNameMap?: { [path: string]: MenuDataItem },
): MenuDataItem => {
  if (breadcrumbNameMap) {
    const pathKey = Object.keys(breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname),
    );
    return breadcrumbNameMap[pathKey!];
  }
  return {
    path: '',
  };
};

interface GetPageTitleProps {
  pathname?: string;
  breadcrumbNameMap?: { [path: string]: MenuDataItem };
  menu?: Settings['menu'];
  title?: Settings['title'];
  formatMessage: (data: { id: string; defaultMessage?: string }) => string;
}

const getPageTitle = (props: GetPageTitleProps): string => {
  const {
    pathname,
    breadcrumbNameMap,
    formatMessage,
    title = '',
    menu = {
      locale: false,
    },
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

  if (!pageName) {
    return title;
  }
  return `${pageName} - ${title}`;
};

export default getPageTitle;
