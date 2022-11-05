import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { setAlpha, useStyle as useAntdStyle } from '@ant-design/pro-utils';

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
              backgroundColor: token?.layout?.header?.colorBgRightActionsItemHover,
            },
          },
        },
        '&-avatar': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingInlineStart: '16px',
          paddingInlineEnd: '16px',
          color: setAlpha(token.colorTextBase, 0.65),
          '> div': {
            height: '44px',
            color: setAlpha(token.colorTextBase, 0.65),
            paddingInline: 8,
            paddingBlock: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '44px',
            borderRadius: token.borderRadius,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
            },
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('RightContent', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genTopNavHeaderStyle(proToken)];
  });
}
