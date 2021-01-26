import { PageHeader, Tabs, Affix, ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import React, { useContext } from 'react';
import classNames from 'classnames';
import type { TabsProps, AffixProps, PageHeaderProps, TabPaneProps } from 'antd';

import type { RouteContextType } from '../../RouteContext';
import RouteContext from '../../RouteContext';
import GridContent from '../GridContent';
import FooterToolbar from '../FooterToolbar';
import './index.less';
import PageLoading from '../PageLoading';
import type { WithFalse } from '../../typings';

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

  /** @name 是否显示背景色 */
  ghost?: boolean;

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
  affixProps?: AffixProps;

  /**
   * 只加载内容区域
   *
   * @name 是否加载
   */
  loading?: boolean;
} & PageHeaderTabConfig &
  Omit<PageHeaderProps, 'title'>;

/**
 * Render Footer tabList In order to be compatible with the old version of the PageHeader basically
 * all the functions are implemented.
 */
const renderFooter: React.FC<
  Omit<
    PageContainerProps & {
      prefixedClassName: string;
    },
    'title'
  >
> = ({ tabList, tabActiveKey, onTabChange, tabBarExtraContent, tabProps, prefixedClassName }) => {
  if (tabList && tabList.length) {
    return (
      <Tabs
        className={`${prefixedClassName}-tabs`}
        activeKey={tabActiveKey}
        onChange={(key) => {
          if (onTabChange) {
            onTabChange(key);
          }
        }}
        tabBarExtraContent={tabBarExtraContent}
        {...tabProps}
      >
        {tabList.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tabs.TabPane {...item} tab={item.tab} key={item.key || index} />
        ))}
      </Tabs>
    );
  }
  return null;
};

const renderPageHeader = (
  content: React.ReactNode,
  extraContent: React.ReactNode,
  prefixedClassName: string,
): React.ReactNode => {
  if (!content && !extraContent) {
    return null;
  }
  return (
    <div className={`${prefixedClassName}-detail`}>
      <div className={`${prefixedClassName}-main`}>
        <div className={`${prefixedClassName}-row`}>
          {content && <div className={`${prefixedClassName}-content`}>{content}</div>}
          {extraContent && (
            <div className={`${prefixedClassName}-extraContent`}>{extraContent}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const defaultPageHeaderRender = (
  props: PageContainerProps,
  value: RouteContextType & { prefixedClassName: string },
): React.ReactNode => {
  const {
    title,
    content,
    pageHeaderRender,
    header,
    extraContent,
    style,
    prefixCls,
    ...restProps
  } = props;

  if (pageHeaderRender === false) {
    return null;
  }
  if (pageHeaderRender) {
    return pageHeaderRender({ ...props, ...value });
  }
  let pageHeaderTitle = title;
  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }
  const pageHeaderProps = {
    ...value,
    title: pageHeaderTitle,
    ...restProps,
    footer: renderFooter({
      ...restProps,
      prefixedClassName: value.prefixedClassName,
    }),
    ...header,
  };

  if (
    !pageHeaderProps.title &&
    !pageHeaderProps.subTitle &&
    !pageHeaderProps.breadcrumb?.itemRender &&
    !pageHeaderProps.breadcrumb?.routes?.length &&
    !pageHeaderProps.extra &&
    !pageHeaderProps.tags &&
    !pageHeaderProps.footer &&
    !pageHeaderProps.avatar &&
    !pageHeaderProps.backIcon &&
    !content &&
    !extraContent
  ) {
    return null;
  }

  return (
    <PageHeader
      {...pageHeaderProps}
      breadcrumb={{ ...pageHeaderProps.breadcrumb, ...pageHeaderProps.breadcrumbProps }}
      prefixCls={prefixCls}
    >
      {header?.children || renderPageHeader(content, extraContent, value.prefixedClassName)}
    </PageHeader>
  );
};

const PageContainer: React.FC<PageContainerProps> = (props) => {
  const { children, loading, style, footer, affixProps, ghost, fixedHeader } = props;
  const value = useContext(RouteContext);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = props.prefixCls || getPrefixCls('pro');

  const prefixedClassName = `${prefixCls}-page-container`;

  const className = classNames(prefixedClassName, props.className, {
    [`${prefixCls}-page-container-ghost`]: ghost,
  });

  const content = children ? (
    <div>
      <div className={`${prefixedClassName}-children-content`}>{children}</div>
      {value.hasFooterToolbar && (
        <div
          style={{
            height: 48,
            marginTop: 24,
          }}
        />
      )}
    </div>
  ) : null;

  const pageHeaderDom = defaultPageHeaderRender(props, {
    ...value,
    prefixCls: undefined,
    prefixedClassName,
  });

  const headerDom = pageHeaderDom ? (
    <div className={`${prefixedClassName}-warp`}>{pageHeaderDom}</div>
  ) : null;

  return (
    <div style={style} className={className}>
      {fixedHeader && headerDom ? (
        // 在 hasHeader 且 fixedHeader 的情况下，才需要设置高度
        <Affix
          offsetTop={value.hasHeader && value.fixedHeader ? value.headerHeight : 0}
          {...affixProps}
        >
          {headerDom}
        </Affix>
      ) : (
        headerDom
      )}
      <GridContent>{loading ? <PageLoading /> : content}</GridContent>
      {footer && <FooterToolbar prefixCls={prefixCls}>{footer}</FooterToolbar>}
    </div>
  );
};

export default PageContainer;
