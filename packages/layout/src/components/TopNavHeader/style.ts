import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
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
        '> *:first-child': {
          display: 'flex',
          alignItems: 'center',
          minHeight: '22px',
          fontSize: '22px',
        },
        '> *:first-child > img': {
          display: 'inline-block',
          height: '32px',
          verticalAlign: 'middle',
        },
        '> *:first-child > h1': {
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
    },
  };
};

export function useStyle(prefixCls: string) {
  const { header } = useContext(ProLayoutContext);
  return useAntdStyle('ProLayoutTopNavHeader', (token) => {
    const topNavHeaderToken: TopNavHeaderToken & BaseLayoutDesignToken['header'] = {
      ...token,
      componentCls: `.${prefixCls}`,
      ...header,
    };

    return [genTopNavHeaderStyle(topNavHeaderToken)];
  });
}
