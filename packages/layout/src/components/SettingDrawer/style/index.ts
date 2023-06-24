import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface SettingDrawerToken extends ProAliasToken {
  componentCls: string;
}

const genSettingDrawerStyle: GenerateStyle<SettingDrawerToken> = (token) => {
  return {
    [`${token.componentCls}-handle`]: {
      position: 'fixed',
      insetBlockStart: '240px',
      insetInlineEnd: '0px',
      zIndex: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      fontSize: '16px',
      textAlign: 'center',
      backgroundColor: token.colorPrimary,
      borderEndStartRadius: token.borderRadiusLG,
      borderStartStartRadius: token.borderRadiusLG,
      '-webkit-backdropilter': 'saturate(180%) blur(20px)',
      backdropFilter: 'saturate(180%) blur(20px)',
      cursor: 'pointer',
      pointerEvents: 'auto',
    },
    [token.componentCls]: {
      '&-content': {
        position: 'relative',
        minHeight: '100%',
        color: token.colorText,
      },
      '&-body-title': {
        marginBlock: token.marginXS,
        fontSize: '14px',
        lineHeight: '22px',
        color: token.colorTextHeading,
      },
      '&-block-checkbox': {
        display: 'flex',
        minHeight: 42,
        gap: token.marginSM,
        '& &-item': {
          position: 'relative',
          width: '44px',
          height: '36px',
          overflow: 'hidden',
          borderRadius: '4px',
          boxShadow: token.boxShadow,
          cursor: 'pointer',
          fontSize: 56,
          lineHeight: '56px',
          '&::before': {
            position: 'absolute',
            insetBlockStart: 0,
            insetInlineStart: 0,
            width: '33%',
            height: '100%',
            content: "''",
          },
          '&::after': {
            position: 'absolute',
            insetBlockStart: 0,
            insetInlineStart: 0,
            width: '100%',
            height: '25%',
            content: "''",
          },
          '&-realDark': {
            backgroundColor: 'rgba(0, 21, 41, 0.85)',
            '&::before': { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
            '&::after': { backgroundColor: 'rgba(0, 0, 0, 0.85)' },
          },
          '&-light': {
            backgroundColor: '#fff',
            '&::before': { backgroundColor: '#fff' },
            '&::after': { backgroundColor: '#fff' },
          },

          '&-dark,&-side': {
            backgroundColor: '#f7f8fa',
            '&::before': { zIndex: '1', backgroundColor: '#001529' },
            '&::after': { backgroundColor: '#fff' },
          },
          '&-top': {
            backgroundColor: '#f7f8fa',
            '&::before': { backgroundColor: 'transparent' },
            '&::after': { backgroundColor: '#001529' },
          },
          '&-mix': {
            backgroundColor: '#f7f8fa',
            '&::before': { backgroundColor: '#fff' },
            '&::after': { backgroundColor: '#001529' },
          },
        },
        '& &-selectIcon': {
          position: 'absolute',
          insetInlineEnd: '6px',
          bottom: '4px',
          color: token.colorPrimary,
          fontWeight: 'bold',
          fontSize: '14px',
          pointerEvents: 'none',
          '.action': { color: token.colorPrimary },
        },
        '& &-icon': {
          fontSize: 56,
          lineHeight: '56px',
        },
      },
      '&-theme-color': {
        marginBlockStart: '16px',
        overflow: 'hidden',
        '& &-block': {
          float: 'left',
          width: '20px',
          height: '20px',
          marginBlockStart: 8,
          marginInlineEnd: 8,
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
          borderRadius: '2px',
          cursor: 'pointer',
        },
      },
      '&-list': {
        [`li${token.antCls}-list-item`]: {
          paddingInline: 0,
          paddingBlock: 8,
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayoutSettingDrawer', (token) => {
    const settingDrawerToken: SettingDrawerToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genSettingDrawerStyle(settingDrawerToken)];
  });
}
