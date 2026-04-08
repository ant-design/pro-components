import { get } from '@rc-component/util';
import type { ProDescriptionsItemProps } from './typing';

/**
 * 根据 dataIndex 获取值，支持 dataIndex 为数组（与重构前逻辑一致）
 */
export function getDataFromConfig(
  item: ProDescriptionsItemProps,
  entity: any,
) {
  const { dataIndex } = item;
  if (dataIndex) {
    const data = Array.isArray(dataIndex)
      ? get(entity, dataIndex as string[])
      : entity[dataIndex as string];

    if (data !== undefined || data !== null) {
      return data;
    }
  }
  return item.children as string;
}
