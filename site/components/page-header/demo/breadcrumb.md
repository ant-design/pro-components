---
group: PageHeader
order: 3
title: 带面包屑页头
---

## 带面包屑页头

带面包屑页头，适合层级比较深的页面，让用户可以快速导航。

```tsx
import { PageHeader } from '@ant-design/pro-components';
import React from 'react';

const items = [
  {
    path: 'index',
    title: 'First-level Menu',
  },
  {
    path: 'first',
    title: 'Second-level Menu',
  },
  {
    path: 'second',
    title: 'Third-level Menu',
  },
];

const App: React.FC = () => (
  <PageHeader
    className="site-page-header"
    title="Title"
    breadcrumb={{ items }}
    subTitle="This is a subtitle"
  />
);

export default App;
```
