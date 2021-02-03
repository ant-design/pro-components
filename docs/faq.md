---
title: FAQ
order: 3
group:
  path: /
nav:
  title: FAQ
  path: /docs
---

## FAQ

以下整理了一些 ProComponents 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。

### ProTable request 返回的数据格式可以自定义吗?

不行的，你可以在 request 中转化一下，或者写个拦截器。

[示例](https://beta-pro.ant.design/docs/request-cn)

### 如何隐藏 ProTable 生成的搜索的 label？

columns 的 title 支持 function 的，你可以这样写

```typescript
title: (_, type) => {
  if (type === 'table') {
    return '标题';
  }
  return null;
};
```

## 错误和警告

这里是一些你在使用 ProComponents 的过程中可能会遇到的错误和警告，但是其中一些并不是 ProComponents 的 bug。

### Cannot read property 'Provider' of undefined

请确保 antd 的版本 >= `4.11.1`
