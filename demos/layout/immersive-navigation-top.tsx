import { CrownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
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
        route={defaultProps}
        location={{
          pathname,
        }}
        fixSiderbar
        headerRender={false}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        avatarProps={{
          icon: <UserOutlined />,
        }}
      >
        <PageContainer
          onBack={() => null}
          tags={<Tag color="blue">状态一</Tag>}
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
        >
          <div
            style={{
              height: '120vh',
              minHeight: 600,
            }}
          >
            <Result
              status="404"
              style={{
                height: '100%',
                background: '#fff',
              }}
              title="Hello World"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Back Home</Button>}
            />
          </div>
        </PageContainer>
      </ProLayout>
    </>
  );
};
