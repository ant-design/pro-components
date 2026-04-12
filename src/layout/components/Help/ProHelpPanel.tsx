import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { useControlledState } from '@rc-component/util';
import { Card, ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ProHelpDataSource } from './HelpProvide';
import { ProHelpProvide } from './HelpProvide';
import { ProHelpContentPanel } from './ProHelpContentPanel';
import { ProHelpSelect } from './Search';
import { useStyle } from './style';

export const SelectKeyProvide = React.createContext<{
  selectedKey: string | undefined;
  setSelectedKey: (key: string | undefined) => void;
}>({
  selectedKey: undefined,
  setSelectedKey: () => {},
});

export type ProHelpPanelProps = {
  /**
   * 帮助面板的标题
   */
  title?: string;
  /**
   * 帮助面板首次打开时的默认选中文档的键名
   */
  defaultSelectedKey?: string;
  /**
   * 当前选中的帮助文档的键名。如果提供了这个 prop，那么该组件将是一个受控组件，其状态将由父组件管理。如果未提供，那么该组件将是一个非受控组件，其状态将在组件内部管理。
   */
  selectedKey?: string;
  /**
   * 当选中的文档键名发生变化时调用的回调函数。新的键名将作为参数传递给该函数。
   */
  onSelectedKeyChange?: (key: string | undefined) => void;
  /**
   *控制左侧面板是否能够打开
   */
  showLeftPanel?: boolean;
  /**
   * 当左侧面板打开状态发生变化时调用的回调函数。新的打开状态将作为参数传递给该函数。
   */
  onShowLeftPanelChange?: (show: boolean) => void;
  /**
   * 卡片的变体类型
   */
  variant?: 'outlined' | 'borderless';

  /**
   * 当帮助面板关闭时调用的回调函数。
   */
  onClose?: () => void;

  /**
   * 帮助面板的高度，可以是数字或字符串类型。
   */
  height?: number | string;

  /**
   * 帮助面板的页脚
   */
  footer?: React.ReactNode;

  /**
   * 在一页内加载所有的 children 内容
   */
  infiniteScrollFull?: boolean;

  /**
   * 自定义渲染 extra 部分的内容
   *
   * @param {React.ReactNode} collapsePannelAction - 折叠收起的左侧按钮
   * @param {React.ReactNode} helpSelectAction - 默认的帮助筛选按钮
   * @param {React.ReactNode} closeAction - 关闭操作按钮
   * @returns {React.ReactNode} - 返回自定义渲染的 extra 操作按钮
   *
   */
  extraRender?: (
    collapsePannelAction: React.ReactNode,
    helpSelectAction: React.ReactNode,
    closeAction: React.ReactNode,
  ) => React.ReactNode;
};
/**
 * ProHelpPanel 组件是一个帮助中心面板组件，具有可折叠的左侧菜单和右侧帮助内容区域。
 * 左侧菜单显示了帮助文档的目录结构，右侧帮助内容区域显示了用户选中的帮助文档内容。
 * 在左侧菜单中，用户可以通过点击目录来选择并显示相应的文档内容。
 * @param param0
 * @returns
 */
export const ProHelpPanel: React.FC<ProHelpPanelProps> = ({
  title = '帮助中心',
  variant = 'outlined',
  onClose,
  footer,
  height,
  extraRender,
  ...props
}) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-help');
  const { wrapSSR, hashId } = useStyle(className);
  const { dataSource } = useContext(ProHelpProvide);
  const [selectedKey, setSelectedKeyInner] = useControlledState<
    string | undefined
  >(props.defaultSelectedKey ?? undefined, props.selectedKey);
  const setSelectedKey = useCallback(
    (
      updater:
        | string
        | undefined
        | ((prev: string | undefined) => string | undefined),
    ) => {
      setSelectedKeyInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: string | undefined) => string | undefined)(prev)
            : updater;
        props.onSelectedKeyChange?.(next);
        return next;
      });
    },
    [props.onSelectedKeyChange],
  );
  const [showLeftPanel, setShowLeftPanelInner] = useControlledState(
    true,
    props.showLeftPanel,
  );
  const setShowLeftPanel = useCallback(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      setShowLeftPanelInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: boolean) => boolean)(prev)
            : updater;
        props.onShowLeftPanelChange?.(next);
        return next;
      });
    },
    [props.onShowLeftPanelChange],
  );

  const dataSourceKeyMap = useMemo(() => {
    const map = new Map<
      React.Key,
      ProHelpDataSource<any> & {
        parentKey?: React.Key;
      }
    >();
    dataSource.forEach((page) => {
      map.set(page.key, page);
      page.children?.forEach((item) => {
        map.set(item.key || item.title, {
          parentKey: page.key,
          ...item,
        } as unknown as ProHelpDataSource<any>);
      });
    });
    return map;
  }, [dataSource]);

  const parentKey = useMemo(
    () => dataSourceKeyMap.get(selectedKey!)?.parentKey as string,
    [dataSourceKeyMap, selectedKey],
  );

  const [expandedGroupKeys, setExpandedGroupKeys] = useState<string[]>([]);

  useEffect(() => {
    if (parentKey) {
      setExpandedGroupKeys((prev) =>
        prev.includes(parentKey) ? prev : [...prev, parentKey],
      );
    }
  }, [parentKey]);

  const handleToggleGroup = useCallback((groupKey: string) => {
    setExpandedGroupKeys((prev) =>
      prev.includes(groupKey)
        ? prev.filter((k) => k !== groupKey)
        : [...prev, groupKey],
    );
  }, []);

  const defaultExtraActions = {
    collapsePanelAction: (
      <div className={clsx(`${className}-actions-item`, hashId)}>
        <ProfileOutlined
          title="collapse panel"
          onClick={() => {
            setShowLeftPanel(!showLeftPanel);
          }}
        />
      </div>
    ),
    helpSelectAction: (
      <ProHelpSelect
        iconClassName={clsx(`${className}-actions-item`, hashId)}
        className={clsx(hashId, `${className}-actions-input`)}
        value={selectedKey}
        onChange={(value, option) => {
          setSelectedKey(value);
          const groupKey = (option as { dataItemKey?: string } | undefined)
            ?.dataItemKey;
          if (groupKey) {
            setExpandedGroupKeys((prev) =>
              prev.includes(groupKey) ? prev : [...prev, groupKey],
            );
          }
        }}
      />
    ),
    closeAction: (
      <div className={clsx(`${className}-actions-item`, hashId)}>
        <CloseOutlined
          title="close panel"
          onClick={() => {
            onClose?.();
          }}
        />
      </div>
    ),
  };

  const extraDomList = () => {
    return (
      <div className={clsx(`${className}-actions`, hashId)}>
        {extraRender ? (
          extraRender(
            defaultExtraActions.collapsePanelAction,
            defaultExtraActions.helpSelectAction,
            defaultExtraActions.closeAction,
          )
        ) : (
          <>
            {defaultExtraActions.collapsePanelAction}
            {defaultExtraActions.helpSelectAction}
            {onClose ? defaultExtraActions.closeAction : null}
          </>
        )}
      </div>
    );
  };

  return wrapSSR(
    <SelectKeyProvide.Provider
      value={{
        selectedKey: selectedKey,
        setSelectedKey: setSelectedKey,
      }}
    >
      <Card
        variant={variant}
        title={title}
        styles={{
          body: {
            display: 'flex',
            padding: 0,
            margin: 0,
            height: '100%',
            width: '100%',
          },
        }}
        size="small"
        extra={extraDomList()}
      >
        {showLeftPanel ? (
          <div
            className={clsx(hashId, `${className}-left-panel`)}
            style={{
              height,
            }}
          >
            <nav
              className={clsx(hashId, `${className}-left-panel-nav`)}
              aria-label={title}
            >
              <ul
                className={clsx(hashId, `${className}-left-panel-tree`)}
                role="list"
              >
                {dataSource.map((group) => {
                  const gKey = String(group.key);
                  const groupOpen = expandedGroupKeys.includes(gKey);
                  return (
                    <li
                      key={gKey}
                      className={clsx(hashId, `${className}-nav-group`)}
                      role="presentation"
                    >
                      <button
                        type="button"
                        className={clsx(hashId, `${className}-nav-group-title`)}
                        aria-expanded={groupOpen}
                        onClick={() => handleToggleGroup(gKey)}
                      >
                        {group.title}
                      </button>
                      {groupOpen && group.children?.length ? (
                        <ul
                          className={clsx(
                            hashId,
                            `${className}-nav-leaf-list`,
                          )}
                          role="list"
                        >
                          {group.children.map((child) => {
                            const ck = String(child.key ?? child.title);
                            const isSel = selectedKey === ck;
                            return (
                              <li key={ck} role="presentation">
                                <button
                                  type="button"
                                  className={clsx(
                                    hashId,
                                    `${className}-nav-leaf`,
                                    {
                                      [`${className}-nav-leaf--selected`]:
                                        isSel,
                                    },
                                  )}
                                  aria-current={isSel ? 'true' : undefined}
                                  onClick={() => setSelectedKey(ck)}
                                >
                                  {child.title}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        ) : null}
        <div
          className={clsx(hashId, `${className}-content-panel`)}
          style={{
            height,
          }}
        >
          {selectedKey ? (
            <ProHelpContentPanel
              parentItem={dataSourceKeyMap.get(parentKey)}
              className={clsx(`${className}-content-render`, hashId)}
              selectedKey={selectedKey}
              onScroll={(key) => setSelectedKey(key)}
            />
          ) : null}
          {footer ? (
            <div className={clsx(hashId, `${className}-footer`)}>{footer}</div>
          ) : null}
        </div>
      </Card>
    </SelectKeyProvide.Provider>,
  );
};
