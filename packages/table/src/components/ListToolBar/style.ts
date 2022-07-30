import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

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
        padding: `${token.padding} 0`,
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
        margin: '0 4px',
        color: token.colorIconHover,
        fontSize: token.fontSizeLG,
        cursor: 'pointer',
        '> span': { display: 'block', width: '100%', height: '100%' },
        '&:hover': {
          color: token.colorPrimaryBgHover,
        },
      },
      '&-left': { display: 'flex', alignItems: 'center', justifyContent: 'flex-start' },
      '&-right': { display: 'flex', justifyContent: 'flex-end' },
      '&-extra-line': { marginBottom: token.margin },
      '&-filter': {
        '&:not(:last-child)': { marginRight: token.margin },
        display: 'flex',
        alignItems: 'center',
        [`div.$${token.antCls}-pro-table-search`]: { margin: '0', padding: '0' },
      },
      '&-inline-menu-item': {
        display: 'inline-block',
        marginRight: token.marginLG,
        cursor: 'pointer',
        opacity: '0.75',
        '&-active': { fontWeight: 'bold', opacity: '1' },
      },
      '&-dropdownmenu-label': {
        fontWeight: 'bold',
        fontSize: token.fontSizeIcon,
        textAlign: 'center',
        cursor: 'pointer',
        [`${token.antCls}-tabs-top > ${token.antCls}-tabs-nav`]: {
          marginBottom: 0,
          '&::before': { borderBottom: 0 },
          [`${token.antCls}-tabs-nav-list`]: {
            marginTop: 0,
            '${token.antCls}-tabs-tab': {
              paddingTop: 0,
            },
          },
        },
      },
      '@media (max-width: 575px)': {
        [token.componentCls]: {
          '&-container': { display: 'flex', flexWrap: 'wrap' },
          '&-left': { marginBottom: '16px' },
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
