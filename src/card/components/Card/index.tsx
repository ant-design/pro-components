import { RightOutlined } from '@ant-design/icons';
import { omit, useControlledState } from '@rc-component/util';
import { Card as AntdCard, ConfigProvider, Grid, Tabs } from 'antd';
import { clsx } from 'clsx';
import React, { useCallback, useContext } from 'react';
import { proTheme } from '../../../provider';
import { LabelIconTip, useRefFunction } from '../../../utils';
import type { Breakpoint, CardProps, Gutter } from '../../typing';
import Actions from '../Actions';
import Loading from '../Loading';
import useStyle from './style';

const { useBreakpoint } = Grid;

/**
 * 对齐 antd Card → useVariant('card', variant) 的合并顺序：
 * props > card.variant > 全局 variant > outlined
 * （不含 Form VariantContext；antd 路径会再交给 AntdCard 处理完整语义）
 */
const resolveCardVariant = (
  customVariant: CardProps['variant'],
  cardVariant: CardProps['variant'] | undefined,
  globalVariant: string | undefined,
) => {
  if (customVariant !== undefined) {
    return customVariant;
  }
  if (cardVariant !== undefined) {
    return cardVariant;
  }
  if (globalVariant === 'borderless' || globalVariant === 'outlined') {
    return globalVariant;
  }
  return 'outlined';
};

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

  const mergedStyles = {
    header: styles?.header,
    body: styles?.body,
    root: styles?.root,
    extra: styles?.extra,
    title: styles?.title,
    actions: styles?.actions,
    cover: styles?.cover,
  };
  const {
    getPrefixCls,
    card: cardConfig,
    variant: configVariant,
  } = useContext(ConfigProvider.ConfigContext);
  // legacy 边框对齐 antd useVariant；antd 路径仍透传 customVariant 给 AntdCard
  const mergedVariant = resolveCardVariant(
    customVariant,
    cardConfig?.variant,
    configVariant,
  );
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

  // antd 路径：variant 透传，ConfigProvider 交给 AntdCard / useVariant。
  // legacy：边框 class 用与 antd 相同的 mergedVariant（!== borderless 即有边）。
  const cardCls = clsx(
    `${prefixCls}`,
    className,
    rootClassName,
    hashId,
    classNames?.root,
    {
      // 主路径依赖 ant-card；仅 legacy 打标供样式选择
      [`${prefixCls}-legacy`]: !useAntdCard,
      [`${prefixCls}-border`]: !useAntdCard && mergedVariant !== 'borderless',
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

  // 无底边 header 的紧凑留白：对齐 legacy 的 paddingBlock 取值（small 用 paddingXS）
  const headerBlockPadding =
    size === 'small' ? token.paddingXS : token.padding;

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

  // collapsed：收起；collapsible：可交互。布局壳用 display 显隐，保留子树状态。
  // 内容区不做高度动画，与最初行为一致（CSS 直接藏 body / shell）。
  const wrapCollapseContent = (content: React.ReactNode) => {
    if (isLayoutShell) {
      return (
        <div
          className={clsx(`${prefixCls}-collapse-shell`, hashId, {
            [`${prefixCls}-collapse-shell-collapsed`]: collapsed,
          })}
          aria-hidden={collapsed}
        >
          {content}
        </div>
      );
    }

    // 无 collapsible 时：collapsed 只收起普通 body；tabs 仍渲染（与历史 DOM 一致）
    if (!collapsible) {
      if (collapsed && !tabs) {
        return null;
      }
      return content;
    }

    return content;
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
            // Pro 默认无 header 底边；仅 headerBordered / inner 保留 antd 皮肤。
            // 无底边时须同步压缩垂直留白：antd head 靠 minHeight 撑高（标题上下各约
            // 一个 padding），去掉边框后这段空隙会与 body 的 paddingBlockStart 叠加，
            // 导致 title 与内容距离过大。对齐 legacy 布局：header 底部不留空。
            ...(!headerBordered && type !== 'inner'
              ? {
                  borderBottom: 'none',
                  minHeight: 'auto',
                  paddingBlockStart: headerBlockPadding,
                  // 收起后 body 不可见，补回底部 padding 避免标题贴底（对齐 legacy collapse 规则）
                  paddingBlockEnd: collapsed ? headerBlockPadding : 0,
                }
              : null),
            ...(headerCollapsible ? { cursor: 'pointer' } : null),
          },
          // tabs / 布局壳：body 去 padding；折叠用 CSS 显隐，不再挪 padding
          body: {
            ...mergedStyles.body,
            ...(tabs || isLayoutShell ? { padding: 0 } : null),
            // antd 路径：仅 collapsed 且无 tabs 时藏空 body（tabs 在 body 内需可见）
            ...(collapsed && !collapsible && !tabs
              ? { display: 'none' }
              : null),
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
        // 折叠时隐藏 cover / actions（两路径一致）
        cover={collapsed ? undefined : cover}
        actions={
          collapsed ? undefined : (actions as React.ReactNode[] | undefined)
        }
        // tabs 用自定义 Loading，避免与 antd Card skeleton 叠用
        loading={!collapsed && Boolean(loading) && !tabs}
        hoverable={hoverable}
        size={antdCardSize}
        type={type === 'default' ? undefined : type}
        variant={customVariant}
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
            event.target instanceof Element
          ) {
            const header = event.target.closest(`.${prefixCls}-header`);
            // 仅响应本卡 header，忽略嵌套 ProCard 的 header 冒泡
            if (
              header &&
              header.closest(`.${prefixCls}`) === event.currentTarget
            ) {
              setCollapsed(!collapsed);
            }
          }
          rest.onClick?.(event);
        }}
      >
        {wrapCollapseContent(antdBodyContent)}
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
            {wrapCollapseContent(loadingDOM)}
          </div>
        ) : (
          wrapCollapseContent(tabsNode)
        )
      ) : (
        <div className={bodyCls} style={mergedStyles.body}>
          {wrapCollapseContent(loading ? loadingDOM : childrenModified)}
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
