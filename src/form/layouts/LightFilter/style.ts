import type { GenerateStyle, ProAliasToken } from '../../../provider';
import { useStyle as useAntdStyle } from '../../../provider';

export interface LightFilterToken extends ProAliasToken {
  componentCls: string;
}

const genLightFilterStyle: GenerateStyle<LightFilterToken> = (token) => {
  return {
    [token.componentCls]: {
      boxSizing: 'border-box',
      lineHeight: '30px',
      // @see https://yuque.antfin-inc.com/tech-ui/topics/523
      '&::before': {
        display: 'block',
        height: 0,
        visibility: 'hidden',
        content: "'.'",
      },
      '&-small': {
        lineHeight: token.lineHeight,
      },
      '&-container': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: token.marginXS,
      },
      '&-item': {
        whiteSpace: 'nowrap',
        [`${token.antCls}-form-item`]: {
          marginBlock: 0,
        },
        /** Space 包裹时使用较小间距，与 LightFilter 整体风格一致 */
        [`${token.antCls}-space:not(${token.antCls}-space-compact)`]: {
          gap: token.marginXS,
        },
        /** Space.Compact 内 FieldLabel 紧凑布局：去除间距、合并边框 */
        [`${token.antCls}-space-compact`]: {
          display: 'inline-flex',
          gap: 0,
          [`& > *`]: {
            marginInlineStart: 0,
          },
          [`& > *:not(:first-child)`]: {
            marginInlineStart: `-${token.lineWidth}px`,
            [`[class*="field-label"], [class*="field-dropdown"]`]: {
              borderStartStartRadius: 0,
              borderEndStartRadius: 0,
            },
          },
          [`& > *:not(:last-child)`]: {
            [`[class*="field-label"], [class*="field-dropdown"]`]: {
              borderStartEndRadius: 0,
              borderEndEndRadius: 0,
            },
          },
        },
      },
      '&-line': { minWidth: '198px' },
      '&-line:not(:first-child)': {
        marginBlockStart: '16px',
        marginBlockEnd: 8,
      },
      '&-collapse-icon': {
        width: token.controlHeight,
        height: token.controlHeight,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '&-effective': {
        [`${token.componentCls}-collapse-icon`]: {
          backgroundColor: token.colorBgTextHover,
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('LightFilter', (token) => {
    const proCardToken: LightFilterToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genLightFilterStyle(proCardToken)];
  });
}
