import React from 'react';
import { Switch, List } from 'antd';
import type { ProSettings } from '../../defaultSettings';
import { getFormatMessage } from './index';
import { renderLayoutSettingItem } from './LayoutChange';

const RegionalSetting: React.FC<{
  settings: Partial<ProSettings>;
  changeSetting: (key: string, value: any, hideLoading?: boolean) => void;
}> = ({ settings = {}, changeSetting }) => {
  const formatMessage = getFormatMessage();
  const regionalSetting = ['header', 'footer', 'menu', 'menuHeader'];
  return (
    <List
      split={false}
      renderItem={renderLayoutSettingItem}
      dataSource={regionalSetting.map((key) => {
        return {
          title: formatMessage({ id: `app.setting.regionalsettings.${key}` }),
          action: (
            <Switch
              size="small"
              className={`regional-${key}`}
              checked={settings[`${key}Render`] || settings[`${key}Render`] === undefined}
              onChange={(checked) =>
                changeSetting(`${key}Render`, checked === true ? undefined : false)
              }
            />
          ),
        };
      })}
    />
  );
};

export default RegionalSetting;
