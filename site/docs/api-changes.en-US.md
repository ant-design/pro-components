---
title: ProComponents API Changes Summary (2.0 → 3.0)
order: 2
---

# ProComponents API Changes Summary (2.0 → 3.0)

## Quick Reference

### Removed APIs

| Component    | Old API                            | New API                             | Description                   |
| ------------ | ---------------------------------- | ----------------------------------- | ----------------------------- |
| ProTable     | `columnsStateMap`                  | `columnsState.value`                | Column state management       |
| ProTable     | `hideInSearch`                     | `search: false`                     | Hide from search              |
| ProTable     | `fixHeader`                        | `scroll: { y: 400 }`                | Fix table header              |
| ProTable     | `tip`                              | `tooltip`                           | Tooltip information           |
| ProCard      | `TabPane`                          | `tabs.items`                        | Tab configuration             |
| ProLayout    | `rightContentRender`               | `actionsRender` + `avatarProps`     | Right content rendering       |
| Layout Token | `marginInlinePageContainerContent` | `paddingInlinePageContainerContent` | Page container inline padding |
| Layout Token | `marginBlockPageContainerContent`  | `paddingBlockPageContainerContent`  | Page container block padding  |

### Version Requirements Changes

- **antd**: `>= 4.20.0` → `>= 6.0.0`
- **React**: `>= 16.9.0` → `>= 18.0.0`

### Package Version Changes

All sub-packages unified to version `3.0.0-beta.1`

## Migration Checklist

### Table Component

- [ ] `columnsStateMap` → `columnsState.value`
- [ ] `hideInSearch` → `search: false`
- [ ] `fixHeader` → `scroll: { y: 400 }`
- [ ] `tip` → `tooltip`

### Card Component

- [ ] `TabPane` → `tabs.items`
- [ ] `StatisticsCardProps` → `StatisticCardProps`

### Layout Component

- [ ] `rightContentRender` → `actionsRender` + `avatarProps`
- [ ] Layout token property renaming

### Compatibility

- [ ] Remove antd@4 compatibility code
- [ ] Update antd version to 6.0.0+

## Common Migration Commands

```bash
# Search for deprecated APIs
grep -r "columnsStateMap" src/
grep -r "hideInSearch" src/
grep -r "fixHeader" src/
grep -r "tip" src/
grep -r "TabPane" src/
grep -r "rightContentRender" src/

# Update dependencies
npm install antd@^6.0.0
npm install @ant-design/pro-components@^3.0.0-beta.1
```

## Rollback Plan

```bash
npm install @ant-design/pro-components@^2.8.10
npm install antd@^4.24.0
```

For detailed migration guide, please refer to: [migration-guide.en-US.md](./migration-guide.en-US.md)
