# Open Issues 修复计划(2026-09-28 快照)

> 数据源:`gh issue list --state open`(183 个)
> 处理原则:**分诊优先 → 根因聚类 → 批量修复 → 测试验收 → 双语 Changelog**
> 「全部处理完」= 每个 issue 必须落到以下出口之一:**已修复(带测试) / 已答疑(附文档) / 已排期(feature) / 已关闭(重复/无效/过期)**。任何 issue 不允许无人认领。

## 📊 总览

| 维度 | 分布                                                                                                            |
| ---- | --------------------------------------------------------------------------------------------------------------- |
| 类型 | bug 107 / feature 34 / question(含 How to use)37 / 其他 5                                                       |
| 组件 | table 54 / form 53 / layout 20 / editable 14 / core 11 / field 5 / card 4 / list 3 / build 2 / docs 2 / 其他 15 |

## 🗂 批次总表(22 批,覆盖全部 183 个 issue)

| 批次 | 主题                                               | 数量 | 优先级 | 预估   |
| ---- | -------------------------------------------------- | ---- | ------ | ------ |
| B1   | 构建与依赖兼容                                     | 8    | P0     | 3d     |
| B2   | 崩溃 / 报错 / 类型错误                             | 8    | P0     | 3d     |
| B3   | Overlay 表单值同步(ModalForm/DrawerForm/StepsForm) | 9    | P0     | 4d     |
| B4   | 日期 / 数值格式化                                  | 11   | P1     | 4d     |
| B5   | 校验与提交行为                                     | 8    | P1     | 3d     |
| B6   | 搜索表单(QueryFilter)联动与布局                    | 12   | P1     | 4d     |
| B7   | ProFormList                                        | 8    | P1     | 3d     |
| B8   | transform / convertValue                           | 4    | P1     | 2d     |
| B9   | 只读(read)模式                                     | 4    | P1     | 1d     |
| B10  | TreeSelect / Select 数据加载                       | 4    | P1     | 2d     |
| B11  | 表格性能与稳定性                                   | 7    | P1     | 5d     |
| B12  | DragSortTable 拖拽滚动                             | 4    | P1     | 2d     |
| B13  | 列设置 ColumnSetting                               | 4    | P1     | 2d     |
| B14  | 多级表头                                           | 3    | P1     | 2d     |
| B15  | ProLayout 菜单 / 主题 / SSR / 移动端               | 13   | P1     | 5d     |
| B16  | EditableProTable 可编辑表格                        | 7    | P1     | 3d     |
| B17  | 废弃 API 清理(findDOMNode / bordered)              | 3    | P2     | 1d     |
| B18  | ProCard                                            | 5    | P2     | 2d     |
| B19  | ProList                                            | 4    | P2     | 1d     |
| B20  | 杂项(样式 / i18n / 文档站 / 表格渲染)              | 13   | P2     | 3d     |
| B21  | 新特性评估(排期 / 招募 PR)                         | 19   | P3     | 评审会 |
| B22  | 答疑与用法(回复 → 文档 → 关闭)                     | 25   | P3     | 滚动   |

校验:8+8+9+11+8+12+8+4+4+4+7+4+4+3+13+7+3+5+4+13+19+25 = **183** ✅

## 执行约定

- 分支:`fix/*` → `master`(B1–B20、B22);`feat/*` → `feature`(B21)
- 每个 PR:修复 + `tests/` 回归测试(先写失败用例)+ 中英 CHANGELOG + 关联 issue 号
- PR body 末尾标注 `> Submitted by Cursor`
- 修不动/需讨论的 issue 在 issue 下留言说明结论,不许静默跳过

---

## B1 构建与依赖兼容(P0,8 个)

**根因方向**:子包 peerDependencies 与 antd v6 对齐、依赖声明(errors vs peers)、打包 external 配置。

- [ ] #9629 子包 peerDependencies 不兼容 antd v6(全包核对 peer 范围)
- [ ] #9348 安装 v3 后 node_modules 翻倍(umi 拉入 v2;输出 resolutions 指引文档 + 官方 FAQ)
- [ ] #8931 评估 es-toolkit 替换 lodash-es(体积收益报告,再决定)
- [ ] #8853 `Can't resolve 'rc-util'`(构建 external/依赖声明修复)
- [ ] #8804 单独升级 pro-table 无法 build(版本联动核对)
- [ ] #8543 next14 + antd 5.18 Login 表单报 `Cannot read 'Group'`(对齐 antd 导入方式)
- [ ] #9034 path-to-regexp `symbol.charCodeAt is not a function`(路径非法输入防御)
- [ ] #8204 pro-field 2.14.6 破坏 antd4 项目(老版本兼容回查)

## B2 崩溃 / 报错 / 类型错误(P0,8 个)

> 进度(2026-09-28):#8253 已修复(PR #9710);#8642 已修复(commit 7467ba136);#8648 已修复(commit 7ddd96bbc);#9093 findDOMNode 已清除(QueryFilter 部分由 #9065 修复,无残留调用);#8740 类型验证通过+fixture 锁定(PR #9710);#9617 已答疑(正确 prop 是 tooltip);#8845 已答疑(render 首参为单元格原始值,与文档一致);#7773 已答疑(Outlet 外层加 Suspense,关联 #6264)

- [x] #8253 search `grid:true` 报 `items.flatMap is not a function`(PR #9710)
- [x] #7773 ProLayout `undefined is not iterable`(已答疑:无堆栈难复现,关联 #6264 Suspense 方案)
- [x] #8642 React 不识别 DOM 上的 `showCount` prop(透传过滤,commit 7467ba136)
- [x] #8648 `submitButtonProps=false` 提交按钮仍显示(commit 7ddd96bbc)
- [x] #9617 `tip` 不在 ProColumns 类型中(已答疑:正确属性为 tooltip)
- [x] #8740 ProFormColorPicker onChange 类型(AggregationColor)(类型已兼容,fixture 锁定)
- [x] #8845 ProFormField 类型错误(已答疑:render 首参为单元格原始值)
- [x] #9093 react18 使用 ProTable 报错(代码已无 findDOMNode)

## B3 Overlay 表单值同步(P0,9 个)⚠️ 已有进行中代码

> 工作区现存 WIP:`src/form/layouts/_shared/useOverlayForm.tsx`、#8920 已落地(commit a36b2daed)。
> 进度(2026-09-28):#9624 受控 open+trigger 死锁已修复(PR #9710,含回归测试);#8924 行为验证正确+测试锁定(PR #9710)。#8834/#9165 已修复(BaseForm 深比较 initialValues 变化并清旧值,commit 3c107394f)。#8624 已验证+测试锁定(request effect 清旧值已覆盖,Form.useWatch 收敛到最新 request 数据)。#8108 已修复(StepsForm formInitVersion 重新同步外层 formRef)。#8753 已验证(同 #9210 根因,PR #9214 已修,回归测试锁定)。#9628 待答复(行为符合 antd 懒挂载设计,值仍会写入)。

- [x] #8834 ModalForm `initialValue` 永远是上一次的值(BaseForm initialValues 同步 effect,commit 3c107394f)
- [x] #8624 request + hooks 同用时 request/initialValue 取旧值(已验证+测试锁定)
- [x] #9165 DrawerForm ProFormText initialValue 显示上次数据(同 #8834 修复)
- [ ] #9628 ModalForm 拿 form 实例报 `Instance created by useForm is not connected`(答疑:Modal 懒挂载下符合 antd 设计)
- [x] #9624 Dropdown 中 ModalForm 默认展开(受控死锁修复,PR #9710)
- [x] #8753 next.js 集成 BetaSchemaForm ModalForm 打开后内容空白(同 #9210,PR #9214 已修,回归测试锁定)
- [x] #8924 ModalForm 触发元素 stopPropagation 后点击任意处触发父级冒泡(行为正确,测试锁定)
- [x] #9021 StepsForm.StepForm 包一层后渲染逻辑被覆盖(自身 props 优先合并,测试锁定)
- [x] #8108 StepsForm 拿不到 formRef(formInitVersion 重新同步,回归测试锁定)

## B4 日期 / 数值格式化(P1,11 个)

> 进度(2026-09-28):B4 全部完成。#8875/#8863/#8542/#9618/#8810 已修复或锁定,#7813/#8733/#9312/#8833/#8790/#8877 已答疑并回复 issue。

- [x] #8875 EditableProTable date 输出变成 `YYYY-MM-DD hh:mm:ss`(已验证按 valueType 正确格式化,测试锁定)
- [x] #8863 EditableProTable date + `format:'DD/MM/YYYY'` 赋值解析失败(已修复,编辑态传 format 解析+宽容重试)
- [x] #7813 ProFormDateTimeRangePicker value 格式错误无法格式化(已答疑:双 dayjs 实例,给出 resolutions 方案,行为已测试锁定)
- [x] #8733 ProFormDateRangePicker 国际化失效(已答疑,行为已测试锁定)
- [x] #9312 页面定时器 + dateRange 打开异常(已答疑:定时器每秒 setFieldsValue 重置所致,非组件 bug)
- [x] #8833 Select dropdownRender 内 RangePicker 二次选择无法选开始时间(已答疑:antd 焦点管理行为,给出 blur workaround)
- [x] #8790 DrawerForm 内 DateRangePicker 弹层超出 drawer 被裁剪(已答疑:父节点挂载默认+getPopupContainer 覆盖方案)
- [x] #8810 syncToUrl 秒级时间戳回显(已修复:parseValueToDay 识别 10/13 位时间戳字符串,测试锁定)
- [x] #8877 ProFormMoney 按分提交、按元展示(已答疑:convertValue/transform 现有 API 可实现,不内置 unit 预设)
- [x] #8542 ellipsis + valueType 时 tooltip 与文本一致(已修复:mismatch valueType 集合走 dom tooltip,测试锁定)
- [x] #9618 ProTable valueType:'money' 编辑模式异常(已验证:现版 InputNumberPopover 正常,保存值为数字,测试锁定)

## B5 校验与提交行为(P1,8 个)

- [ ] #8380 `validateTrigger="onBlur"` 校验不生效
- [ ] #8956 ProFormText 校验失败页面闪烁
- [ ] #8942 ModalForm 校验信息出现导致表单项高度跳动
- [ ] #8895 LoginForm rules message 提示跳动
- [ ] #8892 ProFormText show help rules 撑破边框
- [ ] #8859 EditableProTable 违反 rules 时 field 多出 margin
- [ ] #8992 `scrollToFirstError` 对 ProFormUploadDragger 不滚动
- [ ] #8044 ProFormDigit 非必填空值时提交数据缺字段(undefined vs 缺失语义)

## B6 搜索表单(QueryFilter)联动与布局(P1,12 个)

- [ ] #9193 ProTable 搜索、筛选无效
- [ ] #8503 `collapse:true` 时 form 数据变化即触发 reload
- [ ] #8660 ProTable search 回显错误
- [ ] #8499 ProTable 中 form 部分属性不生效(白名单透传核对)
- [ ] #8836 search span 固定值时小屏不自适应、按钮溢出
- [ ] #8802 收起状态下展示行数可配置
- [ ] #8780 valueType select + request 选中后触发一次多余搜索
- [ ] #8928 EditableProTable select 失焦导致 request 重复调用
- [ ] #8310 QueryFilter 宽度不足时未隐藏组件化的表单项
- [ ] #8397 BetaSchemaForm QueryFilter `hidden` 仍占位
- [ ] #8801 ProFormSelect searchValue 无法触发 request 更新
- [ ] #9148 自定义 valueType 取不到 fieldProps / request 参数

## B7 ProFormList(P1,8 个)

- [ ] #8939 自定义 ref FormListActionType 无法触发 onAfterAdd/onAfterRemove/beforeRemoveRow
- [ ] #8700 首次提交未触发 transform
- [ ] #8208 子项 `preserve={false}` 导致新增行丢值
- [ ] #8896 第二个子项未渲染
- [ ] #8561 BetaSchemaForm columns 为 formList 时 title 拿不到 index
- [ ] #8893 与 Form 配合 name + 多行编辑新增子项配置问题
- [ ] #8702 ProFormList 支持 convertValue(feature 顺带)
- [ ] #6508 ProFormList 嵌套 EditableTable 设置 editableKeys(老 issue,给示例或支持)

## B8 transform / convertValue(P1,4 个)

- [ ] #8907 ProFormFieldSet convertValue/transform 在新增/编辑表现不一致
- [ ] #8480 StepsForm + Form.List + Tabs 时 DateTimeRangePicker transform 不触发
- [ ] #9120 convertValue 建议传入整行数据(feature 顺带)
- [ ] #9032 ProTable 支持 serialize/deserialize(feature 顺带)

## B9 只读(read)模式(P1,4 个)

- [ ] #8848 ProFormSelect readonly 空数组时什么都不显示(应显示 placeholder/-)
- [ ] #8844 ProFormDigit readonly 不显示 prefix/suffix
- [ ] #8710 ProFormCascader readonly label 显示错误
- [ ] #8517 ProDescriptions valueType=select 值为 number 时不显示 text(valueEnum 键类型归一)

## B10 TreeSelect / Select 数据加载(P1,4 个)

- [ ] #9138 ProFormTreeSelect 数据量大时底部被截断
- [ ] #8876 ProFormTreeSelect onDropdownVisibleChange 后下拉无法展示
- [ ] #8869 ProFormTreeSelect 取不到 halfChecked
- [ ] #6766 ProFormSelect request 节流后返回数据不更新(2021 年老 issue)

## B11 表格性能与稳定性(P1,7 个)

- [ ] #8879 字段列多时分页切换卡顿、无 loading
- [ ] #8886 30 列分页卡顿
- [ ] #8868 ellipsis 数量多时渲染慢
- [ ] #8170 列拖拽功能卡顿
- [ ] #8054 keepalive 切换路由已加载页面 ProTable 重渲染一次
- [ ] #9150 react-activation keepalive 切换后筛选栏概率不显示
- [ ] #8053 Ellipsis `removeChild` crash(unmount 竞态)

## B12 DragSortTable 拖拽滚动(P1,4 个)

- [ ] #8985 表格滚动时结束拖拽页面持续滚动
- [ ] #8583 拖动表格导致滚动条向下无法停止(同根因)
- [ ] #8342 scroll.y 重取数据后表头闪烁
- [ ] #8404 每次选择行滚动条跳到最左/最上

## B13 列设置 ColumnSetting(P1,4 个)

- [ ] #8947 点击设置异常(读 issue)
- [ ] #8750 多次编辑后点空白无法收起下拉
- [ ] #8841 列条目太多被遮挡切割(加滚动)
- [ ] #9115 列设置拖拽无法触底滚动(长列表拖拽体验)

## B14 多级表头(P1,3 个)

- [ ] #8988 多级表头分组 + 列显示异常
- [ ] #8133 表头分组后列排序、拖动子级表头不生效
- [ ] #8880 分组表头下 CellEditorTable 无法双击编辑

## B15 ProLayout 菜单 / 主题 / SSR / 移动端(P1,13 个)

- [ ] #9646 顶部一级切换左侧二级导航多出一层 ProLayout
- [ ] #9311 左侧菜单和头部内容问题
- [ ] #9013 动态菜单 icon 显示成文字
- [ ] #8852 Layout Menu 样式与 antd 组件冲突
- [ ] #8637 top 模式定制菜单背景色后二级菜单全白看不清
- [ ] #8976 Sider Token 在 menu=group 下无法设置一级标题颜色
- [ ] #9168 黑色主题不生效、官网示例显示错误
- [ ] #8916 SSR 宽度 <990 报错
- [ ] #8748 移动端抽屉开启后页面仍可滚动
- [ ] #8672 移动端 SiderMenu 无法铺满屏幕
- [ ] #8712 首屏 padding 抖动
- [ ] #8678 ProLayout 组件不适配问题
- [ ] #8929 部分 pro-components 无法消费 ConfigProvider token

## B16 EditableProTable 可编辑表格(P1,7 个)

- [ ] #8930 editable + formItem 筛选后编辑错乱
- [ ] #8662 嵌套表格二级内容 onCancel 后自动执行 onDelete
- [ ] #7859 子列表格 onValuesChange 的 changevalue 拿不到 id
- [ ] #8861 嵌套多层数据编辑时 onValueChange record 只有最外层 id
- [ ] #8174 recordCreatorProps.record 触发时机
- [ ] #9184 EditableProTable column formItemProps 问题
- [ ] #9622 ProFormUploadButton 上传后列表不展示(需复现)

## B17 废弃 API 清理(P2,3 个)

- [ ] #8830 ProTable findDOMNode deprecated 警告
- [ ] #8685 QueryFilter findDOMNode deprecated 警告
- [ ] #8091 `[antd: Select] bordered is deprecated. Please use variant`

## B18 ProCard(P2,5 个)

- [ ] #9125 ConfigProvider 对 CheckCard 不生效
- [ ] #9052 TabPane 内容区 padding 无法去掉(`cardProps ghost` 不生效)
- [ ] #8989 仅点击收缩图标才收缩(collapsible 触发位置,参考 antd)
- [ ] #8932 gutter 只要中间 gap 不要两边
- [ ] #8922 collapsible 支持配置折叠触发位置(与 #8989 同方向)

## B19 ProList(P2,4 个)

- [ ] #8387 卡片模式 renderItem 自定义时 gutter 不生效
- [ ] #7862 actionRef 获取 pageInfo total 为 0
- [ ] #7421 showActions / showExtra 无效(2021 老 bug)
- [ ] #9620 操作栏不能按列内容自适应换行

## B20 杂项:样式 / i18n / 文档站 / 表格渲染(P2,13 个)

- [ ] #8911 WaterMark 不支持 renderToStaticMarkup
- [ ] #8185 CDN 引入时 pro-form 样式覆盖定制主题色
- [ ] #8899 ProFormCaptcha i18n 缺陷
- [ ] #8885 ProTable 国际化修改疑问(文档)
- [ ] #9008 同条件下表头展示不一致
- [ ] #8747 Tabs item 内 ProTable 属性不生效
- [ ] #8913 Table.EXPAND_COLUMN 展开列位置不正确
- [ ] #8694 valueEnum + ellipsis 同用时异常
- [ ] #9619 切换表格行间距下拉框样式
- [ ] #8701 合并单元格失败 + 文档不一致(文档+示例)
- [ ] #8727 BetaSchemaForm Embed 模式 onValuesChange 不触发
- [ ] #8850 官网显示 bug
- [ ] #9310 mix + splitMenus + siderMenuType=sub 子菜单不显示(转 Q&A/文档)

## B21 新特性评估(P3,19 个,产出:里程碑 or 关闭 or 招 PR)

- [ ] #9500 ProTable next_token 游标分页
- [ ] #9246 ProFormAutoComplete 组件
- [ ] #9221 EditableProTable 自定义按钮
- [ ] #9197 ActionRef 提取当前 filter/sort
- [ ] #9084 MenuDataItem icon 支持自定义
- [ ] #9081 ProFormRadio.Group 长短 label 对齐优化
- [ ] #9061 columns 区分 table 和 form 场景
- [ ] #9046 DragSortTable + EditableProTable 同用
- [ ] #8990 EditableProTable 行锁定
- [ ] #8980 控制刷新展开的嵌套 table
- [ ] #8972 按行禁用单元格编辑
- [ ] #8971 内容区可用高度 API
- [ ] #8917 表格区域选择
- [ ] #8870 BetaSchemaForm 自定义 Wrapper(Card)
- [ ] #8730 ProTable 暴露 tableRef
- [ ] #8786 可编辑表格错误提示 popover 可配置
- [ ] #8256 EditableProTable 支持拖拽排序
- [ ] #9623 EditableTreeNode 可编辑树
- [ ] #9626 自定义 optionRender 需求

## B22 答疑与用法(P3,25 个,动作:回复 → 可沉淀的写进文档 → 2 周无回应关闭)

- [ ] #9291 layout 套 menu 污染菜单样式
- [ ] #8912 renderFormItem 重写 onChange
- [ ] #8903 StepsForm 步骤组件重渲染导致其余步骤数据重置
- [ ] #8854 ProFormDigit 负数
- [ ] #8812 renderFormItem 自定义组件 form.values 取不到 select 数据
- [ ] #8807 ProFormDateTimePicker 受控
- [ ] #8792 固定列不自适应宽度
- [ ] #8751 动态菜单下获取当前页面路由信息 API
- [ ] #8707 search 自定义格式/与 table 分离
- [ ] #8467 如何修改 pro-component 样式
- [ ] #8446 不修改取 label+value
- [ ] #8375 params + request 未按返回刷新
- [ ] #8366 自定义 valueType 的 TS 定义
- [ ] #8205 StepsForm 点击步骤跳转
- [ ] #8160 Menu.Item 自定义高度
- [ ] #8105 cancelEditable 后重置为编辑前的值
- [ ] #7874 search label 过长的处理
- [ ] #7776 PageContainer header 下仍有 padding-block-start
- [ ] #8783 样式前缀加 css hash
- [ ] #8745 全局设置 allowClear=false
- [ ] #9625 复选框位置
- [ ] #9627 增加 summary 行
- [ ] #9621 searchable + request 默认值
- [ ] #6680 自定义 ProFormItem 不支持 grid(2021)
- [ ] #8528 ProConfigProvider 文档说明

---

## 📅 建议节奏(周为单位)

1. **W1**:B1 + B2 + B3(已有 WIP 续写)→ 发 3 个 PR,消除安装/崩溃类阻断
2. **W2**:B4 + B5 + B9 + B17(小而确定的修复,快速清账 26 个)
3. **W3**:B6 + B7 + B8 + B10(表单语义类根因收敛)
4. **W4**:B11 + B12 + B13 + B14(表格性能与交互专项)
5. **W5**:B15 + B16 + B18 + B19 + B20
6. **W6+**:B21 特性评审会(分:进 feature 里程碑 / 招 PR / 关闭);B22 每天滚动清 3–5 个
