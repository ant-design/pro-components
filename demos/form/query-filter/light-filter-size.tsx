import { LightFilter } from '@ant-design/pro-components';
import { Radio } from 'antd';
import { useState } from 'react';

export default () => {
  const [size, setSize] = useState<'middle' | 'small'>('middle');

  return (
    <div>
      <Radio.Group
        value={size}
        onChange={(event) => setSize(event.target.value)}
      >
        <Radio.Button value="middle">默认</Radio.Button>
        <Radio.Button value="small">小尺寸</Radio.Button>
      </Radio.Group>
      <div style={{ marginTop: 16 }}>
        <LightFilter size={size} initialValues={{ keyword: '订单' }}>
          <LightFilter.input name="keyword" label="关键词" />
        </LightFilter>
      </div>
    </div>
  );
};
