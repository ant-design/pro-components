import pathToRegexp from 'path-to-regexp';
import { MenuDataItem } from './typings';
import { Settings } from './defaultSettings';

export const matchParamsPath = (
  pathname: string,
  breadcrumb?: { [path: string]: MenuDataItem },
  breadcrumbMap?: Map<string, MenuDataItem>,
): MenuDataItem => {
  // Internal logic use breadcrumbMap to ensure the order
  // 内部逻辑使用 breadcrumbMap 来确保查询顺序
  if (breadcrumbMap) {
    const pathKey = [...breadcrumbMap.keys()].find(key =>
      pathToRegexp(key).test(pathname),
    );
    if (pathKey) {
      return breadcrumbMap.get(pathKey) as MenuDataItem;
    }
  }

  // External uses use breadcrumb
  // 外部用户使用 breadcrumb 参数
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
  breadcrumbMap?: Map<string, MenuDataItem>;
  menu?: Settings['menu'];
  title?: Settings['title'];
  pageName?: string;
  formatMessage?: (data: { id: any; defaultMessage?: string }) => string;
}

const getPageTitle = (props: GetPageTitleProps, ignoreTile?: boolean) => {
  const {
    pathname = '/',
    breadcrumb,
    breadcrumbMap,
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
  const currRouterData = matchParamsPath(pathname, breadcrumb, breadcrumbMap);
  if (!currRouterData) {
    return pageTitle;
  }
  let pageName = currRouterData.name;
  if (menu.locale !== false && currRouterData.locale && formatMessage) {
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

/**
 * 获取关于 pageTile 的所有信息方便包装
 * @param props
 * @param ignoreTile
 */
const getPageTitleInfo = (
  props: GetPageTitleProps,
  ignoreTile?: boolean,
): {
  // 页面标题
  title: string;
  // locale 的 title
  id: string;
  // 页面标题不带默认的 title
  pageName: string;
} => {
  const {
    pathname = '/',
    breadcrumb,
    breadcrumbMap,
    formatMessage,
    title = 'Ant Design Pro',
    menu = {
      locale: false,
    },
  } = props;
  const pageTitle = ignoreTile ? '' : title;
  if (!pathname) {
    return {
      title: pageTitle,
      id: '',
      pageName: pageTitle,
    };
  }
  const currRouterData = matchParamsPath(pathname, breadcrumb, breadcrumbMap);
  if (!currRouterData) {
    return {
      title: pageTitle,
      id: '',
      pageName: pageTitle,
    };
  }
  let pageName = currRouterData.name;
  if (menu.locale !== false && currRouterData.locale && formatMessage) {
    pageName = formatMessage({
      id: currRouterData.locale || '',
      defaultMessage: currRouterData.name,
    });
  }

  if (!pageName) {
    return {
      title: pageTitle,
      id: currRouterData.locale || '',
      pageName: pageTitle,
    };
  }
  if (ignoreTile) {
    return {
      title: pageName,
      id: currRouterData.locale || '',
      pageName,
    };
  }
  return {
    title: `${pageName} - ${title}`,
    id: currRouterData.locale || '',
    pageName,
  };
};

export { getPageTitleInfo };

export default getPageTitle;
