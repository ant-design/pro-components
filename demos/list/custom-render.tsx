import { ProList } from '@ant-design/pro-components';
import { Avatar, theme } from 'antd';

type App = { id: number; name: string; description: string };
const apps: App[] = [
  { id: 1, name: '报表中心', description: '查看业务报表与趋势' },
  { id: 2, name: '流程中心', description: '审批和追踪业务流程' },
];

export default () => {
  const { token } = theme.useToken();

  return (
    <ProList<App>
      rowKey="id"
      dataSource={apps}
      grid={{ xs: 1, sm: 2, gutter: 16 }}
      itemRender={(item) => (
        <div
          style={{
            display: 'flex',
            gap: 12,
            width: '100%',
            minWidth: 0,
            padding: 16,
            borderRadius: 8,
            background: token.colorBgContainer,
            border: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Avatar>{item.name[0]}</Avatar>
          <div style={{ minWidth: 0 }}>
            <strong>{item.name}</strong>
            <div>{item.description}</div>
          </div>
        </div>
      )}
    />
  );
};
