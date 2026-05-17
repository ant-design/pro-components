import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

interface ProCardActionsToken extends ProAliasToken {
  antCls: string;
  componentCls: string;
  cardActionIconSize: number;
}

const genActionsStyle: GenerateStyle<ProCardActionsToken> = (token) => {
  const { componentCls, antCls } = token;

  return {
    [`${componentCls}-actions`]: {
      boxSizing: 'border-box',
      marginBlock: 0,
      marginInline: 0,
      paddingBlock: 0,
      paddingInline: 0,
      listStyle: 'none',
      display: 'flex',
      gap: token.marginXS,
      background: token.colorBgContainer,
      borderBlockStart: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      minHeight: 42,
      [`& > *`]: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        display: 'flex',
        cursor: 'pointer',
        color: token.colorTextSecondary,
        transition: `color ${token.motionDurationMid}`,
        '&:hover': {
          color: token.colorPrimaryHover,
        },
      },
      [`& > li > div`]: {
        flex: 1,
        width: '100%',
        marginBlock: token.marginSM,
        marginInline: 0,
        color: token.colorTextSecondary,
        textAlign: 'center',
        a: {
          color: token.colorTextSecondary,
          transition: `color ${token.motionDurationMid}`,
          '&:hover': {
            color: token.colorPrimaryHover,
          },
        },

        div: {
          position: 'relative',
          display: 'block',
          minWidth: token.controlHeight,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          cursor: 'pointer',
          transition: `color ${token.motionDurationMid}`,

          '&:hover': {
            color: token.colorPrimaryHover,
          },

          [`a:not(${antCls}-btn),
            > .anticon`]: {
            display: 'inline-block',
            width: '100%',
            color: token.colorTextSecondary,
            lineHeight: '22px',
            transition: `color ${token.motionDurationMid}`,

            '&:hover': {
              color: token.colorPrimaryHover,
            },
          },

          '.anticon': {
            fontSize: token.cardActionIconSize,
            lineHeight: '22px',
          },
        },

        '&:not(:last-child)': {
          borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        },
      },
    },
  };
};

export default function useStyle(prefixCls?: string) {
  return useAntdStyle('ProCardActions', (token) => {
    const proCardActionsToken: ProCardActionsToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      cardActionIconSize: token.fontSizeLG,
    };

    return [genActionsStyle(proCardActionsToken)];
  });
}
