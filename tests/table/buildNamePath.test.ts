import { describe, expect, it } from 'vitest';
import {
  buildNamePath,
  spellNamePath,
} from '../../src/table/utils/cellRenderToFromItem';

describe('buildNamePath / spellNamePath', () => {
  it('spellNamePath 与 buildNamePath 结果一致（兼容别名）', () => {
    const args = ['table', 0, 'children', 1, 'title'] as const;
    expect(spellNamePath(...args)).toEqual(buildNamePath(...args));
  });

  it('过滤 undefined，flatten，并把 number 转成 string', () => {
    expect(buildNamePath('table', undefined, [0, 'children'], 1, 'name')).toEqual(
      ['table', '0', 'children', '1', 'name'],
    );
  });

  it('嵌套路径段保持独立，不会被 toString 糊成单一字段名', () => {
    const path = buildNamePath('table', [0, 'children', 0], 'title');
    expect(path).toEqual(['table', '0', 'children', '0', 'title']);
    // 错误写法 Array#toString 会得到单个 "0,children,0" 字段名
    expect(path).not.toContain('0,children,0');
    expect(path.filter((segment) => String(segment).includes(','))).toEqual([]);
  });
});
