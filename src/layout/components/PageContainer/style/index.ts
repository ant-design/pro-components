import type { GenerateStyle, ProAliasToken } from '../../../../provider';
import { useStyle as useAntdStyle } from '../../../../provider';
import { proLayoutVar } from '../../../style';
export interface PageContainerToken extends ProAliasToken {
  componentCls: string;
}
const [sm, md, lg, xl] = [576, 768, 992, 1200].map(
  (bp) => `@media (max-width: ${bp}px)`,
);

const genPageContainerStyle: GenerateStyle<PageContainerToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      position: 'relative',
      '&-children-container': {
        paddingBlockStart: 0,
        paddingBlockEnd:
          token.layout?.pageContainer?.paddingBlockPageContainerContent,
        paddingInline:
          token.layout?.pageContainer?.paddingInlinePageContainerContent,
      },
      '&-children-container-no-header': {
        paddingBlockStart:
          token.layout?.pageContainer?.paddingBlockPageContainerContent,
      },
      '&-affix': {
        [`${token.antCls}-affix`]: {
          [`${token.componentCls}-warp`]: {
            backgroundColor:
              token.layout?.pageContainer?.colorBgPageContainerFixed,
            transition: 'background-color 0.3s',
            boxShadow: '0 2px 8px #f0f1f2',
          },
        },
      },
      ['& &-warp-page-header']: {
        paddingBlockStart:
          (token.layout?.pageContainer?.paddingBlockPageContainerContent ??
            40) / 4,
        paddingBlockEnd:
          (token.layout?.pageContainer?.paddingBlockPageContainerContent ??
            40) / 2,
        paddingInlineStart:
          token.layout?.pageContainer?.paddingInlinePageContainerContent,
        paddingInlineEnd:
          token.layout?.pageContainer?.paddingInlinePageContainerContent,
        [`& ~ ${token.proComponentsCls}-grid-content`]: {
          [`${token.proComponentsCls}-page-container-children-content`]: {
            paddingBlock:
              (token.layout?.pageContainer?.paddingBlockPageContainerContent ??
                24) / 3,
          },
        },
        [`${token.antCls}-page-header-breadcrumb`]: {
          paddingBlockStart:
            (token.layout?.pageContainer?.paddingBlockPageContainerContent ??
              40) /
              4 +
            10,
        },
        [`${token.antCls}-page-header-heading`]: {
          paddingBlockStart:
            (token.layout?.pageContainer?.paddingBlockPageContainerContent ??
              40) / 4,
        },
        [`${token.antCls}-page-header-footer`]: {
          marginBlockStart:
            (token.layout?.pageContainer?.paddingBlockPageContainerContent ??
              40) / 4,
        },
      },
      '&-detail': {
        display: 'flex',
        [sm]: {
          display: 'block',
        },
      },
      '&-main': {
        width: '100%',
      },
      '&-row': {
        display: 'flex',
        width: '100%',
        [md]: {
          display: 'block',
        },
      },
      '&-content': {
        flex: 'auto',
        width: '100%',
      },
      '&-extraContent': {
        flex: '0 1 auto',
        minWidth: '242px',
        marginInlineStart: 88,
        textAlign: 'end',
        [xl]: {
          marginInlineStart: 44,
        },
        [lg]: {
          marginInlineStart: 20,
        },
        [md]: {
          marginInlineStart: 0,
          textAlign: 'start',
        },
        [sm]: {
          marginInlineStart: 0,
        },
      },
    },
    /**
     * `layout=top` + `contentWidth=Fixed`：在 PageContainer 内统一「定宽槽」，
     * 避免 `Layout.Content` flex 等父级导致 `PageHeader-wide` / `GridContent-wide`
     * 各自 `max-width` 仍被撑成整行、正文区宽到 1200+ 与页头错位。
     */
    [`${token.componentCls}-top-fixed-slot`]: {
      width: '100%',
      maxWidth: `var(${proLayoutVar.contentFixedMaxWidth})`,
      marginInline: 'auto',
      minWidth: 0,
      [`& ${token.antCls}-page-header${token.antCls}-page-header-wide,
        & ${token.proComponentsCls}-grid-content${token.proComponentsCls}-grid-content-wide`]:
        {
          width: '100%',
          maxWidth: 'none',
          marginInline: 0,
        },
    },
  };
};

export type pageContainerToken = {
  paddingInlinePageContainerContent?: number;
  paddingBlockPageContainerContent?: number;
};

export function useStyle(
  prefixCls: string,
  componentsToken: pageContainerToken | undefined,
) {
  return useAntdStyle('ProLayoutPageContainer', (token) => {
    const proCardToken: PageContainerToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      layout: {
        ...token?.layout,
        pageContainer: {
          ...token?.layout?.pageContainer,
          ...componentsToken,
        },
      },
    };
    return [genPageContainerStyle(proCardToken)];
  });
}
