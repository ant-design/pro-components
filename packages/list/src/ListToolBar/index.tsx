import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Tooltip, Input, Divider, Tabs } from 'antd';
import classNames from 'classnames';
import { SearchProps } from 'antd/es/input';
import getPrefixCls from '../util/getPrefixCls';
import HeaderMenu, { HeaderMenuProps } from './HeaderMenu';

import './index.less';

const { Search } = Input;

export interface FooterToolErrorType {
  message: string;
  field: string;
}

export interface SearchAreaConfig {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export interface ListToolBarSetting {
  icon: string;
  tooltip: string;
  key?: string;
  onClick?: (key: string) => void;
}
type TabPane = Parameters<typeof Tabs.TabPane>[0];
export interface ListToolBarTabs {
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  items?: TabPane[];
}

export type ListToolBarMenu = HeaderMenuProps;

export interface ListToolBarProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: React.ReactNode;
  search?: SearchProps | React.ReactNode;
  actions?: React.ReactNode[];
  settings?: (React.ReactNode | ListToolBarSetting)[];
  multipleLine?: boolean;
  filter?: React.ReactNode;
  tabs?: ListToolBarTabs;
  menu?: ListToolBarMenu;
}

function getTitle(title: React.ReactNode, className: string) {
  if (!title) {
    return null;
  }
  if (React.isValidElement(title)) {
    return title;
  }
  return <div className={className}>{title}</div>;
}

const ListToolBar: React.FC<ListToolBarProps> = ({
  prefixCls: customizePrefixCls,
  title,
  subTitle,
  description,
  className,
  style,
  search,
  multipleLine = false,
  filter,
  actions = [],
  settings = [],
  tabs = {},
  menu,
}) => {
  const prefixCls = getPrefixCls('listtoolbar', customizePrefixCls);
  const hasDivider = settings.length > 0 && (actions.length || search);
  const titleNode: React.ReactNode = getTitle(title, `${prefixCls}-default-title`);
  const subTitleNode: React.ReactNode = getTitle(subTitle, `${prefixCls}-default-subtitle`);

  let searchNode: React.ReactNode = null;
  if (React.isValidElement(search)) {
    searchNode = search;
  } else if (search) {
    const searchProps: SearchProps = {
      placeholder: '搜索',
      style: { width: 200 },
      ...(search as SearchProps),
    };
    searchNode = <Search {...searchProps} />;
  }

  const filtersNode = filter ? <div className={`${prefixCls}-filter`}>{filter}</div> : null;
  const hasTitle = menu || title || subTitle || description;

  return (
    <div style={style} className={classNames(`${prefixCls}`, className)}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-left`}>
          {menu && <HeaderMenu {...menu} prefixCls={prefixCls} />}
          {titleNode && <div className={`${prefixCls}-title`}>{titleNode}</div>}
          {subTitleNode && <div className={`${prefixCls}-subtitle`}>{subTitleNode}</div>}
          {description && (
            <div className={`${prefixCls}-subtitle`}>
              <Tooltip title={description}>
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
          )}
          {!hasTitle && searchNode && <div className={`${prefixCls}-search`}>{searchNode}</div>}
        </div>
        <div className={`${prefixCls}-right`}>
          {hasTitle && searchNode && <div className={`${prefixCls}-search`}>{searchNode}</div>}
          {!multipleLine && filtersNode}
          {actions.map((action, index) => {
            return (
              <div key={index} className={`${prefixCls}-action-item`}>
                {action}
              </div>
            );
          })}
          {hasDivider && (
            <div className={`${prefixCls}-divider`}>
              <Divider type="vertical" />
            </div>
          )}
          {settings.map((setting, index) => {
            let ele = null;
            if (React.isValidElement(setting)) {
              ele = setting;
            } else {
              const settingConfig: ListToolBarSetting = setting as ListToolBarSetting;
              const { icon, tooltip, onClick, key } = settingConfig;
              ele = (
                <Tooltip title={tooltip}>
                  <LegacyIcon
                    type={icon}
                    onClick={() => {
                      if (onClick) {
                        onClick(key);
                      }
                    }}
                  />
                </Tooltip>
              );
            }
            return (
              <div key={index} className={`${prefixCls}-setting-item`}>
                {ele}
              </div>
            );
          })}
        </div>
      </div>
      {multipleLine && (
        <div className={`${prefixCls}-extra-line`}>
          {tabs.items && tabs.items.length ? (
            <Tabs onChange={tabs.onChange} tabBarExtraContent={filtersNode}>
              {tabs.items.map((tab) => (
                <Tabs.TabPane {...tab} />
              ))}
            </Tabs>
          ) : (
            filtersNode
          )}
        </div>
      )}
    </div>
  );
};

export default ListToolBar;
