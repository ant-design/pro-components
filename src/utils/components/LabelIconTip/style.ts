import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      maxWidth: '100%',
      '&-icon': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginInlineStart: token.marginXXS,
        padding: token.paddingXXS,
        color: token.colorTextTertiary,
        lineHeight: 1,
        cursor: 'pointer',
        borderRadius: token.borderRadiusSM,
        transition: `color ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,
        '&:hover': {
          color: token.colorText,
          backgroundColor: token.colorBgTextHover,
        },
        '&:active': {
          backgroundColor: token.colorBgTextActive,
        },
      },
      '&-title': { display: 'inline-flex', flex: '1' },
      '&-subtitle ': {
        marginInlineStart: token.marginXS,
        color: token.colorTextSecondary,
        fontWeight: 'normal',
        fontSize: token.fontSize,
        whiteSpace: 'nowrap',
      },
      '&-title-ellipsis': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'keep-all',
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('LabelIconTip', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
