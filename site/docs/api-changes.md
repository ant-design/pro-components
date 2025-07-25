---
title: ProComponents API 变更总结 (2.0 → 3.0)
order: 2
---

# ProComponents API 变更总结 (2.0 → 3.0)

## 快速参考

### 已移除的 API

| 组件         | 旧 API                             | 新 API                              | 说明           |
| ------------ | ---------------------------------- | ----------------------------------- | -------------- |
| ProTable     | `columnsStateMap`                  | `columnsState.value`                | 列状态管理     |
| ProTable     | `hideInSearch`                     | `search: false`                     | 隐藏搜索       |
| ProTable     | `fixHeader`                        | `scroll: { y: 400 }`                | 固定表头       |
| ProTable     | `tip`                              | `tooltip`                           | 提示信息       |
| ProCard      | `TabPane`                          | `tabs.items`                        | 标签页配置     |
| ProLayout    | `rightContentRender`               | `actionsRender` + `avatarProps`     | 右侧内容渲染   |
| Layout Token | `marginInlinePageContainerContent` | `paddingInlinePageContainerContent` | 页面容器内边距 |
| Layout Token | `marginBlockPageContainerContent`  | `paddingBlockPageContainerContent`  | 页面容器内边距 |

### 版本要求变更

- **antd**: `>= 4.20.0` → `>= 5.11.2`
- **React**: `>= 16.9.0` → `>= 18.0.0`

### 包版本变更

所有子包版本统一为 `3.0.0-beta.1`

## 迁移检查清单

### Table 组件

- [ ] `columnsStateMap` → `columnsState.value`
- [ ] `hideInSearch` → `search: false`
- [ ] `fixHeader` → `scroll: { y: 400 }`
- [ ] `tip` → `tooltip`

### Card 组件

- [ ] `TabPane` → `tabs.items`
- [ ] `StatisticsCardProps` → `StatisticCardProps`

### Layout 组件

- [ ] `rightContentRender` → `actionsRender` + `avatarProps`
- [ ] 布局 Token 属性重命名

### 兼容性

- [ ] 移除 antd@4 兼容性代码
- [ ] 更新 antd 版本到 5.11.2+

## 常用迁移命令

```bash
# 搜索废弃 API
grep -r "columnsStateMap" src/
grep -r "hideInSearch" src/
grep -r "fixHeader" src/
grep -r "tip" src/
grep -r "TabPane" src/
grep -r "rightContentRender" src/

# 更新依赖
npm install antd@^5.11.2
npm install @ant-design/pro-components@^3.0.0-beta.1
```

## 回滚方案

```bash
npm install @ant-design/pro-components@^2.8.10
npm install antd@^4.24.0
```

详细迁移指南请参考：[migration-guide.md](./migration-guide.md)
