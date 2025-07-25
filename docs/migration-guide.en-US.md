---
title: ProComponents 2.0 to 3.0 Migration Guide
order: 3
---

# ProComponents 2.0 to 3.0 Migration Guide

## Overview

ProComponents 3.0 is a major version upgrade that includes some breaking changes. This guide will help you smoothly migrate from version 2.0 to 3.0.

## Version Requirements

### Dependency Version Changes

- **antd**: `>= 4.20.0` → `>= 5.11.2`
- **React**: `>= 16.9.0` → `>= 18.0.0`

### Package Version Changes

| Package                      | 2.0 Version | 3.0 Version  |
| ---------------------------- | ----------- | ------------ |
| @ant-design/pro-components   | 2.8.10      | 3.0.0-beta.1 |
| @ant-design/pro-card         | 2.10.0      | 3.0.0-beta.1 |
| @ant-design/pro-descriptions | 2.6.10      | 3.0.0-beta.1 |
| @ant-design/pro-field        | 3.1.0       | 3.0.0-beta.1 |
| @ant-design/pro-form         | 2.32.0      | 3.0.0-beta.1 |
| @ant-design/pro-layout       | 7.22.7      | 3.0.0-beta.1 |
| @ant-design/pro-list         | 2.6.10      | 3.0.0-beta.1 |
| @ant-design/pro-provider     | 2.16.2      | 3.0.0-beta.1 |
| @ant-design/pro-table        | 3.21.0      | 3.0.0-beta.1 |
| @ant-design/pro-utils        | 2.18.0      | 3.0.0-beta.1 |

## Removed Deprecated APIs

### Table Component

#### 1. `columnsStateMap` → `columnsState`

**Reason for change**: Unify API naming for better consistency

```tsx | pure
// ❌ Old version
<ProTable
  columnsStateMap={{
    name: { show: false },
    age: { fixed: 'left' }
  }}
  onColumnsStateChange={(map) => console.log(map)}
/>

// ✅ New version
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

**Reason for change**: Unify search-related properties

```tsx | pure
// ❌ Old version
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    hideInSearch: true,
  },
];

// ✅ New version
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    search: false,
  },
];
```

#### 3. `fixHeader` → `scroll: { y: 400 }`

**Reason for change**: Use more standard antd Table scroll properties

```tsx | pure
// ❌ Old version
<ProTable
  fixHeader={true}
  // other props...
/>

// ✅ New version
<ProTable
  scroll={{ y: 400 }}
  // other props...
/>
```

#### 4. `tip` → `tooltip`

**Reason for change**: Unify tooltip property naming

```tsx | pure
// ❌ Old version
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    tip: 'Please enter your name',
  },
];

// ✅ New version
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    tooltip: 'Please enter your name',
  },
];
```

### Card Component

#### 1. `TabPane` Component Removal

**Reason for change**: Simplify API by using standard antd Tabs configuration

```tsx | pure
// ❌ Old version
<ProCard>
  <ProCard.TabPane tab="Tab 1" key="1">
    Content 1
  </ProCard.TabPane>
  <ProCard.TabPane tab="Tab 2" key="2">
    Content 2
  </ProCard.TabPane>
</ProCard>

// ✅ New version
<ProCard
  tabs={{
    items: [
      {
        key: '1',
        label: 'Tab 1',
        children: 'Content 1'
      },
      {
        key: '2',
        label: 'Tab 2',
        children: 'Content 2'
      }
    ]
  }}
/>
```

#### 2. `StatisticsCardProps` Type Removal

**Reason for change**: Simplify type definitions

```tsx | pure
// ❌ Old version
import { StatisticsCardProps } from '@ant-design/pro-components';

// ✅ New version
import { StatisticCardProps } from '@ant-design/pro-components';
```

### Layout Component

#### 1. `rightContentRender` → `actionsRender` + `avatarProps`

**Reason for change**: Separate concerns for more flexible configuration

```tsx | pure
// ❌ Old version
<ProLayout
  rightContentRender={() => (
    <div>
      <Avatar src="user.jpg" />
      <span>Username</span>
    </div>
  )}
/>

// ✅ New version
<ProLayout
  avatarProps={{
    src: 'user.jpg',
    title: 'Username'
  }}
  actionsRender={() => [
    <Button key="action1">Action 1</Button>,
    <Button key="action2">Action 2</Button>
  ]}
/>
```

#### 2. Layout Token Property Renaming

**Reason for change**: Unify naming conventions

```tsx | pure
// ❌ Old version
const token = {
  layout: {
    pageContainer: {
      marginInlinePageContainerContent: 40,
      marginBlockPageContainerContent: 32,
    },
  },
};

// ✅ New version
const token = {
  layout: {
    pageContainer: {
      paddingInlinePageContainerContent: 40,
      paddingBlockPageContainerContent: 32,
    },
  },
};
```

### Compatibility Related

#### 1. Remove antd@4 Compatibility Code

**Reason for change**: Focus on antd@5 support and simplify codebase

- Removed `compareVersions` utility function
- Removed `coverToNewToken` compatibility function
- Removed all antd@4 related compatibility checks

## New Features

### 1. Improved Type Support

```tsx | pure
// Better TypeScript support
interface DataType {
  id: number;
  name: string;
  age: number;
}

<ProTable<DataType>
  columns={[
    {
      title: 'Name',
      dataIndex: 'name',
      // Now has better type hints
    },
  ]}
/>;
```

### 2. Simplified API Design

```tsx | pure
// More concise configuration
<ProForm
  layout="vertical"
  onFinish={async (values) => {
    console.log(values);
    return true;
  }}
/>
```

## Migration Steps

### 1. Update Dependencies

```bash
# Update antd to 5.11.2 or higher
npm install antd@^5.11.2

# Update ProComponents to 3.0
npm install @ant-design/pro-components@^3.0.0-beta.1
```

### 2. Check for Deprecated APIs

Use the following commands to search for deprecated APIs in your project:

```bash
# Search for columnsStateMap
grep -r "columnsStateMap" src/

# Search for hideInSearch
grep -r "hideInSearch" src/

# Search for fixHeader
grep -r "fixHeader" src/

# Search for tip
grep -r "tip" src/

# Search for TabPane
grep -r "TabPane" src/

# Search for rightContentRender
grep -r "rightContentRender" src/
```

### 3. Gradual Migration

1. **First migrate Table components**
   - Update `columnsStateMap` to `columnsState`
   - Update `hideInSearch` to `search: false`
   - Update `fixHeader` to `scroll: { y: 400 }`
   - Update `tip` to `tooltip`

2. **Then migrate Card components**
   - Change `TabPane` usage to `tabs.items`
   - Update type references

3. **Finally migrate Layout components**
   - Update `rightContentRender` to `actionsRender` + `avatarProps`
   - Update layout token property names

### 4. Test and Verify

```bash
# Run tests
npm run test

# Check build
npm run build

# Start dev server to verify
npm run dev
```

## FAQ

### Q: What should I do if TypeScript errors occur after upgrade?

A: Check if you're using deprecated types or properties and update your code according to the migration guide.

### Q: What should I do if component styles are abnormal after upgrade?

A: Make sure antd version is upgraded to 5.11.2 or higher, and check for custom style conflicts.

### Q: What should I do if functionality doesn't work after upgrade?

A: Check console error messages and ensure all deprecated APIs have been correctly migrated.

### Q: Can I upgrade incrementally?

A: It's recommended to complete the upgrade at once, as version 3.0 removes a lot of compatibility code, and mixed usage may cause issues.

## Rollback Plan

If you encounter problems during the upgrade process, you can rollback to version 2.0:

```bash
# Rollback to version 2.0
npm install @ant-design/pro-components@^2.8.10
npm install antd@^4.24.0
```

## Summary

The ProComponents 3.0 upgrade is mainly for:

1. **Simplify codebase** - Remove deprecated compatibility code
2. **Improve performance** - Reduce unnecessary checks and warnings
3. **Unify API** - Provide more consistent development experience
4. **Modernize** - Focus on antd@5 and modern React features

Although the upgrade process may require some work, these improvements will provide a better foundation for future development. If you encounter any issues during the migration process, please refer to the official documentation or submit an issue.
