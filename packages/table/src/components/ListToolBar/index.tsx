import React, { useContext } from 'react';
import type { TooltipProps, TabPaneProps } from 'antd';
import { Tooltip, Space, Input, ConfigProvider, Tabs } from 'antd';
import { useIntl } from '@ant-design/pro-provider';
import classNames from 'classnames';
import type { SearchProps } from 'antd/lib/input';
import { LabelIconTip } from '@ant-design/pro-utils';
import type { ListToolBarHeaderMenuProps } from './HeaderMenu';
import HeaderMenu from './HeaderMenu';

import './index.less';

export type ListToolBarSetting = {
  icon: React.ReactNode;
  tooltip?: string;
  key?: string;
  onClick?: (key?: string) => void;
};

/** Antd 默认直接导出了 rc 组件中的 Tab.Pane 组件。 */
type TabPane = TabPaneProps & {
  key?: string;
};

export type ListToolBarTabs = {
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  items?: TabPane[];
};

export type ListToolBarMenu = ListToolBarHeaderMenuProps;

type SearchPropType = SearchProps | React.ReactNode | boolean;
type SettingPropType = React.ReactNode | ListToolBarSetting;

export type ListToolBarProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /** 标题 */
  title?: React.ReactNode;
  /** 副标题 */
  subTitle?: React.ReactNode;
  /** 标题提示 */
  tooltip?: string | TooltipProps;
  /** 搜索输入栏相关配置 */
  search?: SearchPropType;
  /** 搜索回调 */
  onSearch?: (keyWords: string) => void;
  /** 工具栏右侧操作区 */
  actions?: React.ReactNode[];
  /** 工作栏右侧设置区 */
  settings?: SettingPropType[];
  /** 是否多行展示 */
  multipleLine?: boolean;
  /** 过滤区，通常配合 LightFilter 使用 */
  filter?: React.ReactNode;
  /** 标签页配置，仅当 `multipleLine` 为 true 时有效 */
  tabs?: ListToolBarTabs;
  /** 菜单配置 */
  menu?: ListToolBarMenu;
};

/**
 * 获取配置区域 DOM Item
 *
 * @param setting 配置项
 */
function getSettingItem(setting: SettingPropType) {
  if (React.isValidElement(setting)) {
    return setting;
  }
  if (setting) {
    const settingConfig: ListToolBarSetting = setting as ListToolBarSetting;
    const { icon, tooltip, onClick, key } = settingConfig;
    if (icon && tooltip) {
      return (
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
      );
    }
    return icon;
  }
  return null;
}

const ListToolBar: React.FC<ListToolBarProps> = ({
  prefixCls: customizePrefixCls,
  title,
  subTitle,
  tooltip,
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
   *
   * @param search 搜索框相关配置
   */
  const getSearchInput = (searchObject: SearchPropType) => {
    if (!searchObject) {
      return null;
    }
    if (React.isValidElement(searchObject)) {
      return searchObject;
    }
    return (
      <Input.Search
        style={{ width: 200 }}
        placeholder={intl.getMessage('tableForm.inputPlaceholder', '请输入')}
        onSearch={onSearch}
        {...(searchObject as SearchProps)}
      />
    );
  };

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-table-list-toolbar', customizePrefixCls);

  /** 根据配置自动生成的查询框 */
  const searchNode: React.ReactNode = getSearchInput(search);
  /** 轻量筛选组件 */
  const filtersNode = filter ? <div className={`${prefixCls}-filter`}>{filter}</div> : null;

  /** 有没有 title，判断了多个场景 */
  const hasTitle = menu || title || subTitle || tooltip;
  /** 没有 key 的时候帮忙加一下 key 不加的话很烦人 */
  const renderActionsDom = () => {
    if (!Array.isArray(actions)) {
      return actions;
    }
    if (actions.length < 1) {
      return null;
    }
    return (
      <Space align="center">
        {actions.map((action, index) => {
          if (!React.isValidElement(action)) {
            // eslint-disable-next-line react/no-array-index-key
            return <React.Fragment key={index}>{action}</React.Fragment>;
          }
          return React.cloneElement(action, {
            // eslint-disable-next-line react/no-array-index-key
            key: index,
            ...action?.props,
          });
        })}
      </Space>
    );
  };

  const actionDom = renderActionsDom();

  return (
    <div style={style} className={classNames(`${prefixCls}`, className)}>
      <div className={`${prefixCls}-container`}>
        <Space className={`${prefixCls}-left`}>
          {tooltip || title || subTitle ? (
            <div className={`${prefixCls}-title`}>
              <LabelIconTip tooltip={tooltip} label={title} subTitle={subTitle} />
            </div>
          ) : null}
          {menu && <HeaderMenu {...menu} prefixCls={prefixCls} />}
          {!hasTitle && searchNode && <div className={`${prefixCls}-search`}>{searchNode}</div>}
        </Space>
        <Space className={`${prefixCls}-right`} size={16}>
          {hasTitle && searchNode ? (
            <div className={`${prefixCls}-search`}>{searchNode}</div>
          ) : null}
          {!multipleLine ? filtersNode : null}
          {actionDom}
          {settings?.length ? (
            <Space size={12} align="center" className={`${prefixCls}-setting-items`}>
              {settings.map((setting, index) => {
                const settingItem = getSettingItem(setting);
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className={`${prefixCls}-setting-item`}>
                    {settingItem}
                  </div>
                );
              })}
            </Space>
          ) : null}
        </Space>
      </div>
      {multipleLine ? (
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
      ) : null}
    </div>
  );
};

export default ListToolBar;
