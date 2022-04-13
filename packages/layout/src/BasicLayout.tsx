import './BasicLayout.less';
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
import useSWR, { useSWRConfig } from 'swr';
import { getMatchMenu } from '@umijs/route-utils';

import type { HeaderViewProps } from './Header';
import Header from './Header';
import type { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from './typings';
import type { GetPageTitleProps } from './getPageTitle';
import { getPageTitleInfo } from './getPageTitle';
import type { ProSettings } from './defaultSettings';
import defaultSettings from './defaultSettings';
import type { LocaleType } from './locales';
import { gLocaleObject } from './locales';
import Footer from './Footer';
import RouteContext from './RouteContext';
import SiderMenu from './components/SiderMenu';
import type { SiderMenuProps } from './components/SiderMenu/SiderMenu';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import getMenuData from './utils/getMenuData';
import PageLoading from './components/PageLoading';
import MenuCounter from './components/SiderMenu/Counter';
import WrapContent from './WrapContent';
import compatibleLayout from './utils/compatibleLayout';
import useCurrentMenuLayoutProps from './utils/useCurrentMenuLayoutProps';
import { clearMenuItem } from './utils/utils';
import type { WaterMarkProps } from './components/WaterMark';
import { ConfigProviderWrap } from '@ant-design/pro-provider';

let layoutIndex = 0;

export type LayoutBreadcrumbProps = {
  minLength?: number;
};

type GlobalTypes = Omit<
  Partial<RouterTypes<Route>> & SiderMenuProps & HeaderViewProps,
  'collapsed'
>;

export type BasicLayoutProps = GlobalTypes & {
  /**
   * @name 简约模式，设置了之后不渲染的任何 layout 的东西，但是会有 context，可以获取到当前菜单。
   *
   * @example pure={true}
   */
  pure?: boolean;
  /**
   * @name logo 的配置，可以配置url，React 组件 和 false
   *
   * @example 设置 logo 为网络地址  logo="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
   * @example 设置 logo 为组件  logo={<img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/>}
   * @example 设置 logo 为 false 不显示 logo  logo={false}
   * @example 设置 logo 为 方法  logo={()=> <img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/> }
   * */
  logo?: React.ReactNode | JSX.Element | WithFalse<() => React.ReactNode | JSX.Element>;

  /**
   * @name 页面切换的时候触发
   *
   * @example 获取切换的页面地址 onPageChange={(location) => { console.log("切换到："+location.pathname) }}
   *
   * */
  onPageChange?: (location?: RouterTypes<Route>['location']) => void;

  /**
   * @name layout 的 loading 效果，设置完成之后只展示一个 loading
   *
   * @example loading={true}
   */
  loading?: boolean;

  /**
   * @name layout
   *
   * @description "zh-CN" | "zh-TW" | "en-US" | "it-IT" | "ko-KR"
   * @example 中文 layout="zh-CN"
   * @example 英文 layout="en-US"
   */
  locale?: LocaleType;

  /**
   * @name 是否收起 layout 是严格受控的，可以 设置为 true，一直收起
   *
   * @example collapsed={true}
   */
  collapsed?: boolean;

  /**
   * @name 收起和展开的时候触发事件
   *
   * @example onCollapse=(collapsed)=>{ setCollapsed(collapsed) };
   */
  onCollapse?: (collapsed: boolean) => void;

  /**
   * @name 页脚的配置
   *
   * @example 不展示dom footerRender={false}
   * @example 使用 layout 的  DefaultFooter   footerRender={() => (<DefaultFooter copyright="这是一条测试文案"/>}
   */
  footerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;

  /**
   * @name 设置 PageHeader 的面包屑，只能处理数据
   *
   * @example 手动设置 breadcrumbRender={(routers = []) => [ { path: '/', breadcrumbName: '主页'} ]
   * @example 增加一项 breadcrumbRender={(routers = []) => { return [{ path: '/', breadcrumbName: '主页'} ,...routers ]}
   * @example 删除首页 breadcrumbRender={(routers = []) => { return routers.filter(item => item.path !== '/')}
   * @example 不显示面包屑 breadcrumbRender={false}
   */
  breadcrumbRender?: WithFalse<
    (routers: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes']
  >;

  /**
   * @name 设置页面的标题
   * @example 根据页面的路由设置标题 pageTitleRender={(props) => { return props.location.pathname }}
   * @example 不显示标题 pageTitleRender={false}
   * @example 根据默认的标题设置 pageTitleRender={(props,defaultPageTitle) => { return defaultPageTitle + '这是一个测试标题' }}
   * @example 根据 info 来自己组合标题 pageTitleRender={(props,defaultPageTitle,info) => { return info.title + "-" + info.pageName }
   */
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
  /**
   * @name 处理 menuData 的数据，可以动态的控制数据
   * @see 尽量不要用异步数据来处理，否则可能造成更新不及时，如果异步数据推荐使用 menu.request 和 params。
   *
   * @example 删除一些菜单 menuDataRender=((menuData) => { return menuData.filter(item => item.name !== 'test') })
   * @example 增加一些菜单 menuDataRender={(menuData) => { return menuData.concat({ path: '/test', name: '测试', icon: 'smile' }) }}
   * @example 修改菜单 menuDataRender={(menuData) => { return menuData.map(item => { if (item.name === 'test') { item.name = '测试' } return item }) }}
   * @example 打平数据 menuDataRender={(menuData) => { return menuData.reduce((pre, item) => { return pre.concat(item.children || []) }, []) }}
   */
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[];

  /**
   * @name 处理每个面包屑的配置，需要直接返回 dom
   * @description (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode
   *
   * @example 设置 disabled： itemRender={(route, params, routes, paths) => { return <Button disabled>{route.breadcrumbName}</Button> }}
   * @example 拼接 path： itemRender={(route, params, routes, paths) => { return <a href={paths.join('/')}>{route.breadcrumbName}</Button> }}
   */
  itemRender?: AntdBreadcrumbProps['itemRender'];

  formatMessage?: (message: MessageDescriptor) => string;
  /** @name 是否禁用移动端模式
   *
   * @see 有的管理系统不需要移动端模式，此属性设置为true即可
   * @example disableMobile={true}
   *  */
  disableMobile?: boolean;

  /**
   * content 的样式
   *
   * @example 背景颜色为红色 contentStyle={{ backgroundColor: 'red '}}
   */
  contentStyle?: CSSProperties;

  className?: string;

  /**
   * @name 取消 content的 margin
   *
   * @example 取消内容的 margin  disableContentMargin={true}
   * */
  disableContentMargin?: boolean;

  /** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
  breadcrumbProps?: AntdBreadcrumbProps & LayoutBreadcrumbProps;

  /** @name 水印的相关配置 */
  waterMarkProps?: WaterMarkProps;

  /**
   * @name 操作菜单重新刷新
   *
   * @example  重新获取菜单 actionRef.current.reload();
   * */
  actionRef?: React.MutableRefObject<
    | {
        reload: () => void;
      }
    | undefined
  >;

  /**
   * @name 错误处理组件
   *
   * @example ErrorBoundary={<MyErrorBoundary/>}
   */
  ErrorBoundary?: any;

  isChildrenLayout?: boolean;
};

const headerRender = (
  props: BasicLayoutProps & {
    hasSiderMenu: boolean;
  },
  matchMenuKeys: string[],
): React.ReactNode => {
  if (props.headerRender === false || props.pure) {
    return null;
  }
  return <Header matchMenuKeys={matchMenuKeys} {...props} />;
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

const renderSiderMenu = (props: BasicLayoutProps, matchMenuKeys: string[]): React.ReactNode => {
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
  breadcrumb: Record<string, MenuDataItem>;
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
 * 🌃 Powerful and easy to use beautiful layout 🏄‍ Support multiple topics and layout types
 *
 * @param props
 */
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    children,
    onCollapse: propsOnCollapse,
    location = { pathname: '/' },
    contentStyle,
    route,
    defaultCollapsed,
    style,
    disableContentMargin,
    siderWidth = 208,
    menu,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
    actionRef,
    formatMessage: propsFormatMessage,
    loading,
  } = props || {};
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

  const { cache } = useSWRConfig();
  useEffect(() => {
    return () => {
      if (cache instanceof Map) cache.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    layout: defaultPropsLayout,
    ...rest
  } = {
    ...props,
    ...currentMenuLayoutProps,
  };

  const propsLayout = compatibleLayout(defaultPropsLayout);

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
          <div className={className}>
            <Layout
              style={{
                minHeight: '100%',
                ...style,
              }}
            >
              {siderMenuDom}
              <div style={genLayoutStyle} className={context.getPrefixCls('layout')}>
                {headerDom}
                <WrapContent
                  autoClearCache={false}
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

const Logo = () => (
  <svg width="32px" height="32px" viewBox="0 0 200 200">
    <defs>
      <linearGradient
        x1="62.1023273%"
        y1="0%"
        x2="108.19718%"
        y2="37.8635764%"
        id="linearGradient-1"
      >
        <stop stopColor="#4285EB" offset="0%" />
        <stop stopColor="#2EC7FF" offset="100%" />
      </linearGradient>
      <linearGradient
        x1="69.644116%"
        y1="0%"
        x2="54.0428975%"
        y2="108.456714%"
        id="linearGradient-2"
      >
        <stop stopColor="#29CDFF" offset="0%" />
        <stop stopColor="#148EFF" offset="37.8600687%" />
        <stop stopColor="#0A60FF" offset="100%" />
      </linearGradient>
      <linearGradient
        x1="69.6908165%"
        y1="-12.9743587%"
        x2="16.7228981%"
        y2="117.391248%"
        id="linearGradient-3"
      >
        <stop stopColor="#FA816E" offset="0%" />
        <stop stopColor="#F74A5C" offset="41.472606%" />
        <stop stopColor="#F51D2C" offset="100%" />
      </linearGradient>
      <linearGradient
        x1="68.1279872%"
        y1="-35.6905737%"
        x2="30.4400914%"
        y2="114.942679%"
        id="linearGradient-4"
      >
        <stop stopColor="#FA8E7D" offset="0%" />
        <stop stopColor="#F74A5C" offset="51.2635191%" />
        <stop stopColor="#F51D2C" offset="100%" />
      </linearGradient>
    </defs>
    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <g transform="translate(-20.000000, -20.000000)">
        <g transform="translate(20.000000, 20.000000)">
          <g>
            <g fillRule="nonzero">
              <g>
                <path
                  d="M91.5880863,4.17652823 L4.17996544,91.5127728 C-0.519240605,96.2081146 -0.519240605,103.791885 4.17996544,108.487227 L91.5880863,195.823472 C96.2872923,200.518814 103.877304,200.518814 108.57651,195.823472 L145.225487,159.204632 C149.433969,154.999611 149.433969,148.181924 145.225487,143.976903 C141.017005,139.771881 134.193707,139.771881 129.985225,143.976903 L102.20193,171.737352 C101.032305,172.906015 99.2571609,172.906015 98.0875359,171.737352 L28.285908,101.993122 C27.1162831,100.824459 27.1162831,99.050775 28.285908,97.8821118 L98.0875359,28.1378823 C99.2571609,26.9692191 101.032305,26.9692191 102.20193,28.1378823 L129.985225,55.8983314 C134.193707,60.1033528 141.017005,60.1033528 145.225487,55.8983314 C149.433969,51.69331 149.433969,44.8756232 145.225487,40.6706018 L108.58055,4.05574592 C103.862049,-0.537986846 96.2692618,-0.500797906 91.5880863,4.17652823 Z"
                  fill="url(#linearGradient-1)"
                />
                <path
                  d="M91.5880863,4.17652823 L4.17996544,91.5127728 C-0.519240605,96.2081146 -0.519240605,103.791885 4.17996544,108.487227 L91.5880863,195.823472 C96.2872923,200.518814 103.877304,200.518814 108.57651,195.823472 L145.225487,159.204632 C149.433969,154.999611 149.433969,148.181924 145.225487,143.976903 C141.017005,139.771881 134.193707,139.771881 129.985225,143.976903 L102.20193,171.737352 C101.032305,172.906015 99.2571609,172.906015 98.0875359,171.737352 L28.285908,101.993122 C27.1162831,100.824459 27.1162831,99.050775 28.285908,97.8821118 L98.0875359,28.1378823 C100.999864,25.6271836 105.751642,20.541824 112.729652,19.3524487 C117.915585,18.4685261 123.585219,20.4140239 129.738554,25.1889424 C125.624663,21.0784292 118.571995,14.0340304 108.58055,4.05574592 C103.862049,-0.537986846 96.2692618,-0.500797906 91.5880863,4.17652823 Z"
                  fill="url(#linearGradient-2)"
                />
              </g>
              <path
                d="M153.685633,135.854579 C157.894115,140.0596 164.717412,140.0596 168.925894,135.854579 L195.959977,108.842726 C200.659183,104.147384 200.659183,96.5636133 195.960527,91.8688194 L168.690777,64.7181159 C164.472332,60.5180858 157.646868,60.5241425 153.435895,64.7316526 C149.227413,68.936674 149.227413,75.7543607 153.435895,79.9593821 L171.854035,98.3623765 C173.02366,99.5310396 173.02366,101.304724 171.854035,102.473387 L153.685633,120.626849 C149.47715,124.83187 149.47715,131.649557 153.685633,135.854579 Z"
                fill="url(#linearGradient-3)"
              />
            </g>
            <ellipse
              fill="url(#linearGradient-4)"
              cx="100.519339"
              cy="100.436681"
              rx="23.6001926"
              ry="23.580786"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

BasicLayout.defaultProps = {
  logo: <Logo />,
  ...defaultSettings,
  location: isBrowser() ? window.location : undefined,
};

export default BasicLayout;
