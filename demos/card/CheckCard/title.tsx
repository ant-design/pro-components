import { AppstoreOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Tag } from 'antd';

export default () => (
  <>
    <CheckCard
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AppstoreOutlined />
          <span style={{ marginInlineEnd: 8, marginInlineStart: 8 }}>示例</span>
          <Tag color="blue">blue</Tag>
        </div>
      }
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
    />
    <CheckCard
      title="标题内容过长会自动进行省略，标题内容过长会自动进行省略"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
    />
  </>
);
