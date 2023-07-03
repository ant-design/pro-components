import { proTheme, useIntl } from '@ant-design/pro-provider';
import { LabelIconTip } from '@ant-design/pro-utils';
import type { TabPaneProps } from 'antd';
import { ConfigProvider, Input, Tabs, Tooltip } from 'antd';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type { SearchProps } from 'antd/lib/input';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useContext, useMemo, useState } from 'react';
import type { ListToolBarHeaderMenuProps } from './HeaderMenu';
import HeaderMenu from './HeaderMenu';
import { useStyle } from './style';

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
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
  items?: TabPane[];
};

export type ListToolBarMenu = ListToolBarHeaderMenuProps;

type SearchPropType =
  | (SearchProps & {
      onSearch: (searchValue: string) => Promise<false | void> | false | void;
    })
  | React.ReactNode
  | boolean;
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
        <Tabs
          style={{
            width: '100%',
          }}
          defaultActiveKey={tabs.defaultActiveKey}
          activeKey={tabs.activeKey}
          //@ts-ignore
          items={tabs.items.map((item, index) => ({
            label: item.tab,
            ...item,
            key: item.key?.toString() || index?.toString(),
          }))}
          onChange={tabs.onChange}
          tabBarExtraContent={filtersNode}
        >
          {tabs.items?.map((item, index) => {
            return (
              <Tabs.TabPane {...item} key={item.key || index} tab={item.tab} />
            );
          })}
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
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { token } = proTheme.useToken();
  const prefixCls = getPrefixCls('pro-table-list-toolbar', customizePrefixCls);

  const { wrapSSR, hashId } = useStyle(prefixCls);

  const intl = useIntl();

  const [isMobile, setIsMobile] = useState(false);

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
        onSearch={async (...restParams) => {
          const success = await (search as any).onSearch?.(...restParams);
          if (success !== false) {
            onSearch?.(restParams?.[0]);
          }
        }}
      />
    );
  }, [placeholder, onSearch, search]);

  /** 轻量筛选组件 */
  const filtersNode = useMemo(() => {
    if (filter)
      return (
        <div className={`${prefixCls}-filter ${hashId}`.trim()}>{filter}</div>
      );
    return null;
  }, [filter, hashId, prefixCls]);

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: token.marginXS,
        }}
      >
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
      </div>
    );
  }, [actions]);

  const hasRight = useMemo(() => {
    return (
      (hasTitle && searchNode) ||
      (!multipleLine && filtersNode) ||
      actionDom ||
      settings?.length
    );
  }, [
    actionDom,
    filtersNode,
    hasTitle,
    multipleLine,
    searchNode,
    settings?.length,
  ]);

  const hasLeft = useMemo(
    () => tooltip || title || subTitle || menu || (!hasTitle && searchNode),
    [hasTitle, menu, searchNode, subTitle, title, tooltip],
  );

  const leftTitleDom = useMemo(() => {
    // 保留dom是为了占位，不然 right 就变到左边了
    if (!hasLeft && hasRight) {
      return <div className={`${prefixCls}-left ${hashId}`.trim()} />;
    }

    // 减少 space 的dom，渲染的时候能节省点性能
    if (!menu && (hasTitle || !searchNode)) {
      return (
        <div className={`${prefixCls}-left ${hashId}`.trim()}>
          <div className={`${prefixCls}-title ${hashId}`.trim()}>
            <LabelIconTip tooltip={tooltip} label={title} subTitle={subTitle} />
          </div>
        </div>
      );
    }
    return (
      <div
        className={classNames(`${prefixCls}-left`, hashId, {
          [`${prefixCls}-left-has-tabs`]: menu?.type === 'tab',
          [`${prefixCls}-left-has-dropdown`]: menu?.type === 'dropdown',
          [`${prefixCls}-left-has-inline-menu`]: menu?.type === 'inline',
        })}
      >
        {hasTitle && !menu && (
          <div className={`${prefixCls}-title ${hashId}`.trim()}>
            <LabelIconTip tooltip={tooltip} label={title} subTitle={subTitle} />
          </div>
        )}

        {menu && (
          // 这里面实现了 tabs 的逻辑
          <HeaderMenu {...menu} prefixCls={prefixCls} />
        )}
        {!hasTitle && searchNode ? (
          <div className={`${prefixCls}-search ${hashId}`.trim()}>
            {searchNode}
          </div>
        ) : null}
      </div>
    );
  }, [
    hasLeft,
    hasRight,
    hasTitle,
    hashId,
    menu,
    prefixCls,
    searchNode,
    subTitle,
    title,
    tooltip,
  ]);

  const rightTitleDom = useMemo(() => {
    if (!hasRight) return null;
    return (
      <div
        className={`${prefixCls}-right ${hashId}`.trim()}
        style={isMobile ? {} : { alignItems: 'center' }}
      >
        {!multipleLine ? filtersNode : null}
        {hasTitle && searchNode ? (
          <div className={`${prefixCls}-search ${hashId}`.trim()}>
            {searchNode}
          </div>
        ) : null}
        {actionDom}
        {settings?.length ? (
          <div className={`${prefixCls}-setting-items ${hashId}`.trim()}>
            {settings.map((setting, index) => {
              const settingItem = getSettingItem(setting);
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div
                  key={index}
                  className={`${prefixCls}-setting-item ${hashId}`.trim()}
                >
                  {settingItem}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }, [
    hasRight,
    prefixCls,
    hashId,
    isMobile,
    hasTitle,
    searchNode,
    multipleLine,
    filtersNode,
    actionDom,
    settings,
  ]);

  const titleNode = useMemo(() => {
    if (!hasRight && !hasLeft) return null;
    const containerClassName = classNames(`${prefixCls}-container`, hashId, {
      [`${prefixCls}-container-mobile`]: isMobile,
    });
    return (
      <div className={containerClassName}>
        {leftTitleDom}
        {rightTitleDom}
      </div>
    );
  }, [
    hasLeft,
    hasRight,
    hashId,
    isMobile,
    leftTitleDom,
    prefixCls,
    rightTitleDom,
  ]);

  return wrapSSR(
    <ResizeObserver
      onResize={(size) => {
        if (size.width < 375 !== isMobile) {
          setIsMobile(size.width < 375);
        }
      }}
    >
      <div style={style} className={classNames(prefixCls, hashId, className)}>
        {titleNode}
        <ListToolBarTabBar
          filtersNode={filtersNode}
          prefixCls={prefixCls}
          tabs={tabs}
          multipleLine={multipleLine}
        />
      </div>
    </ResizeObserver>,
  );
};

export default ListToolBar;
