# B22 答疑分诊（2026-10-02）

范围：`todo.md` B22 的 25 个仍开放 issue。以下结论按当前工作区 `src/` 与 issue 讨论核对；“待复现”不等于已经排除缺陷。回复 issue 前应在提问者使用的主版本和当前主线各验证一次。

| Issue | 给提问者的可操作答复 / 验证方法 | 结论 |
| --- | --- | --- |
| [#9291](https://github.com/ant-design/pro-components/issues/9291) | 先在同一 antd 版本下对比“仅 antd Menu”和“Menu + ProLayout”，检查是否有两个 `ConfigProvider` 使用不同 `prefixCls`。讨论中有用户通过给嵌入的 Menu 单独设置 `prefixCls="settings"` 规避；需要其复现仓库和升级前后样式截图确认选择器冲突。 | 转 B15：样式冲突待复现。 |
| [#8912](https://github.com/ant-design/pro-components/issues/8912) | `formItemRender` 返回的输入组件应透传 `fieldProps.value` 和 `fieldProps.onChange`，在自己的 `onChange` 中先做业务处理再调用传入的回调。组件类型不要在每次父组件渲染时重新定义；若仍失焦，提供最小复现并检查输入节点的 `key` 是否变化。 | 答疑；失焦待复现。 |
| [#8903](https://github.com/ant-design/pro-components/issues/8903) | 为每个 `StepForm` 保持稳定 `name` 和 React `key`；从步骤一传值给步骤二时用 `formMapRef`/`stepsFormRef` 读值，不要重建步骤组件或整个 `StepsForm`。返回上一步后用 `getStepFormInstance(0)?.getFieldsValue(true)` 核对 store；如 store 也被清空，请附可运行复现。 | 转 B3：跨步骤值丢失待复现。 |
| [#8854](https://github.com/ant-design/pro-components/issues/8854) | `<ProFormDigit name="amount" min={-100} />`，或设置 `fieldProps={{ min: -100 }}`。当前 `FieldDigitEdit` 默认 `min={0}`，但 `fieldProps` 后展开，可覆盖它；输入 `-1` 后检查提交值。 | 答疑。 |
| [#8812](https://github.com/ant-design/pro-components/issues/8812) | 自定义组件必须接收并透传 `value`、`onChange`：`renderFormItem={(_, { fieldProps }) => <MySelect value={fieldProps?.value} onChange={fieldProps?.onChange} />}`；若组件自己的回调签名不同，转换后再调用。用 `formRef.current?.getFieldsValue(true)` 验证。 | 答疑；issue 中已有相同方向的回复。 |
| [#8807](https://github.com/ant-design/pro-components/issues/8807) | 表单字段由 antd Form 管理。用 `formRef.current?.setFieldsValue({ time: dayjs(next) })` 更新 `ProFormDateTimePicker name="time"`，用 `Form.useWatch('time', form)` 观察；不要只改 `initialValues` 或给字段顶层 `value`。 | 答疑。 |
| [#8792](https://github.com/ant-design/pro-components/issues/8792) | 固定列需要稳定宽度用于 sticky offset 计算。给操作列显式 `width`，为表格设置与列宽匹配的 `scroll.x`；若按钮内容长度可变，改用折叠菜单或按最长内容估算宽度。用不同视口宽度检查固定列位置。 | 答疑；“固定且完全自动测宽”可另列需求。 |
| [#8751](https://github.com/ant-design/pro-components/issues/8751) | `ProLayout` 的菜单数据由外部 `menu.request`/`menuDataRender` 提供时，在该数据源处保存原始服务端字段，并以当前 `location.pathname` 查找匹配节点；若只需当前菜单的标准字段，可从 `menuItemRender` 回调参数取得。此 issue 涉及 Umi Max 路由 API，需附其版本和菜单配置才能给精确调用方式。 | 答疑，需补 Umi 版本。 |
| [#8707](https://github.com/ant-design/pro-components/issues/8707) | 若只调整搜索区布局，使用 `search`、`form`、`toolBarRender` 和外层容器样式。若要将图表与搜索栏并排且表格另起一行，可在表格外单独渲染 `ProForm`，将提交值放入 `ProTable params`，并设 `search={false}`；检查搜索提交后表格 request 参数。 | 答疑。 |
| [#8467](https://github.com/ant-design/pro-components/issues/8467) | `theme.components.ProCard` 不是通用的 antd 组件 token 入口。当前 Pro 样式从 `ProConfigProvider` 的 `token`/antd token 读取；可试 `<ProConfigProvider token={{ colorText: 'red' }}>` 包裹目标卡片，并检查生成样式。若希望**只改 ProCard 标题**，用局部 `className`/CSS 选择器；原 issue 的“Card token 不生效”应在其版本与主线复现。 | 转 B18：组件 token 定制缺口/文档。 |
| [#8446](https://github.com/ant-design/pro-components/issues/8446) | `labelInValue` 要求字段初始值本身是 `{ label, value }`。将服务端 `display_name`/`display_id` 在写入表单时组合成 `initialValues={{ display: { label: display_name, value: display_id } }}`；或用 `convertValue` 做同样转换。未修改直接提交时检查 `transform` 收到对象。 | 答疑。 |
| [#8375](https://github.com/ant-design/pro-components/issues/8375) | 当前 `BaseForm` 在 `request` 的 `initialData` 变化时主动 `setFieldsValue`，因此旧讨论中“request 只设首次默认值”的说法不宜直接复用。用 `id: 1 → 2 → 1` 且每次 request 返回不同文本复现；记录每次 `request` 返回值和 `getFieldsValue(true)`。若第三次返回新值而表单仍旧，按回归缺陷处理。 | 转 B3：重复 params 回填待复现。 |
| [#8366](https://github.com/ant-design/pro-components/issues/8366) | `ProColumns<T, ValueType>` 的第二泛型可加入自定义字面量：`ProColumns<ProductModelInfo, 'lookup'>[]`；`ProFieldValueTypeWithFieldProps` 是 type，不能用接口声明合并。用 `pnpm tsc` 验证列定义；若错误发生在别的 `ProSchema` 声明，附最小类型文件。 | 答疑。 |
| [#8205](https://github.com/ant-design/pro-components/issues/8205) | 受控方式：`<StepsForm current={current} onCurrentChange={setCurrent} />`，导航点击时 `setCurrent(targetIndex)`；当前实现也提供 `stepsFormRef.current?.setCurrentStep(targetIndex)`。核对跳转后 `getCurrentStep()`，并自行决定是否先校验未完成步骤。 | 答疑。 |
| [#8160](https://github.com/ant-design/pro-components/issues/8160) | `menuItemRender` 只替换 Menu.Item **内部内容**，无法改变外层 Menu.Item 的高度。给 `ProLayout` 指定局部 `className`，针对该容器内的 `.ant-menu-item` 设置 `height`、`line-height` 等；检查 hover、选中态和折叠菜单。不要在 `menuItemRender` 内再嵌套一个 `Menu.Item`。 | 答疑；若需正式 token 可另列需求。 |
| [#8105](https://github.com/ant-design/pro-components/issues/8105) | `cancelEditable(key)` 后应恢复编辑前快照；当前 `useEditableArray` 已有恢复表单字段的代码。以 A 行编辑不保存 → 取消 → 再编辑 A/B 行做回归；若仍出现旧输入值，提供是否设置 `editable.name`、受控 `dataSource`、`onValuesChange` 的复现。 | 转 B16：取消编辑值恢复待复现。 |
| [#7874](https://github.com/ant-design/pro-components/issues/7874) | 全部查询标签加宽可用 `search={{ labelWidth: 200 }}`；单个长标签可在列上用 `formItemProps={{ label: <span>完整标题</span> }}` 配合局部样式，或用 `form={{ layout: 'vertical' }}`。验证窄屏下输入框和按钮不溢出。 | 答疑。 |
| [#7776](https://github.com/ant-design/pro-components/issues/7776) | `children-container-no-header` 只在 `pageHeaderDom` 为空时添加；肉眼看到的 header 可能是外层 ProLayout 的 header。对比 DOM 是否存在 `PageContainer` 自己的 PageHeader，检查是否多份 pro-components（pnpm/npm 依赖树），再提供版本锁文件复现。若内部 PageHeader 确实存在仍加该类，则是 B15 缺陷。 | 转 B15：条件渲染/重复依赖待复现。 |
| [#8783](https://github.com/ant-design/pro-components/issues/8783) | `ProConfigProvider` 提供 `hashed` 属性；当前默认继承 antd `ConfigProvider` 的 hash 设置。用 `<ProConfigProvider hashed>` 包裹并检查 Pro 元素生成的 `hashId` 类；不要把 antd 的 `css-dev-only-do-not-override-*` 字符串当成稳定 API。 | 答疑。 |
| [#8745](https://github.com/ant-design/pro-components/issues/8745) | 当前 `ProConfigProvider` 没有统一的 `allowClear` 配置。可在业务层封装字段，例如 `const Text = (p) => <ProFormText allowClear={false} {...p} />`，其他字段类型类似处理；用清除按钮是否消失验证。统一全局默认值属于新需求。 | 转 B21：新增全局默认配置评估。 |
| [#9625](https://github.com/ant-design/pro-components/issues/9625) | `ProTable` 的列转换保留 `Table.SELECTION_COLUMN`。在 `columns` 期望位置放该标记，并同时配置 `rowSelection={{ ... }}`；检查该列是否移动。若标记在当前 antd/ProTable 版本仍无效，提交最小 columns/rowSelection 复现。 | 答疑；无效则转 B14。 |
| [#9627](https://github.com/ant-design/pro-components/issues/9627) | 直接传 antd Table 的 `summary` prop：`<ProTable summary={(rows) => <Table.Summary.Row><Table.Summary.Cell index={0}>合计：{rows.reduce((n, r) => n + r.balance, 0)}</Table.Summary.Cell></Table.Summary.Row>} />`。`rows` 为当前页数据；跨页总计需后端另给汇总。 | 答疑；issue 中已有同方向回复。 |
| [#9621](https://github.com/ant-design/pro-components/issues/9621) | 异步 Select 只有 `value` 而请求尚未返回对应 `{label,value}` 时，无法推断 label。初始化时同时提供该选项（`options`/`valueEnum` 或 request 首次结果），字段值保持原始 value；若要提交对象则启用 `labelInValue` 并以 `{label,value}` 初始化。测试“首次挂载、请求完成、未改动直接提交”；如果请求已含对应项仍不能回显，转 B10 修复。 | 转 B10：异步默认值待复现。 |
| [#6680](https://github.com/ant-design/pro-components/issues/6680) | 当前表单栅格由 `GridContext`/`ColWrapper` 处理，自定义 `ProFormItem` 并不自动等同内置字段。最小解决方式是 `<Col xs={24} md={12}><ProForm.Item name="x"><CustomInput /></ProForm.Item></Col>`；检查生成 DOM 的 Col 宽度。若需通用自动布局，另开设计需求。 | 答疑。 |
| [#8528](https://github.com/ant-design/pro-components/issues/8528) | `ProConfigProvider` 当前可配置 `token`、`valueTypeMap`、`dark`、`hashed`、`prefixCls`、`intl`、`autoClearCache`；`needDeps` 主要是组件内部使用。举例：`<ProConfigProvider token={{ colorPrimary: '#1677ff' }} valueTypeMap={{ lookup: { render: () => '...' } }}>...</ProConfigProvider>`。需补官方中英文 API 文档后回复文档链接。 | 转文档修复：缺少独立 API 文档。 |

## 后续动作

1. 先对转批次的 #9291、#8903、#8467、#8375、#8105、#7776、#9621 做最小复现；未复现时向提问者索要版本、锁文件和运行示例，保留开放状态。
2. 将 #8745 纳入 B21 需求评估；#8528 补中英文文档；其余答疑在 issue 中给出对应配置和验证步骤。
3. 只有提问者确认、或维护者核实版本与复现结论后，才关闭相应 issue。不要因本表写了“答疑”就直接关闭。
