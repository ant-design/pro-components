import { genStyleUtils } from '@ant-design/cssinjs-utils';
import {
  ConfigContext,
  defaultIconPrefixCls,
} from 'antd/es/config-provider/context';
import { genCommonStyle, genIconStyle, genLinkStyle } from 'antd/es/style';
import useLocalToken from 'antd/es/theme/useToken';
import { useContext } from 'react';

import './augmentComponentTokenMap';

/**
 * Same pipeline as `antd/theme/util/genStyleUtils` (`genStyleHooks` + component tokens),
 * with styles registered under the `antd-pro` layer.
 */
export const {
  genStyleHooks: genProStyleHooks,
  genComponentStyleHook: genProComponentStyleHook,
  genSubStyleComponent: genProSubStyleComponent,
} = genStyleUtils({
  usePrefix: () => {
    const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);
    return {
      rootPrefixCls: getPrefixCls(),
      iconPrefixCls,
    };
  },
  useToken: () => {
    const [theme, realToken, hashId, token, cssVar, zeroRuntime] =
      useLocalToken();
    return { theme, realToken, hashId, token, cssVar, zeroRuntime };
  },
  useCSP: () => {
    const { csp } = useContext(ConfigContext);
    return csp ?? {};
  },
  getResetStyles: (token, config) => {
    const linkStyle = genLinkStyle(token);
    return [
      linkStyle,
      { '&': linkStyle },
      genIconStyle(config?.prefix.iconPrefixCls ?? defaultIconPrefixCls),
    ];
  },
  getCommonStyle: genCommonStyle,
  layer: {
    name: 'antd-pro',
  },
});
