import { theme as antdTheme } from 'antd';
import React from 'react';
import { defaultIntl } from './defaultIntl';
import type { ConfigContextPropsType } from './typing/config';

export const ProConfigContext = React.createContext<ConfigContextPropsType>({
  intl: defaultIntl,
  valueTypeMap: {},
  hashed: true,
  dark: false,
  token: {
    ...antdTheme.getDesignToken(),
    proComponentsCls: '.ant-pro',
    antCls: '.ant',
    iconCls: '.anticon',
    themeId: 0,
  },
  prefixCls: '.ant-pro',
});

ProConfigContext.displayName = 'ProProvider';
