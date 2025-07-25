---
nav:
  title: Schema
group: Schema
title: Schema - Universal Configuration
atomId: Schema
---

# Schema - Universal Configuration

Schema is a universal configuration system for defining and managing component configuration structures. It provides a declarative way to describe interface structures, allowing you to generate forms, tables, and other components through configuration.

- Schema supports multiple configuration formats, including JSON Schema, ProForm configuration, etc.
- Can be seamlessly integrated with components like ProForm, ProTable, etc.
- Supports dynamic configuration and runtime modifications

## When to Use

- When you need to unify the management of multiple component configurations
- When you need to dynamically generate forms and tables
- When you need to implement configuration-driven interfaces
- When you need to support runtime configuration modifications

## API

### Schema Configuration

| Parameter    | Description              | Type      | Default |
| ------------ | ------------------------ | --------- | ------- |
| type         | Field type               | `string`  | -       |
| title        | Field title              | `string`  | -       |
| description  | Field description        | `string`  | -       |
| required     | Whether required         | `boolean` | false   |
| default      | Default value            | `any`     | -       |
| properties   | Sub-field configuration  | `object`  | -       |
| dependencies | Dependency relationships | `object`  | -       |

### Supported Types

- `string`: String type
- `number`: Number type
- `boolean`: Boolean type
- `array`: Array type
- `object`: Object type
- `date`: Date type
- `datetime`: Date time type
- `time`: Time type
- `select`: Select type
- `radio`: Radio type
- `checkbox`: Checkbox type

## Design Guidelines

Schema component follows the design philosophy of configuration as code, defining interface structures through JSON configuration. It provides a declarative way to describe interfaces, separating configuration from code, improving development efficiency and maintainability.
