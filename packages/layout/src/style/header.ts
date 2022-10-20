import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProLayoutHeaderToken extends ProAliasToken {
  componentCls: string;
  proLayoutCls: string;
}

const genProLayoutHeaderStyle: GenerateStyle<ProLayoutHeaderToken> = (token) => {
  return {
    [token.proLayoutCls]: {
      [`.ant-layout-header${token.componentCls}`]: {
        height: token?.layout?.header?.heightLayoutHeader,
        lineHeight: `${token?.layout?.header?.heightLayoutHeader}px`,
        // hitu 用了这个属性，不能删除哦 @南取
        zIndex: 19,
        width: '100%',
        paddingBlock: 0,
        paddingInline: 8,
        borderBlockEnd: `1px solid ${token.colorSplit}`,
        backgroundColor: token?.layout?.header?.colorBgHeader || 'rgba(255, 255, 255, 0.4)',
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
        '&-fixed-header': {
          position: 'fixed',
          insetBlockStart: 0,
          width: '100%',
          zIndex: 100,
          insetInlineEnd: 0,
        },
        '&-header-actions': {
          display: 'flex',
          alignItems: 'center',
          fontSize: '16',
          cursor: 'pointer',
          '& &-item': {
            paddingBlock: 0,
            paddingInline: 8,
            '&:hover': {
              color: token.colorText,
            },
          },
        },
        '&-header-realDark': { boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 65%)' },
        '&-header-actions-header-action': {
          transition: 'width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        },
      },
    },
  };
};

export function useStyle(prefixCls: string, props: { proLayoutCls: string }) {
  return useAntdStyle('ProLayoutHeader', (token) => {
    const ProLayoutHeaderToken: ProLayoutHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      proLayoutCls: `.${props.proLayoutCls}`,
    };

    return [genProLayoutHeaderStyle(ProLayoutHeaderToken)];
  });
}
