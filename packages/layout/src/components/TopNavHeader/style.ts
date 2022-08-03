import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface TopNavHeaderToken extends ProAliasToken {
  componentCls: string;
  proLayoutColorHeaderTitle: string;
  proLayoutColorHeader: number;
}

const genTopNavHeaderStyle: GenerateStyle<TopNavHeaderToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      '.anticon': {
        color: 'inherit',
      },
      '&-main': {
        display: 'flex',
        height: '100%',
        paddingInlineStart: '16px',
        '&-left': {
          display: 'flex',
          alignItems: 'center',
          minWidth: '192px',
          [`${token.proComponentsCls}-layout-apps-icon`]: {
            marginInlineEnd: 16,
          },
        },
      },
      '&-logo': {
        position: 'relative',
        minWidth: '165px',
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        a: { display: 'flex', alignItems: 'center', minHeight: '22px', fontSize: '22px' },
        img: { display: 'inline-block', height: '32px', verticalAlign: 'middle' },
        h1: {
          display: 'inline-block',
          marginInlineStart: 6,
          fontWeight: '600',
          fontSize: '16px',
          color: token?.proLayoutColorHeaderTitle,
          verticalAlign: 'top',
        },
      },
      '&-menu': {
        minWidth: '0',
        display: 'flex',
        alignItems: 'center',
        paddingInline: 6,
        paddingBlock: 6,
        lineHeight: `${token.proLayoutColorHeader - 12}px`,
      },
      '&-header-actions': {
        display: 'flex',
        height: '100%',
        '&-item': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBlock: 0,
          paddingInline: 6,
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: token.radiusBase,
          '> *': {
            paddingInline: 6,
            paddingBlock: 6,
            borderRadius: token.radiusBase,
            ':hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
            },
          },
        },
        '&-avatar': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingInlineStart: '16px',
          paddingInlineEnd: '16px',
          '> div': {
            height: '44px',
            paddingInline: 8,
            paddingBlock: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '44px',
            borderRadius: token.radiusBase,
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
  return useAntdStyle('top-nav-header', (token) => {
    const topNavHeaderToken: TopNavHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutColorHeader: 56,
      proLayoutColorHeaderTitle: token.colorTextHeading,
    };

    return [genTopNavHeaderStyle(topNavHeaderToken)];
  });
}
