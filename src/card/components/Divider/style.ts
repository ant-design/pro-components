import { useStyle as useAntdStyle } from '../../../provider';

/**
 * Divider 样式已合并至 ProCard style.ts，此 hook 仅用于获取 hashId 和 wrapSSR
 */
export default function useStyle(_prefixCls: string) {
  return useAntdStyle('ProCardDivider', () => ({}));
}
