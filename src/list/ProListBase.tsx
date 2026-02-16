/**
 * 内部 List 容器与 List.Item / List.Item.Meta 实现，用于替代 antd List（antd List 已停止维护）
 * 保持与 antd List 相同的 DOM 结构及类名，以便复用 antd 的 list 样式
 */
import { ConfigProvider, Empty, Grid, Pagination } from 'antd';
import type { PaginationConfig } from 'antd/lib/pagination';
import { clsx } from 'clsx';
import React, { useContext, useMemo } from 'react';

export type ColumnCount = number;
export type ColumnType =
  | 'gutter'
  | 'column'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl';
export interface ListGridType {
  gutter?: number | [number, number];
  column?: ColumnCount;
  xs?: ColumnCount;
  sm?: ColumnCount;
  md?: ColumnCount;
  lg?: ColumnCount;
  xl?: ColumnCount;
  xxl?: ColumnCount;
}
export type ListSize = 'small' | 'default' | 'large';
export type ListItemLayout = 'horizontal' | 'vertical';
export interface ListLocale {
  emptyText?: React.ReactNode;
}
export interface ListProps<T = any> {
  variant?: 'outlined' | 'borderless' | 'filled';
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  dataSource?: T[];
  extra?: React.ReactNode;
  grid?: ListGridType;
  id?: string;
  itemLayout?: ListItemLayout;
  loading?: boolean | { spinning?: boolean };
  loadMore?: React.ReactNode;
  pagination?: PaginationConfig | false;
  prefixCls?: string;
  rowKey?: ((item: T) => React.Key) | keyof T;
  renderItem?: (
    item: T,
    index: number,
    defaultDom: JSX.Element | null,
  ) => React.ReactNode;
  size?: ListSize;
  split?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  locale?: ListLocale;
  hashId?: string;
}

export const ProListContext = React.createContext<{
  grid?: ListGridType;
  itemLayout?: ListItemLayout;
}>({});

export interface ListItemMetaProps {
  avatar?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  description?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
}

export const ProListItemMeta: React.FC<ListItemMetaProps> = ({
  prefixCls: customizePrefixCls,
  className,
  avatar,
  title,
  description,
  ...rest
}) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-list', customizePrefixCls);
  const classString = clsx(`${prefixCls}-item-meta`, className);
  const content =
    title || description ? (
      <div className={`${prefixCls}-item-meta-content`}>
        {title && <h4 className={`${prefixCls}-item-meta-title`}>{title}</h4>}
        {description && (
          <div className={`${prefixCls}-item-meta-description`}>
            {description}
          </div>
        )}
      </div>
    ) : null;
  return (
    <div {...rest} className={classString}>
      {avatar && (
        <div className={`${prefixCls}-item-meta-avatar`}>{avatar}</div>
      )}
      {content}
    </div>
  );
};

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  actions?: React.ReactNode[];
  colStyle?: React.CSSProperties;
}

const InternalProListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (props, ref) => {
    const {
      prefixCls: customizePrefixCls,
      children,
      actions,
      extra,
      className,
      colStyle,
      ...rest
    } = props;
    const { grid, itemLayout } = useContext(ProListContext);
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixCls = getPrefixCls('pro-list', customizePrefixCls);

    const actionsContent =
      actions && actions.length > 0 ? (
        <div
          key="actions"
          className={`${prefixCls}-item-action`}
          onClick={(e) => e.stopPropagation()}
        >
          {actions.map((action, i) => (
            <div key={i} className={`${prefixCls}-item-action-item`}>
              {action}
            </div>
          ))}
        </div>
      ) : null;

    const itemChildren = (
      <div
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={clsx(`${prefixCls}-item`, className)}
      >
        {itemLayout === 'vertical' && extra ? (
          <>
            <div className={`${prefixCls}-item-main`} key="content">
              {children}
              {actionsContent}
            </div>
            <div className={`${prefixCls}-item-extra`} key="extra">
              {extra}
            </div>
          </>
        ) : (
          <>
            {children}
            {actionsContent}
            {extra != null && (
              <React.Fragment key="extra">{extra}</React.Fragment>
            )}
          </>
        )}
      </div>
    );

    if (grid) {
      return (
        <div ref={ref} style={{ width: '100%', ...colStyle }}>
          {itemChildren}
        </div>
      );
    }
    return itemChildren as React.ReactElement;
  },
);
InternalProListItem.displayName = 'ProListItem';

export const ProListItem = InternalProListItem as typeof InternalProListItem & {
  Meta: typeof ProListItemMeta;
};
ProListItem.Meta = ProListItemMeta;

function getRowKey<T>(
  item: T,
  index: number,
  rowKey?: ListProps<T>['rowKey'],
): React.Key {
  if (typeof rowKey === 'function') {
    return rowKey(item);
  }
  if (rowKey && typeof item === 'object' && item !== null && rowKey in item) {
    return (item as Record<string, unknown>)[rowKey as string] as React.Key;
  }
  if (typeof item === 'object' && item !== null && 'key' in item) {
    return (item as { key?: React.Key }).key as React.Key;
  }
  return `list-item-${index}`;
}

const defaultPaginationProps = {
  current: 1,
  total: 0,
  position: 'bottom' as const,
};

const ProListContainerInner = React.forwardRef<HTMLDivElement, ListProps<any>>(
  function ProListContainerInner(props, ref) {
    const {
      pagination = false,
      prefixCls: customizePrefixCls,
      variant = 'borderless',
      split = true,
      className,
      rootClassName,
      style,
      children,
      itemLayout,
      loadMore,
      grid,
      dataSource = [],
      size: customizeSize = 'default',
      header,
      footer,
      loading = false,
      rowKey,
      renderItem,
      locale,
      hashId: propHashId,
      ...rest
    } = props;

    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixCls = getPrefixCls('pro-list', customizePrefixCls);

    const paginationObj =
      pagination && typeof pagination === 'object' ? pagination : {};
    const [paginationCurrent, setPaginationCurrent] = React.useState(
      paginationObj.defaultCurrent ?? 1,
    );
    const [paginationSize, setPaginationSize] = React.useState(
      paginationObj.defaultPageSize ?? 10,
    );

    const sizeCls =
      customizeSize === 'large' ? 'lg' : customizeSize === 'small' ? 'sm' : '';
    const isSomethingAfterLastItem = !!(loadMore || pagination || footer);

    const paginationProps = useMemo(
      () => ({
        ...defaultPaginationProps,
        total: dataSource.length,
        current: paginationCurrent,
        pageSize: paginationSize,
        ...(pagination && typeof pagination === 'object' ? pagination : {}),
      }),
      [dataSource.length, pagination, paginationCurrent, paginationSize],
    );
    const largestPage = Math.ceil(
      paginationProps.total / (paginationProps.pageSize || 10),
    );
    const currentPage = Math.min(
      paginationProps.current ?? 1,
      Math.max(1, largestPage),
    );

    const splitDataSource = useMemo(() => {
      if (!pagination || !dataSource.length) {
        return dataSource;
      }
      const pageSize = paginationProps.pageSize ?? 10;
      const total = paginationProps.total ?? 0;
      // 父组件已分页（如 ListView 传入 pageData）时不再二次 slice
      if (
        total > 0 &&
        dataSource.length <= pageSize &&
        total > dataSource.length
      ) {
        return dataSource;
      }
      const start = (currentPage - 1) * pageSize;
      return dataSource.slice(start, start + pageSize);
    }, [
      dataSource,
      pagination,
      currentPage,
      paginationProps.pageSize,
      paginationProps.total,
    ]);

    const renderInternalItem = (item: any, index: number) => {
      if (!renderItem) return null;
      const key = getRowKey(item, index, rowKey);
      return (
        <React.Fragment key={key}>
          {renderItem(item, index, null)}
        </React.Fragment>
      );
    };

    const rawScreens = Grid.useBreakpoint();
    const defaultScreens = {
      xs: true,
      sm: true,
      md: true,
      lg: false,
      xl: false,
      xxl: false,
    } as const;
    const screens = useMemo(() => {
      if (rawScreens == null) return defaultScreens;
      return {
        xxl: rawScreens.xxl ?? defaultScreens.xxl,
        xl: rawScreens.xl ?? defaultScreens.xl,
        lg: rawScreens.lg ?? defaultScreens.lg,
        md: rawScreens.md ?? defaultScreens.md,
        sm: rawScreens.sm ?? defaultScreens.sm,
        xs: rawScreens.xs ?? defaultScreens.xs,
      };
    }, [rawScreens]);

    /**
     * 根据当前断点获取列数，与 antd Grid/Card 响应式逻辑一致
     */
    const getResponsiveColumn = useMemo((): number => {
      if (!grid) return 1;

      const responsiveArray: Array<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'> = [
        'xxl',
        'xl',
        'lg',
        'md',
        'sm',
        'xs',
      ];

      for (let i = 0; i < responsiveArray.length; i += 1) {
        const breakpoint = responsiveArray[i];
        if (screens[breakpoint] && grid[breakpoint] !== undefined) {
          return grid[breakpoint] as number;
        }
      }

      return (grid.column as number) || 1;
    }, [grid, screens]);

    /**
     * 计算 grid 容器样式（flex 布局）
     */
    const gridContainerStyle = useMemo(() => {
      if (!grid) return undefined;

      const style: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
      };

      // 处理 gutter
      if (grid.gutter) {
        const [horizontal, vertical] = Array.isArray(grid.gutter)
          ? grid.gutter
          : [grid.gutter, 0];
        const h = Number(horizontal) || 0;
        const v = Number(vertical) || 0;

        // flex 容器使用负 margin 来抵消子元素的 padding
        style.marginLeft = -h / 2;
        style.marginRight = -h / 2;
        style.marginTop = -v / 2;
        style.marginBottom = -v / 2;
      }

      return style;
    }, [grid?.gutter]);

    /**
     * 计算每个 item 的样式（flex 子项）
     */
    const colStyle = useMemo(() => {
      if (!grid) return undefined;

      const { gutter } = grid;
      const column = getResponsiveColumn;

      const style: React.CSSProperties = {
        display: 'flex',
      };

      // 处理 gutter
      if (gutter) {
        const [horizontal, vertical] = Array.isArray(gutter)
          ? gutter
          : [gutter, 0];
        const h = Number(horizontal) || 0;
        const v = Number(vertical) || 0;

        style.paddingLeft = h / 2;
        style.paddingRight = h / 2;
        style.paddingTop = v / 2;
        style.paddingBottom = v / 2;
      }

      // 计算每列的宽度（确保 column 有效，避免除以零）
      if (column > 0) {
        // 使用 flex-basis 和 max-width 确保准确的宽度
        const percentage = 100 / column;
        style.flexBasis = `${percentage}%`;
        style.maxWidth = `${percentage}%`;
      }

      return style;
    }, [grid?.gutter, getResponsiveColumn]);

    const { renderEmpty } = useContext(ConfigProvider.ConfigContext);
    let childrenContent: React.ReactNode;
    const isLoading =
      typeof loading === 'boolean' ? loading : !!loading?.spinning;

    if (splitDataSource.length > 0) {
      const items = splitDataSource.map((item, idx) =>
        renderInternalItem(item, idx),
      );
      childrenContent = grid ? (
        <div style={gridContainerStyle}>
          {items.map((child, idx) => (
            <div key={child?.key ?? idx} style={colStyle}>
              {child}
            </div>
          ))}
        </div>
      ) : (
        items
      );
    } else if (!children && !isLoading) {
      const emptyContent = locale?.emptyText ??
        (typeof renderEmpty === 'function' ? renderEmpty('List') : null) ?? (
          <Empty description="暂无数据" />
        );
      childrenContent = (
        <div className={`${prefixCls}-empty-text`}>{emptyContent}</div>
      );
    } else if (isLoading) {
      childrenContent = <div style={{ minHeight: 53 }} />;
    } else {
      childrenContent = children;
    }

    const paginationPosition = paginationProps.position ?? 'bottom';
    const showPaginationTop =
      pagination &&
      (paginationPosition === 'top' || paginationPosition === 'both');
    const showPaginationBottom =
      pagination &&
      (paginationPosition === 'bottom' || paginationPosition === 'both');

    const paginationNode = pagination && (
      <div className={`${prefixCls}-pagination`}>
        <Pagination
          align="end"
          {...paginationProps}
          current={currentPage}
          onChange={(page, pageSize) => {
            setPaginationCurrent(page);
            setPaginationSize(pageSize ?? 10);
            pagination?.onChange?.(page, pageSize ?? 10);
          }}
          onShowSizeChange={(current, size) => {
            setPaginationCurrent(current);
            setPaginationSize(size);
            pagination?.onShowSizeChange?.(current, size);
          }}
        />
      </div>
    );

    const contextValue = useMemo(
      () => ({ grid, itemLayout }),
      [JSON.stringify(grid), itemLayout],
    );

    const classString = clsx(
      prefixCls,
      {
        [`${prefixCls}-vertical`]: itemLayout === 'vertical',
        [`${prefixCls}-${sizeCls}`]: sizeCls,
        [`${prefixCls}-split`]: split,
        [`${prefixCls}-${variant}`]: variant,
        [`${prefixCls}-loading`]: isLoading,
        [`${prefixCls}-grid`]: !!grid,
        [`${prefixCls}-something-after-last-item`]: isSomethingAfterLastItem,
      },
      propHashId,
      className,
      rootClassName,
    );

    return (
      <ProListContext.Provider value={contextValue}>
        <div ref={ref} style={style} className={classString} {...rest}>
          {showPaginationTop && paginationNode}
          {header && <div className={`${prefixCls}-header`}>{header}</div>}
          {childrenContent}
          {children}
          {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
          {loadMore}
          {showPaginationBottom && paginationNode}
        </div>
      </ProListContext.Provider>
    );
  },
) as <T>(
  props: ListProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

(
  ProListContainerInner as React.FC<unknown> & { displayName?: string }
).displayName = 'ProListContainer';

export const ProListContainer = ProListContainerInner;
