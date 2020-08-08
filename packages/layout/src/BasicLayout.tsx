import './BasicLayout.less';

import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
import { Layout } from 'antd';
import classNames from 'classnames';
import warning from 'warning';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { stringify } from 'use-json-comparison';
import useAntdMediaQuery from 'use-media-antd-query';
import { useDeepCompareEffect, useDocumentTitle, isBrowser } from '@ant-design/pro-utils';
import Omit from 'omit.js';

import Header, { HeaderViewProps } from './Header';
import { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from './typings';
import { getPageTitleInfo, GetPageTitleProps } from './getPageTitle';
import defaultSettings, { PureSettings } from './defaultSettings';
import getLocales, { LocaleType } from './locales';
import { BaseMenuProps } from './SiderMenu/BaseMenu';
import Footer from './Footer';
import RouteContext from './RouteContext';
import SiderMenu from './SiderMenu';
import { SiderMenuProps } from './SiderMenu/SiderMenu';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import getMenuData from './utils/getMenuData';
import PageLoading from './PageLoading';
import MenuCounter from './SiderMenu/Counter';
import WrapContent from './WrapContent';
import compatibleLayout from './utils/compatibleLayout';

export type BasicLayoutProps = Partial<RouterTypes<Route>> &
  SiderMenuProps &
  HeaderViewProps &
  Partial<PureSettings> & {
    pure?: boolean;
    /**
     * logo url
     */
    logo?: React.ReactNode | WithFalse<() => React.ReactNode>;

    /**
     * 页面切换的时候触发
     */
    onPageChange?: (location?: RouterTypes<Route>['location']) => void;

    loading?: boolean;

    locale?: LocaleType;

    onCollapse?: (collapsed: boolean) => void;

    footerRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;

    breadcrumbRender?: (routers: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes'];
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
  };

const headerRender = (
  props: BasicLayoutProps & {
    hasSiderMenu: boolean;
  },
): React.ReactNode => {
  if (props.headerRender === false || props.pure) {
    return null;
  }
  return <Header {...props} />;
};

const footerRender = (props: BasicLayoutProps): React.ReactNode => {
  if (props.footerRender === false || props.pure) {
    return null;
  }
  if (props.footerRender) {
    return props.footerRender({ ...props }, <Footer />);
  }
  return null;
};

const renderSiderMenu = (props: BasicLayoutProps): React.ReactNode => {
  const { layout, isMobile, menuRender } = props;
  if (props.menuRender === false || props.pure) {
    return null;
  }
  if (layout === 'top' && !isMobile) {
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
    const title = pageTitleRender(pageProps, pageTitleInfo.title, pageTitleInfo);
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
    return collapsed ? 48 : siderWidth;
  }
  return 0;
};

/**
 * 🌃 Powerful and easy to use beautiful layout
 * 🏄‍ Support multiple topics and layout types
 * @param props
 */
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    children,
    onCollapse: propsOnCollapse,
    location = { pathname: '/' },
    fixSiderbar,
    navTheme,
    contentStyle,
    route = {
      routes: [],
    },
    layout: defaultPropsLayout,
    style,
    disableContentMargin,
    siderWidth = 208,
    menu,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
    loading,
    ...rest
  } = props;
  const propsLayout = compatibleLayout(defaultPropsLayout);
  const { prefixCls } = rest;
  const formatMessage = ({
    id,
    defaultMessage,
    ...restParams
  }: {
    id: string;
    defaultMessage?: string;
  }): string => {
    if (props.formatMessage) {
      return props.formatMessage({
        id,
        defaultMessage,
        ...restParams,
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

  const colSize = useAntdMediaQuery();
  const { routes = [] } = route;
  const [menuInfoData, setMenuInfoData] = useMergedState<{
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
    renderMenuInfoData = getMenuData(routes, menu, formatMessage, menuDataRender);
  }

  const isMobile = (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;

  const { breadcrumb = {}, breadcrumbMap, menuData = [] } = !menuDataRender
    ? menuInfoData
    : renderMenuInfoData;
  /**
   *  如果 menuRender 不存在，可以做一下性能优化
   *  只要 routers 没有更新就不需要重新计算
   */
  useDeepCompareEffect(() => {
    if (!menuDataRender) {
      const infoData = getMenuData(routes, menu, formatMessage, menuDataRender);
      // 稍微慢一点 render，不然会造成性能问题，看起来像是菜单的卡顿
      const animationFrameId = requestAnimationFrame(() => {
        setMenuInfoData(infoData);
      });
      return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
    }
    return () => null;
  }, [props.route, stringify(menu)]);

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  const hasLeftPadding = propsLayout !== 'top' && !isMobile;

  const [collapsed, onCollapse] = useMergedState<boolean>(false, {
    value: props.collapsed,
    onChange: propsOnCollapse,
  });

  // Splicing parameters, adding menuData and formatMessage in props
  const defaultProps = Omit(
    {
      ...props,
      formatMessage,
      breadcrumb,
      layout: compatibleLayout(props.layout) as 'side',
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
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark') ? 'dark' : 'light',
    collapsed,
  });

  // render header dom
  const headerDom = headerRender({
    ...defaultProps,
    hasSiderMenu: !!siderMenuDom,
    menuData,
    isMobile,
    collapsed,
    onCollapse,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark') ? 'dark' : 'light',
  });

  // render footer dom
  const footerDom = footerRender({
    isMobile,
    collapsed,
    ...defaultProps,
  });

  const { isChildrenLayout: contextIsChildrenLayout } = useContext(RouteContext);

  // 如果 props 中定义，以 props 为准
  const isChildrenLayout =
    propsIsChildrenLayout !== undefined ? propsIsChildrenLayout : contextIsChildrenLayout;

  const baseClassName = `${prefixCls}-basicLayout`;
  // gen className
  const className = classNames(props.className, 'ant-design-pro', baseClassName, {
    [`screen-${colSize}`]: colSize,
    [`${baseClassName}-top-menu`]: propsLayout === 'top',
    [`${baseClassName}-is-children`]: isChildrenLayout,
    [`${baseClassName}-fix-siderbar`]: fixSiderbar,
    [`${baseClassName}-mobile`]: isMobile,
  });

  /**
   * 计算 slider 的宽度
   */
  const leftSiderWidth = getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth);

  // siderMenuDom 为空的时候，不需要 padding
  const genLayoutStyle: CSSProperties = {
    position: 'relative',
  };

  // if is some layout children, don't need min height
  if (isChildrenLayout || (contentStyle && contentStyle.minHeight)) {
    genLayoutStyle.minHeight = 0;
  }

  const contentClassName = classNames(`${baseClassName}-content`, {
    [`${baseClassName}-has-header`]: headerDom,
    [`${baseClassName}-content-disable-margin`]: disableContentMargin,
  });

  /**
   * 页面切换的时候触发
   */
  useEffect(() => {
    const { onPageChange } = props;
    if (onPageChange) {
      onPageChange(props.location);
    }
  }, [stringify(props.location)]);
  const [hasFooterToolbar, setHasFooterToolbar] = useState(false);

  useDocumentTitle(pageTitleInfo, props.title || defaultSettings.title);

  return (
    <MenuCounter.Provider>
      <RouteContext.Provider
        value={{
          ...defaultProps,
          breadcrumb: breadcrumbProps,
          menuData,
          isMobile,
          collapsed,
          isChildrenLayout: true,
          title: pageTitleInfo.pageName,
          hasSiderMenu: !!siderMenuDom,
          hasHeader: !!headerDom,
          siderWidth: leftSiderWidth,
          hasFooter: !!footerDom,
          hasFooterToolbar,
          setHasFooterToolbar,
          pageTitleInfo,
        }}
      >
        <div className={className}>
          <Layout
            style={{
              minHeight: '100%',
              ...style,
            }}
            hasSider
          >
            {siderMenuDom}
            <Layout style={genLayoutStyle}>
              {headerDom}
              <WrapContent
                isChildrenLayout={isChildrenLayout}
                {...rest}
                className={contentClassName}
                style={contentStyle}
              >
                {loading ? <PageLoading /> : children}
              </WrapContent>
              {footerDom}
            </Layout>
          </Layout>
        </div>
      </RouteContext.Provider>
    </MenuCounter.Provider>
  );
};

BasicLayout.defaultProps = {
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
  ...defaultSettings,
  prefixCls: 'ant-pro',
  siderWidth: 208,
  location: isBrowser() ? window.location : undefined,
};
export default BasicLayout;
