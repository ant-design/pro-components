import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [`${token.componentCls}-collapse-label`]: {
      paddingInline: 1,
      paddingBlock: 1,
    },
    [`${token.componentCls}-container`]: {
      [`${token.antCls}-form-item`]: {
        marginBlockEnd: 0,
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
