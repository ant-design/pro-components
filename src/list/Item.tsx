import { RightOutlined } from '@ant-design/icons';
import { useControlledState } from '@rc-component/util';
import { ConfigProvider, Skeleton } from 'antd';
import type { ExpandableConfig } from 'antd/lib/table/interface';
import { clsx } from 'clsx';
import React, { memo, useContext, useMemo } from 'react';
import type { CheckCardProps } from '../card';
import { CheckCard } from '../card';
import { ProProvider } from '../provider';
import { useRefFunction } from '../utils';
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
    | React.JSX.Element
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
  const expandClassName = `${prefixCls}-row-expand-icon`;

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
        [`${prefixCls}-row-expanded`]: expanded,
        [`${prefixCls}-row-collapsed`]: !expanded,
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
  /** #7421: actions 渲染到 card 的哪个位置，默认 extra */
  cardActionProps?: 'actions' | 'extra';
  /** #7421: 何时展示 actions，'hover' 时鼠标悬浮列表项才显示 */
  showActions?: 'hover' | 'always';
  /** #7421: 何时展示 extra，'hover' 时鼠标悬浮列表项才显示 */
  showExtra?: 'hover' | 'always';
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
        defaultDom: React.JSX.Element | null,
      ) => React.ReactNode)
    | false;
  itemTitleRender?:
    | ((
        item: RecordType,
        index: number,
        defaultDom: React.JSX.Element | null,
      ) => React.ReactNode)
    | false;
};

function ProListItemInner<RecordType>(props: ItemProps<RecordType>) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { hashId, token } = useContext(ProProvider);
  const prefixCls = getPrefixCls('pro-list', props.prefixCls);
  const defaultClassName = `${prefixCls}-row`;

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
    cardActionProps,
    showActions,
    showExtra,
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
  const onExpand = useRefFunction(
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
  );

  const className = clsx(
    {
      [`${defaultClassName}-selected`]: !cardProps && selected,
      [`${defaultClassName}-show-action-hover`]: showActions === 'hover',
      [`${defaultClassName}-type-${type}`]: !!type,
      [`${defaultClassName}-editable`]: isEditable,
      [`${defaultClassName}-show-extra-hover`]: showExtra === 'hover',
    },
    hashId,
    defaultClassName,
  );

  const hasExpandBehavior =
    expandableConfig != null && Object.keys(expandableConfig).length > 0;
  const needExpanded = expanded || !hasExpandBehavior;
  const expandedRowDom =
    expandedRowRender && expandedRowRender(record, index, indentSize, expanded);

  const actionsArray = useMemo(
    () => (actions ? React.Children.toArray(actions) : undefined),
    [actions],
  );

  // #7421: cardActionProps 决定 actions 渲染到 card 的 extra 还是 actions 位置
  const extraDom =
    actionsArray && cardActionProps !== 'actions' ? actionsArray : undefined;
  const actionsDom =
    actionsArray && cardActionProps === 'actions' ? actionsArray : undefined;

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
            className={clsx(`${defaultClassName}-sub-title`, hashId, {
              [`${defaultClassName}-sub-title-editable`]: isEditable,
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
            <div className={clsx(`${defaultClassName}-description`, hashId)}>
              {description}
            </div>
          )
        }
      />
    ) : null;

  const itemProps = onItem?.(record, index);
  const hasExpandableConfig = hasExpandBehavior;

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
          extra={extraDom}
          actions={actionsDom}
          bodyStyle={{ padding: token.paddingLG, ...cardProps.bodyStyle }}
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
    [`${defaultClassName}-item-has-checkbox`]: checkbox,
    [`${defaultClassName}-item-has-avatar`]: avatar,
    [className]: className,
  });

  // #7421:showExtra='hover' 时增加隐藏容器；默认路径保留原始节点结构。
  const renderedExtra =
    showExtra === 'hover' && extra !== null && extra !== undefined ? (
      <div className={clsx(hashId, `${defaultClassName}-extra`)}>{extra}</div>
    ) : (
      extra
    );

  return (
    <BaseListItem
      className={clsx(rowClassName, hashId, {
        [propsClassName]: propsClassName !== defaultClassName,
      })}
      {...rest}
      actions={actionsArray}
      extra={renderedExtra}
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
          {extraDom}
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

const ProListItem = memo(ProListItemInner) as typeof ProListItemInner;

export default ProListItem;
