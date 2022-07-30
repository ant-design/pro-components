import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-chart': {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '8px',
        marginBottom: '8px',
        '&-left': { marginTop: '0', marginRight: '16px' },
        '&-right': { marginTop: '0', marginLeft: '16px' },
      },
      '&-content': {
        display: 'flex',
        flexDirection: 'column',
        '&-horizonta': {
          flexDirection: 'row',
          [`${token.componentCls}-chart`]: { alignItems: 'center', alignSelf: 'flex-start' },
        },
      },
      '&-footer': {
        marginTop: '8px',
        paddingTop: '16px',
        borderTop: `rgba(0, 0, 0, 0.08) solid ${token.colorBorder}`,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('CheckCard', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proListToken)];
  });
}
