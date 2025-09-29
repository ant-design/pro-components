import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import type { AvatarProps, BreadcrumbProps, TagType } from 'antd';
import { Avatar, Breadcrumb, ConfigProvider, Space } from 'antd';
import type { DirectionType } from 'antd/es/config-provider';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React from 'react';
import type { ContentWidth } from '../../defaultSettings';
import useStyle from './style';

export interface PageHeaderProps {
  backIcon?: React.ReactNode;
  prefixCls?: string;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
  childrenContentStyle?: React.CSSProperties;
  breadcrumb?: Partial<BreadcrumbProps> | React.ReactElement<typeof Breadcrumb>;
  breadcrumbRender?: (props: PageHeaderProps, defaultDom: React.ReactNode) => React.ReactNode;
  tags?: React.ReactElement<TagType> | React.ReactElement<TagType>[];
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  avatar?: AvatarProps;
  onBack?: (e?: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  contentWidth?: ContentWidth;
  layout?: string;
  ghost?: boolean;
  children?: React.ReactNode;
}

const renderBack = (
  prefixCls: string,
  hashId: string,
  backIcon?: React.ReactNode,
  onBack?: (e?: React.MouseEvent<HTMLElement>) => void,
) => {
  if (!backIcon || !onBack) {
    return null;
  }
  return (
    <div className={`${prefixCls}-back ${hashId}`.trim()}>
      <div
        aria-label="back"
        className={`${prefixCls}-back-button ${hashId}`.trim()}
        role="button"
        onClick={(e) => {
          onBack?.(e);
        }}
      >
        {backIcon}
      </div>
    </div>
  );
};

const renderBreadcrumb = (breadcrumb: BreadcrumbProps, prefixCls: string) => {
  if (!breadcrumb.items?.length) return null;
  return <Breadcrumb {...breadcrumb} className={classNames(`${prefixCls}-breadcrumb`, breadcrumb.className)} />;
};

const getBackIcon = (props: PageHeaderProps, direction: DirectionType = 'ltr') => {
  if (props.backIcon !== undefined) {
    return props.backIcon;
  }
  return direction === 'rtl' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />;
};

const renderTitle = (prefixCls: string, props: PageHeaderProps, direction: DirectionType = 'ltr', hashId: string) => {
  const { title, avatar, subTitle, tags, extra, onBack } = props;
  const headingPrefixCls = `${prefixCls}-heading`;
  const hasHeading = title || subTitle || tags || extra;
  // If there is nothing, return a null
  if (!hasHeading) {
    return null;
  }
  const backIcon = getBackIcon(props, direction);
  const backIconDom = renderBack(prefixCls, hashId, backIcon, onBack);
  const hasTitle = backIconDom || avatar || hasHeading;
  return (
    <div className={headingPrefixCls + ' ' + hashId}>
      {hasTitle && (
        <div className={`${headingPrefixCls}-left ${hashId}`.trim()}>
          {backIconDom}
          {avatar && (
            <Avatar className={classNames(`${headingPrefixCls}-avatar`, hashId, avatar.className)} {...avatar} />
          )}
          {title && (
            <span
              className={`${headingPrefixCls}-title ${hashId}`.trim()}
              title={typeof title === 'string' ? title : undefined}
            >
              {title}
            </span>
          )}
          {subTitle && (
            <span
              className={`${headingPrefixCls}-sub-title ${hashId}`.trim()}
              title={typeof subTitle === 'string' ? subTitle : undefined}
            >
              {subTitle}
            </span>
          )}
          {tags && <span className={`${headingPrefixCls}-tags ${hashId}`.trim()}>{tags}</span>}
        </div>
      )}
      {extra && (
        <span className={`${headingPrefixCls}-extra ${hashId}`.trim()}>
          <Space>{extra}</Space>
        </span>
      )}
    </div>
  );
};

const renderFooter = (prefixCls: string, footer: React.ReactNode, hashId: string) => {
  if (footer) {
    return <div className={`${prefixCls}-footer ${hashId}`.trim()}>{footer}</div>;
  }
  return null;
};

const renderChildren = (prefixCls: string, children: React.ReactNode, hashId: string) => (
  <div className={`${prefixCls}-content ${hashId}`.trim()}>{children}</div>
);

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const [compact, updateCompact] = React.useState<boolean>(false);

  const onResize = ({ width }: { width: number }) => updateCompact(width < 768);

  const { getPrefixCls, direction } = React.useContext(ConfigProvider.ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    style,
    footer,
    children,
    breadcrumb,
    breadcrumbRender,
    className: customizeClassName,
    contentWidth,
    layout,
    ghost = true,
  } = props;

  const prefixCls = getPrefixCls('page-header', customizePrefixCls);
  const { wrapSSR, hashId } = useStyle(prefixCls);

  const getDefaultBreadcrumbDom = () => {
    if ((breadcrumb as BreadcrumbProps)?.items) {
      return renderBreadcrumb(breadcrumb as BreadcrumbProps, prefixCls);
    }
    return null;
  };

  const defaultBreadcrumbDom = getDefaultBreadcrumbDom();

  const isBreadcrumbComponent = breadcrumb && 'props' in breadcrumb;

  // support breadcrumbRender function
  const breadcrumbRenderDomFromProps =
    breadcrumbRender?.({ ...props, prefixCls }, defaultBreadcrumbDom) ?? defaultBreadcrumbDom;

  // 如果 breadcrumbRender 返回的是数组，需要转换为 Breadcrumb 组件
  // 如果返回的是 React.ReactNode，直接使用
  const breadcrumbDom = isBreadcrumbComponent
    ? breadcrumb
    : Array.isArray(breadcrumbRenderDomFromProps)
      ? renderBreadcrumb({ items: breadcrumbRenderDomFromProps }, prefixCls)
      : breadcrumbRenderDomFromProps;

  const className = classNames(prefixCls, hashId, customizeClassName, {
    [`${prefixCls}-has-breadcrumb`]: !!breadcrumbDom,
    [`${prefixCls}-has-footer`]: !!footer,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-compact`]: compact,
    [`${prefixCls}-wide`]: contentWidth === 'Fixed' && layout == 'top',
    [`${prefixCls}-ghost`]: ghost,
  });
  const title = renderTitle(prefixCls, props, direction, hashId);
  const childDom = children && renderChildren(prefixCls, children, hashId);
  const footerDom = renderFooter(prefixCls, footer, hashId);

  if (!breadcrumbDom && !title && !footerDom && !childDom) {
    return <div className={classNames(hashId, [`${prefixCls}-no-children`])} />;
  }

  return wrapSSR(
    <ResizeObserver onResize={onResize}>
      {(ref) => (
        <div ref={ref} className={className} style={style}>
          {breadcrumbDom}
          {title}
          {childDom}
          {footerDom}
        </div>
      )}
    </ResizeObserver>,
  );
};

export { PageHeader };
