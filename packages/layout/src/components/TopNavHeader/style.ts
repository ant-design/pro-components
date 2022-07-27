import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface TopNavHeaderToken extends ProAliasToken {
  componentCls: string;
  proLayoutColorHeaderTitle: string;
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
        paddingLeft: '16px',
        '&-left': {
          display: 'flex',
          alignItems: 'center',
          minWidth: '192px',
          [`${token.proComponentsCls}-layout-apps-icon`]: {
            marginRight: 16,
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
          margin: '0 0 0 6px',
          fontWeight: '600',
          fontSize: '16px',
          color: token?.proLayoutColorHeaderTitle,
          verticalAlign: 'top',
        },
      },
      '&-menu': { minWidth: '0', display: 'flex', alignItems: 'center' },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('top-nav-header', (token) => {
    const topNavHeaderToken: TopNavHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutColorHeaderTitle: token.colorTextHeading,
    };

    return [genTopNavHeaderStyle(topNavHeaderToken)];
  });
}
