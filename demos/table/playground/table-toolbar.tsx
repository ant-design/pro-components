import { ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { columns, rows } from './data';

export default () => (
  <ProTable
    rowKey="id"
    dataSource={rows}
    columns={columns}
    search={false}
    options={false}
    pagination={false}
    toolBarRender={() => [
      <Button key="export" onClick={() => message.info('导出服务列表')}>
        导出
      </Button>,
    ]}
  />
);
