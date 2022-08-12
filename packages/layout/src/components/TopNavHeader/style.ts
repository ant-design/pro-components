import type { ProAliasToken } from '@ant-design/pro-utils';
import { setAlpha, useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';
import { useContext } from 'react';
import type { BaseLayoutDesignToken } from '../../context/ProLayoutContext';
import { ProLayoutContext } from '../../context/ProLayoutContext';
export interface TopNavHeaderToken extends ProAliasToken {
  componentCls: string;
}

const genTopNavHeaderStyle: GenerateStyle<TopNavHeaderToken & BaseLayoutDesignToken['header']> = (
  token,
) => {
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
            marginInlineStart: -8,
          },
        },
      },
      '&-logo': {
        position: 'relative',
        minWidth: '165px',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        overflow: 'hidden',
        '> a': { display: 'flex', alignItems: 'center', minHeight: '22px', fontSize: '22px' },
        'a > img': { display: 'inline-block', height: '32px', verticalAlign: 'middle' },
        'a > h1': {
          display: 'inline-block',
          marginBlock: 0,
          marginInline: 0,
          lineHeight: '24px',
          marginInlineStart: 6,
          fontWeight: '600',
          fontSize: '16px',
          color: token?.colorHeaderTitle,
          verticalAlign: 'top',
        },
      },
      '&-menu': {
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        paddingInline: 6,
        paddingBlock: 6,
        lineHeight: `${token.heightLayoutHeader - 12}px`,
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
          color: setAlpha(token.colorTextBase, 0.65),
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: token.radiusBase,
          '> *': {
            paddingInline: 6,
            paddingBlock: 6,
            borderRadius: token.radiusBase,
            ':hover': {
              backgroundColor: token.colorBgRightActionsItemHover,
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
  const { header } = useContext(ProLayoutContext);
  return useAntdStyle('top-nav-header', (token) => {
    const topNavHeaderToken: TopNavHeaderToken & BaseLayoutDesignToken['header'] = {
      ...token,
      componentCls: `.${prefixCls}`,
      ...header,
    };

    return [genTopNavHeaderStyle(topNavHeaderToken)];
  });
}
