import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';

export default () => (
    <div style={{ padding: 24 }}>

  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
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
      tabBarExtraContent="Test tabBarExtraContent"
      tabList={[
        {
          tab: 'Basic information',
          key: 'base',
          closable: false,
        },
        {
          tab: 'Detailed information',
          key: 'info',
        },
      ]}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
      footer={[
        <Button key="3">Reset</Button>,
        <Button key="2" type="primary">
          Submit
        </Button>,
      ]}
    >
      <ProCard direction="column" ghost gutter={[0, 16]}>
        <ProCard style={{ height: 200 }} />
        <ProCard gutter={16} ghost style={{ height: 200 }}>
          <ProCard colSpan={16} />
          <ProCard colSpan={8} />
        </ProCard>
      </ProCard>
    </PageContainer>
  </div>

    </div>
  );
