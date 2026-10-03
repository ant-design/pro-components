---
title: ProConfigProvider
order: 3
---

# ProConfigProvider

`ProConfigProvider` 为其子树中的 ProComponents 提供统一配置。常见用途包括覆盖主题 Token、切换深色主题、注册自定义 `valueType` 和配置国际化。

应用仍应使用 antd 的 `ConfigProvider` 配置 antd 组件。`ProConfigProvider` 会读取外层 antd 配置，并把相关主题和语言信息传给 ProComponents。

## 基础用法

```tsx | pure
import { ProConfigProvider, ProTable } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

export default () => (
  <ConfigProvider locale={zhCN} theme={{ token: { borderRadius: 6 } }}>
    <ProConfigProvider token={{ colorPrimary: '#722ed1' }}>
      <ProTable
        columns={[]}
        request={async () => ({ data: [], success: true })}
      />
    </ProConfigProvider>
  </ConfigProvider>
);
```

嵌套的 `ProConfigProvider` 会继承外层配置，并合并 `token`。离组件最近的显式配置优先。

## 自定义 valueType

`valueTypeMap` 可以为 ProTable、ProDescriptions、ProFormField 等基于 ProField 的组件注册展示态和编辑态渲染器。

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

若要获得自定义字符串的完整 TypeScript 提示，可在业务项目中扩展 ProComponents 的 valueType 类型，或在局部声明中使用类型断言。

## API

| 参数             | 说明                                                              | 类型                                      | 默认值                              |
| ---------------- | ----------------------------------------------------------------- | ----------------------------------------- | ----------------------------------- |
| `children`       | 使用配置的子节点                                                  | `ReactNode`                               | -                                   |
| `token`          | 覆盖 ProComponents Token；支持 antd 全局 Token 和 ProLayout Token | `DeepPartial<ProAliasToken>`              | `{}`                                |
| `valueTypeMap`   | 注册或覆盖 `valueType` 的展示态和编辑态渲染器                     | `Record<string, ProRenderFieldPropsType>` | `{}`                                |
| `dark`           | 在当前 antd 主题算法上启用或关闭深色算法                          | `boolean`                                 | 继承外层配置                        |
| `hashed`         | 是否为 ProComponents 样式生成 hash 类名                           | `boolean`                                 | 生产环境为 `true`                   |
| `prefixCls`      | ProComponents CSS 类名前缀                                        | `string`                                  | 基于 antd `prefixCls` 生成          |
| `intl`           | 显式设置 ProComponents 文案；通常可由外层 antd `locale` 自动推导  | `IntlType`                                | 根据 antd locale 推导，最后回退中文 |
| `autoClearCache` | 使用独立 SWR 缓存，并在 Provider 卸载时清空                       | `boolean`                                 | `false`                             |
| `needDeps`       | ProComponents 内部用于避免重复 Provider 的依赖标记                | `boolean`                                 | `false`                             |

## 使用建议

- 主题和语言的应用级配置放在根节点；仅在局部需要不同样式或渲染器时嵌套 Provider。
- `hashed={false}` 适合需要稳定类名的调试或特殊集成场景。生产环境通常保留默认值，以减少样式冲突。
- `autoClearCache` 适合测试、微应用或需要在卸载时隔离请求缓存的子树。普通应用无需设置。
- `needDeps` 供组件库内部使用，业务代码无需设置。
