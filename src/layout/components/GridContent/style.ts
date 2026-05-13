import type { CSSObject } from '@ant-design/cssinjs';
import type { AliasToken } from 'antd/es/theme/interface';
import type { ReactElement } from 'react';

import { genProStyleHooks } from '../../../theme/genProStyleUtils';

type ProGridContentToken = AliasToken & {
  componentCls: string;
  wideMaxWidth: number;
};

const genGridContentStyle = (token: ProGridContentToken): CSSObject => ({
  [token.componentCls]: {
    boxSizing: 'border-box',
    width: '100%',
    '&-wide': {
      maxWidth: token.wideMaxWidth,
      margin: '0 auto',
    },
  },
});

const prepareProGridContentToken = (): { wideMaxWidth: number } => ({
  wideMaxWidth: 1152,
});

export const useProGridContentStyle = genProStyleHooks(
  'ProGridContent',
  genGridContentStyle,
  prepareProGridContentToken,
);

export function useStyle(prefixCls: string) {
  const [hashId] = useProGridContentStyle(prefixCls);
  return {
    wrapSSR: (node: ReactElement) => node,
    hashId,
  };
}
