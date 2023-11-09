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

export default () => {
  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');

  return (
    <ProLayout
      collapsed
      siderMenuType="group"
      route={{
        routes: [
          {
            path: '/all',
            name: '总览',
            parentId: '14',
            children: [
              { path: '/all/workbench/index', name: '首页', parentId: '16' },
            ],
          },
          {
            path: '/sa',
            name: '隐私计算',
            parentId: '14',
            children: [
              {
                path: '/sa/experiment',
                name: '项目空间',
                parentId: '19',
                children: [
                  {
                    path: '/sa/experiment/list',
                    name: '项目列表',
                    parentId: '20',
                  },
                ],
              },
              {
                path: '/sa/offlinetask',
                name: '任务管理中心',
                parentId: '19',
                children: [
                  {
                    path: '/sa/offlinetask/tasklist',
                    name: '研发任务',
                    parentId: '27',
                  },
                  {
                    path: '/sa/offlinetask/dispatchtask',
                    name: '调度任务',
                    parentId: '27',
                  },
                ],
              },
              {
                path: '/sa/onlinetask',
                name: '服务管控中心',
                parentId: '19',
                children: [
                  {
                    path: '/sa/onlinetask/anonymousquery',
                    name: '在线匿名查询服务',
                    parentId: '34',
                  },
                ],
              },
            ],
          },
          {
            path: '/others',
            name: '其他',
            parentId: '14',
            children: [
              {
                path: '/others/data',
                name: '数据管理',
                parentId: '39',
                children: [
                  {
                    path: '/others/data/list',
                    name: '所有数据',
                    parentId: '40',
                  },
                  {
                    path: '/others/data/datadictionary',
                    name: '数据字典',
                    parentId: '40',
                  },
                  {
                    path: '/others/data/outputConfiguration',
                    name: '输出配置',
                    parentId: '40',
                  },
                ],
              },
              {
                path: '/others/monitormarket',
                name: '监控大盘',
                parentId: '39',
                children: [
                  {
                    path: '/others/monitormarket/model',
                    name: '模型监控',
                    parentId: '58',
                  },
                  {
                    path: '/others/monitormarket/alliance',
                    name: '联盟监控',
                    parentId: '58',
                  },
                  {
                    path: '/others/monitormarket/resource',
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
        title: '七妮妮',
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
                bordered={false}
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
