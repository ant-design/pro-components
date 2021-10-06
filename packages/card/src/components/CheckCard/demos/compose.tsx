/** Uuid: 2c9c6174 title: 组合样式 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';

export default () => (
  <>
    <h3>只有图片时</h3>
    <CheckCard avatar="https://gw.alipayobjects.com/os/antfincdn/fShLCJe7uZ/f31dc3f7-cdc0-42ac-a075-f173fe5d5043.webarchive" />

    <h3>只有图片和描述时</h3>
    <CheckCard
      avatar="https://gw.alipayobjects.com/os/antfincdn/fShLCJe7uZ/f31dc3f7-cdc0-42ac-a075-f173fe5d5043.webarchive"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    />
    <h3>只有标题和描述时</h3>
    <CheckCard
      title="示例"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    />
    <h3>只有标题和图片</h3>
    <CheckCard
      title="示例"
      avatar="https://gw.alipayobjects.com/os/antfincdn/fShLCJe7uZ/f31dc3f7-cdc0-42ac-a075-f173fe5d5043.webarchive"
    />
    <h3>只有标题</h3>
    <CheckCard title="示例" />
    <h3>只有描述时</h3>
    <CheckCard description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。" />
  </>
);
