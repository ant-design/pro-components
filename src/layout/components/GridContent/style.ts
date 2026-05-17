import type { CSSObject } from '@ant-design/cssinjs';
import type { AliasToken } from 'antd/es/theme/interface';

import { genProStyleHooks } from '../../../theme/genProStyleUtils';
import { proLayoutVar } from '../../style';

type ProGridContentToken = AliasToken & {
  componentCls: string;
};

const genGridContentStyle = (token: ProGridContentToken): CSSObject => ({
  [token.componentCls]: {
    boxSizing: 'border-box',
    width: '100%',
    /**
     * 与 `ant-page-header-wide` 等块同级时，仅 `max-width` + `width:100%` 在部分
     * flex / overflow 父级下仍可能占满整行，`margin: auto` 无法产生与页头一致的
     * 居中盒；用 `min(100%, cap)` 明确「可用宽度」与页头定宽块对齐。
     */
    '&-wide': {
      width: `min(100%, var(${proLayoutVar.contentFixedMaxWidth}))`,
      marginInline: 'auto',
    },
    [`${token.componentCls}-children`]: {
      boxSizing: 'border-box',
      width: '100%',
    },
  },
});

export const useProGridContentStyle = genProStyleHooks(
  'ProGridContent',
  genGridContentStyle,
);

export function useStyle(prefixCls: string) {
  const [hashId] = useProGridContentStyle(prefixCls);
  return { hashId };
}
