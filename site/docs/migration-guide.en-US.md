---
title: ProComponents 2.0 to 3.0 Migration Guide
order: 3
---

# ProComponents 2.0 to 3.0 Migration Guide

## Overview

ProComponents 3.0 is a major version upgrade that includes some breaking changes. This guide will help you smoothly migrate from version 2.0 to 3.0.

## Preparation Before Upgrade

### Version Requirements

| Dependency | 2.x Baseline | 3.0 Minimum Requirement |
| ---------- | ------------ | ----------------------- |
| antd       | `>= 4.20.0`  | `>= 6.0.0`              |
| React      | `>= 16.9.0`  | `>= 18.0.0`             |

#### Sub-package Version Alignment

| Package Name                 | 2.x Latest | 3.0 Start Version |
| ---------------------------- | ---------- | ----------------- |
| @ant-design/pro-components   | 2.8.10     | 3.0.0-beta.1      |
| @ant-design/pro-card         | 2.10.0     | 3.0.0-beta.1      |
| @ant-design/pro-descriptions | 2.6.10     | 3.0.0-beta.1      |
| @ant-design/pro-field        | 3.1.0      | 3.0.0-beta.1      |
| @ant-design/pro-form         | 2.32.0     | 3.0.0-beta.1      |
| @ant-design/pro-layout       | 7.22.7     | 3.0.0-beta.1      |
| @ant-design/pro-list         | 2.6.10     | 3.0.0-beta.1      |
| @ant-design/pro-provider     | 2.16.2     | 3.0.0-beta.1      |
| @ant-design/pro-table        | 3.21.0     | 3.0.0-beta.1      |
| @ant-design/pro-utils        | 2.18.0     | 3.0.0-beta.1      |

Please upgrade all sub-packages to the same 3.0.x tag synchronously to avoid duplicate imports and type conflicts during compilation.

### Codebase Preparation Suggestions

- Create a migration branch in your version control system and lock the 2.x rollback baseline.
- Run existing tests and self-test key pages before upgrading, recording passing results and screenshots for regression comparison.
- Check if there are any polyfills/shim codes for `antd@4` or React 16 in the project, and mark them for deletion in advance.
- If the project uses a `lockfile`, please update and commit it at once during migration to avoid drift caused by repeated installations.

### Dependency Installation Example

Taking `pnpm` as an example (please replace with corresponding commands if using `npm` or `yarn`):

```bash
pnpm up antd@^6.0.0
pnpm up @ant-design/pro-components@^3.0.0-beta.1
pnpm install
```

### Risk Warning

- 3.0 completely removes the compatibility logic for antd@4. Mixing 2.x and 3.x components in the same package will trigger unexpected style and runtime errors.
- React 18 concurrent features may expose issues with old side effect patterns. Please pay special attention to undeclared dependencies in `useEffect` or synchronous side effects.
- If your build tool relies on old configurations of `less-loader` or `babel-plugin-import`, please check if they support the Token system of antd 5 after the upgrade.

## Removed Deprecated APIs

### Change Cheat Sheet

| Component    | Old Usage                               | New Usage                                      | Suggestion                                                                                                                               |
| ------------ | --------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| ProTable     | `columnsStateMap`                       | `columnsState.value` + `columnsState.onChange` | Migrate the original state object to `columnsState.value` and use `onChange` for events; if persistence is needed, add `persistenceKey`. |
| ProTable     | `hideInSearch`                          | `search: false`                                | Use `search` configuration to control the display of the search area, supporting object expansion.                                       |
| ProTable     | `fixHeader`                             | `scroll: { y: number }`                        | Use antd Table native `scroll` property and set height as needed.                                                                        |
| ProTable     | `tip`                                   | `tooltip`                                      | Migrate column hints to `tooltip`, reusable with antd `LabelTooltipType`.                                                                |
| ProCard      | `ProCard.TabPane`                       | `tabs.items`                                   | Use antd `Tabs`'s `items` property to describe tabs, and pass other `tabs` configurations.                                               |
| ProCard      | `StatisticsCardProps`                   | `StatisticCardProps`                           | Update type references to avoid compilation errors.                                                                                      |
| ProLayout    | `rightContentRender`                    | `actionsRender` + `avatarProps`                | Split the original right side content into action area and avatar configuration for independent maintenance.                             |
| Layout Token | `marginInlinePageContainerContent` etc. | `paddingInlinePageContainerContent` etc.       | Replace Token names comprehensively to maintain theme granularity consistency.                                                           |
| ProFormField | `plain`                                 | `variant`                                     | Remove `plain`, use `variant` to control field display variant (e.g. `borderless`, `outlined`).                                          |

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

`columnsState` is now fully aligned with the controlled mode of antd Table. It is recommended to migrate as follows:

- Copy the original `columnsStateMap` fully to `columnsState.value`.
- If you need to listen for changes, use `columnsState.onChange`; `onColumnsStateChange` has been removed, please migrate to `columnsState.onChange`.
- If the project relies on column configuration persistence, please explicitly add `persistenceKey` and `persistenceType`.

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

`defaultValue` will take effect on the first render and after clearing persistence. Make sure to keep it consistent with the format returned by the server to avoid overwriting user configuration.

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

`search` supports boolean values or objects:

- Set to `false`: Completely hide the item in the search form.
- Set to `{ transform }`: Keep the search item but perform secondary processing on the submission process.

```tsx | pure
const columns = [
  {
    title: 'Create Time',
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

When migrating, please check if you relied on the default value of `hideInSearch` (previously `false`). If you expect to keep the search item, be sure to remove the old field instead of simply replacing it.

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

The `y` value of `scroll` is recommended to be decoupled from the page layout and can be dynamically calculated based on the container height:

```tsx | pure
const height = document.body.clientHeight - 320;

<ProTable
  scroll={{ y: height }}
  sticky
  // other props...
/>;
```

If the project uses `sticky` combined with `fixHeader`, now simply keep `sticky`, and other scrolling behaviors are handled by antd native Table to avoid double positioning.

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

`tooltip` is consistent with the `tooltip` type of antd `FormItem`, which can be either a string or a `LabelTooltipType` object, thus supporting richer descriptions and icon customization.

```tsx | pure
const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    tooltip: {
      title: 'Company email, used for receiving notifications',
      icon: <InfoCircleOutlined />,
    },
  },
];
```

> The `InfoCircleOutlined` in the example needs to be imported from `@ant-design/icons`.

When migrating, please confirm that there is no duplicate rendering of tooltip information with custom column rendering logic to avoid the same icon appearing multiple times.

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

`tabs` directly reuses antd `TabsProps`. Precautions during migration:

- `tab`, `key`, `children` and other fields of the original `ProCard.TabPane` map one-to-one to `items`.
- If the old code passed `cardProps` through `TabPane`, now configure it uniformly in `tabs.cardProps`, or place `children` in each item of `items` to combine them yourself.
- Control properties like `tabs.onChange` and `tabs.activeKey` remain unchanged and can be migrated directly.

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

If you customized the `ProCard.TabPane` component wrapper externally, you need to adjust the export method synchronously to avoid referencing static properties that have been deleted.

#### 2. `StatisticsCardProps` Type Removal

**Reason for change**: Simplify type definitions

```tsx | pure
// ❌ Old version
import { StatisticsCardProps } from '@ant-design/pro-components';

// ✅ New version
import { StatisticCardProps } from '@ant-design/pro-components';
```

This change only affects TypeScript types, and the compiler will prompt that `StatisticsCardProps` does not exist. Please replace it in the project's type declarations and custom wrapper components, especially for usages like `React.FC<StatisticsCardProps>`.

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

Recommended migration steps:

1. Split the node returned by the original `rightContentRender` into "Avatar" and "Actions" contents.
2. Put `src`, `title`, `render`, etc., related to the avatar into `avatarProps`; its type is compatible with antd `AvatarProps`, and provides additional `title` and `render`.
3. Other buttons, search boxes, etc., are returned as an array from `actionsRender`, and ProLayout will handle spacing and alignment uniformly.

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

> The `QuestionCircleOutlined` in the example needs to be imported from `@ant-design/icons`.

If the layout container (e.g., wrapped in a specific className) relying on `rightContentRender` was used before, after migration, you can wrap `<Space>` or custom components outside `actionsRender` to maintain consistent style.

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

In addition to the fields in the example, other Tokens named with `margin*PageContainerContent` have also been switched to the corresponding `padding*PageContainerContent`. Please replace them all at once. After replacement, it is recommended to perform a theme build or visual acceptance to confirm that no old fields are missed.

### Field Component

#### `plain` Parameter Removal

**Reason for change**: Unify API by using `variant` to control display style

```tsx | pure
// ❌ Old version
<ProFormText
  name="name"
  plain={true}
/>

<ProFormTimePicker
  name="time"
  plain
/>

// ✅ New version
<ProFormText
  name="name"
  fieldProps={{ variant: 'borderless' }}
/>

<ProFormTimePicker
  name="time"
  fieldProps={{ variant: 'borderless' }}
/>
```

The `plain` parameter has been completely removed and is no longer provided. For borderless/simplified display, use `fieldProps.variant: 'borderless'`; for default outlined style use `variant: 'outlined'`.

When migrating, please search globally for `plain`, remove all `plain` or `plain={true}` props, and replace with `variant` configuration as needed.

### Compatibility Related

#### 1. Remove antd@4 Compatibility Code

**Reason for change**: Focus on antd@6 support and simplify codebase

- Removed `compareVersions` utility function
- Removed `coverToNewToken` compatibility function
- Removed all antd@4 related compatibility checks

If you explicitly imported the above utility functions in your business code (common in theme customization or style fallback scenarios), you need to delete them synchronously and use the Token scheme officially recommended by antd 5. If theme variables are lost after the upgrade, prioritize checking whether `coverToNewToken` is still being referenced.

## Upgrade Benefits

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

3.0 has made the following improvements to the type system:

- Generic components like `ProTable` and `ProForm` have stricter derivation for columns/fields, reducing `any`.
- New `columnsState` and `search` APIs have complete type declarations, facilitating automatic editor prompts.
- Type declarations of all sub-packages are merged into the `es/` directory to avoid multiple duplicates in `node_modules`.

If you encounter type errors after migration, please prioritize checking whether custom encapsulations explicitly declare old types of 2.x (such as `ProColumns<any>`); if necessary, just add generic parameters.

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

- `ProForm` no longer preloads all field components by default, making Tree Shaking friendlier.
- The action area of `ProLayout` is easier to render on demand after splitting, avoiding writing a lot of conditional branches.
- After `ProCard` is aligned with antd Tabs, all configuration items and animations of antd can be reused directly.

Understanding these benefits helps evaluate the value of the upgrade and communicate the benefits to the team.

## Migration Steps

### 1. Update Dependencies

Prioritize using the project's current package manager to maintain consistency. The following example uses `pnpm`:

```bash
# Upgrade core dependencies
pnpm up antd@^6.0.0
pnpm up @ant-design/pro-components@^3.0.0-beta.1

# Synchronize installation lock version
pnpm install
```

> If the team still uses `npm`/`yarn`, please replace `pnpm up` with the corresponding `npm install` or `yarn add` command, and confirm that `package-lock.json`/`yarn.lock` is updated at once.

### 2. Check for Deprecated APIs

Use the following commands to help troubleshoot (if `rg` is not installed, replace with `grep` or IDE global search):

```bash
# Use ripgrep (recommended)
pnpm exec rg "columnsStateMap" src
pnpm exec rg "hideInSearch" src
pnpm exec rg "fixHeader" src
pnpm exec rg "tip[\"']" src
pnpm exec rg "ProCard\.TabPane" src
pnpm exec rg "rightContentRender" src
pnpm exec rg "plain" src
```

> In Windows PowerShell, you can use `Select-String -Path "src/**/*.tsx" -Pattern "columnsStateMap"` to achieve a similar effect.

### 3. Gradual Migration

1. **First migrate Table components**
   - Update `columnsStateMap` to `columnsState`
   - Update `hideInSearch` to `search: false`
   - Update `fixHeader` to `scroll: { y: 400 }`
   - Update `tip` to `tooltip`
   - Add `columnsState.defaultValue`, `persistenceKey` on demand

2. **Then migrate Card components**
   - Change `TabPane` usage to `tabs.items`
   - Update type references to ensure `StatisticsCardProps` is no longer imported

3. **Finally migrate Layout components**
   - Update `rightContentRender` to `actionsRender` + `avatarProps`
   - Update layout token property names
   - Check if custom header components rely on the old `rightContentRender` container

4. **Migrate Field / ProFormField components**
   - Remove all `plain` or `plain={true}` props
   - Replace with `fieldProps.variant: 'borderless'` or `variant: 'outlined'` as needed

Migrating from data-intensive components to layout components helps ensure data display is correct before dealing with visual differences.

### 4. Test and Verify

```bash
# Run unit tests (coverage recommended)
pnpm run test

# Build artifacts, verify packaging output
pnpm run build

# Start dev server for end-to-end verification
pnpm run dev

# (Optional) Static check
pnpm run lint
```

Focus on the following scenarios during verification:

- Whether the table column configuration is correctly persisted, and whether the column setting panel can save user preferences.
- Whether the display of the operation area in the upper right corner of the layout meets expectations on mobile and desktop.
- Whether custom theme Tokens are still correctly read, and there are no `Warning: [antd: theme]` class warnings in the console.

## FAQ

### Q: What should I do if TypeScript errors occur after upgrade?

A: Common reasons include still referencing `StatisticsCardProps`, `columnsStateMap`, or hardcoding old fields in custom types. Please adjust according to this document and confirm that `types` in `tsconfig.json` does not point to custom declarations of 2.x.

### Q: What if table column state is no longer persisted?

A: Check if `persistenceKey` and `persistenceType` have been set in `columnsState`, and whether `value` is a new object reference. 3.0 will ignore cases where old objects are directly reused. If necessary, use `structuredClone` or manual `JSON.parse(JSON.stringify(...))`.

### Q: Tabs do not render after upgrade?

A: The new `tabs.items` must provide `key` and `label`, and ensure that the `items` array is not filtered to `undefined` dynamically during the rendering process. If you rely on lazy loading, please control the rendering timing yourself in `children`.

### Q: The top right action area disappeared?

A: `actionsRender` needs to return `ReactNode[]` or a single `ReactNode`. Please confirm that the return value of the function is not `undefined`. If you need to control based on permissions, you can return `null` or an empty array, but don't forget the final return value.

### Q: What should I do if component styles are abnormal after upgrade?

A: First confirm that antd has been upgraded to 6.0.0+, and then troubleshoot whether there are still custom styles referencing removed class names (such as `.ant-pro-card-tabpane`). After Token renaming, variables in LESS/SCSS also need to be updated synchronously.

### Q: What should I do if functionality doesn't work after upgrade?

A: Open the browser console and terminal logs, which usually prompt for unmigrated APIs. Please troubleshoot one by one in combination with the commands in the "Check Removed APIs" chapter.

### Q: Can I upgrade incrementally?

A: Not recommended. 3.0 removes the antd@4 compatibility layer and unifies the types of multiple upstream and downstream packages. Forcibly mixing 2.x and 3.x components is extremely likely to cause runtime or style issues.

## Rollback Plan

If you encounter problems during the upgrade process, you can rollback to version 2.0:

```bash
# Rollback to version 2.0
pnpm up @ant-design/pro-components@^2.8.10
pnpm up antd@^4.24.0
```

> Similarly, please ensure that the lock file and dependencies are restored to the commit before the migration when rolling back.

## Summary

The ProComponents 3.0 upgrade is mainly for:

1. **Simplify codebase** - Remove deprecated compatibility code
2. **Improve performance** - Reduce unnecessary checks and warnings
3. **Unify API** - Provide more consistent development experience
4. **Modernize** - Focus on antd@6 and modern React features

Although the upgrade process may require some work, these improvements will provide a better foundation for future development. If you encounter any issues during the migration process, please refer to the official documentation or submit an issue.
