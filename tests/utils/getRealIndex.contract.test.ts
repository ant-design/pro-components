/**
 * defaultGetRealIndex 路径约定：与 useEditableArray 内实现同构的参考 walk。
 * 用于在 hook 声明顺序调整后仍锁定 name 模式真实路径语义。
 */
import { describe, expect, it } from 'vitest';

type Row = {
  id: string;
  children?: Row[];
};

type PathKey = string | number;

const nested: Row[] = [
  {
    id: 'p1',
    children: [
      { id: 'c1' },
      { id: 'c2' },
    ],
  },
  { id: 'p2' },
];

/** 与 useEditableArray.defaultGetRealIndex 同构的纯函数参考实现 */
function referenceGetRealIndex(
  dataSource: Row[],
  recordId: string,
  childrenColumnName = 'children',
): number | PathKey[] | undefined {
  const walk = (
    records: Row[],
    parentPath: PathKey[] = [],
  ): PathKey[] | undefined => {
    for (let i = 0; i < records.length; i++) {
      const item = records[i];
      if (item.id === recordId) {
        return [...parentPath, i];
      }
      const children = item[childrenColumnName as 'children'];
      if (Array.isArray(children)) {
        const found = walk(children, [
          ...parentPath,
          i,
          childrenColumnName,
        ]);
        if (found !== undefined) return found;
      }
    }
    return undefined;
  };
  const path = walk(dataSource);
  if (!path) return undefined;
  return path.length === 1 ? Number(path[0]) : path;
}

describe('getRealIndex path contract (name mode)', () => {
  it('顶层行返回数字 index；嵌套行返回完整路径数组', () => {
    expect(referenceGetRealIndex(nested, 'p1')).toBe(0);
    expect(referenceGetRealIndex(nested, 'p2')).toBe(1);
    expect(referenceGetRealIndex(nested, 'c1')).toEqual([
      0,
      'children',
      0,
    ]);
    expect(referenceGetRealIndex(nested, 'c2')).toEqual([
      0,
      'children',
      1,
    ]);
  });

  it('找不到时返回 undefined；路径不会被 toString 糊成单字段', () => {
    expect(referenceGetRealIndex(nested, 'missing')).toBeUndefined();
    const childPath = referenceGetRealIndex(nested, 'c1');
    expect(Array.isArray(childPath)).toBe(true);
    expect((childPath as PathKey[]).join(',')).toBe('0,children,0');
    // 正确形态是多段，而不是单一 "0,children,0" 键
    expect(childPath).not.toBe('0,children,0');
  });
});
