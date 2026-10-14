import { ProFormSelect, QueryFilter } from '@ant-design/pro-components';
import { message } from 'antd';

export default () => (
  <QueryFilter
    onFinish={async ({ status }) => {
      message.info(`筛选状态：${status || '全部'}`);
    }}
  >
    <ProFormSelect
      name="status"
      label="服务状态"
      valueEnum={{ running: '运行中', closed: '已关闭' }}
    />
  </QueryFilter>
);
