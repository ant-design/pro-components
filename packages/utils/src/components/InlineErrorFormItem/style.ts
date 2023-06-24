import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  const progressBgCls = `${token.antCls}-progress-bg`;
  return {
    [token.componentCls]: {
      '&-multiple': {
        paddingBlockStart: 6,
        paddingBlockEnd: 12,
        paddingInline: 8,
      },
      '&-progress': {
        '&-success': {
          [progressBgCls]: {
            backgroundColor: token.colorSuccess,
          },
        },
        '&-error': {
          [progressBgCls]: {
            backgroundColor: token.colorError,
          },
        },
        '&-warning': {
          [progressBgCls]: {
            backgroundColor: token.colorWarning,
          },
        },
      },
      '&-rule': {
        display: 'flex',
        alignItems: 'center',
        '&-icon': {
          '&-default': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '14px',
            height: '22px',
            '&-circle': {
              width: '6px',
              height: '6px',
              backgroundColor: token.colorTextSecondary,
              borderRadius: '4px',
            },
          },
          '&-loading': {
            color: token.colorPrimary,
          },
          '&-error': { color: token.colorError },
          '&-success': {
            color: token.colorSuccess,
          },
        },
        '&-text': {
          color: token.colorText,
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('InlineErrorFormItem', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genProStyle(proToken)];
  });
}
