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
  formatMessage: (data: { id: any; defaultMessage?: string }) => string;
}

const getPageTitle = (props: GetPageTitleProps): string => {
  const {
    pathname,
    breadcrumb,
    formatMessage,
    title = 'Ant Design Pro',
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
  let pageName = currRouterData.name;
  if (menu.locale && currRouterData.locale) {
    pageName = formatMessage({
      id: currRouterData.locale || '',
      defaultMessage: currRouterData.name,
    });
  }

  if (!pageName) {
    return title;
  }
  return `${pageName} - ${title}`;
};

export default getPageTitle;
