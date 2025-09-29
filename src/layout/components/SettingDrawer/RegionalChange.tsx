import { List, Switch } from 'antd';
import React from 'react';
import type { ProSettings } from '../../defaultSettings';
import { getFormatMessage } from './index';
import { renderLayoutSettingItem } from './LayoutChange';

const RegionalSetting: React.FC<{
  settings: Partial<ProSettings>;
  changeSetting: (key: string, value: any, hideLoading?: boolean) => void;
  hashId: string;
  prefixCls: string;
}> = ({ settings, prefixCls, changeSetting, hashId }) => {
  const formatMessage = getFormatMessage();
  const regionalSetting = ['header', 'footer', 'menu', 'menuHeader'];
  return (
    <List
      className={`${prefixCls}-list ${hashId}`.trim()}
      dataSource={regionalSetting.map((key) => {
        return {
          title: formatMessage({ id: `app.setting.regionalsettings.${key}` }),
          action: (
            <Switch
              checked={
                settings[`${key}Render` as 'headerRender'] || settings[`${key}Render` as 'headerRender'] === undefined
              }
              className={`regional-${key} ${hashId}`.trim()}
              size="small"
              onChange={(checked) => changeSetting(`${key}Render`, checked === true ? undefined : false)}
            />
          ),
        };
      })}
      renderItem={renderLayoutSettingItem}
      split={false}
    />
  );
};

export { RegionalSetting };
