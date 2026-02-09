/**
 * 内部 List 容器与 List.Item / List.Item.Meta 实现，用于替代 antd List（antd List 已停止维护）
 * 保持与 antd List 相同的 DOM 结构及类名，以便复用 antd 的 list 样式
 */
import { ConfigProvider, Empty, Pagination } from 'antd';
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
  bordered?: boolean;
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

    const Element = grid ? 'div' : 'li';
    const itemChildren = (
      <Element
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
      </Element>
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
      bordered = false,
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

    const gridStyle = useMemo(() => {
      if (!grid?.column) return undefined;

      const style: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${grid.column}, 1fr)`,
      };

      // 处理 gutter：使用 grid gap 属性
      if (grid.gutter) {
        const gutter = grid.gutter;
        const [horizontal, vertical] = Array.isArray(gutter)
          ? gutter
          : [gutter, gutter];
        const h = Number(horizontal) || 0;
        const v = Number(vertical) || 0;

        style.columnGap = h;
        style.rowGap = v;
      }

      return style;
    }, [grid?.column, grid?.gutter]);

    const { renderEmpty } = useContext(ConfigProvider.ConfigContext);
    let childrenContent: React.ReactNode;
    const isLoading =
      typeof loading === 'boolean' ? loading : !!loading?.spinning;

    if (splitDataSource.length > 0) {
      const items = splitDataSource.map((item, idx) =>
        renderInternalItem(item, idx),
      );
      childrenContent = grid ? (
        <div style={gridStyle}>{items}</div>
      ) : (
        <ul className={`${prefixCls}-items`}>{items}</ul>
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
        [`${prefixCls}-bordered`]: bordered,
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
