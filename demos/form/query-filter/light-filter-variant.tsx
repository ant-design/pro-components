import { LightFilter } from '@ant-design/pro-components';
import { Radio } from 'antd';
import { useState } from 'react';

type Variant = 'borderless' | 'outlined' | 'filled';

export default () => {
  const [variant, setVariant] = useState<Variant>('borderless');

  return (
    <div>
      <Radio.Group
        value={variant}
        onChange={(event) => setVariant(event.target.value)}
      >
        <Radio.Button value="borderless">无边框</Radio.Button>
        <Radio.Button value="outlined">线框</Radio.Button>
        <Radio.Button value="filled">填充</Radio.Button>
      </Radio.Group>
      <div style={{ marginTop: 16 }}>
        <LightFilter variant={variant} initialValues={{ keyword: '订单' }}>
          <LightFilter.input name="keyword" label="关键词" />
        </LightFilter>
      </div>
    </div>
  );
};
