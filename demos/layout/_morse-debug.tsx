import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { demoOnMenuHeaderClick } from './_demoHandlers';

const Demo = () => {
  const [pathname, setPathname] = useState('/product/list/on-sale');

  return (
    <ProLayout
      collapsed
      siderMenuType="group"
      route={{
        routes: [
          {
            path: '/dashboard',
            name: '工作台',
            parentId: '14',
            children: [
              {
                path: '/dashboard/overview',
                name: '业务概览',
                parentId: '16',
              },
            ],
          },
          {
            path: '/product',
            name: '商品中心',
            parentId: '14',
            children: [
              {
                path: '/product/list',
                name: '商品列表',
                parentId: '19',
                children: [
                  {
                    path: '/product/list/on-sale',
                    name: '在售商品',
                    parentId: '20',
                  },
                ],
              },
              {
                path: '/product/category',
                name: '商品分类',
                parentId: '19',
                children: [
                  {
                    path: '/product/category/level-1',
                    name: '一级分类',
                    parentId: '27',
                  },
                  {
                    path: '/product/category/level-2',
                    name: '二级分类',
                    parentId: '27',
                  },
                ],
              },
              {
                path: '/product/brand',
                name: '品牌管理',
                parentId: '19',
                children: [
                  {
                    path: '/product/brand/list',
                    name: '品牌列表',
                    parentId: '34',
                  },
                ],
              },
            ],
          },
          {
            path: '/system',
            name: '系统管理',
            parentId: '14',
            children: [
              {
                path: '/system/data',
                name: '数据管理',
                parentId: '39',
                children: [
                  {
                    path: '/system/data/list',
                    name: '数据列表',
                    parentId: '40',
                  },
                  {
                    path: '/system/data/dictionary',
                    name: '数据字典',
                    parentId: '40',
                  },
                  {
                    path: '/system/data/export-config',
                    name: '导出配置',
                    parentId: '40',
                  },
                ],
              },
              {
                path: '/system/monitor',
                name: '监控大盘',
                parentId: '39',
                children: [
                  {
                    path: '/system/monitor/service',
                    name: '服务监控',
                    parentId: '58',
                  },
                  {
                    path: '/system/monitor/business',
                    name: '业务监控',
                    parentId: '58',
                  },
                  {
                    path: '/system/monitor/resource',
                    name: '资源监控',
                    parentId: '58',
                  },
                ],
              },
            ],
          },
        ],
      }}
      location={{
        pathname,
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
