import { UserOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Avatar } from 'antd';

export default () => (
  <CheckCard
    title="示例标题"
    avatar={
      <Avatar
        style={{ backgroundColor: '#7265e6' }}
        icon={<UserOutlined />}
        size="large"
      />
    }
  />
);
