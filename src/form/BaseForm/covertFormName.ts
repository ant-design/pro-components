import type { NamePath } from 'antd/lib/form/interface';

/**
 * 将表单 name 转为数组路径：`a` → `[a]`，`[a]` → `[a]`。
 */
export function covertFormName(name?: NamePath) {
  if (!name) return name;
  if (Array.isArray(name)) return name;
  return [name];
}
