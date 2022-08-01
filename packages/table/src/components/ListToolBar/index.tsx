import { useIntl } from '@ant-design/pro-provider';
import { LabelIconTip } from '@ant-design/pro-utils';
import type { TabPaneProps } from 'antd';
import { ConfigProvider, Input, Space, Tabs, Tooltip } from 'antd';
import type { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import type { SearchProps } from 'antd/es/input';
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import useAntdMediaQuery from 'use-media-antd-query';
import type { ListToolBarHeaderMenuProps } from './HeaderMenu';
import HeaderMenu from './HeaderMenu';
import './index.less';

export type ListToolBarSetting = {
  icon: React.ReactNode;
  tooltip?: LabelTooltipType | string;
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
  tooltip?: string | LabelTooltipType;
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
        <Tooltip title={tooltip as React.ReactNode}>
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

const ListToolBarTabBar: React.FC<{
  prefixCls: string;
  filtersNode: React.ReactNode;
  multipleLine: boolean;
  tabs: ListToolBarProps['tabs'];
}> = ({ prefixCls, tabs = {}, multipleLine, filtersNode }) => {
  if (!multipleLine) return null;
  return (
    <div className={`${prefixCls}-extra-line`}>
      {tabs.items && tabs.items.length ? (
        <Tabs activeKey={tabs.activeKey} onChange={tabs.onChange} tabBarExtraContent={filtersNode}>
          {tabs.items.map((tab, index) => (
            <Tabs.TabPane key={tab.key || index} {...tab} />
          ))}
        </Tabs>
      ) : (
        filtersNode
      )}
    </div>
  );
};
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

  const colSize = useAntdMediaQuery();

  const isMobile = colSize === 'sm' || colSize === 'xs';

  const placeholder = intl.getMessage('tableForm.inputPlaceholder', '请输入');

  /**
   * 获取搜索栏 DOM
   *
   * @param search 搜索框相关配置
   */
  const searchNode = useMemo(() => {
    if (!search) {
      return null;
    }
    if (React.isValidElement(search)) {
      return search;
    }
    return (
      <Input.Search
        style={{ width: 200 }}
        placeholder={placeholder}
        {...(search as SearchProps)}
        onSearch={(...restParams) => {
          onSearch?.(restParams?.[0]);
          (search as SearchProps).onSearch?.(...restParams);
        }}
      />
    );
  }, [placeholder, onSearch, search]);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-table-list-toolbar', customizePrefixCls);

  /** 轻量筛选组件 */
  const filtersNode = useMemo(() => {
    if (filter) return <div className={`${prefixCls}-filter`}>{filter}</div>;
    return null;
  }, [filter, prefixCls]);

  /** 有没有 title，需要结合多个场景判断 */
  const hasTitle = useMemo(
    () => menu || title || subTitle || tooltip,
    [menu, subTitle, title, tooltip],
  );

  /** 没有 key 的时候帮忙加一下 key 不加的话很烦人 */
  const actionDom = useMemo(() => {
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
  }, [actions]);

  const hasRight = useMemo(() => {
    return (
      (hasTitle && searchNode) || (!multipleLine && filtersNode) || actionDom || settings?.length
    );
  }, [actionDom, filtersNode, hasTitle, multipleLine, searchNode, settings?.length]);

  const hasLeft = useMemo(
    () => tooltip || title || subTitle || menu || (!hasTitle && searchNode),
    [hasTitle, menu, searchNode, subTitle, title, tooltip],
  );

  const leftTitleDom = useMemo(() => {
    // 保留dom是为了占位，不然 right 就变到左边了
    if (!hasLeft && hasRight) {
      return <div className={`${prefixCls}-left`} />;
    }

    // 减少 space 的dom，渲染的时候能节省点性能
    if (!menu && (hasTitle || !searchNode)) {
      return (
        <div className={`${prefixCls}-left`}>
          <div className={`${prefixCls}-title`}>
            <LabelIconTip tooltip={tooltip} label={title} subTitle={subTitle} />
          </div>
        </div>
      );
    }
    return (
      <Space className={`${prefixCls}-left`}>
        <div className={`${prefixCls}-title`}>
          <LabelIconTip tooltip={tooltip} label={title} subTitle={subTitle} />
        </div>
        {menu && <HeaderMenu {...menu} prefixCls={prefixCls} />}
        {!hasTitle && searchNode ? <div className={`${prefixCls}-search`}>{searchNode}</div> : null}
      </Space>
    );
  }, [hasLeft, hasRight, hasTitle, menu, prefixCls, searchNode, subTitle, title, tooltip]);

  const rightTitleDom = useMemo(() => {
    if (!hasRight) return null;
    return (
      <Space
        className={`${prefixCls}-right`}
        direction={isMobile ? 'vertical' : 'horizontal'}
        size={16}
        align={isMobile ? 'end' : 'center'}
      >
        {hasTitle && searchNode ? <div className={`${prefixCls}-search`}>{searchNode}</div> : null}
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
    );
  }, [
    actionDom,
    isMobile,
    filtersNode,
    hasRight,
    hasTitle,
    multipleLine,
    prefixCls,
    searchNode,
    settings,
  ]);

  const titleNode = useMemo(() => {
    if (!hasRight && !hasLeft) return null;
    const containerClassName = classNames(`${prefixCls}-container`, {
      [`${prefixCls}-container-mobile`]: isMobile,
    });
    return (
      <div className={containerClassName}>
        {leftTitleDom}
        {rightTitleDom}
      </div>
    );
  }, [hasLeft, hasRight, isMobile, leftTitleDom, prefixCls, rightTitleDom]);

  return (
    <div style={style} className={classNames(`${prefixCls}`, className)}>
      {titleNode}
      <ListToolBarTabBar
        filtersNode={filtersNode}
        prefixCls={prefixCls}
        tabs={tabs}
        multipleLine={multipleLine}
      />
    </div>
  );
};

export default ListToolBar;
