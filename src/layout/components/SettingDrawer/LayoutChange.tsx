import { List, Select, Switch, Tooltip } from 'antd';
import React from 'react';
import type { ProSettings } from '../../defaultSettings';
import { defaultSettings } from '../../defaultSettings';
import type { SettingItemProps } from './index';
import { getFormatMessage } from './index';

export const renderLayoutSettingItem = (item: SettingItemProps) => {
  const action = React.cloneElement(item.action, {
    // @ts-ignore
    disabled: item.disabled,
  });
  return (
    <Tooltip placement="left" title={item.disabled ? item.disabledReason : ''}>
      <List.Item actions={[action]}>
        <span style={{ opacity: item.disabled ? 0.5 : 1 }}>{item.title}</span>
      </List.Item>
    </Tooltip>
  );
};
const LayoutSetting: React.FC<{
  settings: Partial<ProSettings>;
  changeSetting: (key: string, value: any, hideLoading?: boolean) => void;
  hashId: string;
  prefixCls: string;
}> = ({ settings, prefixCls, changeSetting, hashId }) => {
  const formatMessage = getFormatMessage();
  const { contentWidth, splitMenus, fixedHeader, layout, fixSiderbar } = settings || defaultSettings;

  return (
    <List
      className={`${prefixCls}-list ${hashId}`.trim()}
      dataSource={[
        {
          title: formatMessage({
            id: 'app.setting.content-width',
            defaultMessage: 'Content Width',
          }),
          action: (
            <Select
              className={`content-width ${hashId}`.trim()}
              size="small"
              style={{ width: 80 }}
              value={contentWidth || 'Fixed'}
              onSelect={(value: string) => {
                changeSetting('contentWidth', value);
              }}
            >
              {layout === 'side' ? null : (
                <Select.Option value="Fixed">
                  {formatMessage({
                    id: 'app.setting.content-width.fixed',
                    defaultMessage: 'Fixed',
                  })}
                </Select.Option>
              )}
              <Select.Option value="Fluid">
                {formatMessage({
                  id: 'app.setting.content-width.fluid',
                  defaultMessage: 'Fluid',
                })}
              </Select.Option>
            </Select>
          ),
        },
        {
          title: formatMessage({
            id: 'app.setting.fixedheader',
            defaultMessage: 'Fixed Header',
          }),
          action: (
            <Switch
              checked={!!fixedHeader}
              className="fixed-header"
              size="small"
              onChange={(checked) => {
                changeSetting('fixedHeader', checked);
              }}
            />
          ),
        },
        {
          title: formatMessage({
            id: 'app.setting.fixedsidebar',
            defaultMessage: 'Fixed Sidebar',
          }),
          disabled: layout === 'top',
          disabledReason: formatMessage({
            id: 'app.setting.fixedsidebar.hint',
            defaultMessage: 'Works on Side Menu Layout',
          }),
          action: (
            <Switch
              checked={!!fixSiderbar}
              className="fix-siderbar"
              size="small"
              onChange={(checked) => changeSetting('fixSiderbar', checked)}
            />
          ),
        },
        {
          title: formatMessage({ id: 'app.setting.splitMenus' }),
          disabled: layout !== 'mix',
          action: (
            <Switch
              checked={!!splitMenus}
              className="split-menus"
              size="small"
              onChange={(checked) => {
                changeSetting('splitMenus', checked);
              }}
            />
          ),
        },
      ]}
      renderItem={renderLayoutSettingItem}
      split={false}
    />
  );
};

export { LayoutSetting };
