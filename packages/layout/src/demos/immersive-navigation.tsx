import React, { useState } from 'react';
import { Button, Result, Avatar, Typography, Space } from 'antd';
import { CrownOutlined, LeftOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import ProLayout from '@ant-design/pro-layout';

const defaultProps = {
  routes: [
    {
      path: '/admin/sub-page1',
      name: '一级页面',
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
        menuHeaderRender={(logo, title, props) => {
          if (props?.collapsed) {
            return (
              <Space>
                <LeftOutlined
                  style={{
                    fontSize: 24,
                  }}
                />
              </Space>
            );
          }
          return (
            <Space direction="vertical">
              <Button size="small" icon={<LeftOutlined />}>
                返回应用列表
              </Button>
              <Typography.Text strong>alipay_dev_gzone</Typography.Text>
            </Space>
          );
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
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
      >
        <div
          style={{
            height: '120vh',
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
      </ProLayout>
    </>
  );
};
