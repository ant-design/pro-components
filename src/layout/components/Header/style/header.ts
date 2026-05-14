import type { GenerateStyle, ProAliasToken } from '../../../../provider';
import { setAlpha, useStyle as useAntdStyle } from '../../../../provider';

export interface ProLayoutHeaderToken extends ProAliasToken {
  componentCls: string;
}

const genProLayoutHeaderStyle: GenerateStyle<ProLayoutHeaderToken> = (
  token,
) => {
  return {
    [`${token.proComponentsCls}-layout`]: {
      [`${token.antCls}-layout-header${token.componentCls}`]: {
        height: token.layout?.header?.heightLayoutHeader || 56,
        lineHeight: `${token.layout?.header?.heightLayoutHeader || 56}px`,
        // hitu 用了这个属性，不能删除哦 @南取
        zIndex: 101,
        width: '100%',
        paddingBlock: 0,
        paddingInline: 0,
        borderBlockEnd: `1px solid ${token.colorSplit}`,
        backgroundColor:
          token.layout?.header?.colorBgHeader ??
          setAlpha(token.colorBgElevated, 0.6),
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
        '&-fixed-header': {
          position: 'fixed',
          insetBlockStart: 0,
          insetInlineStart: 'var(--pro-layout-fixed-header-start, 0px)',
          /** 与 `inset-inline-start` 配合：占满视口剩余主列，避免仅靠 width:auto+双 inset 在部分内核下宽度塌成 0 */
          width: 'calc(100vw - var(--pro-layout-fixed-header-start, 0px))',
          boxSizing: 'border-box',
          maxWidth: 'none',
          zIndex: 101,
        },
        '&-fixed-header-scroll': {
          backgroundColor:
            token.layout?.header?.colorBgScrollHeader ??
            setAlpha(token.colorBgElevated, 0.8),
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
        '&-header-realDark': {
          boxShadow: `0 2px 8px 0 ${setAlpha(token.colorTextBase, 0.65)}`,
        },
        '&-header-actions-header-action': {
          transition: 'width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProLayoutHeader', (token) => {
    const ProLayoutHeaderToken: ProLayoutHeaderToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProLayoutHeaderStyle(ProLayoutHeaderToken)];
  });
}
