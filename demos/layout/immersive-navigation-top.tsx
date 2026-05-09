import {
  ContainerFilled,
  HomeFilled,
  ShopFilled,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Button, Input, Result, Tag } from 'antd';
import { useState } from 'react';
import { demoOnMenuHeaderClick } from './_demoHandlers';

/**
 * 沉浸式顶栏导航 demo：演示 PageContainer header 固定顶部、页面级搜索 + 操作按钮。
 * 侧栏菜单用电商业务语义：工作台/商品中心/订单中心。
 */
const defaultProps = {
  routes: [
    {
      path: '/workbench',
      name: '工作台',
      icon: <HomeFilled />,
      component: './Welcome',
    },
    {
      path: '/product/list',
      name: '商品中心',
      icon: <ShopFilled />,
      component: './Welcome',
    },
    {
      path: '/order/sales',
      name: '订单中心',
      icon: <ContainerFilled />,
      component: './Welcome',
    },
  ],
};

const Demo = () => {
  const [pathname, setPathname] = useState('/workbench');
  return (
    <>
      <ProLayout
        route={defaultProps}
        location={{
          pathname,
        }}
        fixSiderbar
        headerRender={false}
        onMenuHeaderClick={demoOnMenuHeaderClick}
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
          // UserOutlined 官方无 Filled 版本，保留 Outlined
          icon: <UserOutlined />,
        }}
      >
        <PageContainer
          onBack={() => null}
          tags={<Tag color="blue">已发布</Tag>}
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
            <Button key="3">导出</Button>,
            <Button key="2" type="primary">
              新建商品
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

export default () => (
  <div>
    <Demo />
  </div>
);
