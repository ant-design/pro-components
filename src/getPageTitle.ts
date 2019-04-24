import pathToRegexp from 'path-to-regexp';
import { Settings } from './defaultSettings';
import { MenuDataItem } from './typings';

export const matchParamsPath = (
  pathname: string,
  breadcrumb?: { [path: string]: MenuDataItem },
): MenuDataItem => {
  if (breadcrumb) {
    const pathKey = Object.keys(breadcrumb).find(key =>
      pathToRegexp(key).test(pathname),
    );
    return breadcrumb[pathKey!];
  }
  return {
    path: '',
  };
};

interface GetPageTitleProps {
  pathname?: string;
  breadcrumb?: { [path: string]: MenuDataItem };
  menu?: Settings['menu'];
  title?: Settings['title'];
  formatMessage: (data: { id: string; defaultMessage?: string }) => string;
}

const getPageTitle = (props: GetPageTitleProps): string => {
  const {
    pathname,
    breadcrumb,
    formatMessage,
    title = '',
    menu = {
      locale: false,
    },
  } = props;

  if (!pathname) {
    return title;
  }
  const currRouterData = matchParamsPath(pathname, breadcrumb);
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
