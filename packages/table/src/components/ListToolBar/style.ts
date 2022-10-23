import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      lineHeight: '1',
      '&-container': {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBlock: token.padding,
        paddingInline: 0,
        ' &-mobile': { flexDirection: 'column' },
      },
      '&-title': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: token.colorTextHeading,
        fontWeight: '500',
        fontSize: token.fontSizeLG,
      },
      '&-search:not(:last-child)': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      '&-setting-item': {
        marginBlock: 0,
        marginInline: 4,
        color: token.colorIconHover,
        fontSize: token.fontSizeLG,
        cursor: 'pointer',
        '> span': { display: 'block', width: '100%', height: '100%' },
        '&:hover': {
          color: token.colorPrimary,
        },
      },
      '&-left': { display: 'flex', alignItems: 'center', justifyContent: 'flex-start' },
      '&-right': { display: 'flex', justifyContent: 'flex-end' },
      '&-extra-line': { marginBlockEnd: token.margin },
      '&-filter': {
        '&:not(:last-child)': { marginInlineEnd: token.margin },
        display: 'flex',
        alignItems: 'center',
        [`div.$${token.antCls}-pro-table-search`]: {
          marginBlock: 0,
          marginInline: 0,
          paddingBlock: 0,
          paddingInline: 0,
        },
      },
      '&-inline-menu-item': {
        display: 'inline-block',
        marginInlineEnd: token.marginLG,
        cursor: 'pointer',
        opacity: '0.75',
        '&-active': { fontWeight: 'bold', opacity: '1' },
      },
      [`${token.antCls}-tabs-top > ${token.antCls}-tabs-nav`]: {
        marginBlockEnd: 0,
        '&::before': { borderBlockEnd: 0 },
        [`${token.antCls}-tabs-nav-list`]: {
          marginBlockStart: 0,
          '${token.antCls}-tabs-tab': {
            paddingBlockStart: 0,
          },
        },
      },
      '&-dropdownmenu-label': {
        fontWeight: 'bold',
        fontSize: token.fontSizeIcon,
        textAlign: 'center',
        cursor: 'pointer',
      },
      '@media (max-width: 575px)': {
        [token.componentCls]: {
          '&-container': { display: 'flex', flexWrap: 'wrap' },
          '&-left': { marginBlockEnd: '16px' },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('DragSortTable', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProListStyle(proListToken)];
  });
}
