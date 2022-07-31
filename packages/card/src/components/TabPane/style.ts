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
          marginBottom: 0,
          [`${token.antCls}-tabs-nav-list`]: {
            marginTop: token.marginXS,
            paddingLeft: token.padding,
          },
        },
        [`${token.antCls}-tabs-bottom > ${token.antCls}-tabs-nav`]: {
          marginBottom: 0,
          [`${token.antCls}-tabs-nav-list`]: {
            paddingLeft: token.padding,
          },
        },
        [`${token.antCls}-tabs-left`]: {
          [`${token.antCls}-tabs-content-holder`]: {
            [`${token.antCls}-tabs-content`]: {
              [`${token.antCls}-tabs-tabpane`]: {
                paddingLeft: 0,
              },
            },
          },
        },
        [`${token.antCls}-tabs-left > ${token.antCls}-tabs-nav`]: {
          marginRight: 0,
          [`${token.antCls}-tabs-nav-list`]: {
            paddingTop: token.padding,
          },
        },
        [`${token.antCls}-tabs-right`]: {
          [`${token.antCls}-tabs-content-holder`]: {
            [`${token.antCls}-tabs-content`]: {
              [`${token.antCls}-tabs-tabpane`]: {
                paddingLeft: 0,
              },
            },
          },
        },
        [`${token.antCls}-tabs-right > ${token.antCls}-tabs-nav`]: {
          [`${token.antCls}-tabs-nav-list`]: {
            paddingTop: token.padding,
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
