/** Uuid: d502a5cf title: 基本使用 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';

export default () => (
  <CheckCard
    avatar="https://gw-office.alipayobjects.com/basement_prod/f31dc3f7-cdc0-42ac-a075-f173fe5d5043.svg"
    title="示例一"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    onChange={(checked) => {
      console.log('checked', checked);
    }}
    onClick={() => {
      console.log('clicked');
    }}
  />
);
