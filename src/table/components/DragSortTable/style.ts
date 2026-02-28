import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '&-icon': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: token.controlHeightSM,
        minHeight: token.controlHeightSM,
        marginInlineEnd: token.marginSM,
        color: token.colorTextSecondary,
        cursor: 'grab !important',
        fontSize: token.fontSize,
        borderRadius: token.borderRadius,
        transition: `color ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,
        '& .anticon': {
          color: token.colorText,
          fontSize: 'inherit',
        },
        '&:hover': {
          color: token.colorText,
          backgroundColor: token.colorBgTextHover,
        },
        '&:active': {
          backgroundColor: token.colorBgTextActive,
        },
        '&:active': {
          backgroundColor: token.colorInfoBg,
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('DragSortTable', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProListStyle(proListToken)];
  });
}
