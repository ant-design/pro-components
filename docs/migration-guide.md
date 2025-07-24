# ProComponents 2.0 到 3.0 迁移指南

## 概述

ProComponents 3.0 是一个主要版本升级，包含了一些破坏性变更。本指南将帮助你从 2.0 版本平滑迁移到 3.0 版本。

## 版本要求

### 依赖版本变更

- **antd**: `>= 4.20.0` → `>= 5.11.2`
- **React**: `>= 16.9.0` → `>= 18.0.0`

### 包版本变更

| 包名                         | 2.0 版本 | 3.0 版本     |
| ---------------------------- | -------- | ------------ |
| @ant-design/pro-components   | 2.8.10   | 3.0.0-beta.1 |
| @ant-design/pro-card         | 2.10.0   | 3.0.0-beta.1 |
| @ant-design/pro-descriptions | 2.6.10   | 3.0.0-beta.1 |
| @ant-design/pro-field        | 3.1.0    | 3.0.0-beta.1 |
| @ant-design/pro-form         | 2.32.0   | 3.0.0-beta.1 |
| @ant-design/pro-layout       | 7.22.7   | 3.0.0-beta.1 |
| @ant-design/pro-list         | 2.6.10   | 3.0.0-beta.1 |
| @ant-design/pro-provider     | 2.16.2   | 3.0.0-beta.1 |
| @ant-design/pro-table        | 3.21.0   | 3.0.0-beta.1 |
| @ant-design/pro-utils        | 2.18.0   | 3.0.0-beta.1 |

## 已移除的废弃 API

### Table 组件

#### 1. `columnsStateMap` → `columnsState`

**变更原因**: 统一 API 命名，提高一致性

```tsx
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

#### 2. `hideInSearch` → `search: false`

**变更原因**: 统一搜索相关属性

```tsx
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

#### 3. `fixHeader` → `scroll: { y: 400 }`

**变更原因**: 使用更标准的 antd Table 滚动属性

```tsx
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

#### 4. `tip` → `tooltip`

**变更原因**: 统一提示信息属性命名

```tsx
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

### Card 组件

#### 1. `TabPane` 组件移除

**变更原因**: 简化 API，使用标准的 antd Tabs 配置

```tsx
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

#### 2. `StatisticsCardProps` 类型移除

**变更原因**: 简化类型定义

```tsx
// ❌ 旧版本
import { StatisticsCardProps } from '@ant-design/pro-components';

// ✅ 新版本
import { StatisticCardProps } from '@ant-design/pro-components';
```

### Layout 组件

#### 1. `rightContentRender` → `actionsRender` + `avatarProps`

**变更原因**: 分离关注点，提供更灵活的配置

```tsx
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

#### 2. 布局 Token 属性重命名

**变更原因**: 统一命名规范

```tsx
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

### 兼容性相关

#### 1. 移除 antd@4 兼容性代码

**变更原因**: 专注于 antd@5 支持，简化代码库

- 移除了 `compareVersions` 工具函数
- 移除了 `coverToNewToken` 兼容性函数
- 移除了所有 antd@4 相关的兼容性检查

## 新增功能

### 1. 改进的类型支持

```tsx
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

### 2. 简化的 API 设计

```tsx
// 更简洁的配置
<ProForm
  layout="vertical"
  onFinish={async (values) => {
    console.log(values);
    return true;
  }}
/>
```

## 迁移步骤

### 1. 更新依赖

```bash
# 更新 antd 到 5.11.2 或更高版本
npm install antd@^5.11.2

# 更新 ProComponents 到 3.0
npm install @ant-design/pro-components@^3.0.0-beta.1
```

### 2. 检查废弃 API

使用以下命令搜索项目中的废弃 API：

```bash
# 搜索 columnsStateMap
grep -r "columnsStateMap" src/

# 搜索 hideInSearch
grep -r "hideInSearch" src/

# 搜索 fixHeader
grep -r "fixHeader" src/

# 搜索 tip
grep -r "tip" src/

# 搜索 TabPane
grep -r "TabPane" src/

# 搜索 rightContentRender
grep -r "rightContentRender" src/
```

### 3. 逐步迁移

1. **首先迁移 Table 组件**
   - 更新 `columnsStateMap` 为 `columnsState`
   - 更新 `hideInSearch` 为 `search: false`
   - 更新 `fixHeader` 为 `scroll: { y: 400 }`
   - 更新 `tip` 为 `tooltip`

2. **然后迁移 Card 组件**
   - 将 `TabPane` 用法改为 `tabs.items`
   - 更新类型引用

3. **最后迁移 Layout 组件**
   - 更新 `rightContentRender` 为 `actionsRender` + `avatarProps`
   - 更新布局 Token 属性名

### 4. 测试验证

```bash
# 运行测试
npm run test

# 检查构建
npm run build

# 启动开发服务器验证
npm run dev
```

## 常见问题

### Q: 升级后出现 TypeScript 错误怎么办？

A: 检查是否使用了已废弃的类型或属性，按照迁移指南更新代码。

### Q: 升级后组件样式异常怎么办？

A: 确保 antd 版本已升级到 5.11.2 或更高版本，并检查是否有自定义样式冲突。

### Q: 升级后功能不工作怎么办？

A: 检查控制台错误信息，确认所有废弃 API 都已正确迁移。

### Q: 可以渐进式升级吗？

A: 建议一次性完成升级，因为 3.0 版本移除了大量兼容性代码，混合使用可能导致问题。

## 回滚方案

如果升级过程中遇到问题，可以回滚到 2.0 版本：

```bash
# 回滚到 2.0 版本
npm install @ant-design/pro-components@^2.8.10
npm install antd@^4.24.0
```

## 总结

ProComponents 3.0 的升级主要是为了：

1. **简化代码库** - 移除废弃的兼容性代码
2. **提高性能** - 减少不必要的检查和警告
3. **统一 API** - 提供更一致的开发体验
4. **现代化** - 专注于 antd@5 和现代 React 特性

虽然升级过程可能需要一些工作，但这些改进将为未来的开发提供更好的基础。如果在迁移过程中遇到任何问题，请参考官方文档或提交 issue。
