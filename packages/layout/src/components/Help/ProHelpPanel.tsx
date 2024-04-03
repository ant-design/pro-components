import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { ProProvider, isNeedOpenHash } from '@ant-design/pro-provider';
import { coverToNewToken } from '@ant-design/pro-utils';
import { Card, ConfigProvider, Menu } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React, { useContext, useMemo, useState } from 'react';
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
   * 是否显示边框
   */
  bordered?: boolean;

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
  bordered = true,
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
  const [selectedKey, setSelectedKey] = useMergedState<string | undefined>(
    undefined,
    {
      defaultValue: props.defaultSelectedKey,
      value: props.selectedKey,
      onChange: props.onSelectedKeyChange,
    },
  );
  const [openKey, setOpenKey] = useState('');
  const { token } = useContext(ProProvider);
  const [showLeftPanel, setShowLeftPanel] = useMergedState(true, {
    value: props.showLeftPanel,
    onChange: props.onShowLeftPanelChange,
  });

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

  const defaultExtraActions = {
    collapsePanelAction: (
      <div className={`${className}-actions-item ${hashId}`.trim()}>
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
        iconClassName={`${className}-actions-item`}
        className={`${hashId} ${className}-actions-input`}
        value={selectedKey}
        onChange={(value, item) => {
          setSelectedKey(value);
          setOpenKey((item as any)?.dataItemKey);
        }}
      />
    ),
    closeAction: (
      <div className={`${className}-actions-item ${hashId}`.trim()}>
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
      <div className={`${className}-actions ${hashId}`.trim()}>
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
        bordered={bordered}
        title={title}
        bodyStyle={{
          display: 'flex',
          padding: 0,
          margin: 0,
          height: '100%',
          width: '100%',
        }}
        size="small"
        extra={extraDomList()}
      >
        {showLeftPanel ? (
          <div
            className={`${hashId} ${className}-left-panel `}
            style={{
              height,
            }}
          >
            <ConfigProvider
              theme={{
                hashed: isNeedOpenHash(),
                token: {
                  lineHeight: 1.2,
                  fontSize: 12,
                  controlHeightLG: 26,
                },
                components: {
                  Menu: coverToNewToken({
                    radiusItem: token.borderRadius,
                    colorActiveBarWidth: 0,
                    colorActiveBarBorderSize: 0,
                    colorItemBgSelected:
                      token.layout?.sider?.colorBgMenuItemSelected ||
                      'rgba(0, 0, 0, 0.04)',
                    colorItemBgActive:
                      token.layout?.sider?.colorBgMenuItemHover ||
                      'rgba(0, 0, 0, 0.04)',
                    colorItemText:
                      token.layout?.sider?.colorTextMenu ||
                      'rgba(0, 0, 0, 0.65)',
                    colorItemTextHover:
                      token.layout?.sider?.colorTextMenuActive ||
                      'rgba(0, 0, 0, 0.85)',
                    colorItemTextSelected:
                      token.layout?.sider?.colorTextMenuSelected ||
                      'rgba(0, 0, 0, 1)',
                    colorItemBg: 'transparent',
                    colorSubItemBg: 'transparent',
                    popupBg: token?.colorBgElevated,
                    darkPopupBg: token?.colorBgElevated,
                  }),
                },
              }}
            >
              <Menu
                className={`${hashId} ${className}-left-panel-menu`}
                openKeys={[parentKey, openKey]}
                onOpenChange={(keys) => {
                  setOpenKey(keys.at(-1) || '');
                }}
                selectedKeys={selectedKey ? [selectedKey] : []}
                onSelect={({ selectedKeys }) => {
                  setSelectedKey(selectedKeys.at(-1) || '');
                }}
                mode="inline"
                items={dataSource.map((item) => {
                  return {
                    key: item.key,
                    label: item.title,
                    children: item.children.map((child) => {
                      return {
                        key: child.key,
                        label: child.title,
                      };
                    }),
                  };
                })}
              />
            </ConfigProvider>
          </div>
        ) : null}
        <div
          className={`${hashId} ${className}-content-panel`}
          style={{
            height,
          }}
        >
          {selectedKey ? (
            <ProHelpContentPanel
              parentItem={dataSourceKeyMap.get(parentKey)}
              className={`${className}-content-render`}
              selectedKey={selectedKey}
              onScroll={(key) => setSelectedKey(key)}
            />
          ) : null}
          {footer ? (
            <div className={`${hashId} ${className}-footer`}>{footer}</div>
          ) : null}
        </div>
      </Card>
    </SelectKeyProvide.Provider>,
  );
};
