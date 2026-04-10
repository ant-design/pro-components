import type { ProFieldValueTypeInput } from '../utils/typing';
import type { ProDescriptionsColumn } from './typing';

/**
 * 解析列上 `valueType`（支持函数形式），供 Descriptions 渲染路径使用
 */
export function resolveDescriptionsValueType(
  item: ProDescriptionsColumn,
  entity: Record<string, unknown>,
): ProFieldValueTypeInput {
  const { valueType } = item;
  return (
    typeof valueType === 'function'
      ? valueType(entity || {}, 'descriptions')
      : valueType
  ) as ProFieldValueTypeInput;
}
