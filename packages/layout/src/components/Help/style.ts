import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProHelpToken extends ProAliasToken {
  componentCls: string;
}

const genProHelpStyle: GenerateStyle<ProHelpToken> = (token) => {
  return {
    [`${token.componentCls}-popover-text`]: {
      color: token.colorPrimary,
      cursor: 'pointer',
    },
    [`${token.componentCls}-popover-content`]: {
      maxWidth: 300,
      height: '600px',
      maxHeight: 'calc(100vh - 200px)',
      overflow: 'auto',
      paddingInline: 20,
      paddingBlockStart: 24,
      paddingBlockEnd: 32,
    },
    [`${token.componentCls}-left-panel`]: {
      overflow: 'auto',
      borderInlineEnd: `${token?.lineWidth}px solid ${token?.colorBorderSecondary}`,
      minHeight: '648px',
      minWidth: 190,
      '&-menu': {
        width: 190,
        minWidth: 190,
        height: 'calc(100% - 40px)',
        marginBlock: 20,
      },
    },
    [`${token.componentCls}-content-panel`]: {
      paddingBlock: 20,
      paddingInline: 24,
      maxWidth: '800px',
      minWidth: '400px',
      overflow: 'auto',
      flex: 1,
      minHeight: '648px',
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProHelp', (token) => {
    const ProLayoutHeaderToken: ProHelpToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProHelpStyle(ProLayoutHeaderToken)];
  });
}
