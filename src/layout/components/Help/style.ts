import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface ProHelpToken extends ProAliasToken {
  componentCls: string;
}

export const actionsInputAnimal = new Keyframes('actionsInputAnimal', {
  '0%': { width: '0px' },
  '30%': { width: '20px' },
  '100%': { width: '120px' },
});

const genProHelpStyle: GenerateStyle<ProHelpToken> = (token) => {
  return {
    [`${token.componentCls}-popover-text`]: {
      color: token.colorPrimary,
      cursor: 'pointer',
      boxSizing: 'border-box',
    },
    [`${token.componentCls}-popover-content`]: {
      maxWidth: 300,
      height: '600px',
      maxHeight: 'calc(100vh - 200px)',
      overflow: 'auto',
      paddingInline: 20,
      paddingBlockStart: 24,
      paddingBlockEnd: 32,
      boxSizing: 'border-box',
    },
    [`${token.componentCls}-left-panel`]: {
      overflow: 'auto',
      boxSizing: 'border-box',
      borderInlineEnd: `${token?.lineWidth}px solid ${token?.colorBorderSecondary}`,
      minHeight: '648px',
      minWidth: 190,
      maxWidth: 190,
      '&-nav': {
        width: 190,
        boxSizing: 'border-box',
        minWidth: 190,
        height: 'calc(100% - 40px)',
        marginBlock: 20,
        fontSize: 12,
        lineHeight: 1.2,
      },
      [`${token.componentCls}-left-panel-tree`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
      [`${token.componentCls}-nav-group`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
      [`${token.componentCls}-nav-group-title`]: {
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'start',
        cursor: 'pointer',
        border: 'none',
        background: 'transparent',
        color: token.layout?.sider?.colorTextMenu || token.colorTextSecondary,
        fontSize: 12,
        fontWeight: token.fontWeightStrong,
        lineHeight: 1.2,
        paddingBlock: 6,
        paddingInline: 8,
        borderRadius: token.borderRadius,
        marginBlockStart: 2,
        '&:hover': {
          color:
            token.layout?.sider?.colorTextMenuActive || token.colorText,
          backgroundColor:
            token.layout?.sider?.colorBgMenuItemHover ||
            token.colorFillSecondary,
        },
      },
      [`${token.componentCls}-nav-leaf-list`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        paddingInlineStart: 8,
      },
      [`${token.componentCls}-nav-leaf`]: {
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'start',
        cursor: 'pointer',
        border: 'none',
        background: 'transparent',
        color: token.layout?.sider?.colorTextMenu || token.colorTextSecondary,
        fontSize: 12,
        lineHeight: 1.2,
        paddingBlock: 4,
        paddingInline: 8,
        borderRadius: token.borderRadius,
        marginBlockStart: 2,
        '&:hover': {
          color:
            token.layout?.sider?.colorTextMenuActive || token.colorText,
          backgroundColor:
            token.layout?.sider?.colorBgMenuItemHover ||
            token.colorFillSecondary,
        },
        '&--selected': {
          color:
            token.layout?.sider?.colorTextMenuSelected || token.colorText,
          backgroundColor:
            token.layout?.sider?.colorBgMenuItemSelected ||
            token.colorFillSecondary,
        },
      },
    },
    [`${token.componentCls}-content-panel`]: {
      minWidth: '200px',
      overflow: 'auto',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      minHeight: '648px',
      img: {
        width: '100%',
      },
    },
    [`${token.componentCls}-content-render`]: {
      paddingBlock: 20,
      paddingInline: 24,
      flex: 1,
    },
    [`${token.componentCls}-content-footer`]: {
      padding: 8,
    },
    [`${token.componentCls}-actions`]: {
      display: 'flex',
      boxSizing: 'border-box',
      gap: token.marginSM,
      '&-item': {
        display: 'flex',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyItems: 'center',
        padding: 4,
        height: 24,
        minWidth: 24,
        cursor: 'pointer',
        borderRadius: token.borderRadius,
        '&:hover': {
          backgroundColor: token.colorBgTextHover,
        },
      },
      '&-input': {
        margin: 0,
        maxWidth: 120,
        padding: 0,
        width: '120px',
        boxSizing: 'border-box',
        borderRadius: token.borderRadius,
        backgroundColor: token.colorBgTextHover,
        animationName: actionsInputAnimal,
        animationDuration: '0.1s',
        animationTimingFunction: 'linear',
      },
    },
  } as ReturnType<GenerateStyle<ProHelpToken>>;
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProHelp', (token) => {
    const ProLayoutHeaderToken: ProHelpToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProHelpStyle(ProLayoutHeaderToken)];
  });
}
