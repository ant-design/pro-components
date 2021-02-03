import React, { useContext } from 'react';
import { List, Avatar, Skeleton, ConfigProvider } from 'antd';
import type { ProCardProps } from '@ant-design/pro-card';
import ProCard from '@ant-design/pro-card';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { ListGridType } from 'antd/lib/list';
import type { ExpandableConfig } from 'antd/lib/table/interface';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';

export type RenderExpandIconProps<RecordType> = {
  prefixCls: string;
  expanded: boolean;
  expandIcon:
    | React.ReactNode
    | ((props: {
        onExpand: (expanded: boolean) => void;
        expanded: boolean;
        record: RecordType;
      }) => React.ReactNode);
  onExpand: (expanded: boolean) => void;
  record: RecordType;
};

export function renderExpandIcon<RecordType>({
  prefixCls,
  expandIcon = <RightOutlined />,
  onExpand,
  expanded,
  record,
}: RenderExpandIconProps<RecordType>) {
  let icon = expandIcon;
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
      className={classNames(expandClassName, {
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
  index?: number;
  selected?: boolean;
  avatar?: React.ReactNode;
  extra?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode[];
  description?: React.ReactNode;
  loading?: boolean;
  style?: React.CSSProperties;
  grid?: ListGridType;
  expand?: boolean;
  rowSupportExpand?: boolean;
  onExpand?: (expand: boolean) => void;
  expandable?: ExpandableConfig<any>;
  showActions?: 'hover' | 'always';
  type?: 'new' | 'top' | 'inline' | 'subheader';
  isEditable: boolean;
  recordKey: string | number | undefined;
  cardProps?: ProCardProps;
  record?: RecordType;
};

function ProListItem<RecordType>(props: ItemProps<RecordType>) {
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-list', customizePrefixCls);
  const defaultClassName = `${prefixCls}-row`;

  const {
    title,
    subTitle,
    content,
    prefixCls: restPrefixCls,
    actions,
    item,
    recordKey,
    avatar,
    cardProps,
    description,
    isEditable,
    checkbox,
    index = 0,
    selected,
    loading,
    expand: propsExpand,
    onExpand: propsOnExpand,
    expandable: expandableConfig,
    rowSupportExpand,
    showActions,
    type,
    style,
    className: propsClassName = defaultClassName,
    record,
    ...rest
  } = props;

  const { expandedRowRender, expandIcon, expandRowByClick, indentSize = 8, expandedRowClassName } =
    expandableConfig || {};

  const [expanded, onExpand] = useMergedState<boolean>(!!propsExpand, {
    value: propsExpand,
    onChange: propsOnExpand,
  });

  const className = classNames(
    {
      [`${propsClassName}-selected`]: selected,
      [`${propsClassName}-show-action-hover`]: showActions === 'hover',
      [`${propsClassName}-type-${type}`]: type,
      [`${propsClassName}-editable`]: isEditable,
    },
    propsClassName,
  );

  const needExpanded = expanded || Object.values(expandableConfig || {}).length === 0;
  const expandedRowDom = expandedRowRender && expandedRowRender(item, index, indentSize, expanded);

  const defaultDom = !cardProps ? (
    <List.Item
      actions={
        actions
          ? [
              <div key="action" onClick={(e) => e.stopPropagation()}>
                {actions}
              </div>,
            ]
          : []
      }
      {...rest}
      onClick={() => {
        if (expandRowByClick) {
          onExpand(!expanded);
        }
      }}
    >
      <Skeleton avatar title={false} loading={loading} active>
        <div className={`${className}-header`}>
          <div className={`${className}-header-option`}>
            {checkbox && <div className={`${className}-checkbox`}>{checkbox}</div>}
            {Object.values(expandableConfig || {}).length > 0 &&
              rowSupportExpand &&
              renderExpandIcon({
                prefixCls,
                expandIcon,
                onExpand,
                expanded,
                record,
              })}
          </div>
          {title || avatar || subTitle || description ? (
            <List.Item.Meta
              avatar={avatar}
              title={
                title || subTitle ? (
                  <div className={`${className}-header-title`}>
                    {title && <div className={`${className}-title`}>{title}</div>}
                    {subTitle && <div className={`${className}-subTitle`}>{subTitle}</div>}
                  </div>
                ) : null
              }
              description={
                description &&
                needExpanded && <div className={`${className}-description`}>{description}</div>
              }
            />
          ) : null}
        </div>
        {needExpanded && (content || expandedRowDom) && (
          <div className={`${className}-content`}>
            {content}
            {expandedRowRender && rowSupportExpand && (
              <div
                className={expandedRowClassName && expandedRowClassName(item, index, indentSize)}
              >
                {expandedRowDom}
              </div>
            )}
          </div>
        )}
      </Skeleton>
    </List.Item>
  ) : (
    <ProCard
      bordered
      loading={loading}
      {...cardProps}
      title={
        <>
          <Avatar size={22} src={avatar} className={getPrefixCls('list-item-meta-avatar')} />
          {title}
        </>
      }
      subTitle={subTitle}
      extra={actions ? [<div onClick={(e) => e.stopPropagation()}>{actions}</div>] : []}
    >
      {content}
    </ProCard>
  );
  return (
    <div
      className={classNames(className, {
        [`${className}-card`]: cardProps,
      })}
      style={style}
    >
      {defaultDom}
    </div>
  );
}

export default ProListItem;
