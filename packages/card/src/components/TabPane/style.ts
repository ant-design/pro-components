import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-tabs': {
        [`${token.antCls}-tabs-top > ${token.antCls}-tabs-nav`]: {
          marginBlockEnd: 0,
          [`${token.antCls}-tabs-nav-list`]: {
            marginBlockStart: token.marginXS,
            paddingInlineStart: token.padding,
          },
        },
        [`${token.antCls}-tabs-bottom > ${token.antCls}-tabs-nav`]: {
          marginBlockEnd: 0,
          [`${token.antCls}-tabs-nav-list`]: {
            paddingInlineStart: token.padding,
          },
        },
        [`${token.antCls}-tabs-left`]: {
          [`${token.antCls}-tabs-content-holder`]: {
            [`${token.antCls}-tabs-content`]: {
              [`${token.antCls}-tabs-tabpane`]: {
                paddingInlineStart: 0,
              },
            },
          },
        },
        [`${token.antCls}-tabs-left > ${token.antCls}-tabs-nav`]: {
          marginInlineEnd: 0,
          [`${token.antCls}-tabs-nav-list`]: {
            paddingBlockStart: token.padding,
          },
        },
        [`${token.antCls}-tabs-right`]: {
          [`${token.antCls}-tabs-content-holder`]: {
            [`${token.antCls}-tabs-content`]: {
              [`${token.antCls}-tabs-tabpane`]: {
                paddingInlineStart: 0,
              },
            },
          },
        },
        [`${token.antCls}-tabs-right > ${token.antCls}-tabs-nav`]: {
          [`${token.antCls}-tabs-nav-list`]: {
            paddingBlockStart: token.padding,
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('CheckCard', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
