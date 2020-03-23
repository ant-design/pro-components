---
title: Layout Render API
order: 8
sidemenu: false
nav:
  title: API
  order: 7
---

# Layout API

Pro-Layout provides rich APIs for various customizations. Here you can see the demonstration of various APIs.

## Demo

<code src="./demo/api.tsx" />

## Related API

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| title | title at the top left corner of layout | ReactNode | `'Ant Design Pro'` |
| logo | URL of the logo in the upper left corner of the layout | ReactNode \| ()=>ReactNode | - |
| loading | loading state of layout | boolean | - |
| menuHeaderRender | Render logo and title | ReactNode \| (logo,title)=>ReactNode | - |
| headerRender | Customize header render method | (props: BasicLayoutProps) => ReactNode | - |
| rightContentRender | Customize render method on the right side of the header | (props: HeaderViewProps) => ReactNode | - |
| collapsedButtonRender | Customize the collapsed button method | (collapsed: boolean) => ReactNode | - |
| footerRender | Customize footer's render method | (props: BasicLayoutProps) => ReactNode | - |
| menuRender | Customize menu's render method | (props: HeaderViewProps) => ReactNode | - |
| menuItemRender | Customize menu item's render method | (itemProps: MenuDataItem) => ReactNode | - |
| subMenuItemRender | Customize render method with submenu menu items | (itemProps: MenuDataItem) => ReactNode | - |
