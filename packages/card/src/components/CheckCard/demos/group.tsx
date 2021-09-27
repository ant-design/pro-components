/** Uuid: 483166e2 title: 选项列表 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';

export default () => (
  <div style={{ padding: 24, backgroundColor: '#F0F2F5' }}>
    <CheckCard.Group size="small" options={['🍎 Apple', '🍐 Pear', '🍊 Orange']} />
  </div>
);
