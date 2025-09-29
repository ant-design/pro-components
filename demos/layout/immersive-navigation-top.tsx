import { CrownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@xxlabs/pro-components';
import { Button, Input, Result, Tag } from 'antd';
import { useState } from 'react';

const defaultProps = {
  routes: [
    {
      path: '/welcome',
      name: '欢迎',
      icon: <CrownOutlined />,
      component: './Welcome',
    },
    {
      path: '/admin/sub-page2',
      name: '二级页面',
      icon: <UserOutlined />,
      component: './Welcome',
    },
    {
      path: '/admin/sub-page3',
      name: '三级页面',
      icon: <SmileOutlined />,
      component: './Welcome',
    },
  ],
};

export default () => {
  const [pathname, setPathname] = useState('/welcome');
  return (
    <>
      <ProLayout
        fixSiderbar
        avatarProps={{
          icon: <UserOutlined />,
        }}
        headerRender={false}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        route={defaultProps}
        onMenuHeaderClick={(e) => console.log(e)}
      >
        <PageContainer
          extra={[
            <Input.Search
              key="search"
              style={{
                width: 240,
              }}
            />,
            <Button key="3">操作一</Button>,
            <Button key="2" type="primary">
              操作一
            </Button>,
          ]}
          header={{
            style: {
              padding: '8px 16px',
              backgroundColor: '#fff',
              position: 'fixed',
              top: 0,
              width: '100%',
              left: 0,
              zIndex: 999,
              boxShadow: '0 2px 8px #f0f1f2',
            },
          }}
          style={{
            paddingBlockStart: 48,
          }}
          tags={<Tag color="blue">状态一</Tag>}
          onBack={() => null}
        >
          <div
            style={{
              height: '120vh',
              minHeight: 600,
            }}
          >
            <Result
              extra={<Button type="primary">Back Home</Button>}
              status="404"
              style={{
                height: '100%',
                background: '#fff',
              }}
              subTitle="Sorry, you are not authorized to access this page."
              title="Hello World"
            />
          </div>
        </PageContainer>
      </ProLayout>
    </>
  );
};
