import { ConfigProvider } from '@madccc/antd';
import type { AliasToken, GenerateStyle } from '@madccc/antd/es/_util/theme';

const { useStyle: useAntdStyle } = ConfigProvider;

interface ProCardActionsToken extends AliasToken {
  componentCls: string;
  cardActionIconSize: number;
}

const genActionsStyle: GenerateStyle<ProCardActionsToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-actions`]: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      background: token.colorBgComponent,
      borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      // .clearfix,

      '.ant-space': {
        gap: '0 !important',
        width: '100%',
      },

      [`& > li,
.ant-space-item`]: {
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

          [`a:not(.ant-btn),
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

export default function useStyle() {
  return useAntdStyle('ProCardActions', (token) => {
    const proCardActionsToken: ProCardActionsToken = {
      ...token,
      componentCls: `.ant-pro-card`,
      cardActionIconSize: 16,
    };

    return [genActionsStyle(proCardActionsToken)];
  });
}
