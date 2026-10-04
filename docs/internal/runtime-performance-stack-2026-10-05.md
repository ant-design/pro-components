# 运行时技术栈与加载性能优化（2026-10-05）

## 本批次结果

本批次移除了 `swr` 与 `@umijs/route-utils` 两个运行时依赖，并减少默认入口加载的语言包。以下数据均在同一台 Windows 机器、同一分支依赖集上测量；consumer bundle 使用 esbuild，外置 React、ReactDOM、antd 与 dayjs。

| Consumer 入口 | 优化前 raw | 优化后 raw | raw 变化 | 优化前 gzip | 优化后 gzip | gzip 变化 |
| ------------- | ---------: | ---------: | -------: | ----------: | ----------: | --------: |
| `ProTable`    |  488,663 B |  418,070 B |   -14.4% |   156,295 B |   137,046 B |    -12.3% |
| `ProForm`     |  181,848 B |  118,892 B |   -34.6% |    58,711 B |    42,102 B |    -28.3% |
| `ProLayout`   |  248,260 B |  166,862 B |   -32.8% |    77,531 B |    54,516 B |    -29.7% |

| 发布产物 |    优化前 |    优化后 |  变化 |
| -------- | --------: | --------: | ----: |
| UMD raw  | 735,309 B | 709,976 B | -3.4% |
| UMD gzip | 229,605 B | 219,637 B | -4.3% |

Windows 本地冷启动的三次中位数：root 2,113 ms、table 2,004 ms、form 1,959 ms、layout 1,824 ms。优化前单次基线约为 root 3,380 ms、table 3,210 ms、form 2,640 ms、layout 2,990 ms；进程启动和实时扫描会造成波动，因此这些数字用于判断量级，不作为 CI 门禁。

## 实施内容

### 1. 内建轻量请求缓存

Select、Layout 和 Provider 改用项目内的 `useRequestData`。它保留请求去重、缓存更新、重新加载与 Provider 隔离能力，不再要求应用安装 SWR。ProForm 的请求回归覆盖了参数切换、返回旧参数时重新取数、初始值覆盖和 loadingRender。

公开属性 `cacheForSwr` 暂时保留原名以维持兼容；它现在控制内建请求缓存的生命周期。

### 2. 内建路由菜单转换

Layout 使用本地 `transformRoute` 与 `getMatchMenu`，覆盖相对路径、动态参数、面包屑、父级 key、`flatMenu`、隐藏菜单和无路径布局。无路径节点使用基于父节点与同级位置的稳定 key，避免引入哈希实现。

### 3. 按需语言包

Provider 默认入口仅保留自动识别常用地区所需的 zh-CN、zh-TW、en-US、en-GB、it-IT、ko-KR 和 ru-RU。完整 34 种语言继续由独立入口提供；Money 的显式 `locale` 仍覆盖全部原有货币符号。其他地区需要完整界面文案时应显式传入：

```tsx
import { ProConfigProvider } from '@ant-design/pro-components/provider';
import { frFRIntl } from '@ant-design/pro-components/locale';

export default () => (
  <ProConfigProvider intl={frFRIntl}>{/* application */}</ProConfigProvider>
);
```

### 4. 可裁剪表格入口

新增稳定的 package exports 和三种表格入口，应用可以避免解析未使用的编辑或拖拽模块：

```tsx
import ProTable from '@ant-design/pro-components/table/core';
import { EditableProTable } from '@ant-design/pro-components/table/editable';
import { DragSortTable } from '@ant-design/pro-components/table/drag-sort';
```

原有根入口与 `table` 入口继续可用。`@emotion/css` 和 `react-draggable` 只用于站点 demo，因此移到开发依赖。

### 5. 渲染热路径

- SchemaForm 的默认更新判断不再对整个表单值做两次序列化。
- BaseForm 与 Table 的 Context value 使用稳定引用，减少无关子树更新。
- 新增 10,000 行虚拟表格 demo，展示 `virtual` 与固定 `scroll.y` 的推荐配置。

## 复测命令

```powershell
pnpm install --frozen-lockfile --offline
pnpm run typecheck
pnpm test
pnpm run build
pnpm run analyze:bundle
pnpm run check:build-outputs
pnpm run check:declarations
pnpm run check:published-types
```

## 后续方向

下一批优先对 ProTable 的编辑状态与列设置做 React Profiler 测量，并给关键入口增加 consumer bundle 预算。发布包的模块数量和 UMD raw/gzip 已有稳定检查基础，可以在积累数次主分支样本后设定阈值。
