import React, { useContext } from 'react';
import { Tooltip, Space, Input, Divider, Tabs } from 'antd';
import { LabelIconTip } from '@ant-design/pro-utils';
import { useIntl } from '@ant-design/pro-provider';
import { TooltipProps } from 'antd/lib/tooltip';
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
  key?: string;
  onClick?: (key?: string) => void;
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

type SearchPropType = SearchProps | React.ReactNode | boolean;
type SettingPropType = React.ReactNode | ListToolBarSetting;

export interface ListToolBarProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  tip?: string | TooltipProps;
  search?: SearchPropType;
  onSearch?: (keyWords: string) => void;
  actions?: React.ReactNode[];
  settings?: SettingPropType[];
  multipleLine?: boolean;
  filter?: React.ReactNode;
  tabs?: ListToolBarTabs;
  menu?: ListToolBarMenu;
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
    const { icon, tooltip, onClick, key } = settingConfig;
    return icon && tooltip ? (
      <Tooltip title={tooltip}>
        <span
          key={key}
          onClick={() => {
            if (onClick) {
              onClick(key);
            }
          }}
        >
          {icon}
        </span>
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
  tip,
  className,
  style,
  search,
  onSearch,
  multipleLine = false,
  filter,
  actions = [],
  settings = [],
  tabs = {},
  menu,
}) => {
  const intl = useIntl();

  /**
   * 获取搜索栏 DOM
   * @param search 搜索框相关配置
   */
  const getSearchInput = (searchObject: SearchPropType) => {
    if (React.isValidElement(searchObject)) {
      return searchObject;
    }

    if (searchObject) {
      const searchProps: SearchProps = {
        placeholder: intl.getMessage('tableForm.inputPlaceholder', '请输入'),
        style: { width: 200 },
        onSearch,
        ...(searchObject as SearchProps),
      };
      return <Search {...searchProps} />;
    }
    return null;
  };

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-core-toolbar', customizePrefixCls);
  const hasDivider = settings.length > 0 && (actions.length || search);

  const searchNode: React.ReactNode = getSearchInput(search);
  const filtersNode = filter ? <div className={`${prefixCls}-filter`}>{filter}</div> : null;
  const hasTitle = menu || title || subTitle || tip;

  return (
    <div style={style} className={classNames(`${prefixCls}`, className)}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-left`}>
          {menu && <HeaderMenu {...menu} prefixCls={prefixCls} />}
          <div className={`${prefixCls}-title`}>
            <LabelIconTip tip={tip} label={title} subTitle={subTitle} />
          </div>
          {!hasTitle && searchNode && <div className={`${prefixCls}-search`}>{searchNode}</div>}
        </div>
        <div className={`${prefixCls}-right`}>
          {hasTitle && searchNode && <div className={`${prefixCls}-search`}>{searchNode}</div>}
          {!multipleLine && filtersNode}
          <Space>{actions}</Space>
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
