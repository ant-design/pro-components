import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ProCard } from '../../components';
import { Space } from 'antd';

export default () => {
  return (
    <Space>
      <ProCard
        title="Actions"
        style={{ maxWidth: 300 }}
        bordered
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>

      <ProCard
        title="Standalone Actions"
        style={{ maxWidth: 300 }}
        bordered
        actions={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              flex: 1,
              gap: 8,
            }}
          >
            <SettingOutlined key="setting" />
            Settings
          </div>
        }
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>

      <ProCard bordered title="No Actions" style={{ maxWidth: 300 }}>
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
    </Space>
  );
};
