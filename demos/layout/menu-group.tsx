// UserOutlined / MergeCellsOutlined 官方无 Filled 版本，保留 Outlined
import {
  ContainerFilled,
  InfoCircleFilled,
  MergeCellsOutlined,
  QuestionCircleFilled,
  ShopFilled,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Button, Result } from 'antd';
import { useState } from 'react';
import { demoOnMenuHeaderClick } from './_demoHandlers';

const Demo = () => {
  const [pathname, setPathname] = useState('/product/list');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        fixSiderbar
        route={{
          path: '/',
          routes: [
            {
              path: '/product',
              name: '商品中心',
              icon: <ShopFilled />,
              access: 'canAdmin',
              component: './Product',
              routes: [
                {
                  path: '/product/list',
                  name: '商品列表',
                  icon: <ShopFilled />,
                  component: './Welcome',
                },
                {
                  path: '/product/category',
                  name: '商品分类',
                  icon: <ShopFilled />,
                  component: './Welcome',
                },
                {
                  path: '/product/brand',
                  name: '品牌管理',
                  icon: <ShopFilled />,
                  component: './Welcome',
                },
              ],
            },
            {
              name: '订单中心',
              icon: <ContainerFilled />,
              path: '/order',
              component: './Order',
              routes: [
                {
                  path: '/order/sales',
                  name: '销售订单',
                  icon: <ContainerFilled />,
                  component: './Welcome',
                },
                {
                  path: '/order/refund',
                  name: '退款售后',
                  icon: <ContainerFilled />,
                  component: './Welcome',
                },
              ],
            },
          ],
        }}
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: 'Pro Layout',
        }}
        avatarProps={{
          icon: <UserOutlined />,
          size: 'small',
          title: '书琰',
        }}
        // MergeCells 官方无 Filled 版本，保留 Outlined 维持原 demo 示意语义
        actionsRender={() => [
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />,
          <MergeCellsOutlined key="MergeCellsOutlined" />,
        ]}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <p
              style={{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.6)',
                paddingBlockStart: 12,
              }}
            >
              Power by Ant Design
            </p>
          );
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
      >
        <PageContainer>
          <ProCard
            style={{
              height: '120vh',
              minHeight: 600,
            }}
          >
            <Result
              status="404"
              style={{
                height: '100%',
              }}
              title="Hello World"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Back Home</Button>}
            />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default () => (
  <div>
    <Demo />
  </div>
);
