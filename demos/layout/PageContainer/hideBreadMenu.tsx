import { PageContainer, ProCard } from '@xxlabs/pro-components';
import { Descriptions } from 'antd';

export default () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      ghost
      content={
        <Descriptions column={2} style={{ marginBlockEnd: -16 }}>
          <Descriptions.Item label="Creator">曲丽丽</Descriptions.Item>
          <Descriptions.Item label="Associated form">
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Date">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Document remarks">浙江省杭州市西湖区工专路</Descriptions.Item>
        </Descriptions>
      }
      header={{
        title: 'Page Title',
        breadcrumb: {},
      }}
    >
      <ProCard ghost direction="column" gutter={[0, 16]}>
        <ProCard style={{ height: 200 }} />
        <ProCard ghost gutter={16} style={{ height: 200 }}>
          <ProCard colSpan={16} />
          <ProCard colSpan={8} />
        </ProCard>
      </ProCard>
    </PageContainer>
  </div>
);
