---
title: 页脚
order: 7
side: false
group:
  path: /layout
nav:
  title: ProLayout
  path: /layout
---

# footer 的各种操作

ProLayout 默认不提供页脚，要是和 Pro 官网相同的样式，需要自己引入一下页脚。

## 自定义页脚

<code src="../demos/footer.tsx" />

## 相关 API 展示

### ProLayout

| 参数         | 说明                     | 类型                                   | 默认值 |
| ------------ | ------------------------ | -------------------------------------- | ------ |
| footerRender | 自定义页脚的 render 方法 | (props: BasicLayoutProps) => ReactNode | -      |

### DefaultFooter

| 参数      | 说明           | 类型                                               | 默认值 |
| --------- | -------------- | -------------------------------------------------- | ------ |
| links     | 默认自带的一些 | false \| `{key:string,title:string,href:string}[]` | -      |
| copyright | 版权声明文字   | ReactNode                                          | -      |
