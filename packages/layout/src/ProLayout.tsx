import type { CSSProperties } from 'react';
import { useCallback } from 'react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import type { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
import { Layout, ConfigProvider } from 'antd';
import classNames from 'classnames';
import warning from 'warning';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import useAntdMediaQuery from 'use-media-antd-query';
import { useDocumentTitle, isBrowser, useMountMergeState } from '@ant-design/pro-utils';
import Omit from 'omit.js';
import useSWR from 'swr';
import { getMatchMenu } from '@umijs/route-utils';

import type { HeaderViewProps } from './Header';
import { DefaultHeader as Header } from './Header';
import type { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from './typings';
import type { GetPageTitleProps } from './getPageTitle';
import { getPageTitleInfo } from './getPageTitle';
import type { ProSettings } from './defaultSettings';
import { defaultSettings } from './defaultSettings';
import type { LocaleType } from './locales';
import { gLocaleObject } from './locales';
import type { BaseMenuProps } from './components/SiderMenu/BaseMenu';
import { DefaultFooter as Footer } from './Footer';
import { RouteContext } from './RouteContext';
import { SiderMenu } from './components/SiderMenu';
import type { SiderMenuProps } from './components/SiderMenu/SiderMenu';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import { getMenuData } from './utils/getMenuData';
import { PageLoading } from './components/PageLoading';
import { MenuCounter } from './components/SiderMenu/Counter';
import { WrapContent } from './WrapContent';
import { useCurrentMenuLayoutProps } from './utils/useCurrentMenuLayoutProps';
import { clearMenuItem } from './utils/utils';
import type { WaterMarkProps } from './components/WaterMark';
import { ConfigProviderWrap } from '@ant-design/pro-provider';

import { cx, css } from './emotion';
import { Logo } from './Logo';
import type { ProLayoutProviderProps } from './ProLayoutContext';
import { ProLayoutProvider } from './ProLayoutContext';

const ProLayoutCss = css`
  // BFC
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`;

let layoutIndex = 0;

export type LayoutBreadcrumbProps = {
  minLength?: number;
};

export type ProLayoutProps = Partial<RouterTypes<Route>> &
  SiderMenuProps &
  ProLayoutProviderProps &
  HeaderViewProps & {
    /** Layout 的品牌配置，表现为一张背景图片 */
    brandBgImg?: {
      url?: string;
      size?: string;
    };
    pure?: boolean;
    /** @name logo url */
    logo?: React.ReactNode | WithFalse<() => React.ReactNode>;

    /** @name 页面切换的时候触发 */
    onPageChange?: (location?: RouterTypes<Route>['location']) => void;

    loading?: boolean;

    locale?: LocaleType;

    onCollapse?: (collapsed: boolean) => void;

    footerRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;

    breadcrumbRender?: WithFalse<
      (routers: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes']
    >;

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
    /** 是否禁用移动端模式，有的管理系统不需要移动端模式，此属性设置为true即可 */
    disableMobile?: boolean;
    contentStyle?: CSSProperties;
    isChildrenLayout?: boolean;

    className?: string;

    /** 兼用 content的 margin */
    disableContentMargin?: boolean;

    /** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
    breadcrumbProps?: AntdBreadcrumbProps & LayoutBreadcrumbProps;
    /** @name 水印的相关配置 */
    waterMarkProps?: WaterMarkProps;

    /** @name 操作菜单重新刷新 */
    actionRef?: React.MutableRefObject<
      | {
          reload: () => void;
        }
      | undefined
    >;
    ErrorBoundary?: any;
  };

const headerRender = (
  props: ProLayoutProps & {
    hasSiderMenu: boolean;
  },
  matchMenuKeys: string[],
): React.ReactNode => {
  if (props.headerRender === false || props.pure) {
    return null;
  }
  return <Header matchMenuKeys={matchMenuKeys} {...props} />;
};

const footerRender = (props: ProLayoutProps): React.ReactNode => {
  if (props.footerRender === false || props.pure) {
    return null;
  }
  if (props.footerRender) {
    return props.footerRender({ ...props }, <Footer />);
  }
  return null;
};

const renderSiderMenu = (props: ProLayoutProps, matchMenuKeys: string[]): React.ReactNode => {
  const { layout, navTheme, isMobile, openKeys, splitMenus, menuRender } = props;
  if (props.menuRender === false || props.pure) {
    return null;
  }
  let { menuData } = props;

  /** 如果是分割菜单模式，需要专门实现一下 */
  if (splitMenus && (openKeys !== false || layout === 'mix') && !isMobile) {
    const [key] = matchMenuKeys;
    if (key) {
      menuData = props.menuData?.find((item) => item.key === key)?.routes || [];
    } else {
      menuData = [];
    }
  }
  // 这里走了可以少一次循环
  const clearMenuData = clearMenuItem(menuData || []);
  if (clearMenuData && clearMenuData?.length < 1 && splitMenus) {
    return null;
  }
  if (layout === 'top' && !isMobile) {
    return <SiderMenu matchMenuKeys={matchMenuKeys} {...props} hide />;
  }

  const defaultDom = (
    <SiderMenu
      matchMenuKeys={matchMenuKeys}
      {...props}
      style={
        navTheme === 'realDark'
          ? {
              boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 65%)',
            }
          : {}
      }
      // 这里走了可以少一次循环
      menuData={clearMenuData}
    />
  );
  if (menuRender) {
    return menuRender(props, defaultDom);
  }

  return defaultDom;
};

const defaultPageTitleRender = (
  pageProps: GetPageTitleProps,
  props: ProLayoutProps,
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

export type BasicLayoutContext = { [K in 'location']: ProLayoutProps[K] } & {
  breadcrumb: Record<string, MenuDataItem>;
};

const getPaddingLeft = (
  hasLeftPadding: boolean,
  collapsed: boolean | undefined,
  siderWidth: number,
): number | undefined => {
  if (hasLeftPadding) {
    return collapsed ? 60 : siderWidth;
  }
  return 0;
};

/**
 * 🌃 Powerful and easy to use beautiful layout 🏄‍ Support multiple topics and layout types
 *
 * @param props
 */
const BaseProLayout: React.FC<ProLayoutProps> = (props) => {
  const {
    children,
    onCollapse: propsOnCollapse,
    location = { pathname: '/' },
    contentStyle,
    route,
    defaultCollapsed,
    style,
    disableContentMargin,
    siderWidth: propsSiderWidth,
    menu,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
    actionRef,
    brandBgImg,
    formatMessage: propsFormatMessage,
    loading,
  } = props || {};

  const siderWidth = useMemo(() => {
    if (propsSiderWidth) return propsSiderWidth;
    if (props.layout === 'mix') return 215;
    return 256;
  }, [props.layout, propsSiderWidth]);

  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = props.prefixCls ?? context.getPrefixCls('pro');

  const [menuLoading, setMenuLoading] = useMountMergeState(false, {
    value: menu?.loading,
    onChange: menu?.onLoadingChange,
  });

  // give a default key for swr
  const [defaultId] = useState(() => {
    layoutIndex += 1;
    return `pro-layout-${layoutIndex}`;
  });

  const formatMessage = useCallback(
    ({ id, defaultMessage, ...restParams }: { id: string; defaultMessage?: string }): string => {
      if (propsFormatMessage) {
        return propsFormatMessage({
          id,
          defaultMessage,
          ...restParams,
        });
      }
      const locales = gLocaleObject();
      return locales[id] ? locales[id] : (defaultMessage as string);
    },
    [propsFormatMessage],
  );

  const { data, mutate } = useSWR(
    () => {
      if (!menu?.params) return [defaultId, {}];
      return [defaultId, menu?.params];
    },
    async (_, params) => {
      setMenuLoading(true);
      const msg = await menu?.request?.(params, route?.routes || []);
      setMenuLoading(false);
      return msg;
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
    },
  );

  const menuInfoData = useMemo<{
    breadcrumb?: Record<string, MenuDataItem>;
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  }>(
    () => getMenuData(data || route?.routes || [], menu, formatMessage, menuDataRender),
    [formatMessage, menu, menuDataRender, data, route?.routes],
  );

  const { breadcrumb = {}, breadcrumbMap, menuData = [] } = menuInfoData || {};

  if (actionRef && menu?.request) {
    actionRef.current = {
      reload: () => {
        mutate();
      },
    };
  }
  const matchMenus = useMemo(() => {
    return getMatchMenu(location.pathname || '/', menuData || [], true);
  }, [location.pathname, menuData]);

  const matchMenuKeys = useMemo(
    () => Array.from(new Set(matchMenus.map((item) => item.key || item.path || ''))),
    [matchMenus],
  );

  // 当前选中的menu，一般不会为空
  const currentMenu = (matchMenus[matchMenus.length - 1] || {}) as ProSettings & MenuDataItem;

  const currentMenuLayoutProps = useCurrentMenuLayoutProps(currentMenu);

  const {
    fixSiderbar,
    navTheme,
    layout: propsLayout,
    ...rest
  } = {
    ...props,
    ...currentMenuLayoutProps,
  };

  const colSize = useAntdMediaQuery();

  const isMobile = (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  const hasLeftPadding = propsLayout !== 'top' && !isMobile;

  const [collapsed, onCollapse] = useMergedState<boolean>(() => defaultCollapsed || false, {
    value: props.collapsed,
    onChange: propsOnCollapse,
  });

  // Splicing parameters, adding menuData and formatMessage in props
  const defaultProps = Omit(
    {
      prefixCls,
      ...props,
      siderWidth,
      ...currentMenuLayoutProps,
      formatMessage,
      breadcrumb,
      menu: { ...menu, loading: menuLoading },
      layout: propsLayout as 'side',
    },
    ['className', 'style', 'breadcrumbRender'],
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
  const breadcrumbProps = getBreadcrumbProps(
    {
      ...defaultProps,
      breadcrumbRender: props.breadcrumbRender,
      breadcrumbMap,
    },
    props,
  );

  // render sider dom
  const siderMenuDom = renderSiderMenu(
    {
      ...defaultProps,
      menuData,
      onCollapse,
      isMobile,
      theme: navTheme === 'dark' ? 'dark' : 'light',
      collapsed,
    },
    matchMenuKeys,
  );

  // render header dom
  const headerDom = headerRender(
    {
      ...defaultProps,
      children: null,
      hasSiderMenu: !!siderMenuDom,
      menuData,
      isMobile,
      collapsed,
      onCollapse,
      theme: navTheme === 'dark' ? 'dark' : 'light',
    },
    matchMenuKeys,
  );

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
    [`${baseClassName}-${propsLayout}`]: propsLayout,
  });

  /** 计算 slider 的宽度 */
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

  /** 页面切换的时候触发 */
  useEffect(() => {
    props.onPageChange?.(props.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.pathname?.search]);

  const [hasFooterToolbar, setHasFooterToolbar] = useState(false);
  useDocumentTitle(pageTitleInfo, props.title || false);
  const brandBgImgStyle: CSSProperties = brandBgImg
    ? {
        backgroundImage: `url("${brandBgImg?.url}")`,
        backgroundSize: `${brandBgImg?.size || '306px'}`,
        backgroundPosition: 'top 0px right 95px',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  const antdPrefixCls = context.getPrefixCls();

  /** Disable之后样式 */
  const ProLayoutDisableContentMargin = useMemo(() => {
    if (disableContentMargin) return ``;
    return css`
      margin: 0;
      .${antdPrefixCls}-pro-page-container {
        margin: 0;
      }
    `;
  }, [antdPrefixCls, disableContentMargin]);

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
          matchMenus,
          matchMenuKeys,
          currentMenu,
        }}
      >
        {props.pure ? (
          <ConfigProviderWrap autoClearCache>{children}</ConfigProviderWrap>
        ) : (
          <div className={cx(className, ProLayoutCss, ProLayoutDisableContentMargin)}>
            <Layout
              style={{
                minHeight: '100%',
                ...style,
              }}
            >
              {siderMenuDom}
              <div
                style={{ ...brandBgImgStyle, ...genLayoutStyle }}
                className={context.getPrefixCls('layout')}
              >
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
              </div>
            </Layout>
          </div>
        )}
      </RouteContext.Provider>
    </MenuCounter.Provider>
  );
};

BaseProLayout.defaultProps = {
  logo: <Logo />,
  ...defaultSettings,
  location: isBrowser() ? window.location : undefined,
};

const ProLayout: React.FC<ProLayoutProps> = (props) => {
  return (
    <ProLayoutProvider token={props.token}>
      <BaseProLayout {...props} />
    </ProLayoutProvider>
  );
};

export { ProLayout };
