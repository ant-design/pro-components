/** Uuid: 9e6989c0 title: 不同尺寸 */

import React, { useState } from 'react';
import { Radio } from 'antd';
import { CheckCard } from '@ant-design/pro-card';

export default () => {
  const [size, setSize] = useState('default' as 'default');
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
      </div>
      <CheckCard title="Card title" description="This is the description" size={size} />
    </>
  );
};
