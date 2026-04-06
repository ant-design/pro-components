# Pro Components 示例（demos）

与文档站 `site/components/**` 中的 `<code src="../../../demos/...">` 对应，本目录为组件示例源码。

## 命名约定

| 规则 | 说明 |
|------|------|
| **Kebab-case** | 推荐 `basic.tsx`、`custom-filter.tsx` |
| **`_` 前缀** | 文件名以 `_` 开头：不参与 `tests/demo.tsx` 快照（glob 为 `[!_]*.tsx`），适合 **debug / 临时对照**；文档仍可引用 |
| **拼写** | 正式示例避免 `pollinga` 这类笔误；轮询示例为 `table/polling.tsx` |

## 已用 `_` 归类的调试向示例（节选）

| 路径 | 说明 |
|------|------|
| `layout/_debug-demo.tsx`、`layout/_morse-debug.tsx` | 布局调试 |
| `form/_pro-form-dependency.tsx`、`form/_modalform-test.tsx` | 表单调试 |
| `form/ModalForm/_modal-form-request-destroy.tsx`、`_drawer-form-request-destroy.tsx` | Modal/Drawer 调试 |
| `form/QueryFilter/_query-filter-test.tsx`、`form/QueryFilter/_light-filter-test.tsx` | QueryFilter 调试 |
| `form/_components-test.tsx`、`form/_base-test.tsx` | 组件/基础对照 |
| `table/_single-test.tsx` | 表格单测对照 |
| `descriptions/_base.demo-test.tsx`、`list/_test-config-provider.tsx`、`field/_base-test.tsx` | 各域调试 |

## 与测试

- 按域快照：`tests/<area>/demo.test.ts` → `demos/<area>/**/[!_]*.tsx`。
- 全量快照：`tests/doc.test.ts` → `demoTest(DEMO_SNAPSHOT_ALL)`。

修改示例后若 CI 快照失败，请确认渲染结果无误再执行 `vitest run … --update`。

## 文档站排版

组件文档页（`site/components/**`）的全局排版由 `.dumirc.ts` 中 `styles` 注入：标题层级、正文行高、与 dumi 示例块（`.dumi-default-previewer`）的间距。调整文档视觉时优先改该处，避免在每个 demo 内重复写内联 `padding`。
