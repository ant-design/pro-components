# Pro Components 测试说明

## 目录与职责

| 路径 | 说明 |
|------|------|
| `demo.tsx` | 全站 demo 快照：`demoTest('table' \| 'form' \| …)` 扫描 `demos/<组件>/`，`demoTest(DEMO_SNAPSHOT_ALL)` 扫描全部 `demos/**/*.tsx` |
| `doc.test.ts` | 全量 demo 快照回归（与 `DEMO_SNAPSHOT_ALL` 配合） |
| `<area>/demo.test.ts` | 按组件域（table/form/layout…）跑 demo 快照 |
| `<area>/*.test.tsx` | 该域的功能/行为单测 |
| `table/fixtures.tsx` | ProTable 相关单测共用的 `columns` / `request` / `getFetchData` |
| `util.ts` | `waitForWaitTime`、`resizeWindow`、`spyElementPrototypes` 等测试工具 |
| `setupTests.ts` | Vitest 全局 mock（`matchMedia`、主题、MockDate、`Math.random` 等） |

## Demo 快照约定

- 仅包含 `demos/**/[!_]*.tsx`：**文件名以 `_` 开头**的示例不会进入快照（适合本地调试、临时复现）。
- 快照文件位于各目录的 `snapshot/` 下，文件名由 demo 路径推导。
- 修改 demo 导致快照失败时，在确认 UI 符合预期后执行 `npx vitest run <test> --update`。

## 与 `demos/` 的边界

- `demos/`：文档站与示例源码（dumi 引用）。
- `tests/`：自动化测试；**不要**再用 `tests/table/demo.tsx` 这类易与 `tests/demo.tsx` 混淆的命名，共用数据请用 `fixtures.tsx` 或 `field/fixtures/` 等明确名字。
