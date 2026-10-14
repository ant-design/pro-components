import { LightFilter, ProFormSelect } from '@ant-design/pro-components';
import { message } from 'antd';

export default () => (
  <LightFilter
    onFinish={async ({ status }) => {
      message.info(`筛选状态：${status || '全部'}`);
    }}
  >
    <ProFormSelect
      name="status"
      label="服务状态"
      valueEnum={{ running: '运行中', closed: '已关闭' }}
      fieldProps={{ style: { width: 120 } }}
    />
  </LightFilter>
);
