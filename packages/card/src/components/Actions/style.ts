import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import { ConfigProvider } from 'antd';
import type { GenerateStyle } from 'antd/es/theme';
import { useContext } from 'react';

const { ConfigContext } = ConfigProvider;

interface ProCardActionsToken extends ProAliasToken {
  antCls: string;
  componentCls: string;
  cardActionIconSize: number;
}

const genActionsStyle: GenerateStyle<ProCardActionsToken> = (token) => {
  const { componentCls, antCls } = token;

  return {
    [`${componentCls}-actions`]: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      background: token.colorBgContainer,
      borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,

      [`${antCls}-space`]: {
        gap: '0 !important',
        width: '100%',
      },

      [`& > li,
        ${antCls}-space-item`]: {
        flex: 1,
        float: 'left',
        margin: `${token.marginSM}px 0`,
        color: token.colorTextSecondary,
        textAlign: 'center',

        '> a': {
          color: token.colorTextSecondary,
          transition: 'color 0.3s',
          '&:hover': {
            color: token.colorPrimaryHover,
          },
        },

        '> span': {
          position: 'relative',
          display: 'block',
          minWidth: 32,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          cursor: 'pointer',

          '&:hover': {
            color: token.colorPrimaryHover,
            transition: 'color 0.3s',
          },

          [`a:not(${antCls}-btn),
            > .anticon`]: {
            display: 'inline-block',
            width: '100%',
            color: token.colorTextSecondary,
            lineHeight: '22px',
            transition: 'color 0.3s',

            '&:hover': {
              color: token.colorPrimaryHover,
            },
          },

          '> .anticon': {
            fontSize: token.cardActionIconSize,
            lineHeight: '22px',
          },
        },

        '&:not(:last-child)': {
          borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        },
      },
    },
  };
};

export default function useStyle(prefixCls?: string) {
  const { getPrefixCls } = useContext(ConfigContext);
  const antCls = `.${getPrefixCls()}`;

  return useAntdStyle('ProCardActions', (token) => {
    const proCardActionsToken: ProCardActionsToken = {
      ...token,
      componentCls: `.${prefixCls}`,
      antCls,
      cardActionIconSize: 16,
    };

    return [genActionsStyle(proCardActionsToken)];
  });
}
