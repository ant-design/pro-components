import { ProTable } from '@ant-design/pro-components';
import { Menu } from 'antd';
import { useState } from 'react';

type Service = { id: number; name: string; status: string };
const services: Service[] = [
  { id: 1, name: '用户认证', status: '运行中' },
  { id: 2, name: '支付网关', status: '维护中' },
];

export default () => {
  const [selected, setSelected] = useState('all');

  return (
    <div style={{ maxWidth: '100%', padding: 16 }}>
      <ProTable<Service>
        rowKey="id"
        columns={[
          { title: '服务', dataIndex: 'name' },
          { title: '状态', dataIndex: 'status' },
        ]}
        params={{ selected }}
        request={async ({ selected: filter }) => ({
          data: services.filter(
            (service) => filter === 'all' || String(service.id) === filter,
          ),
          success: true,
        })}
        search={false}
        options={false}
        pagination={false}
        scroll={{ x: 400 }}
        toolBarRender={false}
        tableRender={(_, table) => (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Menu
              style={{ width: 160, maxWidth: '100%' }}
              selectedKeys={[selected]}
              onSelect={({ key }) => setSelected(key)}
              items={[
                { key: 'all', label: '全部服务' },
                { key: '1', label: '用户认证' },
                { key: '2', label: '支付网关' },
              ]}
            />
            <div style={{ flex: '1 1 320px', minWidth: 0 }}>{table}</div>
          </div>
        )}
      />
    </div>
  );
};
