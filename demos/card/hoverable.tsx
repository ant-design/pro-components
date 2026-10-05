import { ProCard } from '@ant-design/pro-components';
import { Card, ConfigProvider, Space } from 'antd';

const cardStyle = { width: 300 };

const Demo = () => (
  <ConfigProvider theme={{ cssVar: {} }}>
    <Space align="start" size={16} wrap>
      <Card
        title="antd Card"
        extra={<a>更多</a>}
        hoverable
        style={cardStyle}
        variant="outlined"
      >
        使用 antd Card 的 hover 阴影与 token。
      </Card>
      <ProCard
        title="ProCard"
        extra={<a>更多</a>}
        hoverable
        style={cardStyle}
        variant="outlined"
      >
        基础路径复用同一套 Card 样式管线。
      </ProCard>
    </Space>
  </ConfigProvider>
);

export default Demo;
