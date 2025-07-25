---
title: 文档编写指南
order: 100
nav:
  title: 文档
  order: 100
  path: /docs
  icon: file
---

# 文档编写指南

## 文档结构规范

### 1. 组件文档结构

每个组件文档应包含以下内容：

````markdown
# 组件名称

## 何时使用

描述组件的使用场景和适用情况。

## 代码演示

### 基础用法

```tsx
import { ComponentName } from '@ant-design/pro-components';

export default () => {
  return <ComponentName />;
};
```
````

### 进阶用法

更多使用示例...

## API

| 参数  | 说明     | 类型      | 默认值  |
| ----- | -------- | --------- | ------- |
| prop1 | 属性说明 | `string`  | -       |
| prop2 | 属性说明 | `boolean` | `false` |

## 设计规范

组件的设计原则和使用建议。

````

### 2. 文件命名规范

- 中文文档：`index.md`
- 英文文档：`index.en-US.md`
- 子组件文档：`SubComponent.md` 和 `SubComponent.en-US.md`

### 3. 多语言支持

所有文档都应提供中英文版本，保持内容同步。

## 代码演示规范

### 1. 演示代码格式

```tsx
import React from 'react';
import { ComponentName } from '@ant-design/pro-components';

export default () => {
  return (
    <ComponentName>
      内容
    </ComponentName>
  );
};
````

### 2. 演示文件位置

示例代码应放在 `demos/` 目录下，按组件分类：

```
demos/
├── card/
│   ├── basic.tsx
│   └── advanced.tsx
├── form/
│   ├── basic.tsx
│   └── complex.tsx
└── table/
    ├── basic.tsx
    └── search.tsx
```

## 内容编写建议

### 1. 标题层级

- 使用 `#` 作为页面主标题
- 使用 `##` 作为主要章节标题
- 使用 `###` 作为子章节标题
- 避免使用超过 4 级的标题

### 2. 代码块

- 使用 ```tsx 标记 TypeScript React 代码
- 使用 ```bash 标记命令行代码
- 使用 ```json 标记 JSON 数据

### 3. 链接和引用

- 内部链接使用相对路径：`/components/card`
- 外部链接使用完整 URL
- 引用其他文档时使用 Markdown 链接语法

### 4. 图片和资源

- 图片放在 `public/` 目录下
- 使用相对路径引用：`/images/example.png`
- 为图片添加 alt 属性

## 维护建议

### 1. 定期更新

- 随组件更新同步更新文档
- 检查示例代码是否仍然有效
- 更新 API 文档中的类型定义

### 2. 质量检查

- 确保所有链接有效
- 验证示例代码可以正常运行
- 检查多语言版本的一致性

### 3. 用户反馈

- 关注用户对文档的反馈
- 根据用户需求优化文档结构
- 及时修复文档中的错误

## 工具和资源

- [dumi 官方文档](https://d.umijs.org/)
- [Ant Design 设计规范](https://ant.design/docs/spec/introduce-cn)
- [Markdown 语法指南](https://www.markdownguide.org/)
