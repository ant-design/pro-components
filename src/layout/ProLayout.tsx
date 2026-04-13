import { omit, useControlledState, warning } from '@rc-component/util';
import { getMatchMenu } from '@umijs/route-utils';
import type { BreadcrumbProps, WatermarkProps } from 'antd';
import { ConfigProvider, Layout } from 'antd';
import type { AnyObject } from 'antd/lib/_util/type';
import type { ItemType } from 'antd/lib/breadcrumb/Breadcrumb';
import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useSWR, { useSWRConfig } from 'swr';
import type { GenerateStyle, ProTokenType } from '../provider';
import { ProConfigProvider, ProProvider, isNeedOpenHash } from '../provider';
import {
  isBrowser,
  useBreakpoint,
  useDocumentTitle,
  useRefFunction,
} from '../utils';
import { Logo } from './assert/Logo';
import { DefaultFooter as Footer } from './components/Footer';
import type { HeaderViewProps } from './components/Header';
import { DefaultHeader as Header } from './components/Header';
import { PageLoading } from './components/PageLoading';
import { SiderMenu } from './components/SiderMenu';
import type { SiderMenuProps } from './components/SiderMenu/SiderMenu';
import type { ProLayoutNavMenuSelectInfo } from './components/SiderMenu/types';
import type { SiderMenuToken } from './components/SiderMenu/style';
import { RouteContext } from './context/RouteContext';
import type { ProSettings } from './defaultSettings';
import { defaultSettings } from './defaultSettings';
import type { GetPageTitleProps } from './getPageTitle';
import { getPageTitleInfo } from './getPageTitle';
import type { LocaleType } from './locales';
import { gLocaleObject } from './locales';
import { useStyle } from './style';
import type {
  MenuDataItem,
  MessageDescriptor,
  RouterTypes,
  WithFalse,
} from './typing';
import type { BreadcrumbProLayoutProps } from './utils/getBreadcrumbProps';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import { getMenuData } from './utils/getMenuData';
import { useCurrentMenuLayoutProps } from './utils/useCurrentMenuLayoutProps';
import { clearMenuItem } from './utils/utils';
import { WrapContent } from './WrapContent';

let layoutIndex = 0;

type LayoutItemType = ItemType & { linkPath?: string; component?: string };

export type LayoutBreadcrumbProps<T extends AnyObject = AnyObject> = {
  minLength?: number;
  itemRender?: (
    route: LayoutItemType,
    params: T,
    routes: LayoutItemType[],
    paths: string[],
  ) => React.ReactNode;
};

type GlobalTypes = Omit<
  Partial<RouterTypes> &
    SiderMenuProps &
    HeaderViewProps & {
      token?: ProTokenType['layout'];
    },
  'collapsed'
>;

export type ProLayoutProps = GlobalTypes & {
  /** 受控菜单选中项 */
  selectedKeys?: string[];
  /** 受控子菜单展开项，`false` 表示非受控 */
  openKeys?: WithFalse<string[]>;
  /** 菜单项选中时回调（自研菜单与历史 antd Menu 行为对齐） */
  onSelect?: (info: ProLayoutNavMenuSelectInfo) => void;
  stylish?: {
    header?: GenerateStyle<SiderMenuToken>;
    sider?: GenerateStyle<SiderMenuToken>;
  };
  /** Layout 的品牌配置，表现为一张背景图片 */
  bgLayoutImgList?: {
    src?: string;
    width?: string;
    height?: string;
    left?: number;
    top?: number;
    bottom?: number;
    right?: number;
  }[];
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
   * @example 设置 logo 为组件  logo={<img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" alt="" />}
   * @example 设置 logo 为 false 不显示 logo  logo={false}
   * @example 设置 logo 为 方法  logo={()=> <img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" alt="" /> }
   * */
  logo?:
    | React.ReactNode
    | React.JSX.Element
    | WithFalse<() => React.ReactNode | React.JSX.Element>;

  /**
   * @name 页面切换的时候触发
   *
   * @example 获取切换的页面地址 onPageChange={(location) => { console.log("切换到："+location.pathname) }}
   *
   * */
  onPageChange?: (location?: RouterTypes['location']) => void;

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
    (
      props: ProLayoutProps & {
        hasSiderMenu?: boolean;
      },
      defaultDom: React.ReactNode,
    ) => React.ReactNode
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
    (routers: BreadcrumbProps['items']) => BreadcrumbProps['items']
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
   * @example 拼接 path： itemRender={(route, params, routes, paths) => { return <a href={paths.join('/')}>{route.breadcrumbName}</a> }}
   */
  itemRender?: BreadcrumbProps['itemRender'];

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

  /** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
  breadcrumbProps?: Omit<BreadcrumbProps, 'itemRender'> & LayoutBreadcrumbProps;

  /** @name 水印的相关配置 */
  waterMarkProps?: WatermarkProps;

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
   * @example ErrorBoundary={MyErrorBoundary}
   */
  ErrorBoundary?: React.ComponentClass<any, any> | boolean;

  /**
   * @name  侧边菜单的类型, menu.type 的快捷方式
   * @type "sub" | "group"
   * @example group
   */
  siderMenuType?: 'sub' | 'group';

  isChildrenLayout?: boolean;
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
  return (
    <Header
      matchMenuKeys={matchMenuKeys}
      {...props}
      stylish={props.stylish?.header}
    />
  );
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

const renderSiderMenu = (
  props: ProLayoutProps,
  matchMenuKeys: string[],
): React.ReactNode => {
  const {
    layout,
    isMobile,
    selectedKeys,
    openKeys,
    splitMenus,
    suppressSiderWhenMenuEmpty,
    menuRender,
  } = props;
  if (props.menuRender === false || props.pure) {
    return null;
  }
  let { menuData } = props;

  /** 如果是分割菜单模式，需要专门实现一下 */
  if (splitMenus && openKeys !== false && !isMobile) {
    const [key] = selectedKeys || matchMenuKeys;
    if (key) {
      menuData =
        props.menuData?.find((item) => item.key === key)?.children || [];
    } else {
      menuData = [];
    }
  }
  // 这里走了可以少一次循环
  const clearMenuData = clearMenuItem(menuData || []);

  if (
    clearMenuData &&
    clearMenuData?.length < 1 &&
    (splitMenus || suppressSiderWhenMenuEmpty)
  ) {
    return null;
  }
  if (layout === 'top' && !isMobile) {
    return (
      <SiderMenu
        matchMenuKeys={matchMenuKeys}
        {...props}
        hide
        stylish={props.stylish?.sider}
      />
    );
  }

  const defaultDom = (
    <SiderMenu
      matchMenuKeys={matchMenuKeys}
      {...props}
      // 这里走了可以少一次循环
      menuData={clearMenuData}
      stylish={props.stylish?.sider}
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
    const title = pageTitleRender(
      pageProps,
      pageTitleInfo.title,
      pageTitleInfo,
    );
    if (typeof title === 'string') {
      return getPageTitleInfo({
        ...pageTitleInfo,
        title,
      });
    }
    warning(
      typeof title === 'string',
      'pro-layout: renderPageTitle return value should be a string',
    );
    // 当 pageTitleRender 返回非字符串值时，返回默认的 pageTitleInfo
    // 而不是使用可能包含非字符串值的 title
    return pageTitleInfo;
  }
  return pageTitleInfo;
};

export type BasicLayoutContext = { [K in 'location']: ProLayoutProps[K] } & {
  breadcrumb: Record<string, MenuDataItem>;
};

const getPaddingInlineStart = (
  hasLeftPadding: boolean,
  collapsed: boolean | undefined,
  siderWidth: number,
  collapsedWidth: number,
): number | undefined => {
  if (hasLeftPadding) {
    return collapsed ? collapsedWidth : siderWidth;
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
    siderWidth: propsSiderWidth,
    menu,
    siderMenuType,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
    actionRef,
    bgLayoutImgList,
    formatMessage: propsFormatMessage,
    loading,
  } = props || {};

  const siderWidth = useMemo(() => {
    if (propsSiderWidth) return propsSiderWidth;
    return 240;
  }, [propsSiderWidth]);

  const menuCollapsedWidth = menu?.collapsedWidth ?? 48;

  const context = useContext(ConfigProvider.ConfigContext);

  const prefixCls = props.prefixCls ?? context.getPrefixCls('pro');

  const [menuLoadingState, _setMenuLoadingInner] = useControlledState(
    false,
    menu?.loading,
  );

  /**
   * 使用 useRefFunction 包装回调，确保引用稳定
   */
  const menuOnLoadingChange = useRefFunction((loading: boolean) => {
    menu?.onLoadingChange?.(loading);
  });

  // give a default key for swr
  const [defaultId] = useState(() => {
    layoutIndex += 1;
    return `pro-layout-${layoutIndex}`;
  });

  /**
   * 处理国际化相关 formatMessage
   * 如果有用户配置的以用户为主
   * 如果没有用自己实现的
   */
  const formatMessage = useCallback(
    ({
      id,
      defaultMessage,
      ...restParams
    }: {
      id: string;
      defaultMessage?: string;
    }): string => {
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

  const { data, mutate, isValidating } = useSWR(
    [defaultId, menu?.params],
    async ([, params]) => {
      menuOnLoadingChange(true);
      try {
        const menuDataItems = await menu?.request?.(
          params || {},
          route?.children || route?.routes || [],
        );
        return menuDataItems;
      } finally {
        menuOnLoadingChange(false);
      }
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
    },
  );

  const menuLoading =
    menu?.loading ?? (menu?.request ? isValidating : menuLoadingState);

  const { cache } = useSWRConfig();
  useEffect(() => {
    return () => {
      if (cache instanceof Map) cache.delete(defaultId);
    };
  }, []);

  const routeListForMenu = useMemo(() => {
    if (menu?.request) {
      return data ?? route?.children ?? route?.routes ?? [];
    }
    return route?.children || route?.routes || [];
  }, [menu?.request, data, route?.children, route?.routes]);

  const menuInfoData = useMemo<{
    breadcrumb?: Record<string, MenuDataItem>;
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  }>(
    () =>
      getMenuData(routeListForMenu, menu, formatMessage, menuDataRender),
    [formatMessage, menu, menuDataRender, routeListForMenu],
  );

  const { breadcrumb, breadcrumbMap, menuData = [] } = menuInfoData || {};

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
    () =>
      Array.from(
        new Set(matchMenus.map((item) => item.key || item.path || '')),
      ),
    [matchMenus],
  );

  // 当前选中的menu，一般不会为空
  const currentMenu = (matchMenus[matchMenus.length - 1] || {}) as ProSettings &
    MenuDataItem;

  const currentMenuLayoutProps = useCurrentMenuLayoutProps(currentMenu);

  const {
    fixSiderbar,
    layout: propsLayoutRaw,
    ...rest
  } = {
    ...props,
    ...currentMenuLayoutProps,
  };

  /** 历史 `mix` 已移除，按侧栏布局处理，避免旧配置直接失效 */
  const propsLayout: NonNullable<ProSettings['layout']> =
    (propsLayoutRaw as string | undefined) === 'mix'
      ? 'side'
      : propsLayoutRaw ?? 'side';

  const colSize = useBreakpoint();

  const isMobile = useMemo(() => {
    return (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;
  }, [colSize, props.disableMobile]);

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  /* Checking if the menu is loading and if it is, it will return a skeleton loading screen. */
  const hasLeftPadding = propsLayout !== 'top' && !isMobile;

  const [collapsed, onCollapseInner] = useControlledState<boolean>(() => {
    if (defaultCollapsed !== undefined) return defaultCollapsed;
    if (process.env.NODE_ENV === 'TEST') return false;
    if (isMobile) return true;
    if (colSize === 'md') return true;
    return false;
  }, props.collapsed);

  /**
   * 使用 useRefFunction 包装回调，确保引用稳定
   */
  const onCollapseCallback = useRefFunction((c: boolean) => {
    propsOnCollapse?.(c);
  });

  /**
   * 使用 queueMicrotask 延迟回调调用，避免在渲染阶段调用外部回调导致的 React 警告
   * "Cannot update a component while rendering a different component"
   */
  const onCollapse = useCallback(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      onCollapseInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: boolean) => boolean)(prev)
            : updater;
        queueMicrotask(() => {
          onCollapseCallback(next);
        });
        return next;
      });
    },
    [onCollapseCallback],
  );

  // Splicing parameters, adding menuData and formatMessage in props
  const defaultProps = omit(
    {
      prefixCls,
      ...props,
      siderWidth,
      ...currentMenuLayoutProps,
      formatMessage,
      breadcrumb,
      menu: {
        ...menu,
        type: siderMenuType || menu?.type,
        loading: menuLoading,
      },
      layout: propsLayout,
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
      ...(defaultProps as BreadcrumbProLayoutProps),
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
    },
    matchMenuKeys,
  );

  // render footer dom
  const footerDom = footerRender({
    isMobile,
    collapsed,
    ...defaultProps,
  });

  const { isChildrenLayout: contextIsChildrenLayout } =
    useContext(RouteContext);

  // 如果 props 中定义，以 props 为准
  const isChildrenLayout =
    propsIsChildrenLayout !== undefined
      ? propsIsChildrenLayout
      : contextIsChildrenLayout;

  const proLayoutClassName = `${prefixCls}-layout`;
  const { wrapSSR, hashId } = useStyle(proLayoutClassName);

  // gen className
  const className = clsx(
    props.className,
    hashId,
    'ant-design-pro',
    proLayoutClassName,
    {
      [`screen-${colSize}`]: colSize,
      [`${proLayoutClassName}-top-menu`]: propsLayout === 'top',
      [`${proLayoutClassName}-is-children`]: isChildrenLayout,
      [`${proLayoutClassName}-fix-siderbar`]: fixSiderbar,
      [`${proLayoutClassName}-${propsLayout}`]: propsLayout,
    },
  );

  /** 计算 slider 的宽度 */
  const leftSiderWidth = getPaddingInlineStart(
    !!hasLeftPadding,
    collapsed,
    siderWidth,
    menuCollapsedWidth,
  );

  // siderMenuDom 为空的时候，不需要 padding
  const genLayoutStyle: CSSProperties = {
    position: 'relative',
  };

  // if is some layout children, don't need min height
  if (isChildrenLayout || (contentStyle && contentStyle.minHeight)) {
    genLayoutStyle.minHeight = 0;
  }

  /** 页面切换的时候触发 */
  useEffect(() => {
    props.onPageChange?.(props.location);
  }, [location.pathname, location.pathname?.search]);

  const [hasFooterToolbar, setHasFooterToolbar] = useState(false);
  /**
   * 使用number是因为多标签页的时候有多个 PageContainer，只有有任意一个就应该展示这个className
   */
  const [hasPageContainer, setHasPageContainer] = useState(0);

  useDocumentTitle(pageTitleInfo, props.title || false);

  const { token } = useContext(ProProvider);

  const bgImgStyleList = useMemo(() => {
    if (bgLayoutImgList && bgLayoutImgList.length > 0) {
      return bgLayoutImgList?.map((item, index) => {
        return (
          <img
            key={
              item.src
                ? `${item.src}-${index}`
                : `bg-layout-${index}`
            }
            src={item.src}
            alt=""
            style={{
              position: 'absolute',
              ...item,
            }}
          />
        );
      });
    }
    return null;
  }, [bgLayoutImgList]);

  return wrapSSR(
    <RouteContext.Provider
      value={{
        ...defaultProps,
        breadcrumb: breadcrumbProps,
        menuData,
        isMobile,
        collapsed,
        hasPageContainer,
        setHasPageContainer,
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
        <>{children}</>
      ) : (
        <div className={className} data-testid="pro-layout">
          {bgImgStyleList || token.layout?.bgLayout ? (
            <div className={clsx(`${proLayoutClassName}-bg-list`, hashId)}>
              {bgImgStyleList}
            </div>
          ) : null}
          <Layout
            style={{
              minHeight: '100%',
              flexDirection: siderMenuDom ? 'row' : undefined,
              ...style,
            }}
          >
            <ConfigProvider
              theme={{
                hashed: isNeedOpenHash(),
                token: {
                  controlHeightLG:
                    token.layout?.sider?.menuHeight || token?.controlHeightLG,
                },
              }}
            >
              {siderMenuDom}
            </ConfigProvider>
            <div
              style={genLayoutStyle}
              className={clsx(`${proLayoutClassName}-container`, hashId)}
            >
              {headerDom}
              <WrapContent
                hasPageContainer={hasPageContainer}
                isChildrenLayout={isChildrenLayout}
                {...rest}
                hasHeader={!!headerDom}
                prefixCls={proLayoutClassName}
                style={contentStyle}
              >
                {loading ? <PageLoading /> : children}
              </WrapContent>
              {footerDom}
              {hasFooterToolbar && (
                <div
                  className={`${proLayoutClassName}-has-footer`}
                  style={{
                    height: 64,
                    marginBlockStart:
                      token.layout?.pageContainer
                        ?.paddingBlockPageContainerContent,
                  }}
                />
              )}
            </div>
          </Layout>
        </div>
      )}
    </RouteContext.Provider>,
  );
};

const ProLayout: React.FC<ProLayoutProps> = (props) => {
  const { colorPrimary } = props;

  return (
    <ConfigProvider
      theme={
        colorPrimary
          ? {
              token: {
                colorPrimary: colorPrimary,
              },
            }
          : undefined
      }
    >
      <ProConfigProvider
        token={props.token}
        prefixCls={props.prefixCls}
      >
        <BaseProLayout
          logo={<Logo />}
          {...defaultSettings}
          location={isBrowser() ? window.location : undefined}
          {...props}
        />
      </ProConfigProvider>
    </ConfigProvider>
  );
};

export { ProLayout };
