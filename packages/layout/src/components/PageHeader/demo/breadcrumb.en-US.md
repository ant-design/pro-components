---
order: 3
title: Use with breadcrumbs
---

## Use with breadcrumbs

With breadcrumbs, it is suitable for deeper pages, allowing users to navigate quickly.

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
    oldtitle="Title"
    breadcrumb={{ routes }}
    suboldtitle="This is a subtitle"
  />
);

export default App;
```
