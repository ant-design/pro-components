---
title: Documentation Writing Guide
order: 100
nav:
  title: Documentation
  order: 100
  path: /docs
  icon: file
---

# Documentation Writing Guide

## Documentation Structure Standards

### 1. Component Documentation Structure

Each component documentation should include the following content:

````markdown
# Component Name

## When to Use

Describe the usage scenarios and applicable situations for the component.

## Code Examples

### Basic Usage

```tsx
import { ComponentName } from '@ant-design/pro-components';

export default () => {
  return <ComponentName />;
};
```
````

### Advanced Usage

More usage examples...

## API

| Parameter | Description          | Type      | Default |
| --------- | -------------------- | --------- | ------- |
| prop1     | Property description | `string`  | -       |
| prop2     | Property description | `boolean` | `false` |

## Design Guidelines

Design principles and usage recommendations for the component.

````

### 2. File Naming Standards

- Chinese documentation: `index.md`
- English documentation: `index.en-US.md`
- Sub-component documentation: `SubComponent.md` and `SubComponent.en-US.md`

### 3. Multi-language Support

All documentation should provide both Chinese and English versions, keeping content synchronized.

## Code Example Standards

### 1. Example Code Format

```tsx
import React from 'react';
import { ComponentName } from '@ant-design/pro-components';

export default () => {
  return (
    <ComponentName>
      Content
    </ComponentName>
  );
};
````

### 2. Example File Location

Example code should be placed in the `demos/` directory, organized by component:

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

## Content Writing Guidelines

### 1. Heading Hierarchy

- Use `#` for page main titles
- Use `##` for main chapter titles
- Use `###` for sub-chapter titles
- Avoid using more than 4 levels of headings

### 2. Code Blocks

- Use ```tsx for TypeScript React code
- Use ```bash for command line code
- Use ```json for JSON data

### 3. Links and References

- Use relative paths for internal links: `/components/card`
- Use complete URLs for external links
- Use Markdown link syntax when referencing other documentation

### 4. Images and Resources

- Place images in the `public/` directory
- Use relative paths for references: `/images/example.png`
- Add alt attributes to images

## Maintenance Guidelines

### 1. Regular Updates

- Synchronize documentation updates with component updates
- Check if example code is still valid
- Update type definitions in API documentation

### 2. Quality Checks

- Ensure all links are valid
- Verify that example code can run normally
- Check consistency between multi-language versions

### 3. User Feedback

- Pay attention to user feedback on documentation
- Optimize documentation structure based on user needs
- Fix errors in documentation promptly

## Tools and Resources

- [dumi Official Documentation](https://d.umijs.org/)
- [Ant Design Design Guidelines](https://ant.design/docs/spec/introduce-cn)
- [Markdown Syntax Guide](https://www.markdownguide.org/)
