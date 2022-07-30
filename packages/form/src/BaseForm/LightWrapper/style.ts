import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [`${token.componentCls}-collapse-label`]: {
      padding: 1,
    },
    [`${token.componentCls}-container`]: {
      [`${token.antCls}-form-item`]: {
        marginBottom: 0,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('LightWrapper', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
