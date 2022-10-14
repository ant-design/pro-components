import { ConfigProviderWrap } from '@ant-design/pro-provider';
import type { AffixProps, BreadcrumbProps, SpinProps, TabPaneProps, TabsProps } from 'antd';
import { Affix, Breadcrumb, ConfigProvider, Tabs } from 'antd';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import { ProLayoutContext } from '../../context/ProLayoutContext';
import { RouteContext } from '../../context/RouteContext';
import type { WithFalse } from '../../typings';
import { FooterToolbar } from '../FooterToolbar';
import { GridContent } from '../GridContent';
import type { PageHeaderProps } from '../PageHeader';
import { PageHeader } from '../PageHeader';
import { PageLoading } from '../PageLoading';
import type { WaterMarkProps } from '../WaterMark';
import { WaterMark } from '../WaterMark';
import type { pageContainerToken } from './style/index';
import { useStyle } from './style/index';

export type PageHeaderTabConfig = {
  /** @name tabs 的列表 */
  tabList?: (TabPaneProps & { key?: React.ReactText })[];

  /** @name 当前选中 tab 的 key */
  tabActiveKey?: TabsProps['activeKey'];

  /** @name tab 修改时触发 */
  onTabChange?: TabsProps['onChange'];

  /** @name tab 上额外的区域 */
  tabBarExtraContent?: TabsProps['tabBarExtraContent'];

  /** @name tabs 的其他配置 */
  tabProps?: TabsProps;

  /**
   * @deprecated 请使用 fixedHeader
   * @name 固定 PageHeader 到页面顶部
   */
  fixHeader?: boolean;

  /** @name 固定 PageHeader 到页面顶部 */
  fixedHeader?: boolean;
};

export type PageContainerProps = {
  title?: React.ReactNode | false;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  prefixCls?: string;
  footer?: ReactNode[];

  /**
   * 自定义的 token
   */
  token?: pageContainerToken;

  /**
   * 与 antd 完全相同
   *
   * @name PageHeader 的配置
   */
  header?: Partial<PageHeaderProps> & {
    children?: React.ReactNode;
  };

  /** @name 自定义 pageHeader */
  pageHeaderRender?: WithFalse<(props: PageContainerProps) => React.ReactNode>;

  /**
   * 与 antd 完全相同
   *
   * @name 固钉的配置
   */
  affixProps?: Omit<AffixProps, 'children'>;

  /**
   * 只加载内容区域
   *
   * @name 是否加载
   */
  loading?: boolean | SpinProps | React.ReactNode;

  /** 自定义 breadcrumb,返回false不展示 */
  breadcrumbRender?: PageHeaderProps['breadcrumbRender'] | false;

  /** @name 水印的配置 */
  waterMarkProps?: WaterMarkProps;

  /** @name 配置面包屑 */
  breadcrumb?: BreadcrumbProps;

  children?: React.ReactNode;
} & PageHeaderTabConfig &
  Omit<PageHeaderProps, 'title' | 'footer' | 'breadcrumbRender' | 'breadcrumb'>;

function genLoading(spinProps: boolean | SpinProps) {
  if (typeof spinProps === 'object') {
    return spinProps;
  }
  return { spinning: spinProps };
}

/**
 * Render Footer tabList In order to be compatible with the old version of the PageHeader basically
 * all the functions are implemented.
 */
const renderFooter: React.FC<
  Omit<
    PageContainerProps & {
      prefixedClassName: string;
      hashId: string;
    },
    'title'
  >
> = ({
  tabList,
  tabActiveKey,
  onTabChange,
  hashId,
  tabBarExtraContent,
  tabProps,
  prefixedClassName,
}) => {
  if (Array.isArray(tabList) || tabBarExtraContent) {
    return (
      <Tabs
        className={`${prefixedClassName}-tabs ${hashId}`}
        activeKey={tabActiveKey}
        onChange={(key) => {
          if (onTabChange) {
            onTabChange(key);
          }
        }}
        tabBarExtraContent={tabBarExtraContent}
        // @ts-ignore
        items={tabList?.map((item, index) => ({
          label: item.tab,
          ...item,
          key: item.key?.toString() || index?.toString(),
        }))}
        {...tabProps}
      >
        {tabList?.map((item, index) => {
          return <Tabs.TabPane key={item.key || index} tab={item.tab} {...item} />;
        })}
      </Tabs>
    );
  }
  return null;
};

const renderPageHeader = (
  content: React.ReactNode,
  extraContent: React.ReactNode,
  prefixedClassName: string,
  hashId: string,
): React.ReactNode => {
  if (!content && !extraContent) {
    return null;
  }
  return (
    <div className={`${prefixedClassName}-detail ${hashId}`}>
      <div className={`${prefixedClassName}-main ${hashId}`}>
        <div className={`${prefixedClassName}-row ${hashId}`}>
          {content && <div className={`${prefixedClassName}-content ${hashId}`}>{content}</div>}
          {extraContent && (
            <div className={`${prefixedClassName}-extraContent ${hashId}`}>{extraContent}</div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * 配置与面包屑相同，只是增加了自动根据路由计算面包屑的功能。此功能必须要在 ProLayout 中使用。
 *
 * @param props
 * @returns
 */
const ProBreadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const value = useContext(RouteContext);
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Breadcrumb {...value?.breadcrumb} {...value?.breadcrumbProps} {...props} />
    </div>
  );
};

const memoRenderPageHeader = (
  props: PageContainerProps & { prefixedClassName: string; value: any; hashId: string },
) => {
  const {
    title,
    content,
    pageHeaderRender,
    header,
    prefixedClassName,
    extraContent,
    style,
    prefixCls,
    hashId,
    value,
    breadcrumbRender,
    ...restProps
  } = props;
  const getBreadcrumbRender = () => {
    if (!breadcrumbRender) {
      return undefined;
    }
    return breadcrumbRender;
  };

  if (pageHeaderRender === false) {
    return null;
  }
  if (pageHeaderRender) {
    return <> {pageHeaderRender({ ...props, ...value })}</>;
  }
  let pageHeaderTitle = title;
  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }
  const pageHeaderProps: PageHeaderProps = {
    ...value,
    title: pageHeaderTitle,
    ...restProps,
    footer: renderFooter({
      ...restProps,
      hashId,
      breadcrumbRender,
      prefixedClassName,
    }),
    ...header,
  };

  const { breadcrumb } = pageHeaderProps as {
    breadcrumb: BreadcrumbProps;
  };

  const noHasBreadCrumb =
    (!breadcrumb || (!breadcrumb?.itemRender && !breadcrumb?.routes?.length)) && !breadcrumbRender;

  if (
    ['title', 'subTitle', 'extra', 'tags', 'footer', 'avatar', 'backIcon'].every(
      (item) => !pageHeaderProps[item],
    ) &&
    noHasBreadCrumb &&
    !content &&
    !extraContent
  ) {
    return null;
  }

  return (
    <PageHeader
      {...pageHeaderProps}
      className={`${prefixedClassName}-warp-page-header ${hashId}`}
      breadcrumb={
        breadcrumbRender === false
          ? undefined
          : { ...pageHeaderProps.breadcrumb, ...value.breadcrumbProps }
      }
      breadcrumbRender={getBreadcrumbRender()}
      prefixCls={prefixCls}
    >
      {header?.children || renderPageHeader(content, extraContent, prefixedClassName, hashId)}
    </PageHeader>
  );
};

const PageContainer: React.FC<PageContainerProps> = (props) => {
  const {
    children,
    loading = false,
    className,
    style,
    footer,
    affixProps,
    token: propsToken,
    fixedHeader,
    breadcrumbRender,
    ...restProps
  } = props;
  const value = useContext(RouteContext);
  /** 告诉 props 是否存在 footerBar */
  useEffect(() => {
    if (!value || !value?.setHasPageContainer) {
      return () => {};
    }
    value?.setHasPageContainer?.((num) => num + 1);
    return () => {
      value?.setHasPageContainer?.((num) => num - 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { pageContainer } = useContext(ProLayoutContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = props.prefixCls || getPrefixCls('pro');

  const basePageContainer = `${prefixCls}-page-container`;

  const { wrapSSR, hashId } = useStyle(basePageContainer, propsToken);

  const memoBreadcrumbRender = useMemo(() => {
    if (breadcrumbRender == false) return false;
    return breadcrumbRender || restProps?.header?.breadcrumbRender;
  }, [breadcrumbRender, restProps?.header?.breadcrumbRender]);

  const pageHeaderDom = memoRenderPageHeader({
    ...restProps,
    breadcrumbRender: memoBreadcrumbRender,
    hashId,
    prefixCls: undefined,
    prefixedClassName: basePageContainer,
    value,
  });

  const loadingDom = useMemo(() => {
    // 当loading时一个合法的ReactNode时，说明用户使用了自定义loading,直接返回改自定义loading
    if (React.isValidElement(loading)) {
      return loading;
    }
    // 当传递过来的是布尔值，并且为false时，说明不需要显示loading,返回null
    if (typeof loading === 'boolean' && !loading) {
      return null;
    }
    // 如非上述两种情况，那么要么用户传了一个true,要么用户传了loading配置，使用genLoading生成loading配置后返回PageLoading
    const spinProps = genLoading(loading as boolean | SpinProps);
    // 如果传的是loading配置，但spinning传的是false，也不需要显示loading
    return spinProps.spinning ? <PageLoading {...spinProps} /> : null;
  }, [loading]);

  const content = useMemo(() => {
    return children ? (
      <>
        <div
          className={classNames(`${basePageContainer}-children-content ${hashId}`)}
          style={{
            paddingBlock: propsToken?.paddingBlockPageContainerContent,
            paddingInline: propsToken?.paddingInlinePageContainerContent,
          }}
        >
          {children}
        </div>
        {value.hasFooterToolbar && (
          <div
            style={{
              height: 64,
              marginBlockStart: pageContainer.paddingBlockPageContainerContent,
            }}
          />
        )}
      </>
    ) : null;
  }, [
    children,
    basePageContainer,
    hashId,
    propsToken?.paddingBlockPageContainerContent,
    propsToken?.paddingInlinePageContainerContent,
    value.hasFooterToolbar,
    pageContainer.paddingBlockPageContainerContent,
  ]);

  const renderContentDom = useMemo(() => {
    // 只要loadingDom非空我们就渲染loadingDom,否则渲染内容
    const dom = loadingDom || content;
    if (props.waterMarkProps || value.waterMarkProps) {
      const waterMarkProps = {
        ...value.waterMarkProps,
        ...props.waterMarkProps,
      };
      return <WaterMark {...waterMarkProps}>{dom}</WaterMark>;
    }
    return dom;
  }, [props.waterMarkProps, value.waterMarkProps, loadingDom, content]);

  const containerClassName = classNames(basePageContainer, hashId, className, {
    [`${basePageContainer}-with-footer`]: footer,
    [`${basePageContainer}-with-affix`]: fixedHeader && pageHeaderDom,
  });

  const token = useContext(ProLayoutContext);

  return wrapSSR(
    <ConfigProviderWrap>
      <div style={style} className={containerClassName}>
        {fixedHeader && pageHeaderDom ? (
          // 在 hasHeader 且 fixedHeader 的情况下，才需要设置高度
          <Affix
            offsetTop={value.hasHeader && value.fixedHeader ? token.header.heightLayoutHeader : 0}
            {...affixProps}
            className={`${basePageContainer}-affix ${hashId}`}
          >
            {pageHeaderDom}
          </Affix>
        ) : (
          pageHeaderDom
        )}
        {renderContentDom && <GridContent>{renderContentDom}</GridContent>}
      </div>
      {footer && <FooterToolbar prefixCls={prefixCls}>{footer}</FooterToolbar>}
    </ConfigProviderWrap>,
  );
};

const ProPageHeader = (props: PageContainerProps & { prefixedClassName: string }) => {
  const value = useContext(RouteContext);
  return memoRenderPageHeader({
    ...props,
    hashId: '',
    value,
  });
};

export { ProPageHeader, PageContainer, ProBreadcrumb };
