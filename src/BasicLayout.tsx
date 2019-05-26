import SiderMenu from './SiderMenu';
import {
  MenuDataItem,
  Route,
  WithFalse,
  RouterTypes,
  MessageDescriptor,
} from './typings';
import { SiderMenuProps } from './SiderMenu/SiderMenu';
import { BaseMenuProps } from './SiderMenu/BaseMenu';
import Header, { HeaderViewProps } from './Header';
import defaultGetPageTitle, { GetPageTitleProps } from './getPageTitle';
import { Layout } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import useMedia from 'react-media-hook2';
import defaultSettings, { Settings } from './defaultSettings';
import Footer from './Footer';
import getLocales, { localeType } from './locales';
import RouteContext from './RouteContext';
import getMenuData from './utils/getMenuData';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
import './BasicLayout.less';

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

const headerRender = (props: BasicLayoutProps) => {
  if (props.headerRender === false) {
    return null;
  }
  return <Header {...props} />;
};

const footerRender = (props: BasicLayoutProps) => {
  if (props.footerRender === false) {
    return null;
  }
  if (props.footerRender) {
    return props.footerRender({ ...props }, <Footer />);
  }
  return <Footer />;
};

const renderSiderMenu = (props: BasicLayoutProps) => {
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

const pageTitleRender = (
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
    } else {
      console.warn(
        'pro-layout: renderPageTitle return value should be a string',
      );
    }
  }
  return defaultGetPageTitle(pageProps);
};

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumb: { [path: string]: MenuDataItem };
};

function useCollapsed(
  collapsed: boolean | undefined,
  onCollapse: BasicLayoutProps['onCollapse'],
): [boolean, BasicLayoutProps['onCollapse']] {
  const [nativeCollapsed, setCollapsed] = useState(false);
  if (collapsed !== undefined && onCollapse) {
    return [collapsed, onCollapse];
  }
  return [nativeCollapsed, setCollapsed];
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    children,
    onCollapse,
    location = { pathname: '/' },
    fixedHeader,
    fixSiderbar,
    navTheme,
    layout: PropsLayout,
    route = {
      routes: [],
    },
    siderWidth = 256,
  } = props;
  const { routes = [] } = route;
  const { breadcrumb, menuData } = getMenuData(routes, props);

  /**
   * init variables
   */
  const isMobile = useMedia({
    id: 'BasicLayout',
    query: '(max-width: 599px)',
  })[0];
  const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;

  const [collapsed, handleMenuCollapse] = useCollapsed(
    props.collapsed,
    onCollapse,
  );

  const formatMessage = ({
    id,
    defaultMessage,
    ...rest
  }: {
    id: string;
    defaultMessage?: string;
  }) => {
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

  const defaultProps = {
    ...props,
    formatMessage,
    breadcrumb,
  };
  const pageTitle = pageTitleRender(
    {
      pathname: location.pathname,
      ...defaultProps,
    },
    props,
  );
  const breadcrumbProps = getBreadcrumbProps({
    ...props,
    breadcrumb,
  });
  const layout = (
    <Layout>
      {renderSiderMenu({
        menuData,
        handleMenuCollapse,
        isMobile,
        theme: navTheme,
        collapsed,
        ...defaultProps,
      })}
      <Layout
        style={{
          paddingLeft: hasLeftPadding ? (collapsed ? 80 : siderWidth) : void 0,
          minHeight: '100vh',
        }}
      >
        {headerRender({
          menuData,
          handleMenuCollapse,
          isMobile,
          collapsed,
          ...defaultProps,
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
              title: pageTitle.split('-')[0],
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
  );
  return (
    <>
      <DocumentTitle title={pageTitle}>
        <ContainerQuery query={query}>
          {params => (
            <div
              className={classNames(params, 'ant-design-pro', 'basicLayout')}
            >
              {layout}
            </div>
          )}
        </ContainerQuery>
      </DocumentTitle>
    </>
  );
};

BasicLayout.defaultProps = {
  logo: '',
  ...defaultSettings,
};
export default BasicLayout;
