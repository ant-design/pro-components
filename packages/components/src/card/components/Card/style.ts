import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import {
  resetComponent,
  useStyle as useAntdStyle,
} from '@ant-design/pro-utils';

interface ProCardToken extends ProAliasToken {
  componentCls: string;
}

const genActiveStyle = (token: ProCardToken) => ({
  backgroundColor: token.controlItemBgActive,
  borderColor: token.controlOutline,
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
      marginBlock: 0,
      marginInline: 0,
      paddingBlock: 0,
      paddingInline: 0,
      backgroundColor: token.colorBgContainer,
      borderRadius: token.borderRadius,
      transition: 'all 0.3s',
      ...resetComponent?.(token),

      '&-box-shadow': {
        boxShadow:
          '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017',
        borderColor: 'transparent',
      },
      '&-col': {
        width: '100%',
      },

      '&-border': {
        border: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      },

      '&-hoverable': {
        cursor: 'pointer',
        transition: 'box-shadow 0.3s, border-color 0.3s',

        '&:hover': {
          borderColor: 'transparent',
          boxShadow:
            '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017',
        },

        [`&${componentCls}-checked:hover`]: {
          borderColor: token.controlOutline,
        },
      },

      '&-checked': {
        ...genActiveStyle(token),
        '&::after': {
          visibility: 'visible',
          position: 'absolute',
          insetBlockStart: 2,
          insetInlineEnd: 2,
          opacity: 1,
          width: 0,
          height: 0,
          border: `6px solid ${token.colorPrimary}`,
          borderBlockEnd: '6px solid transparent',
          borderInlineStart: '6px solid transparent',
          borderStartEndRadius: 2,
          content: '""',
        },
      },

      '&:focus': {
        ...genActiveStyle(token),
      },

      '&&-ghost': {
        backgroundColor: 'transparent',

        [`> ${componentCls}`]: {
          '&-header': {
            paddingInlineEnd: 0,
            paddingBlockEnd: token.padding,
            paddingInlineStart: 0,
          },

          '&-body': {
            paddingBlock: 0,
            paddingInline: 0,
            backgroundColor: 'transparent',
          },
        },
      },

      '&&-split > &-body': {
        paddingBlock: 0,
        paddingInline: 0,
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
            paddingBlockEnd: token.padding,
            borderBlockEnd: 0,
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
        paddingInline: token.paddingLG,
        paddingBlock: token.padding,
        paddingBlockEnd: 0,
        '&-border': {
          '&': {
            paddingBlockEnd: token.padding,
          },
          borderBlockEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        },

        '&-collapsible': {
          cursor: 'pointer',
        },
      },

      [`${componentCls}-title`]: {
        color: token.colorText,
        fontWeight: 500,
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeight,
      },

      [`${componentCls}-extra`]: {
        color: token.colorText,
      },

      [`${componentCls}-type-inner`]: {
        [`${componentCls}-header`]: {
          backgroundColor: token.colorFillAlter,
        },
      },

      [`${componentCls}-collapsible-icon`]: {
        marginInlineEnd: token.marginXS,
        color: token.colorIconHover,
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
        paddingInline: token.paddingLG,
        paddingBlock: token.padding,
        '&-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },

      '&&-size-small': {
        [componentCls]: {
          '&-header': {
            paddingInline: token.paddingSM,
            paddingBlock: token.paddingXS,
            paddingBlockEnd: 0,

            '&-border': {
              paddingBlockEnd: token.paddingXS,
            },
          },

          '&-title': {
            fontSize: token.fontSize,
          },

          '&-body': {
            paddingInline: token.paddingSM,
            paddingBlock: token.paddingSM,
          },
        },
        [`${componentCls}-header${componentCls}-header-collapsible`]: {
          paddingBlock: token.paddingXS,
        },
      },
    },

    [`${componentCls}-col`]: {
      [`&${componentCls}-split-vertical`]: {
        borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      },

      [`&${componentCls}-split-horizontal`]: {
        borderBlockEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      },
    },

    [`${componentCls}-tabs`]: {
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
      // 这里是为了保证 tabs 的高度和左侧的一致
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
      width: `${(index / GRID_COLUMNS) * 100}%`,
    },
  };
};

const genGridStyle: GenerateStyle<ProCardToken> = (token) => {
  return Array(GRID_COLUMNS + 1)
    .fill(1)
    .map((_, index) => genColStyle(index, token));
};

export default function useStyle(prefixCls: string) {
  return useAntdStyle('ProCard', (token) => {
    const proCardToken: ProCardToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProCardStyle(proCardToken), genGridStyle(proCardToken)];
  });
}
