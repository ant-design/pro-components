import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genTopNavHeaderStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-header-actions': {
        display: 'flex',
        height: '100%',
        '&-item': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBlock: 0,
          paddingInline: 2,
          color: token?.layout?.header?.colorTextRightActionsItem,
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: token.borderRadius,

          '> *': {
            paddingInline: 6,
            paddingBlock: 6,
            borderRadius: token.borderRadius,
            '&:hover': {
              backgroundColor:
                token?.layout?.header?.colorBgRightActionsItemHover,
            },
          },
        },
        '&-avatar': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingInlineStart: token.padding,
          paddingInlineEnd: token.padding,
          cursor: 'pointer',
          color: token.colorTextSecondary,
          '> div': {
            height: '44px',
            color: token.colorTextSecondary,
            paddingInline: 8,
            paddingBlock: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '44px',
            borderRadius: token.borderRadius,
            '&:hover': {
              backgroundColor:
                token?.layout?.header?.colorBgRightActionsItemHover,
            },
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayoutRightContent', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genTopNavHeaderStyle(proToken)];
  });
}
