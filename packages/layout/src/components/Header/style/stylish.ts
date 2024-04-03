import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
export interface stylishToken extends ProAliasToken {
  componentCls: string;
  proLayoutCollapsedWidth: number;
}

export function useStylish(
  prefixCls: string,
  {
    stylish,
    proLayoutCollapsedWidth,
  }: {
    stylish?: GenerateStyle<stylishToken>;
    proLayoutCollapsedWidth: number;
  },
) {
  return useAntdStyle('ProLayoutHeaderStylish', (token) => {
    const stylishToken: stylishToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutCollapsedWidth,
    };
    if (!stylish) return [];

    return [
      {
        [`div${token.proComponentsCls}-layout`]: {
          [`${stylishToken.componentCls}`]: stylish?.(stylishToken),
        },
      },
    ];
  });
}
