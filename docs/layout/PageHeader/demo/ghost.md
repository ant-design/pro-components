---
order: 2
title: 白底模式
---

## 白底模式

默认 PageHeader 是透明底色的。在某些情况下，PageHeader 需要自己的背景颜色。

```tsx | pure
import { Button, Descriptions, PageHeader } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Title"
      subTitle="This is a subtitle"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="Association">
          <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="Remarks">
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  </div>
);

export default App;
```

```css
.site-page-header-ghost-wrapper {
  padding: 24px;
  background-color: hsl(220, 23%, 97%);
}
```
