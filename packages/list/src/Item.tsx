import React from 'react';
import { List, Skeleton, Avatar } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { AvatarProps } from 'antd/lib/avatar';
import { ListGridType } from 'antd/lib/list';
import { ExpandableConfig } from 'antd/lib/table/interface';
import classNames from 'classnames';

import getPrefixCls from './util/getPrefixCls';

export interface RenderExpandIconProps {
  prefixCls: string;
  expanded: boolean;
  expandIcon: React.ReactNode;
  onExpand: (expanded: boolean) => void;
}

export function renderExpandIcon({
  prefixCls,
  expandIcon = <RightOutlined />,
  onExpand,
  expanded,
}: RenderExpandIconProps) {
  const expandClassName = `${prefixCls}-row-expand-icon`;

  const onClick: React.MouseEventHandler<HTMLElement> = (event) => {
    onExpand(!expanded);
    event.stopPropagation();
  };

  return (
    <span
      className={classNames(expandClassName, {
        [`${prefixCls}-row-expanded`]: expanded,
        [`${prefixCls}-row-collapsed`]: !expanded,
      })}
      onClick={onClick}
    >
      {expandIcon}
    </span>
  );
}

export interface ItemProps {
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
  avatar?: string | AvatarProps;
  children?: React.ReactNode;
  actions?: React.ReactNode[];
  description?: React.ReactNode;
  loading?: boolean;
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  grid?: ListGridType;
  expand?: boolean;
  rowSupportExpand?: boolean;
  onExpand?: (expand: boolean) => void;
  expandable?: ExpandableConfig<any>;
  showActions?: 'hover' | 'always';
  type?: 'new' | 'top' | 'inline' | 'subheader';
}

/**
 * 头像的语法糖，支持之传入 Avatar
 * @param param
 */
const ProListItemAvatar: React.FC<{
  className: string;
  avatar: string | AvatarProps;
}> = ({ className, avatar }) => {
  if (!avatar) {
    return null;
  }
  if (typeof avatar === 'string') {
    return (
      <div className={`${className}-avatar`}>
        <Avatar size={22} src={avatar} />
      </div>
    );
  }
  return (
    <div className={`${className}-avatar`}>
      <Avatar size={22} {...avatar} />
    </div>
  );
};

function ProListItem(props: ItemProps) {
  const { prefixCls: customizePrefixCls } = props;
  const prefixCls = getPrefixCls('list', customizePrefixCls);
  const defaultClassName = `${prefixCls}-row`;

  const {
    title,
    subTitle,
    children,
    prefixCls: restPrefixCls,
    actions,
    item,
    avatar,
    description,
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
    },
    propsClassName,
  );
  const needExpanded = !expanded || Object.values(expandableConfig || {}).length === 0;
  const expandedRowDom = expandedRowRender && expandedRowRender(item, index, indentSize, expanded);
  return (
    <div className={className} style={style}>
      <List.Item
        actions={actions}
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
                })}
            </div>
            <List.Item.Meta
              avatar={avatar && <ProListItemAvatar className={className} avatar={avatar} />}
              title={
                <div className={`${className}-header-title`}>
                  {title && <div className={`${className}-title`}>{title}</div>}
                  {subTitle && <div className={`${className}-subTitle`}>{subTitle}</div>}
                </div>
              }
              description={
                description &&
                needExpanded && <div className={`${className}-description`}>{description}</div>
              }
            />
          </div>
          {needExpanded && (children || expandedRowDom) && (
            <div className={`${className}-content`}>
              {children}
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
    </div>
  );
}

/**
 * 简单的，只包含 title 和 actions 的分组标题
 * @param param0
 */
const ProListSubItem: React.FC<{
  title?: React.ReactNode;
  actions?: React.ReactNode[];
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
}> = ({ style, prefixCls, title, actions, ...rest }) => {
  const defaultClassName = `${prefixCls}-row`;
  const { className = defaultClassName } = rest;
  return (
    <div key="subheader" style={style} className={`${className} ${className}-subheader`}>
      <div className={`${className}-subheader-title`}>{title}</div>
      <div className={`${className}-subheader-actions`}>{actions}</div>
    </div>
  );
};
export { ProListSubItem };

export default ProListItem;
