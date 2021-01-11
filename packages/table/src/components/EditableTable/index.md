---
title: EditableProTable - 可编辑表格
group:
  path: /
nav:
  title: 组件
  path: /components
---

# EditableProTable - 可编辑表格

可编辑表格 EditableProTable 与 ProTable 的功能基本相同，为了方便使用 EditableProTable 增加了一些预设，关掉了查询表单和操作栏，同时修改了 value 和 onChange 使其可以方便的继承到 antd 的 Form 中。

## 代码演示

### 可编辑表格

<code src="./demos/basic.tsx" background="#f5f5f5" height="420px"/>

### 自定义可编辑表格

<code src="./demos/custom.tsx" background="#f5f5f5" height="420px"/>

## API

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 同 dataSource，传入一个数组,是 table 渲染的元数据 | `T[]` | `undefined` |
| onChange | dataSource 修改时触发，删除和修改都会触发,如果设置了 value，Table 会成为一个受控组件。 | `(value:T[])=>void` | `undefined` |
| recordCreatorProps | 新建一行数据的相关配置 | [RecordCreatorProps](#recordcreator) & [ButtonProps](https://ant.design/components/button-cn/#API) | - |
| maxLength | 最大的行数，到达最大行数新建按钮会自动消失 | number | - |

> 别的 API 与 ProTable 相同。
