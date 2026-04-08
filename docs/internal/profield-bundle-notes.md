# ProField 包体积 / 去重备忘（RFC 阶段 0～2）

关联 RFC：[docs/rfc/2026-04-profield-dedup-and-bundle-size.md](../rfc/2026-04-profield-dedup-and-bundle-size.md)。

## `ValueTypeToComponent.tsx` 阶段 1（sameRenderPair）

| 指标 | 值 |
| ---- | -- |
| 实施日期 | 2026-04-08 |
| 重构前（行数，`wc -l`） | 596 |
| 重构后（行数，`wc -l`） | 314 |

内置 `valueType` 的 `render` 与 `formItemRender` 此前为逐字重复；现已通过 `sameRenderPair`（[src/field/ValueTypeToComponent.tsx](../../src/field/ValueTypeToComponent.tsx)）合并为 **同一函数引用**，行为与合并前一致。若某类型未来需要读写分叉，应对该 key 改回显式 `{ render, formItemRender }`。

## 阶段 2（`fieldMode`）

| 指标 | 值 |
| ---- | -- |
| 实施日期 | 2026-04-08 |
| 入口文件 | [src/field/internal/fieldMode.ts](../../src/field/internal/fieldMode.ts) |

- `isProFieldReadMode`：`mode === 'read'`。
- `isProFieldEditOrUpdateMode`：`mode === 'edit' || mode === 'update'`（多数 Field* 编辑态）。
- `isProFieldEditOnlyMode`：**仅** `mode === 'edit'`（与重构前一致：Radio、Checkbox、Cascader、TreeSelect 等对 `update` 仍不进入该分支，避免行为变化）。

`Select` / `Cascader` / `TreeSelect` 内原 `mode !== 'read'` 的早期 `return` 已改为 `!isProFieldReadMode(mode)`。

## 后续（未实施）

- RFC 阶段 3：按需导入审计、懒加载（单独评审）。
- 各 Field 内进一步抽「只读格式化 / pickProProps」：按组件个案。
- CI 体积对比（size-limit）：可选，见 RFC 开放问题。
