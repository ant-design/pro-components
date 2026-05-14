import ResizeObserver from '@rc-component/resize-observer';
import { ConfigProvider, Input, TabPaneProps, Tabs, Tooltip } from 'antd';
import type { SearchProps } from 'antd/lib/input';
import { clsx } from 'clsx';
import React, { useContext, useState } from 'react';
import { proTheme, useIntl } from '../../../provider';
import type { LabelTooltipType } from '../../../utils';
import { LabelIconTip } from '../../../utils';
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
    return (
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
    );
  }
  return null;
}

const ListToolBarTabBar: React.FC<{
  prefixCls: string;
  hashId?: string;
  filtersNode: React.ReactNode;
  multipleLine: boolean;
  tabs: ListToolBarProps['tabs'];
}> = ({ prefixCls, hashId, tabs, multipleLine, filtersNode }) => {
  if (!multipleLine) return null;
  return (
    <div className={clsx(`${prefixCls}-extra-line`, hashId)}>
      {tabs?.items && tabs?.items.length ? (
        <Tabs
          style={{
            width: '100%',
          }}
          defaultActiveKey={tabs.defaultActiveKey}
          activeKey={tabs.activeKey}
          items={tabs.items.map((item, index) => ({
            label: item.tab,
            ...item,
            key: item.key?.toString() || index?.toString(),
          }))}
          onChange={tabs.onChange}
          tabBarExtraContent={filtersNode}
        />
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
  tabs,
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
  let searchNode: React.ReactNode = null;
  if (search) {
    if (React.isValidElement(search)) {
      searchNode = search;
    } else {
      searchNode = (
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
    }
  }

  /** 轻量筛选组件 */
  const filtersNode = filter ? (
    <div className={clsx(`${prefixCls}-filter`, hashId)}>{filter}</div>
  ) : null;

  /** 有没有 title，需要结合多个场景判断 */
  const hasTitle = menu || title || subTitle || tooltip;

  /** 没有 key 的时候帮忙加一下 key 不加的话很烦人 */
  let actionDom: React.ReactNode = null;
  if (Array.isArray(actions) && actions.length > 0) {
    actionDom = (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: token.marginXS,
        }}
      >
        {actions.map((action, index) => (
          <React.Fragment key={index}>{action}</React.Fragment>
        ))}
      </div>
    );
  } else if (!Array.isArray(actions)) {
    actionDom = actions;
  }

  const hasRight = !!(
    (hasTitle && searchNode) ||
    (!multipleLine && filtersNode) ||
    actionDom ||
    settings?.length
  );

  const hasLeft = !!(
    tooltip ||
    title ||
    subTitle ||
    menu ||
    (!hasTitle && searchNode)
  );

  let leftTitleDom: React.ReactNode;
  // 保留dom是为了占位，不然 right 就变到左边了
  if (!hasLeft && hasRight) {
    leftTitleDom = <div className={clsx(`${prefixCls}-left`, hashId)} />;
  } else if (!menu && (hasTitle || !searchNode)) {
    // 减少 space 的dom，渲染的时候能节省点性能
    leftTitleDom = (
      <div className={clsx(`${prefixCls}-left`, hashId)}>
        <div className={clsx(`${prefixCls}-title`, hashId)}>
          <LabelIconTip tooltip={tooltip} label={title} subTitle={subTitle} />
        </div>
      </div>
    );
  } else {
    leftTitleDom = (
      <div
        className={clsx(`${prefixCls}-left`, hashId, {
          [`${prefixCls}-left-has-tabs`]: menu?.type === 'tab',
          [`${prefixCls}-left-has-dropdown`]: menu?.type === 'dropdown',
          [`${prefixCls}-left-has-inline-menu`]: menu?.type === 'inline',
        })}
      >
        {hasTitle && !menu && (
          <div className={clsx(`${prefixCls}-title`, hashId)}>
            <LabelIconTip tooltip={tooltip} label={title} subTitle={subTitle} />
          </div>
        )}
        {menu && (
          // 这里面实现了 tabs 的逻辑
          <HeaderMenu {...menu} prefixCls={prefixCls} hashId={hashId} />
        )}
        {!hasTitle && searchNode ? (
          <div className={clsx(`${prefixCls}-search`, hashId)}>
            {searchNode}
          </div>
        ) : null}
      </div>
    );
  }

  const rightTitleDom = hasRight ? (
    <div
      className={clsx(`${prefixCls}-right`, hashId)}
      style={isMobile ? {} : { alignItems: 'center' }}
    >
      {!multipleLine ? filtersNode : null}
      {hasTitle && searchNode ? (
        <div className={clsx(`${prefixCls}-search`, hashId)}>{searchNode}</div>
      ) : null}
      {actionDom}
      {settings?.length ? (
        <div className={clsx(`${prefixCls}-setting-items`, hashId)}>
          {settings.map((setting, index) => {
            const settingItem = getSettingItem(setting);
            return (
              <div
                key={index}
                className={clsx(`${prefixCls}-setting-item`, hashId)}
              >
                {settingItem}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  ) : null;

  const titleNode =
    hasRight || hasLeft ? (
      <div
        className={clsx(`${prefixCls}-container`, hashId, {
          [`${prefixCls}-container-mobile`]: isMobile,
        })}
      >
        {leftTitleDom}
        {rightTitleDom}
      </div>
    ) : null;

  return wrapSSR(
    <ResizeObserver
      onResize={(size) => {
        if (size.width < 375 !== isMobile) {
          setIsMobile(size.width < 375);
        }
      }}
    >
      {(ref) => (
        <div
          ref={ref}
          style={style}
          className={clsx(prefixCls, hashId, className)}
        >
          {titleNode}
          <ListToolBarTabBar
            filtersNode={filtersNode}
            hashId={hashId}
            prefixCls={prefixCls}
            tabs={tabs}
            multipleLine={multipleLine}
          />
        </div>
      )}
    </ResizeObserver>,
  );
};

export default ListToolBar;
