import { CheckCard } from '@ant-design/pro-components';
import { Radio } from 'antd';
import { useState } from 'react';

const Demo = () => {
  const [size, setSize] = useState('default' as const);
  return (
    <>
      <div style={{ marginBlockEnd: 16 }}>
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
      </div>
      <CheckCard
        title="Card title"
        description="This is the description"
        size={size}
      />

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>CheckCard Size Props 说明：</h4>
        <ul>
          <li>
            <strong>size</strong>: 卡片尺寸，可选值：'large' | 'default' |
            'small'
          </li>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>description</strong>: 卡片描述信息
          </li>
        </ul>
        <h4>Size 尺寸说明：</h4>
        <ul>
          <li>
            <strong>large</strong>: 大尺寸，适合重要内容的展示
          </li>
          <li>
            <strong>default</strong>: 默认尺寸，最常用的尺寸
          </li>
          <li>
            <strong>small</strong>: 小尺寸，适合紧凑布局
          </li>
        </ul>
        <h4>动态切换：</h4>
        <ul>
          <li>
            <strong>Radio.Group</strong>: 使用单选按钮组来动态切换 size 属性
          </li>
          <li>
            <strong>useState</strong>: 使用 React Hook 管理 size 状态
          </li>
        </ul>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
