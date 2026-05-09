import {
  ContainerFilled,
  GithubFilled,
  HomeFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
  SettingFilled,
  ShopFilled,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { demoOnMenuHeaderClick } from './_demoHandlers';

const Demo = () => {
  const [pathname, setPathname] = useState('/product/list');

  return (
    <ProLayout
      collapsed={true}
      collapsedButtonRender={false}
      layout="side"
      route={{
        /** 演示 `collapsedShowTitle`：收起态下在图标下方显示文字。
         *  数据与 `_defaultProps` 对齐的电商业务：工作台 / 商品中心 / 订单中心 / 系统管理。
         *  为了在收起态也能展示"分组感"，这里在商品中心与订单中心下挂了典型二级菜单。 */
        routes: [
          {
            path: '/workbench',
            name: '工作台',
            icon: <HomeFilled />,
            component: './Welcome',
          },
          {
            path: '/product',
            name: '商品中心',
            icon: <ShopFilled />,
            component: './Product',
            routes: [
              {
                path: '/product/list',
                name: '商品列表',
                component: './Welcome',
              },
              {
                path: '/product/category',
                name: '商品分类',
                component: './Welcome',
              },
            ],
          },
          {
            path: '/order',
            name: '订单中心',
            icon: <ContainerFilled />,
            component: './Order',
            routes: [
              {
                path: '/order/sales',
                name: '销售订单',
                component: './Welcome',
              },
              {
                path: '/order/refund',
                name: '退款售后',
                component: './Welcome',
              },
            ],
          },
          {
            path: '/system',
            name: '系统管理',
            icon: <SettingFilled />,
            access: 'canAdmin',
            component: './Admin',
          },
        ],
      }}
      location={{
        pathname,
      }}
      menu={{
        type: 'group',
        collapsedShowTitle: true,
      }}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'small',
        title: '书琰',
      }}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          props.layout !== 'side' ? (
            <div
              key="SearchOutlined"
              aria-hidden
              style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Input
                style={{
                  borderRadius: 4,
                  marginInlineEnd: 12,
                  backgroundColor: 'rgba(0,0,0,0.03)',
                }}
                prefix={
                  <SearchOutlined
                    style={{
                      color: 'rgba(0, 0, 0, 0.15)',
                    }}
                  />
                }
                placeholder="搜索方案"
                variant="borderless"
              />
              <PlusCircleFilled
                style={{
                  color: 'var(--ant-primary-color)',
                  fontSize: 24,
                }}
              />
            </div>
          ) : undefined,
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />,
          <GithubFilled key="GithubFilled" />,
        ];
      }}
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined;
        return (
          <p
            style={{
              textAlign: 'center',
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
      <PageContainer
        extra={[
          <Button key="3">操作</Button>,
          <Button key="2">操作</Button>,
          <Button key="1" type="primary">
            主操作
          </Button>,
        ]}
        footer={[
          <Button key="3">重置</Button>,
          <Button key="2" type="primary">
            提交
          </Button>,
        ]}
      >
        <ProCard
          style={{
            height: '200vh',
            minHeight: 800,
          }}
        >
          <div />
        </ProCard>
      </PageContainer>
    </ProLayout>
  );
};

export default () => (
  <div>
    <Demo />
  </div>
);
