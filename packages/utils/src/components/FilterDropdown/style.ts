import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [`${token.componentCls}-label`]: { cursor: 'pointer' },
    [`${token.componentCls}-overlay`]: {
      minWidth: '200px',
      marginTop: '4px',
      backgroundColor: token.colorBgContainer,
      boxShadow: token.boxShadowCard,
      '*': {
        boxSizing: 'border-box',
      },
    },
    [`${token.componentCls}-content`]: { padding: '16px' },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('FilterDropdown', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
