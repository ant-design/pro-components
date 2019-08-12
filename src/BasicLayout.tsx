import './BasicLayout.less';

import React, { useState } from 'react';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/es/breadcrumb';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import { Layout } from 'antd';
import classNames from 'classnames';
import useMedia from 'react-media-hook2';
import warning from 'warning';

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

const query = {
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

export interface BasicLayoutProps
  extends Partial<RouterTypes<Route>>,
    SiderMenuProps,
    HeaderViewProps,
    Partial<Settings> {
  logo?: React.ReactNode | WithFalse<() => React.ReactNode>;
  locale?: localeType;
  onCollapse?: (collapsed: boolean) => void;
  headerRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  footerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  menuRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  menuItemRender?: BaseMenuProps['menuItemRender'];
  pageTitleRender?: WithFalse<typeof defaultGetPageTitle>;
  formatMessage?: (message: MessageDescriptor) => string;
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[];
  breadcrumbRender?: (
    routers: AntdBreadcrumbProps['routes'],
  ) => AntdBreadcrumbProps['routes'];
  itemRender?: AntdBreadcrumbProps['itemRender'];
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
  return <Footer />;
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

  return <SiderMenu {...props} />;
};

const defaultPageTitleRender = (
  pageProps: GetPageTitleProps,
  props: BasicLayoutProps,
): string => {
  const { pageTitleRender } = props;
  if (pageTitleRender === false) {
    return props.title || '';
  }
  if (pageTitleRender) {
    const title = pageTitleRender(pageProps);
    if (typeof title === 'string') {
      return title;
    }
    warning(
      typeof title === 'string',
      'pro-layout: renderPageTitle return value should be a string',
    );
  }
  return defaultGetPageTitle(pageProps);
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

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    children,
    onCollapse: propsOnCollapse,
    location = { pathname: '/' },
    fixedHeader,
    fixSiderbar,
    navTheme,
    layout: PropsLayout,
    route = {
      routes: [],
    },
    siderWidth = 256,
    menu,
    menuDataRender,
  } = props;

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

  /**
   * init variables
   */
  const isMobile = useMedia({
    id: 'BasicLayout',
    query: '(max-width: 599px)',
  })[0];

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;

  // whether to close the menu
  const [collapsed, onCollapse] = useCollapsed(
    props.collapsed,
    propsOnCollapse,
  );

  // Splicing parameters, adding menuData and formatMessage in props
  const defaultProps = {
    ...props,
    formatMessage,
    breadcrumb,
  };

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
    ...props,
    breadcrumb,
  });

  return (
    <DocumentTitle title={pageTitle}>
      <ContainerQuery query={query}>
        {params => (
          <div className={classNames(params, 'ant-design-pro', 'basicLayout')}>
            <Layout>
              {renderSiderMenu({
                ...defaultProps,
                menuData,
                onCollapse,
                isMobile,
                theme: navTheme,
                collapsed,
              })}
              <Layout
                style={{
                  paddingLeft: getPaddingLeft(
                    !!hasLeftPadding,
                    collapsed,
                    siderWidth,
                  ),
                  minHeight: '100vh',
                }}
              >
                {headerRender({
                  ...defaultProps,
                  menuData,
                  isMobile,
                  collapsed,
                  onCollapse,
                })}
                <Content
                  className="ant-pro-basicLayout-content"
                  style={!fixedHeader ? { paddingTop: 0 } : {}}
                >
                  <RouteContext.Provider
                    value={{
                      breadcrumb: breadcrumbProps,
                      ...props,
                      menuData,
                      isMobile,
                      collapsed,
                      title: pageTitle.split('-')[0].trim(),
                    }}
                  >
                    {children}
                  </RouteContext.Provider>
                </Content>
                {footerRender({
                  isMobile,
                  collapsed,
                  ...defaultProps,
                })}
              </Layout>
            </Layout>
          </div>
        )}
      </ContainerQuery>
    </DocumentTitle>
  );
};

BasicLayout.defaultProps = {
  logo: '',
  ...defaultSettings,
  location: isBrowser() ? window.location : undefined,
};
export default BasicLayout;
