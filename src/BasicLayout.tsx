import './BasicLayout.less';

import React, { useState, CSSProperties, useContext, useEffect } from 'react';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/es/breadcrumb';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import classNames from 'classnames';
import warning from 'warning';
import { useMediaQuery } from 'react-responsive';
import Omit from 'omit.js';

import Header, { HeaderViewProps } from './Header';
import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from './typings';
import defaultGetPageTitle, { GetPageTitleProps } from './getPageTitle';
import defaultSettings, { Settings } from './defaultSettings';
import getLocales, { localeType } from './locales';
import { BaseMenuProps } from './SiderMenu/BaseMenu';
import Footer from './Footer';
import RouteContext from './RouteContext';
import SiderMenu from './SiderMenu';
import { SiderMenuProps } from './SiderMenu/SiderMenu';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import getMenuData from './utils/getMenuData';
import { isBrowser } from './utils/utils';

const { Content } = Layout;

const MediaQueryEnum = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

/**
 * loop query screen className
 * Array.find will throw a error
 * `Rendered more hooks than during the previous render.`
 * So should use Array.forEach
 */
const getScreenClassName = () => {
  let className = '';
  Object.keys(MediaQueryEnum).forEach(key => {
    if (useMediaQuery(MediaQueryEnum[key])) {
      className = key;
    }
  });
  return className;
};

export interface BasicLayoutProps
  extends Partial<RouterTypes<Route>>,
    SiderMenuProps,
    HeaderViewProps,
    Partial<Settings> {
  /**
   * logo url
   */
  logo?: React.ReactNode | WithFalse<() => React.ReactNode>;
  locale?: localeType;

  onCollapse?: (collapsed: boolean) => void;

  headerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  footerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  menuRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  breadcrumbRender?: (
    routers: AntdBreadcrumbProps['routes'],
  ) => AntdBreadcrumbProps['routes'];
  menuItemRender?: BaseMenuProps['menuItemRender'];
  pageTitleRender?: WithFalse<
    (props: GetPageTitleProps, defaultPageTitle?: string) => string
  >;
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[];
  itemRender?: AntdBreadcrumbProps['itemRender'];

  formatMessage?: (message: MessageDescriptor) => string;
  /**
   * 是否禁用移动端模式，有的管理系统不需要移动端模式，此属性设置为true即可
   */
  disableMobile?: boolean;
  contentStyle?: CSSProperties;
  isChildrenLayout?: boolean;

  className?: string;
}

const headerRender = (props: BasicLayoutProps): React.ReactNode => {
  if (props.headerRender === false) {
    return null;
  }
  return <Header {...props} />;
};

const footerRender = (props: BasicLayoutProps): React.ReactNode => {
  if (props.footerRender === false) {
    return null;
  }
  if (props.footerRender) {
    return props.footerRender({ ...props }, <Footer />);
  }
  return null;
};

const renderSiderMenu = (props: BasicLayoutProps): React.ReactNode => {
  const { layout, isMobile, menuRender } = props;
  if (props.menuRender === false) {
    return null;
  }
  if (layout === 'topmenu' && !isMobile) {
    return null;
  }
  if (menuRender) {
    return menuRender(props, <SiderMenu {...props} />);
  }

  return <SiderMenu {...props} {...props.menuProps} />;
};

const defaultPageTitleRender = (
  pageProps: GetPageTitleProps,
  props: BasicLayoutProps,
): string => {
  const { pageTitleRender } = props;
  const defaultPageTitle = defaultGetPageTitle(pageProps);
  if (pageTitleRender === false) {
    return props.title || '';
  }
  if (pageTitleRender) {
    const title = pageTitleRender(pageProps, defaultPageTitle);
    if (typeof title === 'string') {
      return title;
    }
    warning(
      typeof title === 'string',
      'pro-layout: renderPageTitle return value should be a string',
    );
  }
  return defaultPageTitle;
};

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumb: { [path: string]: MenuDataItem };
};

function useCollapsed(
  collapsed: boolean | undefined,
  onCollapse: BasicLayoutProps['onCollapse'],
): [boolean | undefined, BasicLayoutProps['onCollapse']] {
  warning(
    (collapsed === undefined) === (onCollapse === undefined),
    'pro-layout: onCollapse and collapsed should exist simultaneously',
  );

  const [nativeCollapsed, setCollapsed] = useState(false);
  if (collapsed !== undefined && onCollapse) {
    return [collapsed, onCollapse];
  }
  if (collapsed !== undefined && !onCollapse) {
    return [collapsed, undefined];
  }
  if (collapsed === undefined && onCollapse) {
    return [undefined, onCollapse];
  }
  return [nativeCollapsed, setCollapsed];
}

const getPaddingLeft = (
  hasLeftPadding: boolean,
  collapsed: boolean | undefined,
  siderWidth: number,
): number | undefined => {
  if (hasLeftPadding) {
    return collapsed ? 80 : siderWidth;
  }
  return undefined;
};

/**
 * 🌃 Powerful and easy to use beautiful layout
 * 🏄‍ Support multiple topics and layout types
 * @param props
 */
const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    children,
    onCollapse: propsOnCollapse,
    location = { pathname: '/' },
    fixSiderbar,
    navTheme,
    contentStyle,
    layout: PropsLayout,
    route = {
      routes: [],
    },
    style,
    siderWidth = 256,
    menu,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
  } = props;

  /**
   * init variables
   */
  const [isMobile, setIsMobile] = useState<boolean>(
    useMediaQuery({ maxWidth: 767 }, undefined, (match: boolean) => {
      if (!props.disableMobile) {
        setIsMobile(match);
      }
    }) && !props.disableMobile,
  );

  useEffect(() => {
    warning(
      false,
      `
Pro-Layout 在 4.7 中支持了 subMenu 的 render, 会导致 menu 变成蓝色的问题。
解决方案如下：https://github.com/ant-design/ant-design-pro-layout/issues/186
`,
    );
  }, []);

  const formatMessage = ({
    id,
    defaultMessage,
    ...rest
  }: {
    id: string;
    defaultMessage?: string;
  }): string => {
    if (props.formatMessage) {
      return props.formatMessage({
        id,
        defaultMessage,
        ...rest,
      });
    }
    const locales = getLocales();
    if (locales[id]) {
      return locales[id];
    }
    if (defaultMessage) {
      return defaultMessage as string;
    }
    return id;
  };

  const { routes = [] } = route;
  const { breadcrumb, menuData } = getMenuData(
    routes,
    menu,
    formatMessage,
    menuDataRender,
  );

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;

  // whether to close the menu
  const [collapsed, onCollapse] = useCollapsed(
    props.collapsed,
    propsOnCollapse,
  );

  // Splicing parameters, adding menuData and formatMessage in props
  const defaultProps = Omit(
    {
      ...props,
      formatMessage,
      breadcrumb,
    },
    ['className', 'style'],
  );

  // gen page title
  const pageTitle = defaultPageTitleRender(
    {
      pathname: location.pathname,
      ...defaultProps,
    },
    props,
  );

  // gen breadcrumbProps, parameter for pageHeader
  const breadcrumbProps = getBreadcrumbProps({
    ...defaultProps,
    breadcrumb,
  });

  // render sider dom
  const siderMenuDom = renderSiderMenu({
    ...defaultProps,
    menuData,
    onCollapse,
    isMobile,
    theme: navTheme,
    collapsed,
  });

  // render header dom
  const headerDom = headerRender({
    ...defaultProps,
    menuData,
    isMobile,
    collapsed,
    onCollapse,
  });

  // render footer dom
  const footerDom = footerRender({
    isMobile,
    collapsed,
    ...defaultProps,
  });
  const { isChildrenLayout: contextIsChildrenLayout } = useContext(
    RouteContext,
  );

  // 如果 props 中定义，以 props 为准
  const isChildrenLayout =
    propsIsChildrenLayout !== undefined
      ? propsIsChildrenLayout
      : contextIsChildrenLayout;

  // gen className
  const className = classNames(
    getScreenClassName(),
    props.className,
    'ant-design-pro',
    'ant-pro-basicLayout',
    {
      'ant-pro-basicLayout-topmenu': PropsLayout === 'topmenu',
      'ant-pro-basicLayout-is-children': isChildrenLayout,
    },
  );

  const genLayoutStyle: CSSProperties = {
    paddingLeft: getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth),
    height: '100%',
    position: 'relative',
    minHeight: '100vh',
  };

  // if is some layout children，don't need min height
  if (isChildrenLayout || (contentStyle && contentStyle.minHeight)) {
    genLayoutStyle.minHeight = 0;
  }

  const contentClassName = classNames('ant-pro-basicLayout-content', {
    'ant-pro-basicLayout-has-header': headerDom,
  });

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={className}>
        <Layout style={style} hasSider>
          {siderMenuDom}
          <Layout style={genLayoutStyle}>
            {headerDom}
            <Content className={contentClassName} style={contentStyle}>
              <RouteContext.Provider
                value={{
                  ...defaultProps,
                  breadcrumb: breadcrumbProps,
                  menuData,
                  isMobile,
                  collapsed,
                  isChildrenLayout: true,
                  title: pageTitle.split('-')[0].trim(),
                }}
              >
                {children}
              </RouteContext.Provider>
            </Content>
            {footerDom}
          </Layout>
        </Layout>
      </div>
    </>
  );
};

BasicLayout.defaultProps = {
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
  ...defaultSettings,
  location: isBrowser() ? window.location : undefined,
};
export default BasicLayout;
