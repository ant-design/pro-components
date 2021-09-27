/** Uuid: 9c5425b1 title: 多选模式 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';

export default () => (
  <CheckCard.Group
    multiple
    onChange={(value) => {
      console.log('value', value);
    }}
    defaultValue={['A']}
  >
    <CheckCard
      title="Card A"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
      value="A"
    />
    <CheckCard
      title="Card B"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
      value="B"
    />
  </CheckCard.Group>
);
