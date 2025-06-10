---
order: 3
title: 带面包屑页头
---

## 带面包屑页头

带面包屑页头，适合层级比较深的页面，让用户可以快速导航。

```tsx | pure
import { PageHeader } from 'antd';
import React from 'react';

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];

const App: React.FC = () => (
  <PageHeader
    className="site-page-header"
    title="Title"
    breadcrumb={{ routes }}
    subTitle="This is a subtitle"
  />
);

export default App;
```
