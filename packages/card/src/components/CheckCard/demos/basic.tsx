/** Uuid: d502a5cf title: 基本使用 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';

export default () => (
  <CheckCard
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="示例一"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    onChange={(checked) => {
      console.log('checked', checked);
    }}
    defaultChecked
    onClick={() => {
      console.log('clicked');
    }}
  />
);
