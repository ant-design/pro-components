import { RightOutlined } from '@ant-design/icons';
import { useControlledState } from '@rc-component/util';
import { ConfigProvider, Skeleton } from 'antd';
import type { ExpandableConfig } from 'antd/lib/table/interface';
import { clsx } from 'clsx';
import React, { useCallback, useContext, useMemo } from 'react';
import type { CheckCardProps } from '../card';
import { CheckCard } from '../card';
import { ProProvider } from '../provider';
import type { GetComponentProps } from './index';
import type { ListGridType } from './ProListBase';
import {
  ProListItem as BaseListItem,
  ProListItemMeta as BaseListItemMeta,
} from './ProListBase';

export type RenderExpandIconProps<RecordType> = {
  prefixCls: string;
  expanded: boolean;
  expandIcon:
    | React.ReactNode
    | JSX.Element
    | ((props: {
        onExpand: (expanded: boolean) => void;
        expanded: boolean;
        record: RecordType;
      }) => React.ReactNode);
  onExpand: (expanded: boolean) => void;
  record: RecordType;
  hashId: string;
};

export function renderExpandIcon<RecordType>({
  prefixCls,
  expandIcon = <RightOutlined />,
  onExpand,
  expanded,
  record,
  hashId,
}: RenderExpandIconProps<RecordType>) {
  let icon = expandIcon as React.ReactNode;
  const expandClassName = `${prefixCls}-item-expand-icon`;

  const onClick: React.MouseEventHandler<HTMLElement> = (event) => {
    onExpand(!expanded);
    event.stopPropagation();
  };

  if (typeof expandIcon === 'function') {
    icon = expandIcon({ expanded, onExpand, record });
  }

  return (
    <span
      className={clsx(expandClassName, hashId, {
        [`${prefixCls}-item-expanded`]: expanded,
        [`${prefixCls}-item-collapsed`]: !expanded,
      })}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}

export type ItemProps<RecordType> = {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  checkbox?: React.ReactNode;
  className?: string;
  prefixCls?: string;
  item?: any;
  subheader?: {
    title: React.ReactNode;
    actions: React.ReactNode[];
  };
  index: number;
  selected?: boolean;
  avatar?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode[];
  extra?: React.ReactNode;
  description?: React.ReactNode;
  loading?: boolean;
  style?: React.CSSProperties;
  grid?: ListGridType;
  expand?: boolean;
  rowSupportExpand?: boolean;
  onExpand?: (expand: boolean) => void;
  expandable?: ExpandableConfig<any>;
  type?: 'new' | 'top' | 'inline' | 'subheader';
  isEditable: boolean;
  recordKey: string | number | undefined;
  cardProps?: CheckCardProps;
  record: RecordType;
  onRow?: GetComponentProps<RecordType>;
  onItem?: GetComponentProps<RecordType>;
  itemHeaderRender?:
    | ((
        item: RecordType,
        index: number,
        defaultDom: JSX.Element | null,
      ) => React.ReactNode)
    | false;
  itemTitleRender?:
    | ((
        item: RecordType,
        index: number,
        defaultDom: JSX.Element | null,
      ) => React.ReactNode)
    | false;
};

function ProListItem<RecordType>(props: ItemProps<RecordType>) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { hashId } = useContext(ProProvider);
  const prefixCls = getPrefixCls('pro-list', props.prefixCls);
  const defaultClassName = `${prefixCls}-item`;

  const {
    title,
    subTitle,
    content,
    itemTitleRender,
    prefixCls: _prefixCls, // eslint-disable-line @typescript-eslint/no-unused-vars
    actions,
    item: _item, // eslint-disable-line @typescript-eslint/no-unused-vars
    recordKey: _recordKey, // eslint-disable-line @typescript-eslint/no-unused-vars
    avatar,
    cardProps,
    description,
    isEditable,
    checkbox,
    index,
    selected,
    loading,
    expand: propsExpand,
    onExpand: propsOnExpand,
    expandable: expandableConfig,
    rowSupportExpand,
    type,
    style,
    className: propsClassName = defaultClassName,
    record,
    onRow,
    onItem,
    itemHeaderRender,
    extra,
    ...rest
  } = props;

  const {
    expandedRowRender,
    expandIcon,
    expandRowByClick,
    indentSize = 8,
    expandedRowClassName,
  } = expandableConfig || {};

  const [expanded, onExpandInner] = useControlledState<boolean>(
    !!propsExpand,
    propsExpand,
  );
  const onExpand = useCallback(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      onExpandInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: boolean) => boolean)(prev)
            : updater;
        propsOnExpand?.(next);
        return next;
      });
    },
    [propsOnExpand],
  );

  const className = clsx(
    {
      [`${defaultClassName}-selected`]: !cardProps && selected,
      [`${defaultClassName}-type-${type}`]: !!type,
      [`${defaultClassName}-editable`]: isEditable,
    },
    hashId,
    defaultClassName,
  );

  const needExpanded =
    expanded || Object.values(expandableConfig || {}).length === 0;
  const expandedRowDom =
    expandedRowRender && expandedRowRender(record, index, indentSize, expanded);

  const actionsArray = useMemo(
    () => (actions ? React.Children.toArray(actions) : undefined),
    [actions],
  );

  const titleDom =
    title || subTitle ? (
      <div className={clsx(`${defaultClassName}-header-container`, hashId)}>
        {title && (
          <div
            className={clsx(`${defaultClassName}-title`, hashId, {
              [`${defaultClassName}-title-editable`]: isEditable,
            })}
          >
            {title}
          </div>
        )}
        {subTitle && (
          <div
            className={clsx(`${defaultClassName}-subTitle`, hashId, {
              [`${defaultClassName}-subTitle-editable`]: isEditable,
            })}
          >
            {subTitle}
          </div>
        )}
      </div>
    ) : null;

  const metaTitle =
    (itemTitleRender && itemTitleRender?.(record, index, titleDom)) ?? titleDom;
  const metaDom =
    metaTitle || avatar || subTitle || description ? (
      <BaseListItemMeta
        avatar={avatar}
        title={metaTitle}
        description={
          description &&
          needExpanded && (
            <div className={clsx(`${className}-description`, hashId)}>
              {description}
            </div>
          )
        }
      />
    ) : null;

  const itemProps = onItem?.(record, index);
  const hasExpandableConfig = Object.keys(expandableConfig || {}).length > 0;

  const expandedRowClassStr =
    typeof expandedRowClassName === 'function'
      ? expandedRowClassName(record, index, indentSize)
      : expandedRowClassName;

  const headerDom =
    typeof itemHeaderRender === 'function'
      ? itemHeaderRender(record, index, metaDom)
      : metaDom;

  // 卡片模式渲染
  if (cardProps) {
    const cardTitleDom =
      avatar || title ? (
        <>
          {avatar}
          <span className={clsx(`${prefixCls}-item-meta-title`, hashId)}>
            {title}
          </span>
        </>
      ) : null;

    return (
      <div
        className={clsx(hashId, `${className}-card-container`, {
          [propsClassName]: propsClassName !== defaultClassName,
        })}
        style={style}
      >
        <CheckCard
          bordered
          style={{ width: '100%' }}
          className={clsx(`${defaultClassName}-card`, hashId)}
          {...cardProps}
          title={cardTitleDom}
          subTitle={subTitle}
          extra={actionsArray}
          bodyStyle={{ padding: 24, ...cardProps.bodyStyle }}
          {...(itemProps as CheckCardProps)}
          onClick={(e) => {
            cardProps?.onClick?.(e);
            itemProps?.onClick?.(e as any);
          }}
        >
          <Skeleton avatar title={false} loading={loading} active>
            <div className={clsx(`${className}-header`, hashId)}>
              {typeof itemTitleRender === 'function' &&
                itemTitleRender(record, index, titleDom)}
              {content}
            </div>
          </Skeleton>
        </CheckCard>
      </div>
    );
  }

  // 列表模式渲染
  const rowClassName = clsx(hashId, {
    [`${defaultClassName}-has-checkbox`]: checkbox,
    [`${defaultClassName}-has-avatar`]: avatar,
    [className]: className,
  });

  return (
    <BaseListItem
      className={clsx(rowClassName, hashId, {
        [propsClassName]: propsClassName !== defaultClassName,
      })}
      {...rest}
      extra={extra}
      {...onRow?.(record, index)}
      {...itemProps}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        onRow?.(record, index)?.onClick?.(e);
        onItem?.(record, index)?.onClick?.(e);
        if (expandRowByClick) {
          onExpand(!expanded);
        }
      }}
    >
      <Skeleton avatar title={false} loading={loading} active>
        <div className={clsx(`${className}-header`, hashId)}>
          <div className={clsx(`${className}-header-option`, hashId)}>
            {!!checkbox && (
              <div className={clsx(`${className}-checkbox`, hashId)}>
                {checkbox}
              </div>
            )}
            {hasExpandableConfig &&
              rowSupportExpand &&
              renderExpandIcon({
                prefixCls,
                hashId,
                expandIcon,
                onExpand,
                expanded,
                record,
              } as RenderExpandIconProps<RecordType>)}
          </div>
          {headerDom}
          {actionsArray}
        </div>
        {needExpanded && (content || expandedRowDom) && (
          <div className={clsx(`${className}-content`, hashId)}>
            {content}
            {expandedRowRender && rowSupportExpand && (
              <div className={expandedRowClassStr}>{expandedRowDom}</div>
            )}
          </div>
        )}
      </Skeleton>
    </BaseListItem>
  );
}

export default ProListItem;
