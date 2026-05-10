# pro-components `topiam/fork` 迁移指南

> **基线版本**：`#9561`（commit `04b327206`）— 包含 ProField 架构重构、Form 拆分、旧快照清理
> **排除范围**：所有涉及 `src/layout/` 的实质性改动
> **用途**：在 `topiam/fork` 分支上按 commit hash 定向 cherry-pick

---

## 可直接 cherry-pick 的提交（74 个，CLEAN — 不涉及任何 layout 文件）

### 一、ProTable（20 commits）

#### Bug 修复（11）

| # | Commit | 描述 |
|---|--------|------|
| 1 | `0e7534d64` | search 禁用但有 toolbar options 时仍渲染 card wrapper |
| 2 | `88ebd87b3` | 请求失败时规范化 catch 中的错误再抛出或回调 |
| 3 | `dc7dfe3c9` | 规范化 editable row 日期并修复 selectKeys 测试 |
| 4 | `28d935430` | 修正 RowEditor/CellEditor 中 editable.onChange 第二参数 |
| 5 | `5461d273c` | 受控/非受控模式下 onChange 重复触发及 useImperativeHandle 依赖 |
| 6 | `1df6fdf4c` | formItemName 循环依赖及 initialValue 覆盖 |
| 7 | `2bb1aac02` | 嵌套列父子联动失效及重置时读取 stale 缓存 |
| 8 | `b2cd8d06f` | 全选复选框 indeterminate 状态计算偏差 |
| 9 | `fc0f1d917` | 列类型定义中 `&` 优先级导致类型坍塌 |
| 10 | `f073e5b08` | 高频 reload 时 abort 信号绑定错误导致请求误取消 |
| 11 | `f2250822a` | visibilitychange 闭包陷阱及 pageInfo 快照覆盖 |

#### 重构（6）

| # | Commit | 描述 |
|---|--------|------|
| 12 | `29f303cec` | EditableTable 重构单元格/行编辑逻辑（⚠️ 依赖 utils/useEditableArray） |
| 13 | `2ab3448a3` | 提取公共函数并优化表单提交逻辑 |
| 14 | `ebc946e4a` | Container → TableProvider，优化持久化 |
| 15 | `7b6795381` | ES6 getter 替换 Object.defineProperty |
| 16 | `6097e5c9b` | 优化轮询间隔钳制和假分页判断 |
| 17 | `712d3c40f` | 添加 ColumnSetting 类型 FIXME 注释 |

#### 性能优化（2）

| # | Commit | 描述 |
|---|--------|------|
| 18 | `74d084225` | useMemo + useRefFunction 优化渲染（⚠️ 依赖 utils/useRefFunction） |
| 19 | `eb954f4fd` | 移除冗余 useMemo，useCallback → useRefFunction |

#### Breaking（1）

| # | Commit | 描述 |
|---|--------|------|
| 20 | `0908aecb8` | TableStatus → FieldStatus（⚠️ breaking rename） |

---

### 二、ProForm（14 commits）

#### Bug 修复（7）

| # | Commit | 描述 |
|---|--------|------|
| 21 | `fbb24ad1a` | LightWrapper 子节点 props 合并顺序错误导致筛选输入不生效 |
| 22 | `d2ad3f86d` | FormItem 子节点 props 类型修正 + ESLint 变量清理 |
| 23 | `d1f558d75` | formList 时间类型提交未正确转换为 string (#9631) |
| 24 | `688773364` | getFieldFormatValueObject 父路径与 getFieldFormatValue 对齐 |
| 25 | `33c33b653` | label 和 tooltip 在轻量模式下被错误覆盖 |
| 26 | `96200dcc8` | 稳定渲染、FormItem memo deps 修复、useImperativeHandle (#9605) |
| 27 | `cd2c53659` | DrawerForm 移除冗余 onOpenChange 回调 (#9563) |

#### 重构（5）

| # | Commit | 描述 |
|---|--------|------|
| 28 | `53f91b924` | 重构列表操作守卫与图标渲染，优化 URL 同步逻辑 |
| 29 | `b56c060fb` | 提取 URL 同步逻辑到独立 hook useUrlSync |
| 30 | `d6db22bf7` | LightWrapper 逻辑从 ProFormItem 迁移至 warpField |
| 31 | `d6d703b89` | 抽取公共格式化方法消除重复实现 |
| 32 | `a7bb9d3a7` | 优化 FormItem 渲染逻辑并修复 DrawerForm 类型与性能 |

#### 日期相关（2）

| # | Commit | 描述 |
|---|--------|------|
| 33 | `7ee247922` | 周格式修正（YYYY-wo → gggg-wo）、日期范围只读展示统一 |
| 34 | `c8fa93282` | 日期选择器 picker 与 format 对齐 |

---

### 三、ProField（5 commits）

| # | Commit | 类型 | 描述 |
|---|--------|------|------|
| 35 | `70eb8e207` | fix | 读模式日期格式化与周/季范围默认格式修正 |
| 36 | `fad7066e8` | refactor | 移除 SelectHighlight (#9633) |
| 37 | `98ab21e16` | refactor | Digit 移除 proxyChange (#9610) |
| 38 | `4829ba93b` | refactor | 拆分 ProField light edit 为独立组件 (#9598) |
| 39 | `a3e1dc23f` | refactor | LightFilter with explicit field helpers (#9604) |

---

### 四、Utils / 公共工具（6 commits）

| # | Commit | 类型 | 描述 |
|---|--------|------|------|
| 40 | `90ff9edf1` | fix | 序列化 dayjs 解析/提交转换、范围文案格式化 |
| 41 | `dbfec8824` | refactor | transformKeySubmitValue 用 lodash get 简化 |
| 42 | `c92c2b5c7` | fix | 数组父节点下对象转换导致数组形状破坏 |
| 43 | `1fd232a51` | fix | useEditableArray tableName 模式 saveRefs 泄漏 + 默认值丢失 |
| 44 | `1a59b63e0` | fix | cancelEditable 重构 + RecordKey 比较与哈希冲突 |
| 45 | `3699f470e` | fix | nanoid 守护 window 访问防止 SSR/Worker 崩溃 (#9596) |

---

### 五、ProList（2 commits）

| # | Commit | 类型 | 描述 |
|---|--------|------|------|
| 46 | `5d26380a5` | refactor | useRefFunction 替代 useCallback + SSR 兼容性 |
| 47 | `6bc0a15c3` | perf | 提取 renderItem + memo 优化列表渲染 |

---

### 六、ProCard（2 commits）

| # | Commit | 类型 | 描述 |
|---|--------|------|------|
| 48 | `b18bc7c0c` | refactor | ProCard 组件重构 + ref 透传与 loading 修复 |
| 49 | `9ccdf586c` | docs | tableViewRender 和 CheckCard 类型定义更新 |

---

### 七、Descriptions（1 commit）

| # | Commit | 类型 | 描述 |
|---|--------|------|------|
| 50 | `072dc5da8` | perf | stabilize fetch action and memoize schema |

---

### 八、Provider / 国际化（2 commits）

| # | Commit | 类型 | 描述 |
|---|--------|------|------|
| 51 | `93be37d12` | refactor | 重构国际化与 Provider，优化 dayjs 语言包加载 |
| 52 | `2f42e59ff` | fix | 对齐 locale keys 并修复 i18n 字符串 (#9595) |

---

### 九、基础设施 / 依赖 / 文档 / 测试（22 commits）

#### 依赖安全（3）

| # | Commit | 描述 |
|---|--------|------|
| 53 | `d31fa97bb` | 替换 mockjs 为 @faker-js/faker（CVE-2023-26158） |
| 54 | `e6ce60057` | 移除 @faker-js/faker 修复 dumi BigInt 构建错误 |
| 55 | `8975b1d59` | npm_and_yarn 依赖批量升级（8 个） (#9562) |

#### 测试基础设施（6）

| # | Commit | 描述 |
|---|--------|------|
| 56 | `a861826f8` | 对齐 lightFilter date locale 和 table sorter 断言 |
| 57 | `c451fc24c` | 同上（重复提交） |
| 58 | `1fbf3dec2` | LightFilter collapsed label title 断言对齐 |
| 59 | `042bc34c7` | 稳定 LightFilter 日期类标签中文 locale 断言 |
| 60 | `b80ce2271` | 移除 ProForm 快照测试文件 |
| 61 | `f4714ec31` | 更新快照并修复 LightFilter 查询选择器测试 |

#### CI / 构建 / 脚本（2）

| # | Commit | 描述 |
|---|--------|------|
| 62 | `93315b66e` | 解决 CI 构建 lint 错误 |
| 63 | `af7ca46a3` | 清理废弃脚本并修复发布文档工具 |

#### 站点 UI（3）

| # | Commit | 描述 |
|---|--------|------|
| 64 | `06960b279` | global.less 移除 code 元素背景色 (#9590) |
| 65 | `35766b516` | 外部链接 SVG 在暗色模式下继承主题色 (#9593) |
| 66 | `5eef5a77d` | otk-task-list-simple 默认 padding 和内容高度 (#9607) |

#### 文档修正（5）

| # | Commit | 描述 |
|---|--------|------|
| 67 | `d6c88b610` | sync readmes with docs check and dev scripts |
| 68 | `0874d3f04` | 对齐站点 code 引用与 demos 实际文件名 |
| 69 | `4411b6f36` | 修正 Table API 文档轮询 demo 路径 pollinga → polling |
| 70 | `734a67556` | 更新 valueType links in table.md (#9609) |
| 71 | `83c5b2226` | ProLayout 菜单修复 (#9592)（⚠️ 标记为 CLEAN 但标题含 layout） |

#### Demo 修复（3）

| # | Commit | 描述 |
|---|--------|------|
| 72 | `529b493ca` | 调整 FieldSet 日期时间示例 |
| 73 | `d8123dad2` | 批量操作示例 selectedRows 缺行时安全累加 |
| 74 | `d25f793f2` | remove ProLayout mix layout (#9587)（⚠️ 仅改 changelog，无 src/layout） |

---

## 排除的 Layout 改动（83 commits）

### LAYOUT-ONLY — 仅改 layout 代码（46 commits，全部排除）

以下提交**全部文件**都在 `src/layout/`、`demos/layout/`、`tests/layout/` 中：

<details>
<summary>点击展开完整列表</summary>

| Commit | 描述 |
|--------|------|
| `776b47a71` | feat(layout): add actionsPlacement API and optimize sider expand animation |
| `5811850ea` | fix: resolve TS2322 build error in PageHeader fontSizeHeading4 type cast |
| `3917323b2` | fix: resolve TS2322 build error in PageHeader fontSizeHeading4 type cast |
| `21e2c5caa` | feat(layout): auto-hide sider scrollbar, show on hover |
| `47d8a52e7` | fix(layout): GlobalHeader logo 外层由 a 改为 span |
| `37c357321` | fix(layout): GlobalHeader logo 外层由 a 改为 span（重复） |
| `ae3694635` | fix(layout): repair corrupted JSDoc in ActionsContent |
| `732b59a6b` | feat(Logo): 添加 title 属性与无障碍支持 |
| `eeffe602c` | fix(layout): 侧栏整体层级须高于顶栏 |
| `733afd7ae` | refactor: 提取动画时长与布局常量为导出变量 |
| `c338571ec` | feat(menu): 添加选中态指示条动画 |
| `c2c8be1fc` | fix(layout): 应用 Logo 组件高度改为最大高度 |
| `0dcfd6036` | fix(style): AppsLogo 列表固定两列网格 |
| `4a4180db1` | refactor(AppsLogoComponents): 优化语义化 HTML |
| `cc85efe2c` | fix: SiderMenu 收起态 logo padding 对齐 |
| `e5a65aa91` | fix(menu): 图标容器 24px → 18px |
| `aa0539aa8` | feat: enum-switch 演示路由 + 侧边栏收起态优化 |
| `533bb8e15` | fix: openKeys 回调签名不匹配及 a11y 问题 |
| `611a13f89` | refactor(menu): 移除折叠态条件渲染 |
| `d08067beb` | fix(sider): span 包裹 label + 收起态首字 chip |
| `7138b01ca` | fix: popup 三级 submenu 展开导致顶级误关 |
| `08facece5` | fix(popup): 重置浮层缩进 + 修复点击闪烁 |
| `ac3f78d5c` | refactor(menu): 对齐 ProLayout 与 SidebarMenu DOM |
| `847468b62` | fix(layout): accept deprecated layout mix (#9599) |
| `bdbf84150` | refactor(layout): move mix layout typing (#9600) |
| `7be52c6a3` | fix: collapsed menu DOM and submenu indicators (#9585) |
| `2af93d6f2` | ProLayout: 侧栏与主导航样式改为 CSS 变量 |
| `b6e8b7d16` | ProLayout: 简化主导航 DOM 与菜单样式选择器 |
| `a1c777d22` | ProLayout: 浮层菜单嵌套子菜单改为内联 |
| `135069f68` | ProLayout: 修复收起态分组标题隐藏选择器 |
| `a982269fd` | layout: 移除 SettingDrawer 与 ProHelpSelect |
| `f461281eb` | ProHelpPanel 移除 antd Menu 改为自研目录树 |
| `658ffe0f0` | ProLayout: 全面移除 navTheme 与暗色切换 |
| `39a181e68` | ProLayout: 收起侧栏保留分组标题 |
| `fb7d6cc95` | ProLayout: 去掉 navTheme→dark；侧栏固定 light |
| `dbfe0b38f` | ProLayout: 收起态 item-title-collapsed 32px 行高 |
| `6464f4735` | ProLayout: 恢复分组标题上下内边距 |
| `f2fbe572a` | ProLayout: 根 nav 顶级子项增加 gap |
| `5ab16dfb9` | ProLayout: 移除覆盖 antd Menu 主题 hack |
| `500ccb20a` | ProLayout: 主导航样式去掉 .anticon 选择器 |
| `d3a78811f` | ProLayout: 去掉菜单样式 hack |
| `b7986cf07` | ProLayout: 恢复侧栏菜单左侧内边距 |
| `a5078bf52` | ProLayout: 侧栏菜单图标与占位统一 16px |
| `e5ced5223` | ProLayout: 修正侧栏菜单图标尺寸 |
| `21e16152b` | ProLayout: 修复自研导航弹出层与侧栏菜单样式 |
| `f1a45bc99` | ProLayout: TopNavHeader 顶栏菜单区与 logo 垂直对齐 |

</details>

### MIXED — layout + 其他代码混合（25 commits，需人工判断）

以下提交改了 `src/layout/` 的同时也改了其他模块代码。如需其中非 layout 部分，需要 `cherry-pick -n` 后手动 unstage layout 文件。

<details>
<summary>点击展开完整列表</summary>

| Commit | layout/总文件 | 描述 |
|--------|--------------|------|
| `cabbd3dbc` | 3/24 | improve component interactive styles and layout menu behavior |
| `c9c92f5f5` | 8/11 | scrollbar CSS variables, mobile optimization |
| `bf6ca932a` | 19/23 | remove identity wrapSSR calls and optimize PageContainer |
| `565bf964e` | 13/16 | 优化 ProLayout 默认样式与设计可配置性 |
| `3668ee3dd` | 11/172 | nav/sider/header theme + **全仓 prettier**（⚠️ 172 个文件，大部分是格式化） |
| `674b3192b` | *(layout)* | CSS variable 统一、splitMenus 修复 |
| `b6388ee05` | 2/16 | fix site links + genProStyleHooks + GridContent token |
| `bc85b0add` | 5/6 | polish AppsLogoComponents list styles |
| `95b742109` | 3/7 | 新增侧栏滚动条定制 token |
| `99f87b2d9` | 6/7 | 固定顶栏对齐主列 |
| `6a671473f` | 25/31 | 简化演示代码结构并更新菜单图标 |
| `173219669` | 1/3 | 移除 BOM 字符并限制应用列表最大宽度 |
| `557edd570` | 2/5 | 重构导航菜单组件 Popover 替代 Portal |
| `fcc0c2d14` | 2/10 | align tests with layout and DrawerForm behavior (#9597) |
| `238e32782` | 10/35 | 侧栏垂直菜单项默认字重 (#9589) |
| `fb9733849` | 7/24 | 移除 iconfontUrl，菜单图标支持 SVG/React (#9594) |
| `32d69b566` | 11/13 | **移除 ProHelp 全家桶**（⚠️ 破坏性变更） |
| `81530c892` | 4/11 | 内建侧栏浅灰背景与紧凑菜单样式 |
| `5bb875cb6` | 1/3 | 修正主导航间距与收起态选择器 |
| `149e00e15` | 3/8 | 主导航 DOM 扁平化 |
| `0d933a98b` | 5/11 | 主导航样式去 ant-menu 依赖并修正 openKeys |
| `29743fb0c` | 1/3 | 侧栏主导航样式对齐紧凑分组侧栏 |
| `539a7577e` | 6/8 | 整理主导航相关类型与导出 |
| `99314a0ec` | 8/11 | 侧栏与顶栏主导航移除 antd Menu |
| `eb87085d4` | *(layout)* | 水平顶栏菜单项行高 28px |

</details>

### LAYOUT-PERIPHERAL — 仅改 layout demos/docs/tests，不改 src/layout/（12 commits）

| Commit | layout/总文件 | 描述 |
|--------|--------------|------|
| `6fc54b0e9` | 1/1 | 修复 ProLayout API 表格 Markdown 列错位 |
| `e1992f4f7` | 7/7 | 扩展 layout API 表格和示例 |
| `700504a9a` | 49/49 | 移除 layout 演示中的内联 padding 样式 |
| `44e20b934` | 29/29 | 更新 layout 示例默认路由路径 |
| `d82049293` | 17/17 | layout 菜单数据语义替换 |
| `fc2922e1d` | 1/1 | layout 图标 Outlined → Filled |
| `1fc27b922` | 1/1 | enum-switch 配置卡片移入 PageContainer |
| `b2e3090c4` | 2/2 | 删除 ProHelp layout 单测与快照 |
| `ce0736393` | 8/8 | 删除帮助面板文档/demo，清理 SettingDrawer 快照 |
| `50468117d` | 2/2 | 更新 ProLayout menuProps API 说明 |
| `39c780165` | 2/2 | 更新 mobile/pageHeaderWarp 布局测试快照 |
| `8c5bf2979` | *(mixed)* | 移除 Descriptions 等组件过期快照（含 layout） |

---

## 建议迁移顺序

```
1. Utils（6 commits: 40-45）        ← 最先，被 Table/Form/List 依赖
2. Provider（2 commits: 51-52）     ← 国际化基础
3. ProField（5 commits: 35-39）     ← 被 Form/Table 依赖
4. ProForm（14 commits: 21-34）     ← 核心业务组件
5. ProTable（20 commits: 1-20）     ← 核心业务组件
6. ProList（2 commits: 46-47）      ← 可选
7. ProCard（2 commits: 48-49）      ← 可选
8. Descriptions（1 commit: 50）     ← 可选
9. 基础设施/文档（按需: 53-74）    ← 按需
```

## 快速 cherry-pick 命令参考

```bash
# 先切到 topiam/fork 分支
git checkout topiam/fork

# 示例：批量 cherry-pick Utils 模块
git cherry-pick 90ff9edf1 dbfec8824 c92c2b5c7 1fd232a51 1a59b63e0 3699f470e

# 示例：批量 cherry-pick ProTable Bug 修复
git cherry-pick 0e7534d64 88ebd87b3 dc7dfe3c9 28d935430 5461d273c 1df6fdf4c 2bb1aac02 b2cd8d06f fc0f1d917 f073e5b08 f2250822a

# 遇到冲突时
git cherry-pick --abort  # 放弃当前 cherry-pick
# 或解决冲突后
git add . && git cherry-pick --continue
```

## ⚠️ 注意事项

1. **日期相关改动**（#33 `7ee247922`、#40 `90ff9edf1`、#34 `c8fa93282`、#35 `70eb8e207`）互相依赖，建议作为一组迁移
2. **useRefFunction** 被多个模块引用（Table #18-19、List #46），需确认 utils 中是否已包含该 hook
3. **TableStatus → FieldStatus**（#20 `0908aecb8`）是 breaking rename，cherry-pick 前确认项目中无直接引用
4. **MIXED 提交**中，`3668ee3dd` 有 172 个文件但大部分是全仓 prettier 格式化，非 layout 部分可用 `cherry-pick -n` 后手动排除
