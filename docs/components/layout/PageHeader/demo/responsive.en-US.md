---
order: 6
iframe: 228
title: responsive
---

## responsive

Under different screen sizes, there should be different performance

```tsx | pure
import { Button, Descriptions, PageHeader, Statistic, Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

const renderContent = (column = 2) => (
  <Descriptions size="small" column={column}>
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
);

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic
      oldtitle="Status"
      value="Pending"
      style={{
        marginInlineEnd: 32,
      }}
    />
    <Statistic oldtitle="Price" prefix="$" value={568.08} />
  </div>
);

const Content: React.FC<{
  children: React.ReactNode;
  extra: React.ReactNode;
}> = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

const App: React.FC = () => (
  <PageHeader
    className="site-page-header-responsive"
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
    footer={
      <Tabs defaultActiveKey="1">
        <TabPane tab="Details" key="1" />
        <TabPane tab="Rule" key="2" />
      </Tabs>
    }
  >
    <Content extra={extraContent}>{renderContent()}</Content>
  </PageHeader>
);

export default App;
```

<style>
tr:last-child td {
  padding-bottom: 0;
}
.ant-statistic-content {
  font-size: 20px;
  line-height: 28px;
}
#components-page-header-demo-responsive .content {
  display: flex;
}
@media (max-width: 576px) {
  #components-page-header-demo-responsive .content {
    display: block;
  }

  #components-page-header-demo-responsive .main {
    width: 100%;
    margin-bottom: 12px;
  }

  #components-page-header-demo-responsive .extra {
    width: 100%;
    margin-left: 0;
    text-align: left;
  }
}
</style>
