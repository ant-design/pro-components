---
nav:
  title: Schema
group: Schema
title: Schema - 通用配置
atomId: Schema
---

# Schema - 通用配置

Schema 是一个通用的配置系统，用于定义和管理组件的配置结构。它提供了一种声明式的方式来描述界面结构，让您可以通过配置来生成表单、表格等组件。

- Schema 支持多种配置格式，包括 JSON Schema、ProForm 配置等
- 可以与 ProForm、ProTable 等组件无缝集成
- 支持动态配置和运行时修改

## 何时使用

- 需要统一管理多个组件的配置时
- 需要动态生成表单和表格时
- 需要实现配置驱动的界面时
- 需要支持运行时配置修改时


## API

### Schema 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 字段类型 | `string` | - |
| title | 字段标题 | `string` | - |
| description | 字段描述 | `string` | - |
| required | 是否必填 | `boolean` | false |
| default | 默认值 | `any` | - |
| properties | 子字段配置 | `object` | - |
| dependencies | 依赖关系 | `object` | - |

### 支持的类型

- `string`: 字符串类型
- `number`: 数字类型
- `boolean`: 布尔类型
- `array`: 数组类型
- `object`: 对象类型
- `date`: 日期类型
- `datetime`: 日期时间类型
- `time`: 时间类型
- `select`: 选择类型
- `radio`: 单选类型
- `checkbox`: 多选类型

## 设计规范

Schema 组件遵循配置即代码的设计理念，通过 JSON 配置来定义界面结构。它提供了一种声明式的方式来描述界面，让配置和代码分离，提高开发效率和可维护性。
