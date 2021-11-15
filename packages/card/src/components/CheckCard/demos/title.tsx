/** Uuid: e9c5486d title: 自定义标题 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { Tag } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

export default () => (
  <>
    <CheckCard
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AppstoreOutlined />
          <span style={{ marginRight: 8, marginLeft: 8 }}>示例</span>
          <Tag color="blue">blue</Tag>
        </div>
      }
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
    />
    <CheckCard
      title="标题内容过长会自动进行省略，标题内容过长会自动进行省略"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
    />
  </>
);
