# 运行时与包体积性能审计（2026-10-04）

## 本批次结果

| 项目                                          |      优化前 |    优化后 |      结果 |
| --------------------------------------------- | ----------: | --------: | --------: |
| UMD 原始体积                                  | 1,928,513 B | 761,644 B |    -60.5% |
| UMD gzip 体积                                 |   606,696 B | 234,281 B |    -61.4% |
| 50,000 行、选中 100 行、连续 1,000 次选择回调 | 1,447.82 ms |   1.62 ms | 约 895 倍 |

选择基准测量的是索引已建立后的高频路径。首次读取仍需 O(n) 建立行键索引，后续选择从每次两次全表扫描 O(n) 改为按已选键读取 O(k)。数据来自本机 Node.js 基准的 7 组中位数，绝对耗时会随机器变化。

可复测命令：

```powershell
pnpm run build
pnpm run analyze:bundle
pnpm run benchmark:selection
```

## 已实施

### 1. 修正 UMD 外部依赖

Father 的 `externals` 使用 webpack externals 的请求名映射。原配置中的 `^/antd/.*` 与 `^/dayjs/.*` 是普通对象键，而且多了前导 `/`，不会匹配项目实际的 `antd`、`dayjs` 导入。

本批次改为 `antd` 与 `dayjs` 的准确请求名。两者仍由 peer dependency 约束版本，UMD 入口现在从 CommonJS、AMD 或全局变量加载它们。

### 2. ProList 选择回调复用行键索引

多选一次原本为 `onChange` 和 `onSelect` 各执行一次 `data.filter`。现在通过 `useLazyKVMap` 已有的键索引按 `selectedRowKeys` 读取，并让两个回调复用同一个 `selectedRows` 数组。

这也让树形数据的子节点选择能正确进入回调；旧的顶层 `data.filter` 无法返回子节点。

### 3. 稳定键查询函数引用

`useLazyKVMap` 的 `getRecordByKey` 改为 `useCallback`。输入未变化时，下游选择列不会因为查询函数每次 render 都换引用而重新生成。

### 4. 移除编辑表格 render 阶段的深比较

编辑表格的数据源索引使用普通 `useEffect` 按引用变化重建。旧实现会在 render 阶段深度遍历大型 `dataSource`，数据变化后还要再遍历一次构造 Map，形成重复 O(n) 工作。

## 后续优先级

### P1：为大表格提供虚拟滚动基准与示例

项目已经透传 antd Table 的 `virtual` 能力。建议补一组 10,000 行的官方 demo，并记录普通渲染与 `virtual + scroll.y` 的首屏提交耗时、DOM 节点数和滚动帧耗时，作为用户选型依据。

### P1：拆分 `useEditableArray`

该模块仍是 ES 产物中最大的单个业务模块之一，编辑、删除、校验和行键转换集中在一个 Hook。下一批应先用 React Profiler 定位提交阶段热点，再把只依赖稳定配置的计算移到 memo 或索引结构，避免按文件大小直接重构。

### P2：增加发布包体积预算

`analyze:bundle` 已提供稳定的 raw/gzip 输出。待 CI 的发布产物路径稳定后，可在主分支基线之上设置允许增幅，防止 peer dependency 再次被打进 UMD。预算应同时保留绝对大小和相对增幅，避免小包的百分比噪声。

### P2：评审图标包的 UMD 外置协议

`@ant-design/icons` 仍包含在 UMD 中。只有在明确浏览器全局变量名、版本兼容范围和迁移说明后才适合外置；否则会把体积问题转化为运行时加载失败。

### P2：继续收敛深比较 Hook

`useDeepCompareEffect` 和 `useDeepCompareMemo` 仍应逐处检查。数据表和表单热路径优先采用稳定引用、字段级依赖或版本号；不能统一替换，因为部分调用依赖对象内容变化而引用不变的兼容行为。
