import { get } from '@rc-component/util';
import type { ProDescriptionsColumn } from './typing';

/**
 * 根据 dataIndex 从 entity 取值；无 dataIndex 或值为 undefined/null 时用列上的 children
 */
export function getDataFromConfig(
  item: ProDescriptionsColumn,
  entity: Record<string, unknown> | undefined,
) {
  const { dataIndex } = item;
  if (dataIndex != null && entity != null) {
    const data = Array.isArray(dataIndex)
      ? get(entity, dataIndex as string[])
      : (entity as Record<string, unknown>)[dataIndex as string];

    if (data !== undefined && data !== null) {
      return data;
    }
  }
  return item.children;
}
