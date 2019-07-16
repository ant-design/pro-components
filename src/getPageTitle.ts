import pathToRegexp from 'path-to-regexp';
import { MenuDataItem } from './typings';
import { Settings } from './defaultSettings';

export const matchParamsPath = (
  pathname: string,
  breadcrumb?: { [path: string]: MenuDataItem },
): MenuDataItem => {
  if (breadcrumb) {
    const pathKey = Object.keys(breadcrumb).find(key =>
      pathToRegexp(key).test(pathname),
    );
    if (pathKey) {
      return breadcrumb[pathKey];
    }
  }
  return {
    path: '',
  };
};

export interface GetPageTitleProps {
  pathname?: string;
  breadcrumb?: { [path: string]: MenuDataItem };
  menu?: Settings['menu'];
  title?: Settings['title'];
  pageName?: string;
  formatMessage?: (data: { id: any; defaultMessage?: string }) => string;
}
const getPageTitle = (
  props: GetPageTitleProps,
  ignoreTile?: boolean,
): string => {
  const {
    pathname = '/',
    breadcrumb,
    formatMessage,
    title = 'Ant Design Pro',
    menu = {
      locale: false,
    },
  } = props;
  const pageTitle = ignoreTile ? '' : title;
  if (!pathname) {
    return pageTitle;
  }
  const currRouterData = matchParamsPath(pathname, breadcrumb);
  if (!currRouterData) {
    return pageTitle;
  }
  let pageName = currRouterData.name;
  if (menu.locale && currRouterData.locale && formatMessage) {
    pageName = formatMessage({
      id: currRouterData.locale || '',
      defaultMessage: currRouterData.name,
    });
  }

  if (!pageName) {
    return pageTitle;
  }
  if (ignoreTile) {
    return pageName;
  }
  return `${pageName} - ${title}`;
};

export default getPageTitle;
