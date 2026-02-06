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
  cardActionProps?: 'actions' | 'extra';
  onExpand?: (expand: boolean) => void;
  expandable?: ExpandableConfig<any>;
  showActions?: 'hover' | 'always';
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
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { hashId } = useContext(ProProvider);
  const prefixCls = getPrefixCls('pro-list', customizePrefixCls);
  const defaultClassName = `${prefixCls}-row`;

  const {
    title,
    subTitle,
    content,
    itemTitleRender,
    prefixCls: restPrefixCls,
    actions,
    item,
    recordKey,
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
    showActions,
    showExtra,
    type,
    style,
    className: propsClassName = defaultClassName,
    record,
    onRow,
    onItem,
    itemHeaderRender,
    cardActionProps,
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
      [`${defaultClassName}-show-action-hover`]: showActions === 'hover',
      [`${defaultClassName}-type-${type}`]: !!type,
      [`${defaultClassName}-editable`]: isEditable,
      [`${defaultClassName}-show-extra-hover`]: showExtra === 'hover',
    },
    hashId,
    defaultClassName,
  );

  const extraClassName = clsx(hashId, {
    [`${propsClassName}-extra`]: showExtra === 'hover',
  });

  const needExpanded =
    expanded || Object.values(expandableConfig || {}).length === 0;
  const expandedRowDom =
    expandedRowRender && expandedRowRender(record, index, indentSize, expanded);

  const extraDom = useMemo(() => {
    if (!actions || cardActionProps === 'actions') {
      return undefined;
    }
    return React.Children.toArray(actions);
  }, [actions, cardActionProps]);

  const actionsDom = useMemo(() => {
    if (!actions || !cardActionProps || cardActionProps === 'extra') {
      return undefined;
    }
    return React.Children.toArray(actions);
  }, [actions, cardActionProps]);

  const titleDom =
    title || subTitle ? (
      <div className={`${defaultClassName}-header-container ${hashId}`.trim()}>
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
            <div className={`${className}-description ${hashId}`.trim()}>
              {description}
            </div>
          )
        }
      />
    ) : null;

  const rowClassName = clsx(hashId, {
    [`${defaultClassName}-item-has-checkbox`]: checkbox,
    [`${defaultClassName}-item-has-avatar`]: avatar,
    [className]: className,
  });
  const cardTitleDom = useMemo(() => {
    if (avatar || title) {
      return (
        <>
          {avatar}
          <span className={`${prefixCls}-item-meta-title ${hashId}`.trim()}>
            {title}
          </span>
        </>
      );
    }
    return null;
  }, [avatar, getPrefixCls, hashId, title]);

  const itemProps = onItem?.(record, index);
  const defaultDom = !cardProps ? (
    <BaseListItem
      className={clsx(rowClassName, hashId, {
        [propsClassName]: propsClassName !== defaultClassName,
      })}
      {...rest}
      actions={extraDom}
      extra={
        extra != null ? (
          <div className={extraClassName}>{extra}</div>
        ) : undefined
      }
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
        <div className={`${className}-header ${hashId}`.trim()}>
          <div className={`${className}-header-option ${hashId}`.trim()}>
            {!!checkbox && (
              <div className={`${className}-checkbox ${hashId}`.trim()}>
                {checkbox}
              </div>
            )}
            {Object.values(expandableConfig || {}).length > 0 &&
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
          {(itemHeaderRender && itemHeaderRender?.(record, index, metaDom)) ??
            metaDom}
        </div>
        {needExpanded && (content || expandedRowDom) && (
          <div className={`${className}-content ${hashId}`.trim()}>
            {content}
            {expandedRowRender && rowSupportExpand && (
              <div
                className={
                  expandedRowClassName &&
                  typeof expandedRowClassName !== 'string'
                    ? expandedRowClassName(record, index, indentSize)
                    : expandedRowClassName
                }
              >
                {expandedRowDom}
              </div>
            )}
          </div>
        )}
      </Skeleton>
    </BaseListItem>
  ) : (
    <CheckCard
      bordered
      style={{
        width: '100%',
      }}
      {...cardProps}
      title={cardTitleDom}
      subTitle={subTitle}
      extra={extraDom}
      actions={actionsDom}
      bodyStyle={{
        padding: 24,
        ...cardProps.bodyStyle,
      }}
      {...(itemProps as CheckCardProps)}
      onClick={(e: any) => {
        cardProps?.onClick?.(e);
        itemProps?.onClick?.(e);
      }}
    >
      <Skeleton avatar title={false} loading={loading} active>
        <div className={`${className}-header ${hashId}`.trim()}>
          {itemTitleRender && itemTitleRender?.(record, index, titleDom)}
          {content}
        </div>
      </Skeleton>
    </CheckCard>
  );

  if (!cardProps) {
    return defaultDom;
  }
  return (
    <div
      className={clsx(hashId, {
        [`${className}-card`]: cardProps,
        [propsClassName]: propsClassName !== defaultClassName,
      })}
      style={style}
    >
      {defaultDom}
    </div>
  );
}

export default ProListItem;
