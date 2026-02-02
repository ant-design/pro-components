---
title: ProComponents 2.0 到 3.0 迁移指南
order: 3
---

# ProComponents 2.0 到 3.0 迁移指南

## 概述

ProComponents 3.0 是一个主要版本升级，包含了一些破坏性变更。本指南将帮助你从 2.0 版本平滑迁移到 3.0 版本。

## 升级前准备

### 版本要求

| 依赖  | 2.x 基线    | 3.0 最低要求 |
| ----- | ----------- | ------------ |
| antd  | `>= 4.20.0` | `>= 6.0.0`   |
| React | `>= 16.9.0` | `>= 18.0.0`  |

#### 子包版本对齐

| 包名                         | 2.x 最新版 | 3.0 起始版   |
| ---------------------------- | ---------- | ------------ |
| @ant-design/pro-components   | 2.8.10     | 3.0.0-beta.1 |
| @ant-design/pro-card         | 2.10.0     | 3.0.0-beta.1 |
| @ant-design/pro-descriptions | 2.6.10     | 3.0.0-beta.1 |
| @ant-design/pro-field        | 3.1.0      | 3.0.0-beta.1 |
| @ant-design/pro-form         | 2.32.0     | 3.0.0-beta.1 |
| @ant-design/pro-layout       | 7.22.7     | 3.0.0-beta.1 |
| @ant-design/pro-list         | 2.6.10     | 3.0.0-beta.1 |
| @ant-design/pro-provider     | 2.16.2     | 3.0.0-beta.1 |
| @ant-design/pro-table        | 3.21.0     | 3.0.0-beta.1 |
| @ant-design/pro-utils        | 2.18.0     | 3.0.0-beta.1 |

所有子包请同步升级至相同的 3.0.x 标签，避免编译期重复引入和类型冲突。

### 代码库准备建议

- 在版本控制系统中新建迁移分支，锁定 2.x 的可回滚基线。
- 在升级前运行一遍现有测试和关键页面自测，记录通过结果与截图，便于对比回归。
- 检查项目中是否存在对 `antd@4` 或 React 16 的 polyfill/垫片代码，提前标记准备删除。
- 如果项目启用了 `lockfile`，请在迁移时一次性更新并提交，避免重复安装带来的漂移。

### 依赖安装示例

以下以 `pnpm` 为例（如使用 `npm` 或 `yarn` 请替换为对应命令）：

```bash
pnpm up antd@^6.0.0
pnpm up @ant-design/pro-components@^3.0.0-beta.1
pnpm install
```

### 风险提示

- 3.0 完全移除了 antd@4 兼容逻辑，一旦在同一个包内混用 2.x 与 3.x 组件会触发不可预期的样式和运行时错误。
- React 18 并发特性会让旧的副作用写法暴露问题，请特别关注 `useEffect` 中未声明的依赖或者同步副作用。
- 如果你的构建工具依赖于 `less-loader` 或 `babel-plugin-import` 的旧配置，请在升级后核对它们是否已支持 antd 5 的 Token 体系。

## 已移除的废弃 API

### 变更速查表

| 组件         | 旧用法                                | 新用法                                         | 处理建议                                                                                            |
| ------------ | ------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ProTable     | `columnsStateMap`                     | `columnsState.value` + `columnsState.onChange` | 将原状态对象迁移到 `columnsState.value`，事件改用 `onChange`；若使用持久化需补充 `persistenceKey`。 |
| ProTable     | `hideInSearch`                        | `search: false`                                | 使用 `search` 配置控制搜索区域显示，支持对象拓展。                                                  |
| ProTable     | `fixHeader`                           | `scroll: { y: number }`                        | 使用 antd Table 原生 `scroll` 属性，按需设置高度。                                                  |
| ProTable     | `tip`                                 | `tooltip`                                      | 将列提示迁移到 `tooltip`，可复用 antd `LabelTooltipType`。                                          |
| ProCard      | `ProCard.TabPane`                     | `tabs.items`                                   | 使用 antd `Tabs` 的 `items` 属性描述页签，透传 `tabs` 其它配置。                                    |
| ProCard      | `StatisticsCardProps`                 | `StatisticCardProps`                           | 更新类型引用，避免编译错误。                                                                        |
| ProLayout    | `rightContentRender`                  | `actionsRender` + `avatarProps`                | 将原右侧内容拆分为动作区域与头像配置，便于独立维护。                                                |
| 布局 Token   | `marginInlinePageContainerContent` 等 | `paddingInlinePageContainerContent` 等         | 全面替换 Token 名称，保持主题粒度一致。                                                             |
| ProFormField | `plain`                               | `variant`                                      | 移除 `plain`，改用 `variant` 控制字段展示变体（如 `borderless`、`outlined`）。                      |

### Table 组件

#### 1. `columnsStateMap` → `columnsState`

**变更原因**: 统一 API 命名，提高一致性

```tsx | pure
// ❌ 旧版本
<ProTable
  columnsStateMap={{
    name: { show: false },
    age: { fixed: 'left' }
  }}
  onColumnsStateChange={(map) => console.log(map)}
/>

// ✅ 新版本
<ProTable
  columnsState={{
    value: {
      name: { show: false },
      age: { fixed: 'left' }
    },
    onChange: (map) => console.log(map)
  }}
/>
```

`columnsState` 现已完全与 antd Table 的受控模式对齐，推荐按照以下方式迁移：

- 将原来的 `columnsStateMap` 全量拷贝到 `columnsState.value`。
- 如需监听变更，请使用 `columnsState.onChange`；`onColumnsStateChange` 已被移除，请迁移到 `columnsState.onChange`。
- 若项目依赖列配置持久化，请显式补充 `persistenceKey` 与 `persistenceType`。

```tsx | pure
<ProTable
  columnsState={{
    value: columnsStateFromServer,
    defaultValue: defaultColumnsState,
    persistenceKey: 'user-table-columns',
    persistenceType: 'localStorage',
    onChange: setColumnsState,
  }}
/>
```

`defaultValue` 会在首次渲染和清空持久化后生效，务必保持其与服务端回填格式一致，避免覆盖用户配置。

#### 2. `hideInSearch` → `search: false`

**变更原因**: 统一搜索相关属性

```tsx | pure
// ❌ 旧版本
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    hideInSearch: true,
  },
];

// ✅ 新版本
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    search: false,
  },
];
```

`search` 支持布尔值或对象：

- 设为 `false`：完全在搜索表单中隐藏该项。
- 设为 `{ transform }`：在保留搜索项的同时，对提交流程做二次处理。

```tsx | pure
const columns = [
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    search: {
      transform: (value) => ({
        startTime: value?.[0],
        endTime: value?.[1],
      }),
    },
  },
];
```

迁移时请检查是否依赖了 `hideInSearch` 的默认值（此前为 `false`）。若期望保留搜索项，务必移除旧字段而非简单替换。

#### 3. `fixHeader` → `scroll: { y: 400 }`

**变更原因**: 使用更标准的 antd Table 滚动属性

```tsx | pure
// ❌ 旧版本
<ProTable
  fixHeader={true}
  // 其他属性...
/>

// ✅ 新版本
<ProTable
  scroll={{ y: 400 }}
  // 其他属性...
/>
```

`scroll` 的 `y` 值建议与页面布局解耦，可结合容器高度动态计算：

```tsx | pure
const height = document.body.clientHeight - 320;

<ProTable
  scroll={{ y: height }}
  sticky
  // 其他属性...
/>;
```

如项目中存在 `sticky` 与 `fixHeader` 联用的写法，现在只需保留 `sticky`，其他滚动行为交由 antd 原生 Table 处理，避免双重定位。

#### 4. `tip` → `tooltip`

**变更原因**: 统一提示信息属性命名

```tsx | pure
// ❌ 旧版本
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    tip: '请输入姓名',
  },
];

// ✅ 新版本
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    tooltip: '请输入姓名',
  },
];
```

`tooltip` 与 antd `FormItem` 的 `tooltip` 类型保持一致，既可以是字符串，也可以是 `LabelTooltipType` 对象，从而支持更丰富的描述与图标自定义。

```tsx | pure
const columns = [
  {
    title: '邮箱',
    dataIndex: 'email',
    tooltip: {
      title: '公司邮箱，用于接收通知',
      icon: <InfoCircleOutlined />,
    },
  },
];
```

> 示例中的 `InfoCircleOutlined` 需从 `@ant-design/icons` 引入。

迁移时请确认没有与自定义列渲染逻辑重复渲染提示信息，避免多次出现相同 icon。

### Card 组件

#### 1. `TabPane` 组件移除

**变更原因**: 简化 API，使用标准的 antd Tabs 配置

```tsx | pure
// ❌ 旧版本
<ProCard>
  <ProCard.TabPane tab="标签1" key="1">
    内容1
  </ProCard.TabPane>
  <ProCard.TabPane tab="标签2" key="2">
    内容2
  </ProCard.TabPane>
</ProCard>

// ✅ 新版本
<ProCard
  tabs={{
    items: [
      {
        key: '1',
        label: '标签1',
        children: '内容1'
      },
      {
        key: '2',
        label: '标签2',
        children: '内容2'
      }
    ]
  }}
/>
```

`tabs` 直接复用 antd `TabsProps`，迁移时的注意事项：

- 原 `ProCard.TabPane` 的 `tab`、`key`、`children` 等字段一一映射到 `items`。
- 如果旧代码通过 `TabPane` 透传 `cardProps`，现在改为在 `tabs.cardProps` 中统一配置，或在 `items` 的每一项中放置 `children` 自行组合。
- `tabs.onChange`、`tabs.activeKey` 等控制属性保持不变，可以直接迁移。

```tsx | pure
<ProCard
  tabs={{
    activeKey,
    onChange: setActiveKey,
    cardProps: {
      size: 'small',
      ghost: true,
    },
    items: tabItems,
  }}
/>
```

如果你在外层自定义了 `ProCard.TabPane` 组件包装，需要同步调整导出方式，避免引用到已经删除的静态属性。

#### 2. `StatisticsCardProps` 类型移除

**变更原因**: 简化类型定义

```tsx | pure
// ❌ 旧版本
import { StatisticsCardProps } from '@ant-design/pro-components';

// ✅ 新版本
import { StatisticCardProps } from '@ant-design/pro-components';
```

这个变更只影响 TypeScript 类型，编译器会提示 `StatisticsCardProps` 不存在。请在项目的类型声明和自定义封装组件中一并替换，尤其是 `React.FC<StatisticsCardProps>` 这类写法。

### Layout 组件

#### 1. `rightContentRender` → `actionsRender` + `avatarProps`

**变更原因**: 分离关注点，提供更灵活的配置

```tsx | pure
// ❌ 旧版本
<ProLayout
  rightContentRender={() => (
    <div>
      <Avatar src="user.jpg" />
      <span>用户名</span>
    </div>
  )}
/>

// ✅ 新版本
<ProLayout
  avatarProps={{
    src: 'user.jpg',
    title: '用户名'
  }}
  actionsRender={() => [
    <Button key="action1">操作1</Button>,
    <Button key="action2">操作2</Button>
  ]}
/>
```

迁移步骤建议如下：

1. 将原 `rightContentRender` 返回的节点拆分为“头像”与“操作”两类内容。
2. 头像相关的 `src`、`title`、`render` 等放入 `avatarProps`；其类型与 antd `AvatarProps` 兼容，并提供额外的 `title` 与 `render`。
3. 其他按钮、搜索框等操作以数组形式从 `actionsRender` 返回，ProLayout 会统一处理间距与对齐。

```tsx | pure
<ProLayout
  avatarProps={{
    src: user.avatar,
    title: user.name,
    render: (props, dom) => (
      <Dropdown menu={{ items: userMenu }}>
        <a>{dom}</a>
      </Dropdown>
    ),
  }}
  actionsRender={({ isMobile }) => [
    !isMobile && <Switch key="theme" checked={dark} onChange={toggleTheme} />,
    <Button key="feedback" type="text" icon={<QuestionCircleOutlined />} />,
  ]}
/>
```

> 示例中的 `QuestionCircleOutlined` 需从 `@ant-design/icons` 引入。

若之前依赖 `rightContentRender` 的布局容器（例如包裹在特定 className 下），迁移后可以通过 `actionsRender` 外层包裹 `<Space>` 或自定义组件来保持风格一致。

#### 2. 布局 Token 属性重命名

**变更原因**: 统一命名规范

```tsx | pure
// ❌ 旧版本
const token = {
  layout: {
    pageContainer: {
      marginInlinePageContainerContent: 40,
      marginBlockPageContainerContent: 32,
    },
  },
};

// ✅ 新版本
const token = {
  layout: {
    pageContainer: {
      paddingInlinePageContainerContent: 40,
      paddingBlockPageContainerContent: 32,
    },
  },
};
```

除示例中的字段外，其它以 `margin*PageContainerContent` 命名的 Token 也全部切换为对应的 `padding*PageContainerContent`，请一次性替换完毕。替换后建议执行一次主题构建或视觉验收，确认没有遗漏旧字段。

### Field 组件

#### `plain` 参数移除

**变更原因**: 统一使用 `variant` 控制展示样式，简化 API

```tsx | pure
// ❌ 旧版本
<ProFormText
  name="name"
  plain={true}
/>

<ProFormTimePicker
  name="time"
  plain
/>

// ✅ 新版本
<ProFormText
  name="name"
  fieldProps={{ variant: 'borderless' }}
/>

<ProFormTimePicker
  name="time"
  fieldProps={{ variant: 'borderless' }}
/>
```

`plain` 已完全移除，不再提供该参数。若需无边框/简洁展示，请使用 `fieldProps.variant: 'borderless'`；默认线框样式使用 `variant: 'outlined'`。

迁移时请全局搜索 `plain`，移除所有 `plain` 或 `plain={true}` 传参，并按需替换为 `variant` 配置。

### 兼容性相关

#### 1. 移除 antd@4 兼容性代码

**变更原因**: 专注于 antd@6 支持，简化代码库

- 移除了 `compareVersions` 工具函数
- 移除了 `coverToNewToken` 兼容性函数
- 移除了所有 antd@4 相关的兼容性检查

如果你在业务代码中显式引入了上述工具函数（常见于主题定制或样式兜底场景），需要同步删除，并改用 antd 5 官方推荐的 Token 方案。升级后若发现主题变量丢失，优先检查是否仍在引用 `coverToNewToken`。

## 升级收益

### 1. 改进的类型支持

```tsx | pure
// 更好的 TypeScript 支持
interface DataType {
  id: number;
  name: string;
  age: number;
}

<ProTable<DataType>
  columns={[
    {
      title: '姓名',
      dataIndex: 'name',
      // 现在有更好的类型提示
    },
  ]}
/>;
```

3.0 在类型系统上做了以下提升：

- `ProTable`、`ProForm` 等泛型组件对列/字段的推导更严格，减少 `any`。
- 新的 `columnsState`、`search` API 带有完善的类型声明，便于编辑器自动提示。
- 所有子包的类型声明合并到 `es/` 目录，避免 `node_modules` 多份重复。

迁移后若遇到类型报错，请优先检查自定义封装是否显式声明了 2.x 的老类型（例如 `ProColumns<any>`）；必要时补充泛型参数即可。

### 2. 简化的 API 设计

```tsx | pure
// 更简洁的配置
<ProForm
  layout="vertical"
  onFinish={async (values) => {
    console.log(values);
    return true;
  }}
/>
```

- `ProForm` 默认不再预加载所有字段组件，Tree Shaking 更友好。
- `ProLayout` 的操作区拆分后更易于按需渲染，避免写大量条件分支。
- `ProCard` 与 antd Tabs 对齐后，可以直接复用 antd 的所有配置项和动效。

理解这些收益有助于评估升级价值并向团队传达收益点。

## 迁移步骤

### 1. 更新依赖

优先使用项目当前的包管理器保持一致。以下示例以 `pnpm` 为例：

```bash
# 升级核心依赖
pnpm up antd@^6.0.0
pnpm up @ant-design/pro-components@^3.0.0-beta.1

# 同步安装锁定版本
pnpm install
```

> 如果团队仍使用 `npm`/`yarn`，请将 `pnpm up` 替换为对应的 `npm install` 或 `yarn add` 命令，并确认 `package-lock.json`/`yarn.lock` 一次性更新。

### 2. 检查废弃 API

使用以下命令辅助排查（如未安装 `rg`，可替换为 `grep` 或 IDE 全局搜索）：

```bash
# 使用 ripgrep（推荐）
pnpm exec rg "columnsStateMap" src
pnpm exec rg "hideInSearch" src
pnpm exec rg "fixHeader" src
pnpm exec rg "tip[\"']" src
pnpm exec rg "ProCard\.TabPane" src
pnpm exec rg "rightContentRender" src
pnpm exec rg "plain" src
```

> 在 Windows PowerShell 中可使用 `Select-String -Path "src/**/*.tsx" -Pattern "columnsStateMap"` 达到类似效果。

### 3. 逐步迁移

1. **首先迁移 Table 组件**
   - 更新 `columnsStateMap` 为 `columnsState`
   - 更新 `hideInSearch` 为 `search: false`
   - 更新 `fixHeader` 为 `scroll: { y: 400 }`
   - 更新 `tip` 为 `tooltip`
   - 按需补充 `columnsState.defaultValue`、`persistenceKey`

2. **然后迁移 Card 组件**
   - 将 `TabPane` 用法改为 `tabs.items`
   - 更新类型引用，确保不再导入 `StatisticsCardProps`

3. **最后迁移 Layout 组件**
   - 更新 `rightContentRender` 为 `actionsRender` + `avatarProps`
   - 更新布局 Token 属性名
   - 检查自定义头部组件是否依赖旧的 `rightContentRender` 容器

4. **迁移 Field / ProFormField 组件**
   - 移除所有 `plain` 或 `plain={true}` 传参
   - 按需替换为 `fieldProps.variant: 'borderless'` 或 `variant: 'outlined'`

迁移顺序从数据密集型组件到布局组件，有助于先确保数据展示正确，再处理视觉层面的差异。

### 4. 测试验证

```bash
# 运行单测（建议开启覆盖率）
pnpm run test

# 构建产物，验证打包输出
pnpm run build

# 启动开发服务器做端到端验证
pnpm run dev

# （可选）静态检查
pnpm run lint
```

在验证过程中重点关注以下场景：

- 表格列配置是否正确持久化、列设置面板是否能保存用户偏好。
- 布局右上角操作区在移动端与桌面端的展示是否符合预期。
- 自定义主题 Token 是否仍被正确读取，控制台无 `Warning: [antd: theme]` 类警告。

## 常见问题

### Q: 升级后出现 TypeScript 错误怎么办？

A: 常见原因包括仍引用 `StatisticsCardProps`、`columnsStateMap` 或自定义类型中硬编码了旧字段。请按照本文档调整，并确认 `tsconfig.json` 中的 `types` 未指向 2.x 的自定义声明。

### Q: 表格列状态不再持久化怎么办？

A: 检查是否已经在 `columnsState` 中设置了 `persistenceKey`、`persistenceType`，以及 `value` 是否为全新的对象引用。3.0 会忽略直接复用旧对象的情况，必要时可使用 `structuredClone` 或手动 `JSON.parse(JSON.stringify(...))`。

### Q: 升级后 tabs 不渲染？

A: 新的 `tabs.items` 必须提供 `key` 与 `label`，同时确保 `items` 数组不是动态在渲染过程中被过滤为 `undefined`。如果依赖懒加载，请在 `children` 中自行控制渲染时机。

### Q: 右上角操作区消失了？

A: `actionsRender` 需要返回 `ReactNode[]` 或单个 `ReactNode`，请确认函数的返回值不是 `undefined`。如果需要根据权限控制，可以返回 `null` 或空数组，但不能忘记最终返回值。

### Q: 升级后样式异常怎么办？

A: 首先确认 antd 已升级至 6.0.0+，接着排查是否还有自定义样式引用了被移除的类名（如 `.ant-pro-card-tabpane`）。Token 重命名后，LESS/SCSS 中的变量也需要同步更新。

### Q: 升级后功能不工作怎么办？

A: 打开浏览器控制台及终端日志，通常会提示未迁移的 API。请结合“检查废弃 API”章节中的命令逐一排查。

### Q: 可以渐进式升级吗？

A: 不建议。3.0 移除了 antd@4 兼容层，并对多个上下游包的类型做了统一。若强行混用 2.x 与 3.x 组件，极易引发运行时或样式问题。

## 回滚方案

如果升级过程中遇到问题，可以回滚到 2.0 版本：

```bash
# 回滚到 2.0 版本
pnpm up @ant-design/pro-components@^2.8.10
pnpm up antd@^4.24.0
```

> 同样地，请确保回滚时锁文件与依赖一并恢复到迁移前的提交。

## 总结

ProComponents 3.0 的升级主要是为了：

1. **简化代码库** - 移除废弃的兼容性代码
2. **提高性能** - 减少不必要的检查和警告
3. **统一 API** - 提供更一致的开发体验
4. **现代化** - 专注于 antd@6 和现代 React 特性

虽然升级过程可能需要一些工作，但这些改进将为未来的开发提供更好的基础。如果在迁移过程中遇到任何问题，请参考官方文档或提交 issue。
