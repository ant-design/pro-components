import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import { useContext } from 'react';
import type { BaseLayoutDesignToken } from '../../../context/ProLayoutContext';
import { ProLayoutContext } from '../../../context/ProLayoutContext';

export interface PageContainerToken extends ProAliasToken {
  componentCls: string;
}
const [sm, md, lg, xl] = [576, 768, 992, 1200].map((bp) => `@media (min-width: ${bp}px)`);

const genPageContainerStyle: GenerateStyle<
  PageContainerToken & BaseLayoutDesignToken['pageContainer']
> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      '&-children-content': {
        paddingBlock: token.paddingBlockPageContainerContent,
        paddingInline: token.paddingInlinePageContainerContent,
      },
      '&-affix': {
        [`${token.antCls}-affix`]: {
          [`${token.componentCls}-warp`]: {
            backgroundColor: token.colorBgPageContainerFixed,
            transition: 'background-color 0.3s',
            boxShadow: '0 2px 8px #f0f1f2',
          },
        },
      },
      ['& &-warp-page-header']: {
        paddingBlockEnd: token.paddingBlockPageContainerContent / 2,
        paddingInlineStart: token.paddingInlinePageContainerContent,
        paddingInlineEnd: token.paddingInlinePageContainerContent,
        [`& ~ ${token.proComponentsCls}-grid-content`]: {
          [`${token.proComponentsCls}-page-container-children-content`]: {
            paddingBlock: token.paddingBlockPageContainerContent / 3,
          },
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
        [sm]: {
          marginInlineStart: 0,
        },
        [md]: {
          marginInlineStart: 0,
          textAlign: 'start',
        },
        [lg]: {
          marginInlineStart: 20,
        },
        [xl]: {
          marginInlineStart: 44,
        },
      },
    },
  };
};

export type pageContainerToken = {
  paddingInlinePageContainerContent?: number;
  paddingBlockPageContainerContent?: number;
};

export function useStyle(prefixCls: string, componentsToken: pageContainerToken | undefined) {
  const { pageContainer } = useContext(ProLayoutContext);
  return useAntdStyle(
    'PageContainer',
    (token) => {
      const proCardToken: PageContainerToken & BaseLayoutDesignToken['pageContainer'] = {
        ...token,
        componentCls: `.${prefixCls}`,
        ...pageContainer,
        ...componentsToken,
      };

      return [genPageContainerStyle(proCardToken)];
    },
    // 触发一下更新
    componentsToken,
  );
}
