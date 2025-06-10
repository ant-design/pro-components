import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';

export default () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      token={{
        paddingBlockPageContainerContent: 24,
        paddingInlinePageContainerContent: 60,
      }}
      header={{
        title: 'Page Title',
        ghost: true,
        breadcrumb: {
          items: [
            {
              path: '',
              title: 'Primary page',
            },
            {
              path: '',
              title: 'Secondary page',
            },
            {
              path: '',
              title: 'Current page',
            },
          ],
        },
        extra: [
          <Button key="1">Secondary button</Button>,
          <Button key="2">Secondary button</Button>,
          <Button key="3" type="primary">
            Primary button
          </Button>,
          <Dropdown
            key="dropdown"
            trigger={['click']}
            menu={{
              items: [
                {
                  label: 'Dropdown menu',
                  key: '1',
                },
                {
                  label: 'Dropdown menu 2',
                  key: '2',
                },
                {
                  label: 'Dropdown menu 3',
                  key: '3',
                },
              ],
            }}
          >
            <Button key="4" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ],
      }}
    >
      <ProTable search={false} />
    </PageContainer>
  </div>
);
