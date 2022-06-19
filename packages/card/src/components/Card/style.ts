import { ConfigProvider } from '@madccc/antd';
import type { AliasToken, GenerateStyle } from '@madccc/antd/es/_util/theme';

const { useStyle: useAntdStyle } = ConfigProvider;

interface ProCardToken extends AliasToken {
  componentCls: string;
  cardHoverableHoverBorder: string;
  proCardDefaultBorder: string;
  cardShadow: string;
}

const genActiveStyle = (token: ProCardToken) => ({
  backgroundColor: token.controlItemBgActive,
  borderColor: token.colorPrimaryOutline,
});

const genProCardStyle: GenerateStyle<ProCardToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      width: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: token.colorBgComponent,
      borderRadius: token.radiusBase,

      '&-col': {
        width: '100%',
      },

      '&-border': {
        border: token.proCardDefaultBorder,
      },

      '&-hoverable': {
        cursor: 'pointer',
        transition: 'box-shadow 0.3s, border-color 0.3s',

        '&:hover': {
          borderColor: token.cardHoverableHoverBorder,
          boxShadow: token.cardShadow,
        },

        [`&${componentCls}-checked:hover`]: {
          borderColor: token.colorPrimaryOutline,
        },
      },

      '&-checked': {
        ...genActiveStyle(token),
        '&::after': {
          position: 'absolute',
          top: 2,
          insetInlineEnd: 2,
          width: 0,
          height: 0,
          border: `6px solid ${token.colorPrimary}`,
          borderBottom: '6px solid transparent',
          borderInlineStart: '6px solid transparent',
          borderStartEndRadius: 2,
          content: '""',
        },
      },

      '&:focus': {
        ...genActiveStyle(token),
      },

      '&&-size-small': {
        [componentCls]: {
          '&-header': {
            padding: `${token.paddingXS}px ${token.paddingSM}px`,
            paddingBottom: 0,

            '&-border': {
              paddingBottom: token.paddingXS,
            },
          },

          '&-title': {
            fontSize: token.fontSize,
          },

          '&-body': {
            padding: token.paddingSM,
          },
        },
      },

      '&&-ghost': {
        backgroundColor: 'transparent',

        [`> ${componentCls}`]: {
          '&-header': {
            paddingInlineEnd: 0,
            paddingBottom: token.padding,
            paddingInlineStart: 0,
          },

          '&-body': {
            padding: 0,
            backgroundColor: 'transparent',
          },
        },
      },

      '&&-split > &-body': {
        padding: 0,
      },

      '&&-contain-card > &-body': {
        display: 'flex',
      },

      [`${componentCls}-body-direction-column`]: {
        flexDirection: 'column',
      },

      [`${componentCls}-body-wrap`]: {
        flexWrap: 'wrap',
      },

      '&&-collapse': {
        [`> ${componentCls}`]: {
          '&-header': {
            paddingBottom: token.padding,
            borderBottom: 0,
          },

          '&-body': {
            display: 'none',
          },
        },
      },

      [`${componentCls}-header`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${token.padding}px ${token.paddingLG}px`,
        paddingBottom: 0,
        '&-border': {
          '&': {
            paddingBottom: token.padding,
          },
          borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        },

        '&-collapsible': {
          cursor: 'pointer',
        },
      },

      [`${componentCls}-title`]: {
        color: token.colorText,
        fontWeight: 500,
        fontSize: token.fontSizeLG,
      },

      [`${componentCls}-extra`]: {
        color: token.colorText,
      },

      [`${componentCls}-type-inner`]: {
        [`${componentCls}-header`]: {
          backgroundColor: token.colorBgComponentSecondary,
        },
      },

      [`${componentCls}-collapsible-icon`]: {
        marginInlineEnd: token.marginXS,
        color: token.colorActionHover,
        ':hover': {
          color: token.colorPrimaryHover,
        },

        '& svg': {
          transition: `transform ${token.motionDurationMid}`,
        },
      },

      [`${componentCls}-body`]: {
        display: 'block',
        boxSizing: 'border-box',
        height: '100%',
        padding: token.paddingLG,

        '&-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },

    [`${componentCls}-col`]: {
      [`&${componentCls}-split-vertical`]: {
        borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      },

      [`&${componentCls}-split-horizontal`]: {
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      },
    },
  };
};

const GRID_COLUMNS = 24;

const genColStyle = (index: number, token: ProCardToken) => {
  const { componentCls } = token;

  if (index === 0) {
    return {
      [`${componentCls}-col-0`]: {
        display: 'none',
      },
    };
  }

  return {
    [`${componentCls}-col-${index}`]: {
      flexShrink: 0,
      width: `${Math.round((index / GRID_COLUMNS) * 100)}%`,
    },
  };
};

const genGridStyle: GenerateStyle<ProCardToken> = (token) => {
  return Array(GRID_COLUMNS + 1)
    .fill(1)
    .map((_, index) => genColStyle(index, token));
};

export default function useStyle() {
  return useAntdStyle('ProCard', (token) => {
    const proCardToken: ProCardToken = {
      ...token,
      componentCls: '.ant-pro-card',
      cardHoverableHoverBorder: 'transparent',
      proCardDefaultBorder: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      cardShadow:
        '0 1px 2px -2px rgba(0, 0, 0, 0.64), 0 3px 6px 0 rgba(0, 0, 0, 0.48), 0 5px 12px 4px rgba(0, 0, 0, 0.36)',
    };

    return [genProCardStyle(proCardToken), genGridStyle(proCardToken)];
  });
}
