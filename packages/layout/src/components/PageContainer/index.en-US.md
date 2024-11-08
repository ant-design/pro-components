---
title: PageContainer
atomId: PageContainer
nav:
  title: Component
---

# PageContainer

PageContainer is designed to reduce the complexity of breadcrumb configuration and headers, which are required for many pages. Of course, you can also turn off the auto-generated ones and use your own configuration.

PageContainer wraps antd's PageHeader component, adding tabList and content. It relies on Layout's route property to fill in the title and breadcrumb according to the current route. Of course you can pass in parameters to override the default values. PageContainer supports all properties of Tabs and PageHeader.

We have added a footer attribute to make it easier to do things like forms, so you can get an action bar that always hovers at the bottom. If you don't find it convenient, you can also use the FooterToolbar to carry the actions directly, both behave basically the same, but the FooterToolbar has more customizable configurations.

```tsx | pure
<PageContainer
  content="Welcome to the ProLayout component"
  tabList={[
    {
      tab: 'base information',
      key: 'base',
    },
    {
      tab: 'details',
      key: 'info',
    },
  ]}
  extra={[
    <Button key="3">Operation</Button>,
    <Button key="2">Operation</Button>,
    <Button key="1" type="primary">
      Primary Action
    </Button>,
  ]}
  footer={[
    <Button key="rest">Reset</Button>,
    <Button key="submit" type="primary">
      submit
    </Button>,
  ]}
>
  {children}
</PageContainer>
```

## Code Demo

### Basic usage

<code src="./demos/basic.tsx"></code>

### Fixed table headers

<code src="./demos/fixHeader.tsx"></code>

### Hide breadcrumbs

<code src="./demos/hideBreadMenu.tsx">

### page loading

<code src="./demos/loading.tsx"></code>

## PageContainer

PageContainer wraps ant design's PageHeader component, adding tabList and content. It relies on Layout's route property to fill in the title and breadcrumb based on the current route. Of course you can pass in parameters to override the default values. PageContainer supports all of [Tabs](https://ant.design/components/tabs/) and [PageHeader](https://procomponents.ant.design/en-US/components/page-header)'s attributes of [Tabs]() and [PageHeader]().

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| content | Content area | ReactNode | - |
| extraContent | The extra content area, located to the right of content | ReactNode | - |
| tabList | tab title list | `{key: string, tab: ReactNode}[]` | - |
| tabActiveKey | The currently highlighted tab item | string | - |
| onTabChange | Callback for switching panels | `(key) => void` | - |
| tabBarExtraContent | Extra element on tab bar | `React.ReactNode` | - |
| header | All properties of [PageHeader](https://procomponents.ant.design/en-US/components/page-header). | `PageHeaderProps` | - |
| fixedHeader | Fix the content of the pageHeader to the top, better not to use it if the page content is small, it will have serious obscuration problems | `boolean` | - |
| affixProps | The configuration of the fixed pins, exactly the same as antd | `AffixProps` | - |
| footer | Hover over the bottom action bar, pass in an array that will automatically add spaces | `ReactNode[]` | - |
| waterMarkProps | Configure the watermark, Layout will pass you through to PageContainer, but the configuration of PageContainer takes precedence | [WaterMarkProps](/components/water-mark) | - |
| tabProps | The Tabs properties. Only card-style Tabs support add and close options. Use `closable={false}` to disable closing. | [TabsProps](https://ant.design/components/tabs/#Tabs) | - |

> fixedHeader uses antd's Affix implementation, listens to the body by default, if your scrollbar is not on the body you need to human [set](https://ant.design/components/affix/) it.

### FooterToolbar

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| extra | The extra content area, located to the right of content | `ReactNode` | - |
| children | content area | `ReactNode`\|`ReactNode[]` | - |

The FooterToolbar api is relatively simple, the main function is to implement automatic float control in the layout so that it does not block the menu. If you don't use ProLayout, you need to customize the width and float by style.

```tsx | pure
<FooterToolbar
  style={{
    left: 208,
    width: `calc(100% - 208px)`,
  }}
>
  <Button>Submit</Button>
</FooterToolbar>
```
