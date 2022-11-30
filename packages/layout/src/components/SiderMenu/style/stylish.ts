import type { ProAliasToken } from '@ant-design/pro-utils';
import type { GenerateStyle } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
export interface SiderMenuToken extends ProAliasToken {
  componentCls: string;
  proLayoutCollapsedWidth: number;
}

export function useStylish(
  prefixCls: string,
  {
    stylish,
    proLayoutCollapsedWidth,
  }: {
    stylish?: GenerateStyle<SiderMenuToken>;
    proLayoutCollapsedWidth: number;
  },
) {
  return useAntdStyle('ProLayoutSiderMenuStylish', (token) => {
    const siderMenuToken: SiderMenuToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutCollapsedWidth,
    };
    if (!stylish) return [];
    return [
      {
        [token.proComponentsCls]: {
          [`${token.proComponentsCls}-layout`]: {
            [`${siderMenuToken.componentCls}`]: stylish?.(siderMenuToken),
          },
        },
      },
    ];
  });
}
