import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface PageContainerToken extends ProAliasToken {
  componentCls: string;
  pageContainerBgColor: string;
}
const [sm, md, lg, xl] = [576, 768, 992, 1200].map((bp) => `@media (min-width: ${bp}px)`);

const genPageContainerStyle: GenerateStyle<PageContainerToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      '&-layout-has-margin': {
        marginBlock: -24,
        marginInline: -24,
      },
      '&-children-content': {
        marginBlock: 24,
        marginInline: 24,
      },
      '&-affix': {
        [`${token.antCls}-affix`]: {
          [`${token.componentCls}-warp`]: {
            backgroundColor: token.colorBgContainer,
            boxShadow: '0 2px 8px #f0f1f2',
          },
        },
      },
      '&-warp': {
        backgroundColor: token.pageContainerBgColor,
        ['&-page-header']: {
          paddingInlineStart: 40,
          paddingInlineEnd: 40,
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

export function useStyle(prefixCls: string) {
  return useAntdStyle('page-container', (token) => {
    const proCardToken: PageContainerToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      pageContainerBgColor: 'transparent',
    };

    return [genPageContainerStyle(proCardToken)];
  });
}
