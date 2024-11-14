import { RightOutlined } from '@ant-design/icons';
import type { CheckCardProps } from '@ant-design/pro-card';
import { CheckCard } from '@ant-design/pro-card';
import { ProProvider } from '@ant-design/pro-provider';
import { ConfigProvider, List, Skeleton } from 'antd';

import type { ListGridType } from 'antd/lib/list';
import type { ExpandableConfig } from 'antd/lib/table/interface';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useContext, useMemo } from 'react';
import type { GetComponentProps } from './index';

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
      className={classNames(expandClassName, hashId, {
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

  const [expanded, onExpand] = useMergedState<boolean>(!!propsExpand, {
    value: propsExpand,
    onChange: propsOnExpand,
  });

  const className = classNames(
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

  const extraClassName = classNames(hashId, {
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

    return [
      <div key="action" onClick={(e) => e.stopPropagation()}>
        {actions}
      </div>,
    ];
  }, [actions, cardActionProps]);

  const actionsDom = useMemo(() => {
    if (!actions || !cardActionProps || cardActionProps === 'extra') {
      return undefined;
    }

    return [
      <div
        key="action"
        className={`${defaultClassName}-actions ${hashId}`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {actions}
      </div>,
    ];
  }, [actions, cardActionProps, defaultClassName, hashId]);

  const titleDom =
    title || subTitle ? (
      <div className={`${defaultClassName}-header-container ${hashId}`.trim()}>
        {title && (
          <div
            className={classNames(`${defaultClassName}-title`, hashId, {
              [`${defaultClassName}-title-editable`]: isEditable,
            })}
          >
            {title}
          </div>
        )}
        {subTitle && (
          <div
            className={classNames(`${defaultClassName}-subTitle`, hashId, {
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
      <List.Item.Meta
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

  const rowClassName = classNames(hashId, {
    [`${defaultClassName}-item-has-checkbox`]: checkbox,
    [`${defaultClassName}-item-has-avatar`]: avatar,
    [className]: className,
  });
  const cardTitleDom = useMemo(() => {
    if (avatar || title) {
      return (
        <>
          {avatar}
          <span
            className={`${getPrefixCls(
              'list-item-meta-title',
            )} ${hashId}`.trim()}
          >
            {title}
          </span>
        </>
      );
    }
    return null;
  }, [avatar, getPrefixCls, hashId, title]);

  const itemProps = onItem?.(record, index);
  const defaultDom = !cardProps ? (
    <List.Item
      className={classNames(rowClassName, hashId, {
        [propsClassName]: propsClassName !== defaultClassName,
      })}
      {...rest}
      actions={extraDom}
      extra={!!extra && <div className={extraClassName}>{extra}</div>}
      {...onRow?.(record, index)}
      {...itemProps}
      onClick={(e) => {
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
    </List.Item>
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
      className={classNames(hashId, {
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
