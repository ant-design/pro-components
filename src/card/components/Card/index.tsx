import { RightOutlined } from '@ant-design/icons';
import { omit, useControlledState } from '@rc-component/util';
import { Card as AntdCard, ConfigProvider, Grid, Tabs } from 'antd';
import { clsx } from 'clsx';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { proTheme } from '../../../provider';
import { LabelIconTip, useRefFunction } from '../../../utils';
import type { Breakpoint, CardProps, Gutter } from '../../typing';
import Actions from '../Actions';
import Loading from '../Loading';
import useStyle from './style';

const { useBreakpoint } = Grid;

// 子卡片元素类型：props 形如 CardProps，组件类型用 React.JSXElementConstructor 收紧，
// 比 any 安全，但仍允许 React.cloneElement / element.type?.isProCard 这类访问。
type ProCardChildType = React.ReactElement<
  CardProps,
  React.JSXElementConstructor<CardProps> & { isProCard?: boolean }
>;

const Card = React.forwardRef((props: CardProps, ref: any) => {
  const {
    className,
    rootClassName,
    style,
    styles,
    title,
    subTitle,
    extra,
    wrap = false,
    layout,
    loading,
    gutter = 0,
    tooltip,
    split,
    headerBordered = false,
    variant: customVariant,
    cover,
    classNames,
    boxShadow = false,
    children,
    size,
    actions,
    ghost = false,
    hoverable = false,
    direction,
    collapsed: controlCollapsed,
    collapsible = false,
    collapsibleIconRender,
    colStyle,
    defaultCollapsed = false,
    onCollapse,
    checked,
    onChecked,
    tabs,
    type,
    ...rest
  } = props;

  const variant = customVariant ?? 'outlined';

  const mergedStyles = {
    header: styles?.header,
    body: styles?.body,
    root: styles?.root,
    extra: styles?.extra,
    title: styles?.title,
    actions: styles?.actions,
    cover: styles?.cover,
  };
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  // 用于 loading 占位 padding 兜底（body padding 被显式置 0 时使用 token.paddingLG）
  const { token } = proTheme.useToken();

  const screens = useBreakpoint() || {
    lg: true,
    md: true,
    sm: true,
    xl: false,
    xs: false,
    xxl: false,
  };

  const [collapsed, setCollapsedInner] = useControlledState<boolean>(
    defaultCollapsed,
    controlCollapsed,
  );

  // 展开动画结束后再放开 overflow，避免打断 grid 高度过渡又裁切展开内容
  const [collapseRestingOpen, setCollapseRestingOpen] = useState(
    () => !(controlCollapsed ?? defaultCollapsed),
  );
  if (collapsed && collapseRestingOpen) {
    setCollapseRestingOpen(false);
  }

  // reduced-motion 下无 transitionend，展开后需立刻放开 overflow
  useEffect(() => {
    if (collapsed || typeof window === 'undefined') return;
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (media?.matches) {
      setCollapseRestingOpen(true);
    }
  }, [collapsed]);

  /**
   * 使用 useRefFunction 包装回调，确保引用稳定
   */
  const onCollapseCallback = useRefFunction((c: boolean) => {
    onCollapse?.(c);
  });

  /**
   * 使用 queueMicrotask 延迟回调调用，避免在渲染阶段调用外部回调导致的 React 警告
   * "Cannot update a component while rendering a different component"
   */
  const setCollapsed = useCallback(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      setCollapsedInner((prev) => {
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

  // 顺序决定如何进行响应式取值，按最大响应值依次取值，请勿修改。
  const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
  // 直接使用 tabs.items，不再支持旧的 TabPane 写法
  const ModifyTabItemsContent = tabs?.items;

  /**
   * 根据响应式获取 gutter, 参考 antd 实现
   *
   * @param gut
   */
  const getNormalizedGutter = (gut: Gutter | Gutter[]) => {
    const results: [number, number] = [0, 0];
    const normalizedGutter = Array.isArray(gut) ? gut : [gut, 0];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i += 1) {
          const breakpoint: Breakpoint = responsiveArray[i];
          if (screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint] as number;
            break;
          }
        }
      } else {
        results[index] = g || 0;
      }
    });
    return results;
  };

  const getColSpanStyle = (colSpan: CardProps['colSpan']) => {
    let span = colSpan;

    // colSpan 响应式
    if (typeof colSpan === 'object') {
      for (let i = 0; i < responsiveArray.length; i += 1) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (screens?.[breakpoint] && colSpan?.[breakpoint] !== undefined) {
          span = colSpan[breakpoint];
          break;
        }
      }
    }

    // 当 colSpan 为 30% 或 300px 时
    const isPercentOrPxWidth =
      typeof span === 'string' && /\d%|\dpx/i.test(span);
    const colSpanStyle: React.CSSProperties = isPercentOrPxWidth
      ? { width: span as string, flexShrink: 0 }
      : {};

    return { span, colSpanStyle };
  };

  const prefixCls = getPrefixCls('pro-card');
  const { wrapSSR, hashId } = useStyle(prefixCls);

  const [horizontalGutter, verticalGutter] = getNormalizedGutter(gutter);

  // 判断是否套了卡片，如果套了的话将自身卡片内部内容的 padding 设置为0
  let containProCard = false;
  const childrenArray = React.Children.toArray(children) as ProCardChildType[];

  const childrenModified = childrenArray.map((element, index) => {
    if (element?.type?.isProCard) {
      containProCard = true;

      // 宽度
      const { colSpan } = element.props;
      const { span, colSpanStyle } = getColSpanStyle(colSpan);

      const columnClassName = clsx([`${prefixCls}-col`], hashId, {
        [`${prefixCls}-split-vertical`]:
          split === 'vertical' && index !== childrenArray.length - 1,
        [`${prefixCls}-split-horizontal`]:
          split === 'horizontal' && index !== childrenArray.length - 1,
        [`${prefixCls}-col-${span}`]:
          typeof span === 'number' && span >= 0 && span <= 24,
      });

      // key 直接挂在外层 div 上，避免依赖 wrapSSR 返回结构（v2 起 wrapSSR 是 identity，
      // 但仍然不应该依赖此细节，否则 wrapSSR 行为变化会导致 key 落到错误的节点上）。
      // element 直接放入即可，无需 React.cloneElement(element)（不传 props 是无意义调用）。
      return wrapSSR(
        <div
          key={`pro-card-col-${element?.key || index}`}
          style={{
            ...colSpanStyle,
            ...(horizontalGutter > 0 && {
              paddingInlineEnd: horizontalGutter / 2,
              paddingInlineStart: horizontalGutter / 2,
            }),
            ...(verticalGutter > 0 && {
              paddingBlockStart: verticalGutter / 2,
              paddingBlockEnd: verticalGutter / 2,
            }),
            ...colStyle,
          }}
          className={columnClassName}
        >
          {element}
        </div>,
      );
    }
    return element;
  });

  // 嵌套 / split 只影响 body 排布，不退出 AntdCard。
  // wrap、direction 仅在嵌套时生效，单独出现不算布局壳，避免叶子卡片被清 padding。
  const isLayoutShell = containProCard || Boolean(split);

  // 无法对齐 antd Card 皮肤时走 legacy（ghost / checked / boxShadow 等）。
  // collapsible、tabs、嵌套属于行为或布局，不因此切换皮肤。
  const needsLegacySkin =
    ghost ||
    checked !== undefined ||
    Boolean(onChecked) ||
    boxShadow ||
    React.isValidElement(loading) ||
    (Boolean(layout) && layout !== 'default') ||
    Boolean(actions && !Array.isArray(actions));

  const useAntdCard = !needsLegacySkin;

  // ProCard 仍对外使用 size="default"；antd 6+ 已弃用，传给 Card 时用 medium
  const antdCardSize =
    size === 'small' ? 'small' : size === 'default' ? 'medium' : undefined;

  const cardCls = clsx(
    `${prefixCls}`,
    className,
    rootClassName,
    hashId,
    classNames?.root,
    {
      // 主路径依赖 ant-card；仅 legacy 打标供样式选择
      [`${prefixCls}-legacy`]: !useAntdCard,
      [`${prefixCls}-border`]: variant === 'outlined',
      [`${prefixCls}-box-shadow`]: boxShadow,
      [`${prefixCls}-contain-card`]: containProCard,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-split`]: split === 'vertical' || split === 'horizontal',
      [`${prefixCls}-ghost`]: ghost,
      [`${prefixCls}-hoverable`]: hoverable,
      [`${prefixCls}-size-${size}`]: size,
      [`${prefixCls}-type-${type}`]: type,
      [`${prefixCls}-collapse`]: collapsed,
      [`${prefixCls}-collapsible`]: Boolean(collapsible),
      [`${prefixCls}-checked`]: checked,
    },
  );

  const bodyCls = clsx(`${prefixCls}-body`, hashId, classNames?.body, {
    [`${prefixCls}-body-center`]: layout === 'center',
    [`${prefixCls}-body-direction-column`]:
      split === 'horizontal' || direction === 'column',
    [`${prefixCls}-body-wrap`]: wrap && containProCard,
  });

  const bodyStylePadding = mergedStyles.body?.padding;

  // body padding 被显式置 0 时，loading 占位需要补回默认 padding，
  // 否则骨架屏会贴到边缘。这里对齐 body 的默认 padding（token.paddingLG）。
  const loadingDOM = React.isValidElement(loading) ? (
    loading
  ) : (
    <Loading
      prefix={prefixCls}
      style={
        bodyStylePadding === 0 || bodyStylePadding === '0px'
          ? { padding: token.paddingLG }
          : undefined
      }
    />
  );
  const handleCollapsibleIconClick = useCallback(() => {
    if (collapsible === 'icon') setCollapsed((prev) => !prev);
  }, [collapsible, setCollapsed]);

  const collapsibleButton =
    collapsible &&
    (collapsibleIconRender ? (
      <span
        role="button"
        tabIndex={collapsible === 'icon' ? 0 : undefined}
        className={clsx(`${prefixCls}-collapsible-icon`, hashId)}
        onClick={
          collapsible === 'icon' ? handleCollapsibleIconClick : undefined
        }
        onKeyDown={
          collapsible === 'icon'
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCollapsibleIconClick();
                }
              }
            : undefined
        }
      >
        {collapsibleIconRender({ collapsed })}
      </span>
    ) : (
      <RightOutlined
        onClick={handleCollapsibleIconClick}
        rotate={!collapsed ? 90 : undefined}
        className={clsx(`${prefixCls}-collapsible-icon`, hashId)}
      />
    ));

  const headerCls = clsx(`${prefixCls}-header`, hashId, classNames?.header, {
    [`${prefixCls}-header-border`]: headerBordered || type === 'inner',
    [`${prefixCls}-header-collapsible`]: collapsibleButton,
  });

  const titleCls = clsx(`${prefixCls}-title`, hashId, classNames?.title);
  const extraCls = clsx(`${prefixCls}-extra`, hashId, classNames?.extra);

  const rootStyle = { ...mergedStyles.root, ...style };
  const headerCollapsible =
    collapsible === true || collapsible === 'header';

  // tabs 继续走 Pro API + antd Tabs，不迁到 Card.tabList
  const tabsNode = tabs ? (
    <Tabs
      onChange={tabs.onChange}
      {...omit(tabs, ['cardProps'])}
      items={ModifyTabItemsContent}
      className={clsx(`${prefixCls}-tabs`, hashId, {
        // #9052：ghost 时去掉 tab 内容区 padding
        [`${prefixCls}-tabs-ghost`]: tabs.cardProps?.ghost,
      })}
    />
  ) : null;

  // 可折叠内容区高度过渡（motion token）。
  // - 仅 collapsible 时做高度动画
  // - collapsed 仍可单独生效（无 collapsible 时直接显隐，兼容旧用法）
  // - 嵌套布局壳不做高度动画：body flex 依赖直接子节点
  const wrapCollapsePanel = (content: React.ReactNode) => {
    if (!collapsible) {
      return collapsed ? null : content;
    }
    if (isLayoutShell) {
      return collapsed ? null : content;
    }
    return (
      <div
        className={clsx(`${prefixCls}-collapse-panel`, hashId, {
          [`${prefixCls}-collapse-panel-active`]: !collapsed,
          [`${prefixCls}-collapse-panel-resting`]:
            !collapsed && collapseRestingOpen,
        })}
        aria-hidden={collapsed}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.propertyName !== 'grid-template-rows') return;
          if (!collapsed) {
            setCollapseRestingOpen(true);
          }
        }}
      >
        <div
          className={clsx(`${prefixCls}-collapse-panel-content`, hashId, {
            // 可折叠时 body 自身 padding 置 0，内边距挪到 panel 内随高度一起动
            [`${prefixCls}-collapse-panel-content-padded`]: !tabs,
          })}
        >
          {content}
        </div>
      </div>
    );
  };

  if (useAntdCard) {
    const antdTitle =
      title || collapsibleButton ? (
        <>
          {collapsibleButton}
          {title ? (
            <LabelIconTip
              label={title}
              tooltip={tooltip}
              subTitle={subTitle}
            />
          ) : null}
        </>
      ) : undefined;

    const antdBodyContent = tabs
      ? loading
        ? loadingDOM
        : tabsNode
      : childrenModified;

    return wrapSSR(
      <AntdCard
        {...omit(rest, ['prefixCls', 'colSpan'])}
        ref={ref}
        className={cardCls}
        style={rootStyle}
        styles={{
          header: {
            ...mergedStyles.header,
            // Pro 默认无 header 底边；仅 headerBordered / inner 保留
            ...(!headerBordered && type !== 'inner'
              ? { borderBottom: 'none' }
              : null),
            ...(headerCollapsible ? { cursor: 'pointer' } : null),
          },
          // tabs / 布局壳 / 可折叠：body padding 置 0（可折叠由 panel-content 承担内边距）
          body: {
            ...mergedStyles.body,
            ...(tabs || isLayoutShell || collapsible ? { padding: 0 } : null),
          },
          extra: mergedStyles.extra,
          title: mergedStyles.title,
          actions: mergedStyles.actions,
          cover: mergedStyles.cover,
        }}
        classNames={{
          header: clsx(
            `${prefixCls}-header`,
            hashId,
            classNames?.header,
            {
              [`${prefixCls}-header-border`]:
                headerBordered || type === 'inner',
              [`${prefixCls}-header-collapsible`]: headerCollapsible,
            },
          ),
          body: bodyCls,
          extra: extraCls,
          title: titleCls,
          actions: clsx(`${prefixCls}-actions`, hashId, classNames?.actions),
          cover: clsx(`${prefixCls}-cover`, hashId, classNames?.cover),
        }}
        title={antdTitle}
        extra={extra}
        // 折叠时一并隐藏 cover / actions，与 legacy 路径保持一致
        cover={collapsed ? undefined : cover}
        actions={
          collapsed ? undefined : (actions as React.ReactNode[] | undefined)
        }
        // tabs 使用自定义 Loading，避免与 antd Card skeleton 冲突
        loading={!collapsed && Boolean(loading) && !tabs}
        hoverable={hoverable}
        size={antdCardSize}
        type={type === 'default' ? undefined : type}
        variant={variant}
        onClick={(event) => {
          if (
            event.target instanceof Element &&
            event.target.closest(`.${prefixCls}-extra`)
          ) {
            event.stopPropagation();
            return;
          }
          if (
            headerCollapsible &&
            event.target instanceof Element &&
            event.target.closest(`.${prefixCls}-header`)
          ) {
            // 受控折叠与 legacy 一致：基于当前渲染值取反
            setCollapsed(!collapsed);
          }
          rest.onClick?.(event);
        }}
      >
        {wrapCollapsePanel(antdBodyContent)}
      </AntdCard>,
    );
  }

  return wrapSSR(
    <div
      className={cardCls}
      style={rootStyle}
      ref={ref}
      onClick={(e) => {
        onChecked?.(e);
        rest?.onClick?.(e);
      }}
      {...omit(rest, ['prefixCls', 'colSpan'])}
    >
      {(title || extra || collapsibleButton) && (
        <div
          className={headerCls}
          style={mergedStyles.header}
          onClick={() => {
            if (collapsible === 'header' || collapsible === true)
              setCollapsed(!collapsed);
          }}
        >
          <div className={titleCls} style={mergedStyles.title}>
            {collapsibleButton}
            <LabelIconTip label={title} tooltip={tooltip} subTitle={subTitle} />
          </div>
          {extra && (
            <div
              className={extraCls}
              style={mergedStyles.extra}
              onClick={(e) => e.stopPropagation()}
            >
              {extra}
            </div>
          )}
        </div>
      )}
      {cover && !collapsed && (
        <div
          className={clsx(`${prefixCls}-cover`, hashId, classNames?.cover)}
          style={mergedStyles.cover}
        >
          {cover}
        </div>
      )}
      {tabs ? (
        loading ? (
          <div className={bodyCls} style={mergedStyles.body}>
            {wrapCollapsePanel(loadingDOM)}
          </div>
        ) : (
          wrapCollapsePanel(tabsNode)
        )
      ) : (
        <div className={bodyCls} style={mergedStyles.body}>
          {/* panel 放在 body 内，避免打断 legacy `> body` 样式 */}
          {wrapCollapsePanel(loading ? loadingDOM : childrenModified)}
        </div>
      )}
      {actions && !collapsed ? (
        <Actions
          actions={actions}
          prefixCls={prefixCls}
          className={classNames?.actions}
          style={mergedStyles.actions}
        />
      ) : null}
    </div>,
  );
});

export default Card;
