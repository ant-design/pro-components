import React, { useState } from 'react';
import { Radio } from 'antd';
import ProSkeleton from '../src/index';

export default () => {
  const [type, setType] = useState<string>('list');
  return (
    <div
      style={{
        background: '#fafafa',
        padding: 24,
      }}
    >
      <Radio.Group onChange={(e) => setType(e.target.value)} value={type}>
        <Radio value="list">列表页</Radio>
        <Radio value="result">结果页</Radio>
        <Radio value="descriptions">详情页</Radio>
      </Radio.Group>
      <ProSkeleton type={type as 'list'} />
    </div>
  );
};
