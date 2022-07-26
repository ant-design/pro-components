import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { AliasToken, GenerateStyle } from 'antd/es/theme';

export interface PageContainerToken extends AliasToken {
  componentCls: string;
  pageContainerBgColor: string;
}
const [sm, md, lg, xl] = [576, 768, 992, 1200].map((bp) => `@media (min-width: ${bp}px)`);

const genPageContainerStyle: GenerateStyle<PageContainerToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      '&-layout-has-margin': {
        margin: -24,
      },
      '&-children-content': {
        margin: 24,
      },
      '&-affix': {
        [`${token.componentCls}-warp`]: {
          backgroundColor: token.colorBgContainer,
        },
      },
      '&-warp': {
        backgroundColor: token.pageContainerBgColor,
        ['&--page-header']: {
          paddingLeft: 40,
          paddingRight: 40,
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
        marginLeft: 88,
        textAlign: 'right',
        [sm]: {
          marginLeft: 0,
        },
        [md]: {
          marginLeft: 0,
          textAlign: 'left',
        },
        [lg]: {
          marginLeft: 20,
        },
        [xl]: {
          marginLeft: 44,
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
