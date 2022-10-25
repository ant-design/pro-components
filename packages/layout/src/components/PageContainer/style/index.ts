import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
export interface PageContainerToken extends ProAliasToken {
  componentCls: string;
}
const [sm, md, lg, xl] = [576, 768, 992, 1200].map((bp) => `@media (min-width: ${bp}px)`);

const genPageContainerStyle: GenerateStyle<PageContainerToken> = (token) => {
  console.log(token.layout);
  return {
    [token.componentCls]: {
      position: 'relative',
      '&-children-content': {
        paddingBlock: token.layout?.pageContainer?.paddingBlockPageContainerContent,
        paddingInline: token.layout?.pageContainer?.paddingInlinePageContainerContent,
      },
      '&-affix': {
        [`${token.antCls}-affix`]: {
          [`${token.componentCls}-warp`]: {
            backgroundColor: token.layout?.pageContainer?.colorBgPageContainerFixed,
            transition: 'background-color 0.3s',
            boxShadow: '0 2px 8px #f0f1f2',
          },
        },
      },
      ['& &-warp-page-header']: {
        paddingBlockEnd: (token.layout?.pageContainer?.paddingBlockPageContainerContent ?? 40) / 2,
        paddingInlineStart: token.layout?.pageContainer?.paddingInlinePageContainerContent,
        paddingInlineEnd: token.layout?.pageContainer?.paddingInlinePageContainerContent,
        [`& ~ ${token.proComponentsCls}-grid-content`]: {
          [`${token.proComponentsCls}-page-container-children-content`]: {
            paddingBlock: (token.layout?.pageContainer?.paddingBlockPageContainerContent ?? 24) / 3,
          },
        },
      },
      '&-detail': {
        display: 'flex',
        [sm]: {
          display: 'block',
        },
      },
      '&-main': {
        width: '100%',
      },
      '&-row': {
        display: 'flex',
        width: '100%',
        [md]: {
          display: 'block',
        },
      },
      '&-content': {
        flex: 'auto',
        width: '100%',
      },
      '&-extraContent': {
        flex: '0 1 auto',
        minWidth: '242px',
        marginInlineStart: 88,
        textAlign: 'end',
        [sm]: {
          marginInlineStart: 0,
        },
        [md]: {
          marginInlineStart: 0,
          textAlign: 'start',
        },
        [lg]: {
          marginInlineStart: 20,
        },
        [xl]: {
          marginInlineStart: 44,
        },
      },
    },
  };
};

export type pageContainerToken = {
  paddingInlinePageContainerContent?: number;
  paddingBlockPageContainerContent?: number;
};

export function useStyle(prefixCls: string, componentsToken: pageContainerToken | undefined) {
  return useAntdStyle('PageContainer', (token) => {
    const proCardToken: PageContainerToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      ...componentsToken,
    };
    return [genPageContainerStyle(proCardToken)];
  });
}
