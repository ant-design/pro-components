import { List, Select, Switch, Tooltip } from 'antd';
import React from 'react';
import type { ProSettings } from '../../defaultSettings';
import { defaultSettings } from '../../defaultSettings';
import type { SettingItemProps } from './index';
import { getFormatMessage } from './index';

export const renderLayoutSettingItem = (item: SettingItemProps) => {
  const action = React.cloneElement(item.action, {
    disabled: item.disabled,
  });
  return (
    <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
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
}> = ({ settings = {}, prefixCls, changeSetting, hashId }) => {
  const formatMessage = getFormatMessage();
  const { contentWidth, splitMenus, fixedHeader, layout, fixSiderbar } =
    settings || defaultSettings;

  return (
    <List
      className={`${prefixCls}-list ${hashId}`.trim()}
      split={false}
      dataSource={[
        {
          title: formatMessage({
            id: 'app.setting.content-width',
            defaultMessage: 'Content Width',
          }),
          action: (
            <Select
              value={contentWidth || 'Fixed'}
              size="small"
              className={`content-width ${hashId}`.trim()}
              onSelect={(value: string) => {
                changeSetting('contentWidth', value);
              }}
              style={{ width: 80 }}
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
              size="small"
              className="fixed-header"
              checked={!!fixedHeader}
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
              size="small"
              className="fix-siderbar"
              checked={!!fixSiderbar}
              onChange={(checked) => changeSetting('fixSiderbar', checked)}
            />
          ),
        },
        {
          title: formatMessage({ id: 'app.setting.splitMenus' }),
          disabled: layout !== 'mix',
          action: (
            <Switch
              size="small"
              checked={!!splitMenus}
              className="split-menus"
              onChange={(checked) => {
                changeSetting('splitMenus', checked);
              }}
            />
          ),
        },
      ]}
      renderItem={renderLayoutSettingItem}
    />
  );
};

export { LayoutSetting };
