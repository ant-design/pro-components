import React from 'react';
import { Tabs } from 'antd';
import ProCard from '@ant-design/pro-card';

const { TabPane } = Tabs;

export default () => {
  return (
    <ProCard bordered>
      <Tabs>
        <TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </ProCard>
  );
};
