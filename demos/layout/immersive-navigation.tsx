import {
  CrownOutlined,
  LeftOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { Button, Result, Space, Tag } from 'antd';
import { useState } from 'react';

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

const defaultHomeProps = {
  routes: [
    {
      path: '/',
      name: '首页',
      icon: <CrownOutlined />,
      component: './Welcome',
    },
    {
      path: '/admin/sub-page1',
      name: '详情页',
      icon: <SmileOutlined />,
      component: './Welcome',
    },
  ],
};

export default () => {
  const [pathname, setPathname] = useState('/admin/sub-page1');
  return (
    <>
      <ProLayout
        route={pathname === '/' ? defaultHomeProps : defaultProps}
        location={{
          pathname,
        }}
        logoStyle={{
          backgroundColor: '#eee',
        }}
        menuHeaderRender={(logo, title, props) => {
          if (pathname === '/') {
            return (
              <a>
                {logo}
                {title}
              </a>
            );
          }
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
              <Button
                size="small"
                icon={<LeftOutlined />}
                onClick={() => {
                  setPathname('/');
                }}
              >
                返回应用列表
              </Button>
              <b>alipay_dev_gzone</b>
              <span>Creation Time 2017-01-10</span>
              <Tag color="warning">运行中</Tag>
            </Space>
          );
        }}
        fixSiderbar
        headerRender={() => {
          return null;
        }}
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
            icon="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*aPIBS5gRPu4AAAAAAAAAAAAAARQnAQ"
            title="Hello World"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
          />
        </div>
      </ProLayout>
    </>
  );
};
