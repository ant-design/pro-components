import {
  ContainerFilled,
  LeftOutlined,
  ShopFilled,
  UserOutlined,
} from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { Button, Result, Space, Tag } from 'antd';
import { useState } from 'react';
import { demoOnMenuHeaderClick } from './_demoHandlers';

/**
 * 沉浸式导航 demo：
 * - 非首页时侧栏展示具体应用的子菜单，头部用 Space 展示应用元信息（返回按钮、运行状态）
 * - 首页时侧栏仅展示全局入口
 * 这里把原先的"一级/二级/三级页面"占位名换成电商业务语义：商品中心/订单中心/会员中心。
 * `LeftOutlined` 是返回按钮图标，方向性 icon 官方无 Filled 版，保留。
 */
const defaultProps = {
  routes: [
    {
      path: '/product/list',
      name: '商品列表',
      icon: <ShopFilled />,
      component: './Welcome',
    },
    {
      path: '/order/sales',
      name: '销售订单',
      icon: <ContainerFilled />,
      component: './Welcome',
    },
    {
      path: '/member/list',
      name: '会员管理',
      // UserOutlined 官方无 Filled 版本，保留 Outlined
      icon: <UserOutlined />,
      component: './Welcome',
    },
  ],
};

const defaultHomeProps = {
  routes: [
    {
      path: '/',
      name: '工作台',
      icon: <ShopFilled />,
      component: './Welcome',
    },
    {
      path: '/product/list',
      name: '商品详情',
      icon: <ContainerFilled />,
      component: './Welcome',
    },
  ],
};

const Demo = () => {
  const [pathname, setPathname] = useState('/product/list');
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
            <Space orientation="vertical">
              <Button
                size="small"
                icon={<LeftOutlined />}
                onClick={() => {
                  setPathname('/');
                }}
              >
                返回应用列表
              </Button>
              <b>电商运营后台</b>
              <span>创建时间 2024-01-10</span>
              <Tag color="warning">运行中</Tag>
            </Space>
          );
        }}
        fixSiderbar
        headerRender={() => {
          return null;
        }}
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
            icon={
              <img
                src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*aPIBS5gRPu4AAAAAAAAAAAAAARQnAQ"
                alt="404"
              />
            }
            title="Hello World"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
          />
        </div>
      </ProLayout>
    </>
  );
};

export default () => (
  <div>
    <Demo />
  </div>
);
