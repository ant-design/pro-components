import './BasicLayout.less';

import React, { useState, CSSProperties, useContext, useEffect } from 'react';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/es/breadcrumb';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import classNames from 'classnames';
import warning from 'warning';
import useMergeValue from 'use-merge-value';
import { useMediaQuery } from 'react-responsive';
import Omit from 'omit.js';
import ResizeObserver from 'rc-resize-observer';

import Header, { HeaderViewProps } from './Header';
import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from './typings';
import { getPageTitleInfo, GetPageTitleProps } from './getPageTitle';
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
import PageLoading from './PageLoading';
import MenuCounter from './SiderMenu/Counter';

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

  loading?: boolean;

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
    (
      props: GetPageTitleProps,
      defaultPageTitle?: string,
      info?: {
        // 页面标题
        title: string;
        // locale 的 title
        id: string;
        // 页面标题不带默认的 title
        pageName: string;
      },
    ) => string
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

  /**
   * 兼用 content的 margin
   */
  disableContentMargin?: boolean;
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
    return <SiderMenu {...props} hide />;
  }
  if (menuRender) {
    return menuRender(props, <SiderMenu {...props} />);
  }

  return <SiderMenu {...props} />;
};

const defaultPageTitleRender = (
  pageProps: GetPageTitleProps,
  props: BasicLayoutProps,
): {
  title: string;
  id: string;
  pageName: string;
} => {
  const { pageTitleRender } = props;
  const pageTitleInfo = getPageTitleInfo(pageProps);
  if (pageTitleRender === false) {
    return {
      title: props.title || '',
      id: '',
      pageName: '',
    };
  }
  if (pageTitleRender) {
    const title = pageTitleRender(
      pageProps,
      pageTitleInfo.title,
      pageTitleInfo,
    );
    if (typeof title === 'string') {
      return {
        ...pageTitleInfo,
        title,
      };
    }
    warning(
      typeof title === 'string',
      'pro-layout: renderPageTitle return value should be a string',
    );
  }
  return pageTitleInfo;
};

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumb: { [path: string]: MenuDataItem };
};

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
    disableContentMargin,
    siderWidth = 256,
    menu,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
    loading,
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
  const [menuInfoData, setMenuInfoData] = useMergeValue<{
    breadcrumb?: {
      [key: string]: MenuDataItem;
    };
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  }>(() => getMenuData(routes, menu, formatMessage, menuDataRender));

  let renderMenuInfoData: {
    breadcrumb?: {
      [key: string]: MenuDataItem;
    };
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  } = {};

  // 如果menuDataRender 存在，就应该每次都render一下，不然无法保证数据的同步
  if (menuDataRender) {
    renderMenuInfoData = getMenuData(
      routes,
      menu,
      formatMessage,
      menuDataRender,
    );
  }

  const { breadcrumb = {}, breadcrumbMap, menuData = [] } = !menuDataRender
    ? menuInfoData
    : renderMenuInfoData;

  /**
   *  如果 menuRender 不存在，可以做一下性能优化
   *  只要 routers 没有更新就不需要重新计算
   */
  useEffect(() => {
    if (!menuDataRender) {
      const infoData = getMenuData(routes, menu, formatMessage, menuDataRender);
      // 稍微慢一点 render，不然会造成性能问题，看起来像是菜单的卡顿
      const animationFrameId = requestAnimationFrame(() => {
        setMenuInfoData(infoData);
      });
      return () =>
        window.cancelAnimationFrame &&
        window.cancelAnimationFrame(animationFrameId);
    }
    return () => null;
  }, [JSON.stringify(routes), JSON.stringify(menu)]);

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;

  const [collapsed, onCollapse] = useMergeValue<boolean>(false, {
    value: props.collapsed,
    onChange: propsOnCollapse,
  });

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
  const pageTitleInfo = defaultPageTitleRender(
    {
      pathname: location.pathname,
      ...defaultProps,
      breadcrumbMap,
    },
    props,
  );

  // gen breadcrumbProps, parameter for pageHeader
  const breadcrumbProps = getBreadcrumbProps({
    ...defaultProps,
    breadcrumbMap,
  });
  // render sider dom
  const siderMenuDom = renderSiderMenu({
    ...defaultProps,
    menuData,
    onCollapse,
    isMobile,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark')
      ? 'dark'
      : 'light',
    collapsed,
  });

  // render header dom
  const headerDom = headerRender({
    ...defaultProps,
    menuData,
    isMobile,
    collapsed,
    onCollapse,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark')
      ? 'dark'
      : 'light',
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
      'ant-pro-basicLayout-fix-siderbar': fixSiderbar,
      'ant-pro-basicLayout-mobile': isMobile,
    },
  );

  // siderMenuDom 为空的时候，不需要 padding
  const genLayoutStyle: CSSProperties = {
    paddingLeft: siderMenuDom
      ? getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth)
      : undefined,
    position: 'relative',
  };

  // if is some layout children，don't need min height
  if (isChildrenLayout || (contentStyle && contentStyle.minHeight)) {
    genLayoutStyle.minHeight = 0;
  }

  const contentClassName = classNames('ant-pro-basicLayout-content', {
    'ant-pro-basicLayout-has-header': headerDom,
    'ant-pro-basicLayout-content-disable-margin': disableContentMargin,
  });
  const [contentSize, setContentSize] = useState<number | string>('100%');

  // warning info
  useEffect(() => {
    warning(
      (props.collapsed === undefined) === (props.onCollapse === undefined),
      'pro-layout: onCollapse and collapsed should exist simultaneously',
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>{pageTitleInfo.title}</title>
      </Helmet>
      <MenuCounter.Provider>
        <div className={className}>
          <Layout
            style={{
              ...style,
              minHeight: '100%',
            }}
            hasSider
          >
            {siderMenuDom}
            <Layout style={genLayoutStyle}>
              {headerDom}
              <Content
                className={contentClassName}
                style={{
                  ...contentStyle,
                  minHeight: contentSize,
                }}
              >
                <ResizeObserver
                  onResize={({ height }) => {
                    setContentSize(height);
                  }}
                >
                  <RouteContext.Provider
                    value={{
                      ...defaultProps,
                      breadcrumb: breadcrumbProps,
                      menuData,
                      isMobile,
                      collapsed,
                      isChildrenLayout: true,
                      title: pageTitleInfo.pageName,
                    }}
                  >
                    <div className="ant-pro-basicLayout-children-content-wrap">
                      {loading ? <PageLoading /> : children}
                    </div>
                  </RouteContext.Provider>
                </ResizeObserver>
              </Content>
              {footerDom}
            </Layout>
          </Layout>
        </div>
      </MenuCounter.Provider>
    </>
  );
};

BasicLayout.defaultProps = {
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
  ...defaultSettings,
  location: isBrowser() ? window.location : undefined,
};
export default BasicLayout;
