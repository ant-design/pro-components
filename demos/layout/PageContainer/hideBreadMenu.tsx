import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Descriptions } from 'antd';

const Demo = () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      ghost
      header={{
        title: 'Page Title',
        breadcrumb: {},
      }}
      content={
        <Descriptions column={2} style={{ marginBlockEnd: -16 }}>
          <Descriptions.Item label="Creator">曲丽丽</Descriptions.Item>
          <Descriptions.Item label="Associated form">
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Date">
            2017-01-10
          </Descriptions.Item>
          <Descriptions.Item label="Document remarks">
            浙江省杭州市西湖区工专路
          </Descriptions.Item>
        </Descriptions>
      }
    >
      <ProCard direction="column" ghost gutter={[0, 16]}>
        <ProCard style={{ height: 200 }} />
        <ProCard gutter={16} ghost style={{ height: 200 }}>
          <ProCard colSpan={16} />
          <ProCard colSpan={8} />
        </ProCard>
      </ProCard>
    </PageContainer>
  </div>
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
