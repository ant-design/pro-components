import { ProCard, ProTable } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { useState } from 'react';

type Server = { ip: string; status: string };
type Log = { id: number; event: string };

const servers: Server[] = [
  { ip: '10.0.1.100', status: '正常' },
  { ip: '10.0.1.111', status: '维护中' },
];

export default () => {
  const [small, setSmall] = useState(false);
  const [ip, setIp] = useState(servers[0].ip);

  return (
    <RcResizeObserver onResize={({ width }) => setSmall(width < 600)}>
      <div style={{ width: '100%' }}>
        <ProCard split={small ? 'horizontal' : 'vertical'}>
          <ProCard colSpan={small ? '100%' : '40%'}>
            <ProTable<Server>
              rowKey="ip"
              dataSource={servers}
              columns={[
                { title: '服务器 IP', dataIndex: 'ip' },
                { title: '状态', dataIndex: 'status' },
              ]}
              search={false}
              pagination={false}
              options={false}
              onRow={(row) => ({ onClick: () => setIp(row.ip) })}
            />
          </ProCard>
          <ProCard title={`当前服务器：${ip}`}>
            <ProTable<Log>
              rowKey="id"
              dataSource={[{ id: 1, event: `${ip} 健康检查通过` }]}
              columns={[{ title: '最近事件', dataIndex: 'event' }]}
              search={false}
              pagination={false}
              options={false}
            />
          </ProCard>
        </ProCard>
      </div>
    </RcResizeObserver>
  );
};
