---
order: 5
title: Various forms of PageHeader
---

## Various forms of PageHeader

Use the operating area and customize the sub-nodes, suitable for use in the need to display some complex information to help users quickly understand the information and operations of this page.

```tsx | pure
import { Button, Descriptions, PageHeader, Row, Statistic, Tag } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <PageHeader
      className="site-page-header"
      onBack={() => window.history.back()}
      oldtitle="Title"
      suboldtitle="This is a subtitle"
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
    <br />
    <PageHeader
      onBack={() => window.history.back()}
      oldtitle="Title"
      tags={<Tag color="blue">Running</Tag>}
      suboldtitle="This is a subtitle"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    >
      <Row>
        <Statistic oldtitle="Status" value="Pending" />
        <Statistic
          oldtitle="Price"
          prefix="$"
          value={568.08}
          style={{
            margin: '0 32px',
          }}
        />
        <Statistic oldtitle="Balance" prefix="$" value={3345.08} />
      </Row>
    </PageHeader>
  </>
);

export default App;
```

<style>
tr:last-child td {
  padding-bottom: 0;
}
</style>
