# Pro Components 示例（demos）

与文档站 `site/components/**` 中的 `<code src="../../../demos/...">` 对应，本目录为组件示例源码。

## 命名约定

| 规则           | 说明                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Kebab-case** | 推荐 `basic.tsx`、`custom-filter.tsx`                                                                                           |
| **`_` 前缀**   | 文件名以 `_` 开头：适合 **debug / 临时对照**；文档仍可引用                                                                      |
| **Form 子目录** | `form/steps-form/`、`form/schema-form/`、`form/query-filter/`、`form/modal-form/`、`form/login-form/`、`form/field-set/`、`form/group/`、`form/dependency-demos/` 等与文档 `<code src>` 路径一致 |

## 已用 `_` 归类的调试向示例（节选）

| 路径                                                                                   | 说明              |
| -------------------------------------------------------------------------------------- | ----------------- |
| `layout/_debug-demo.tsx`、`layout/_morse-debug.tsx`                                    | 布局调试          |
| `layout/page-header/`、`layout/page-container/`                                         | 页头 / 页面容器文档示例目录 |
| `form/_pro-form-dependency.tsx`、`form/_modalform-test.tsx`                            | 表单调试          |
| `form/modal-form/_modal-form-request-destroy.tsx`、`_drawer-form-request-destroy.tsx`                                   | Modal / Drawer 调试 |
| `form/query-filter/_query-filter-test.tsx`、`form/query-filter/_light-filter-test.tsx`                                 | QueryFilter 调试    |
| `form/_components-test.tsx`、`form/_base-test.tsx`                                     | 组件/基础对照     |
| `table/_single-test.tsx`                                                               | 表格单测对照      |
| `table/list-toolbar/`、`table/editable-table/`、`table/drag-sort-table/`                | ListToolBar / 可编辑 / 拖拽示例目录 |
| `descriptions/_base.demo-test.tsx`、`list/config-provider.tsx`、`field/_base-test.tsx` | 各域调试          |

## 文档站排版

组件文档页（`site/components/**`）的全局排版由 `.dumirc.ts` 中 `styles` 注入：标题层级、正文行高、与 dumi 示例块（`.dumi-default-previewer`）的间距。调整文档视觉时优先改该处，避免在每个 demo 内重复写内联 `padding`。
