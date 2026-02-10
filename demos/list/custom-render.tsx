import { ProList } from '@ant-design/pro-components';
import { Avatar, theme } from 'antd';

const APPLICATIONS = [
  {
    id: '1',
    title: '帆软 SSO',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    description:
      'FineReport 是一款用于报表制作、分析和展示的软件，支持数据填报与可视化大屏。',
  },
  {
    id: '2',
    title: '泛微 E9 SSO',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    description:
      '泛微 E9 是一款成熟的协同办公软件，以流程管理、知识管理为核心。',
  },
  {
    id: '3',
    title: '销售易',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    description:
      'SAML (Security Assertion Markup Language) 是一种用于身份认证与授权的标准协议。',
  },
];

type AppItem = (typeof APPLICATIONS)[0];

export default () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        backgroundColor: token.colorBgLayout,
        margin: -24,
        padding: 64,
      }}
    >
      <ProList<AppItem>
        rowKey="id"
        grid={{ gutter: 16, column: 3 }}
        pagination={false}
        columns={[
          { dataIndex: 'title', listSlot: 'title' },
          { dataIndex: 'avatar', listSlot: 'avatar' },
          { dataIndex: 'description', listSlot: 'description' },
        ]}
        dataSource={APPLICATIONS}
        toolbar={{
          menu: {
            type: 'tab',
            items: [
              { key: 'all', label: '全部应用' },
              { key: 'dev', label: '开发类' },
              { key: 'ops', label: '运维类' },
              { key: 'office', label: '办公类' },
            ],
          },
        }}
        itemRender={(item) => (
          <div
            style={{
              width: '100%',
              minWidth: 0,
              boxSizing: 'border-box',
              borderRadius: 8,
              padding: 24,
              height: '100%',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              background: token.colorBgContainer,
            }}
            tabIndex={0}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <Avatar
                src={item.avatar}
                shape="square"
                size={48}
                style={{ flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    color: token.colorTextSecondary,
                    fontSize: 14,
                    lineHeight: 1.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};
