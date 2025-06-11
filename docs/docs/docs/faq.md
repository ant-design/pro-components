---
title: FAQ
order: 3

nav:
  title: FAQ
  path: /docs
---

## FAQ

以下整理了一些 ProComponents 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。此外我们也维护了一个反馈较多 [how to use 标签](https://github.com/ant-design/pro-components/issues?q=is%3Aissue+label%3A%22%F0%9F%A4%B7%F0%9F%8F%BC+How+to+use%22+) 亦可参考。

### ProTable request 返回的数据格式可以自定义吗？

不行的，你可以在 request 中转化一下，或者写个拦截器。

[示例](https://beta-pro.ant.design/docs/request-cn)

### 如何隐藏 ProTable 生成的搜索的 label？

columns 的 title 支持 function 的，你可以这样写：

```typescript
title: (_, type) => {
  if (type === 'table') {
    return '标题';
  }
  return null;
};
```

### 我没法安装 `ProComponents` 和 `ProComponents` 的依赖，顺便提一句，我在中国大陆。

那啥，试试 [cnpm](http://npm.taobao.org/)和[yarn](https://www.npmjs.com/package/yarn)。

### `Form` 当中的 `initialValues`

`ProComponents` 底层也是封装的 [antd](https://ant.design/index-cn) ，所以用法也和 [antd](https://ant.design/index-cn) 相同。注意 `initialValues` 不能被 `setState` 动态更新，所以你需要用 `setFieldsValue` 来更新。 `initialValues` 只在 `form` 初始化时生效且只生效一次，如果你需要异步加载，推荐使用 `request`，或者 `initialValues ? <Form/> : null`

### Chrome88 以下浏览器兼容问题

因为 `ProComponent` 使用了较新的 css 属性，会导致在低版本浏览器无法达到预设的兼容效果（即使项目配置了 polyfill）。

因此，需要进行一些额外的兼容性配置：

1. 按这个文档配置 <https://ant.design/docs/react/compatible-style-cn>

2. 如果是 umi 项目，可以在 app.ts 中配置：

```typescript
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';

export function rootContainer(container: React.ReactElement) {
  return React.createElement(
    StyleProvider,
    {
      hashPriority: 'high',
      transformers: [legacyLogicalPropertiesTransformer],
    },
    container,
  );
}
```

## 错误和警告

这里是一些你在使用 ProComponents 的过程中可能会遇到的错误和警告，但是其中一些并不是 ProComponents 的 bug。

### Cannot read property 'Provider' of undefined

请确保 antd 的版本 >= `4.11.1`
