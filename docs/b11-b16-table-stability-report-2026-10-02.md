# B11–B14、B16 表格稳定性与性能处理记录

验证环境：Windows 11、Node.js 22.22.2、React 18.3.1、antd 6.6.5、
`@ant-design/pro-components` 3.1.15-3 开发分支。

## 处理顺序与共同根因

1. 先处理会重挂 DOM、写错行数据或进入反馈循环的问题：DragSortTable 包装组件身份不稳定；EditableTable 在 `name`、过滤和树形数据组合下混用了展示索引、业务 key 与表单路径。
2. 再处理列设置：多级列的节点 key、父子可见状态和同级顺序必须递归处理；长列表使用虚拟滚动，并在拖到边缘时推进滚动容器。
3. 最后验证性能路径：普通 `ellipsis: true` 使用 antd 原生 CSS；编辑态 key 查询使用预建 `Set`/`Map`；表格内部 `valueTypeMap` 保持稳定。

## 性能数据

| 场景 | 修复前 | 修复后 | 验证方式 |
| --- | ---: | ---: | --- |
| 100 个 `editableKeys` 的单次命中查询 | `Array.some` 中位数 100.16 ns | `Set.has` 中位数 35.54 ns | 同机 8 轮、每轮 2,000,000 次，提升 2.82 倍；`node scripts/benchmarks/tableEditableLookup.mjs` |
| 200 行普通 `ellipsis: true` | 200 个 `Typography.Text` 及其省略测量链 | 0 个 `Typography`，200 个原生 ellipsis 单元格 | `tests/table/ellipsisNative.test.tsx` |
| DragSortTable 重新取数 | 4 个稳定性用例中表头或表体 DOM 被替换，4/4 失败 | 原 DOM 节点全部保留，4/4 通过 | `dragSortComponentStability` 与 `dragSortScrollStability` |
| 行选择后的滚动位置 | 表体重挂后滚动位置归零 | `scrollLeft=180`、`scrollTop=40` 均保持 | `dragSortScrollStability.test.tsx` |
| 30 行可编辑表格改单行 | 未修改的末行编辑器会随整表刷新 | 未修改的末行渲染次数为 0 | `editor-table.test.tsx` 的 #9264/#9271/#9612 用例 |

微基准比较的是实现中的两种查询算法，用于隔离浏览器布局噪声；它不代表一次完整分页操作的绝对耗时。DOM 数量、节点身份和渲染次数由回归测试直接断言。

## 25 项结论

| 分组 | Issue | 结论 | 可验证配置或最小示例 |
| --- | --- | --- | --- |
| B11 | #8879 | 已优化 30 字段分页热路径；请求 loading 仍由 `request` 生命周期驱动 | 30 列 × 20 行，`request` 返回 Promise；运行表格请求测试及本报告微基准 |
| B11 | #8886 | 与 #8879 同根因，合并验证 | 同上；避免在父组件 render 内重新创建 `columns` 可进一步减少用户侧 diff |
| B11 | #8868 | 已修复 | `ellipsis: true` 走原生 CSS；需要自定义 tooltip 或 copyable 时仍走 Typography；`ellipsisNative.test.tsx` |
| B11 | #8170 | 已优化列拖拽/改单元格时的热路径 | 未启用 `editable` 时不再包编辑态 `onCell`；启用时使用 O(1) key 索引；运行微基准和 editor-table 渲染次数用例 |
| B11 | #8054 | 已修复 | keepalive 外层重渲染时内部 `valueTypeMap` 引用稳定；`providerValueTypeMapStable.test.tsx` |
| B11 | #9150 | 已覆盖可确认的 Provider 根因；原报告缺少稳定复现 | 最小验证为 memo 字段消费者 + 外层无关状态更新；若仍发生筛选项消失，需要提供 react-activation 版本和可运行仓库 |
| B11 | #8053 | 当前依赖组合不可复现，增加防回归 | 20 行 `ellipsis + copyable` 连续正反序替换 6 次，无 `removeChild` 异常；`ellipsisNative.test.tsx` |
| B12 | #8985 | 已修复 | DragSortTable 禁用 dnd-kit 页面级 auto-scroll，释放指针后不再继续滚动；`dragSort.test.tsx` |
| B12 | #8583 | 与 #8985 同根因，合并修复 | 同上 |
| B12 | #8342 | 已修复 | `scroll={{ y: 200 }}` 下重新取数，`thead`/`tbody` 保持同一 DOM 节点；`dragSortScrollStability.test.tsx` |
| B12 | #8404 | 已修复 | `rowSelection` 更新后横向 180、纵向 40 的滚动位置保持；`dragSortScrollStability.test.tsx` |
| B13 | #8947 | 已修复 | ReactNode 列标题 + `columnsState` localStorage，切换列后持久化对象仅含列状态，不含 Fiber；`columnSettingBehavior.test.tsx` |
| B13 | #8750 | 当前版本已验证 | 连续切换列 3 次后点击空白，Popover 正常关闭；`columnSettingBehavior.test.tsx` |
| B13 | #8841 | 已修复 | 30 列使用 `Tree height` 虚拟滚动；可用 `options={{ setting: { listsHeight: 120 } }}` 调整；`columnSettingBehavior.test.tsx` |
| B13 | #9115 | 已修复 | 拖到列表上下边缘时按帧调整 holder 的 `scrollTop`，结束或离开后停止；`columnSettingBehavior.test.tsx` |
| B14 | #8988 | 已修复 | 三级分组可展开；隐藏全部子列会隐藏父组，重新选子列会恢复父组；`columnSettingGroup.test.tsx` |
| B14 | #8133 | 已修复 | 分组内子列的 `columnsState.order` 会在递归转换时排序；`columnSettingGroupSort.test.tsx` |
| B14 | #8880 | 已修复 | `CellEditorTable` 递归给叶子列注入 `onCell`，分组列双击可编辑；`cellEditorGroup.test.tsx` |
| B16 | #8930 | 已修复 | `name="table"` + 本地筛选后编辑 id=2，输入框读取真实数据索引 1 的值；`editableFilterIndex.test.tsx` |
| B16 | #8662 | 已修复 | 二级行进入编辑后取消，不触发 `onDelete` 且行保留；`nestedEditableRow.test.tsx` |
| B16 | #7859 | 已修复 | 子行变更时 `onValuesChange(record)` 保留子行自身 id；`nestedEditableRow.test.tsx` |
| B16 | #8861 | 与 #7859 同根因，递归行查找覆盖多级 children | `nestedEditableRow.test.tsx` |
| B16 | #8174 | 已修复 | `recordCreatorProps.record` 在点击时求值，每次点击读取最新 dataSource；`recordCreatorTiming.test.tsx` |
| B16 | #9184 | 已修复 | 函数式 `formItemProps` 的 `config.entry` 从当前行表单值读取，依赖字段变化会更新 required；`dynamicFormRules.test.tsx` |
| B16 | #9622 | 用法问题，给出最小配置 | `renderFormItem` 内的上传控件不要再传第二个 `name`，也不要固定 `fileList: []`；让单元格 Form.Item 通过 `value`/`onChange` 管理文件列表 |

## #9622 最小示例

```tsx
const columns: ProColumns<Row>[] = [
  {
    title: '附件',
    dataIndex: 'image',
    renderFormItem: () => (
      <ProFormUploadButton
        fieldProps={{
          action: '/api/upload',
          maxCount: 1,
        }}
      />
    ),
  },
];
```

`EditableProTable` 已经用列的 `dataIndex` 注册外层表单项。内部再次传
`name="image"` 会形成嵌套表单项；固定 `fieldProps.fileList = []` 则会在每次渲染时把受控列表清空，表现为上传完成但列表不更新。

## 回归命令

```powershell
pnpm exec vitest run tests/table/dragSort.test.tsx tests/table/dragSortComponentStability.test.tsx tests/table/dragSortScrollStability.test.tsx tests/table/columnSettingBehavior.test.tsx tests/table/columnSettingGroup.test.tsx tests/table/columnSettingGroupSort.test.tsx tests/table/cellEditorGroup.test.tsx tests/table/editableFilterIndex.test.tsx tests/table/nestedEditableRow.test.tsx tests/table/recordCreatorTiming.test.tsx tests/table/dynamicFormRules.test.tsx tests/table/ellipsisNative.test.tsx tests/table/providerValueTypeMapStable.test.tsx
node scripts/benchmarks/tableEditableLookup.mjs
```
