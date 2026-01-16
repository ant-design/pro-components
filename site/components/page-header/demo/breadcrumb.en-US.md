---
group: PageHeader
order: 3
title: Use with breadcrumbs
---

## Use with breadcrumbs

With breadcrumbs, it is suitable for deeper pages, allowing users to navigate quickly.

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
