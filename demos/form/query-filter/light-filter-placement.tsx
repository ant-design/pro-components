import { LightFilter } from '@ant-design/pro-components';
import { Radio } from 'antd';
import { useState } from 'react';

type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export default () => {
  const [placement, setPlacement] = useState<Placement>('bottomLeft');

  return (
    <div style={{ minHeight: 280, paddingTop: 100 }}>
      <Radio.Group
        value={placement}
        onChange={(event) => setPlacement(event.target.value)}
      >
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <div style={{ marginTop: 16 }}>
        <LightFilter placement={placement} initialValues={{ keyword: '订单' }}>
          <LightFilter.input name="keyword" label="关键词" />
        </LightFilter>
      </div>
    </div>
  );
};
