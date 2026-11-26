import type { GlobalToken } from 'antd';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useContext } from 'react';
import { createStyleCalc } from './calc';

/**
 * antd's public useToken returns real values in `token` and the CSS-variable
 * view in `cssVar`. Read its internal context from the same antd package copy
 * as the surrounding ConfigProvider to preserve custom prefixes and cssVar: false.
 */
export function useAntdCssVar(token: GlobalToken) {
  const { cssVar } = useContext(antdTheme._internalContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const tokenContext = antdTheme.useToken();
  const prefix = cssVar?.prefix ?? getPrefixCls();
  const enabled = cssVar !== undefined;
  return {
    token: enabled ? tokenContext.cssVar : token,
    prefix: enabled ? prefix : undefined,
    calc: enabled ? createStyleCalc(prefix) : undefined,
  };
}
