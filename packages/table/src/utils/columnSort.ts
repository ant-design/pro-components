import type { ColumnsState } from '../Store/Provide';

export const columnSort =
  (columnsMap: Record<string, ColumnsState>) => (a: any, b: any) => {
    const { fixed: aFixed, index: aIndex } = a;
    const { fixed: bFixed, index: bIndex } = b;
    if (
      (aFixed === 'left' && bFixed !== 'left') ||
      (bFixed === 'right' && aFixed !== 'right')
    ) {
      return -2;
    }
    if (
      (bFixed === 'left' && aFixed !== 'left') ||
      (aFixed === 'right' && bFixed !== 'right')
    ) {
      return 2;
    }
    // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错
    const aKey = a.key || `${aIndex}`;
    const bKey = b.key || `${bIndex}`;
    if (columnsMap[aKey]?.order || columnsMap[bKey]?.order) {
      return (columnsMap[aKey]?.order || 0) - (columnsMap[bKey]?.order || 0);
    }
    return (a.index || 0) - (b.index || 0);
  };
