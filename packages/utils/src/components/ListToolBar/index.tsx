import React, { useContext } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip, Input, Divider, Tabs } from 'antd';
import { TabPaneProps } from 'antd/lib/tabs';
import classNames from 'classnames';
import { SearchProps } from 'antd/es/input';
import { ConfigContext } from 'antd/lib/config-provider';
import HeaderMenu, { ListToolBarHeaderMenuProps } from './HeaderMenu';

import './index.less';

const { Search } = Input;

export interface ListToolBarSetting {
  icon: React.ReactNode;
  tooltip?: string;
}

/**
 * antd 默认直接导出了 rc 组件中的 Tab.Pane 组件。
 */
type TabPane = TabPaneProps & {
  key?: string;
};

export interface ListToolBarTabs {
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  items?: TabPane[];
}

export type ListToolBarMenu = ListToolBarHeaderMenuProps;

type SearchPropType = SearchProps | React.ReactNode;
type SettingPropType = React.ReactNode | ListToolBarSetting;

export interface ListToolBarProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: React.ReactNode;
  search?: SearchPropType;
  actions?: React.ReactNode[];
  settings?: SettingPropType[];
  multipleLine?: boolean;
  filter?: React.ReactNode;
  tabs?: ListToolBarTabs;
  menu?: ListToolBarMenu;
}

/**
 * 获取标题 DOM
 * @param title 标题
 * @param className 类名
 */
function getTitle(title: React.ReactNode, className: string) {
  if (!title) {
    return null;
  }
  if (React.isValidElement(title)) {
    return title;
  }
  return <div className={className}>{title}</div>;
}

/**
 * 获取搜索栏 DOM
 * @param search 搜索框相关配置
 */
function getSearchInput(search: SearchPropType) {
  if (React.isValidElement(search)) {
    return search;
  }

  if (search) {
    const searchProps: SearchProps = {
      style: { width: 200 },
      ...(search as SearchProps),
    };
    return <Search {...searchProps} />;
  }
  return null;
}

/**
 * 获取配置区域 DOM Item
 * @param setting 配置项
 */
function getSettingItem(setting: SettingPropType) {
  if (React.isValidElement(setting)) {
    return setting;
  }
  if (setting) {
    const settingConfig: ListToolBarSetting = setting as ListToolBarSetting;
    const { icon, tooltip } = settingConfig;
    return icon && tooltip ? (
      <Tooltip title={tooltip}>
        <span>{icon}</span>
      </Tooltip>
    ) : (
      icon
    );
  }
  return null;
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
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-core-toolbar', customizePrefixCls);
  const hasDivider = settings.length > 0 && (actions.length || search);
  const titleNode: React.ReactNode = getTitle(title, `${prefixCls}-default-title`);
  const subTitleNode: React.ReactNode = getTitle(subTitle, `${prefixCls}-default-subtitle`);

  const searchNode: React.ReactNode = getSearchInput(search);
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
            const settingItem = getSettingItem(setting);
            return (
              <div key={index} className={`${prefixCls}-setting-item`}>
                {settingItem}
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
