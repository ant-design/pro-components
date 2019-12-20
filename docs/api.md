---
title: Render API 展示
---

# Layout API 展示

Pro-Layout 提供了丰富的 API 进行各种自定义，这里可以看靠各种 API 的展示。

## Demo

<code src="./demo/api.tsx" />

## 相关 API 展示

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | layout 的 左上角 的 title | ReactNode | `'Ant Design Pro'` |
| logo | layout 的 左上角 logo 的 url | ReactNode \| ()=>ReactNode | - |
| loading | layout 的加载态 | boolean | - |
| menuHeaderRender | 渲染 logo 和 title | ReactNode \| (logo,title)=>ReactNode | - |
| headerRender | 自定义头的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| rightContentRender | 自定义头右部的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| collapsedButtonRender | 自定义 collapsed button 的方法 | (collapsed: boolean) => ReactNode | - |
| footerRender | 自定义页脚的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| menuRender | 自定义菜单的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| menuItemRender | 自定义菜单项的 render 方法 | (itemProps: MenuDataItem) => ReactNode | - |
| subMenuItemRender | 自定义拥有子菜单菜单项的 render 方法 | (itemProps: MenuDataItem) => ReactNode | - |
