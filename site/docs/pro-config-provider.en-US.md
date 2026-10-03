---
title: ProConfigProvider
order: 3
---

# ProConfigProvider

`ProConfigProvider` supplies shared configuration to ProComponents in its subtree. Use it to override theme tokens, enable dark mode, register custom `valueType` renderers, or configure localized text.

Continue to use antd's `ConfigProvider` for antd components. `ProConfigProvider` reads the surrounding antd configuration and passes the relevant theme and locale information to ProComponents.

## Basic usage

```tsx | pure
import { ProConfigProvider, ProTable } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';

export default () => (
  <ConfigProvider locale={enUS} theme={{ token: { borderRadius: 6 } }}>
    <ProConfigProvider token={{ colorPrimary: '#722ed1' }}>
      <ProTable
        columns={[]}
        request={async () => ({ data: [], success: true })}
      />
    </ProConfigProvider>
  </ConfigProvider>
);
```

Nested `ProConfigProvider` instances inherit their parent configuration and merge `token` values. The nearest explicit setting takes precedence.

## Custom value types

`valueTypeMap` registers read and edit renderers for ProField based components such as ProTable, ProDescriptions, and ProFormField.

```tsx | pure
import { ProConfigProvider, ProTable } from '@ant-design/pro-components';
import { Input, Tag } from 'antd';

const valueTypeMap = {
  badgeText: {
    render: (text: unknown) => <Tag color="blue">{String(text ?? '')}</Tag>,
    formItemRender: (_text: unknown, props: any) => (
      <Input value={props.value} onChange={props.onChange} />
    ),
  },
};

export default () => (
  <ProConfigProvider valueTypeMap={valueTypeMap}>
    <ProTable
      columns={[{ dataIndex: 'status', valueType: 'badgeText' as any }]}
    />
  </ProConfigProvider>
);
```

To get complete TypeScript suggestions for custom strings, augment the ProComponents value type in your application or use a local type assertion.

## API

| Property         | Description                                                                         | Type                                      | Default                                          |
| ---------------- | ----------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------ |
| `children`       | Descendants that receive the configuration                                          | `ReactNode`                               | -                                                |
| `token`          | ProComponents token overrides, including antd global tokens and ProLayout tokens    | `DeepPartial<ProAliasToken>`              | `{}`                                             |
| `valueTypeMap`   | Registers or overrides read and edit renderers for a `valueType`                    | `Record<string, ProRenderFieldPropsType>` | `{}`                                             |
| `dark`           | Enables or disables the dark algorithm on top of the current antd theme             | `boolean`                                 | inherited                                        |
| `hashed`         | Controls hashed class names for ProComponents styles                                | `boolean`                                 | `true` in production                             |
| `prefixCls`      | CSS class prefix for ProComponents                                                  | `string`                                  | derived from antd `prefixCls`                    |
| `intl`           | Explicit ProComponents messages; normally inferred from the surrounding antd locale | `IntlType`                                | inferred from antd locale, then Chinese fallback |
| `autoClearCache` | Uses an isolated SWR cache and clears it when the provider unmounts                 | `boolean`                                 | `false`                                          |
| `needDeps`       | Internal dependency marker used to avoid redundant providers                        | `boolean`                                 | `false`                                          |

## Recommendations

- Put application wide theme and locale settings near the root. Nest a provider only when a subtree needs different styling or renderers.
- Use `hashed={false}` only when stable class names are required for debugging or a specific integration. The default reduces style collisions in production.
- Use `autoClearCache` for tests, micro frontends, or subtrees whose request cache must be discarded on unmount. Most applications can omit it.
- `needDeps` is intended for library internals and is unnecessary in application code.
