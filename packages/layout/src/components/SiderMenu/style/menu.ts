import type { ProAliasToken } from '@ant-design/pro-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-utils';
import type { GenerateStyle } from 'antd/es/theme';

export interface ProLayoutBaseMenuToken extends ProAliasToken {
  componentCls: string;
}

// const menuCss = useMemo(() => {
//     return css`
//     padding: ${props.isMobile ? 0 : '6px'};
//     background: transparent;
//     border:none !important;

//     .${antPrefixClassName}-menu-title-content{
//       width: 100%;
//     }

//     &.${antPrefixClassName}-layout-sider-collapsed {
//       flex-direction: column;
//       padding-bottom: 24px;
//     }

//     .${antPrefixClassName}-menu-root {
//       padding: 8px;
//     }

//     .${antPrefixClassName}-menu-sub {
//       background: transparent;
//     }

//     .${prefixCls}-menu-item-divider {
//       &:last-child {
//         display: none;
//       }
//     }
//     .${antPrefixClassName}-menu-item-group-title {
//       color: ${menuDesignToken.menuTextColorSecondary};
//       font-size: 12px;
//       line-height: 20px;
//     }
//   `;
const genProLayoutBaseMenuStyle: GenerateStyle<ProLayoutBaseMenuToken> = (token) => {
  return {
    [token.componentCls]: {
      background: 'transparent',
      border: 'none',

      '&-group-divider': {
        color: token.colorTextSecondary,
        fontSize: 12,
        lineHeight: 20,
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('pro-layout-base-menu', (token) => {
    const proLayoutMenuToken: ProLayoutBaseMenuToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProLayoutBaseMenuStyle(proLayoutMenuToken)];
  });
}
