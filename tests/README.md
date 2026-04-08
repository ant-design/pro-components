# Pro Components 测试说明

## 目录与职责

| 路径 | 说明 |
|------|------|
| `<area>/*.test.tsx` | 该域的功能/行为单测 |
| `table/fixtures.tsx` | ProTable 相关单测共用的 `columns` / `request` / `getFetchData` |
| `util.ts` | `waitForWaitTime`、`resizeWindow`、`spyElementPrototypes` 等测试工具 |
| `setupTests.ts` | Vitest 全局 mock（`matchMedia`、主题、MockDate、`Math.random` 等） |

## 与 `demos/` 的边界

- `demos/`：文档站与示例源码（dumi 引用）。
- `tests/`：自动化测试；共用数据请用 `fixtures.tsx` 或 `field/fixtures/` 等明确名字。
