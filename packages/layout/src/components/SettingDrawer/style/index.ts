import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

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
      borderEndStartRadius: token.radiusLG,
      borderStartStartRadius: token.radiusLG,
      '-webkit-backdropilter': 'saturate(180%) blur(20px)',
      backdropFilter: 'saturate(180%) blur(20px)',
      cursor: 'pointer',
      pointerEvents: 'auto',
    },
    [token.componentCls]: {
      '&-content': { position: 'relative', minHeight: '100%' },
      '&-body-title': { marginBlockEnd: '12px', fontSize: '14px', lineHeight: '22px' },
      '&-block-checkbox': {
        display: 'flex',
        minHeight: 42,
        '&-item': {
          position: 'relative',
          width: '44px',
          height: '36px',
          marginInlineEnd: '16px',
          overflow: 'hidden',
          backgroundColor: '#f7f8fa',
          borderRadius: '4px',
          boxShadow: '0 1px 2.5px 0 rgba(0, 0, 0, 0.18)',
          cursor: 'pointer',
          '&::before': {
            position: 'absolute',
            insetBlockStart: 0,
            insetInlineStart: 0,
            width: '33%',
            height: '100%',
            backgroundColor: '#fff',
            content: "''",
          },
          '&::after': {
            position: 'absolute',
            insetBlockStart: 0,
            insetInlineStart: 0,
            width: '100%',
            height: '25%',
            backgroundColor: '#fff',
            content: "''",
          },
          '&-realDark': {
            backgroundColor: 'rgba(0, 21, 41, 0.85)',
            '&::before': { backgroundColor: token.colorTextSecondary },
            '&::after': { backgroundColor: token.colorText },
          },
          '&-light': {
            backgroundColor: token.colorBgContainer,
            '&::before': { backgroundColor: token.colorBgContainer },
            '&::after': { backgroundColor: token.colorBgContainer },
          },
          '&-dark,&-side': {
            '&::before': { zIndex: '1', backgroundColor: '#001529' },
            '&::after': { backgroundColor: token.colorBgContainer },
          },
          '&-top': {
            '&::before': { backgroundColor: 'transparent' },
            '&::after': { backgroundColor: '#001529' },
          },
          '&-mix': {
            '&::before': { backgroundColor: 'transparent' },
            '&::after': { backgroundColor: '#001529' },
          },
        },
        '&-selectIcon': {
          position: 'absolute',
          insetInlineEnd: '6px',
          bottom: '4px',
          color: token.colorPrimary,
          fontWeight: 'bold',
          fontSize: '14px',
          pointerEvents: 'none',
          '.action': { color: token.colorPrimary },
        },
      },
      '&-theme-color': {
        marginBlockStart: '16px',
        overflow: 'hidden',
        '&-block': {
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
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('pro-layout-setting-drawer', (token) => {
    const settingDrawerToken: SettingDrawerToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genSettingDrawerStyle(settingDrawerToken)];
  });
}
