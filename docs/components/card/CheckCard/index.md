---
title: CheckCard - 多选卡片
order: 1
atomId: CheckCard
---

# CheckCard 多选卡片

集合多种相关联说明信息，并且可被选择的卡片。特点：

- ① 可容纳多种相关联说明信息，如标题、描述、图片、标签等
- ② 有明显边界
- ③ 有明显选中态

## 何时使用

- 需要展示被选择对象的多种说明信息时
- 被选择对象的数量不多时

## 代码演示

### 基本使用

最常用的选项卡示例，包括头像，标题，描述等部分，可被选择。

<code src="./demos/basic.tsx" ></code>

<code src="./demos/single.tsx"  description="在多个选项存在的情况下可通过 `CheckCard.Group` 分组，默认选项卡组件为单选模式。" thumbnail="https://gw.alipayobjects.com/zos/bmw-prod/be0fcade-afae-4e85-95ef-a3cc90f6d4b3/kc60kq47_w1362_h412.jpeg" ></code>

<code src="./demos/multiple.tsx"  thumbnail="https://gw.alipayobjects.com/zos/bmw-prod/06963ad4-ba2b-4733-a1c5-778e7f696ac1/kc61xhvk_w1364_h280.jpeg" description="通过设置 `CheckCard.Group` 的 `multiple` 属性配置多选，注意多选模式下表单项返回值为数组。"></code>

### 不同尺寸

配置 `size` 尺寸大小，当前可选 `large`，`default`，`small`，不同尺寸仅宽度不同。

<code src="./demos/size.tsx" ></code>

当然你也可以通过 `style` 或 `className` 自定义卡片大小。

### 自定义尺寸

<code src="./demos/custom.tsx" ></code>

### 表单中使用

CheckCard 可以和表单组件一起使用，这里给出演示示例。

<code src="./demos/form.tsx" oldtitle="多选卡片 - 表单中使用" thumbnail="https://gw.alipayobjects.com/zos/bmw-prod/c8fa2080-5a46-4f50-ae99-846b1804f56d/kc62b0ug_w1360_h656.jpeg" ></code>

### 组合样式

头像，标题，描述区域可以自由组合或者单独呈现，组件会为你调整为最合适的对齐方式。

<code src="./demos/compose.tsx" ></code>

### 自定义头像

你可以通过 `avatar` 属性自定义头像区域。

<code src="./demos/avatar.tsx" ></code>

### 自定义标题

你可以通过 `title` 属性自定义标题区域。

<code src="./demos/title.tsx" ></code>

### 自定义描述

描述区域可通过 `description` 自定义 React 节点。

<code src="./demos/description.tsx" ></code>

### 默认选中

通过配置 `defaultChecked` 属性为 `true` 来配置选项默认被选中。

<code src="./demos/defaultChecked.tsx" ></code>

### 操作栏

配置 `extra` 为卡片添加操作栏。

<code src="./demos/extra.tsx" ></code>

### 组件 Loading

通过配置 `loading` 属性为 `true` 来配置内容在加载中。

<code src="./demos/loading.tsx" ></code>

### 纯图片选项

通过仅仅配置 `cover` 属性可以让你的选项成为一个纯图片选项。

<code src="./demos/image.tsx" ></code>

### 选项不可用

通过配置 `disabled` 属性配置选项不可用。

<code src="./demos/disabled.tsx" ></code>

### 选项列表

`CheckCard.Group` 支持通过 `options` 属性配置化来列表展示多个选项。

<code src="./demos/group.tsx" ></code>

### 应用列表示例

这里展示在实际 AiDesk 中图像算法选择的使用示例。

<code src="./demos/list.tsx" ></code>

### 布局

`CheckCard.Group` 内嵌 `CheckCard` 并与 `Grid` 组件一起使用，可以实现更灵活的布局。

<code src="./demos/grid.tsx" ></code>

## API

### CheckCard

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| checked | 指定当前是否选中 | boolean | false |  |
| bordered | 是否显示边框 | boolean | true | 1.20.0 |
| value | 选项值 | string | - |  |
| defaultChecked | 初始是否选中 | boolean | false |  |
| disabled | 失效状态 | boolean | false |  |
| size | 选择框大小，可选 `large` `small` | string | `default` |  |
| onChange | 变化时回调函数 | Function(checked) | - |  |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean | false |  |
| title | 标题 | string \| ReactNode | - |  |
| description | 描述 | ReactNode | - |  |
| avatar | 选项元素的图片地址 | link \| ReactNode | - |  |
| extra | 动作区域 | 卡片右上角的操作区域 | - |  |
| cover | 卡片背景图片，注意使用该选项后`title`，`description`和`avatar`失效 | ReactNode | - |  |

### CheckCard.Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| multiple | 多选 | boolean | false |  |
| bordered | 是否显示边框 | boolean | true | 1.20.0 |
| defaultValue | 默认选中的选项 | string \| string\[] | - |  |
| disabled | 整组失效 | boolean | false |  |
| loading | 当卡片组内容还在加载中时，可以用 loading 展示一个占位 | boolean | false |  |
| options | 指定可选项 | string\[] \| Array<{ title: ReactNode, value: string, description?: ReactNode, avatar?: link or ReactNode, cover?:ReactNode, disabled?: boolean }> | \[] |  |
| value | 指定选中的选项 | string \| string\[] | - |  |
| size | 选择框大小，可选 `large` `small` | string | `default` |  |
| onChange | 变化时回调函数 | Function(checkedValue) | - |  |
