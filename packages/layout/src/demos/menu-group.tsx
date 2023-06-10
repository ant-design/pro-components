import {
  CrownOutlined,
  InfoCircleOutlined,
  MergeCellsOutlined,
  QuestionCircleOutlined,
  TabletOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Button, Result } from 'antd';
import { useState } from 'react';

export default () => {
  const [pathname, setPathname] = useState('/welcome');
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
              path: '/admin',
              name: '管理页',
              icon: <CrownOutlined />,
              access: 'canAdmin',
              component: './Admin',
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
                  icon: <CrownOutlined />,
                  component: './Welcome',
                },
                {
                  path: '/admin/sub-page3',
                  name: '三级页面',
                  icon: <CrownOutlined />,
                  component: './Welcome',
                },
              ],
            },
            {
              name: '列表页',
              icon: <TabletOutlined />,
              path: '/list',
              component: './ListTableList',
              routes: [
                {
                  path: '/list/sub-page2',
                  name: '二级列表页面',
                  icon: <CrownOutlined />,
                  component: './Welcome',
                },
                {
                  path: '/list/sub-page3',
                  name: '三级列表页面',
                  icon: <CrownOutlined />,
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
          title: '七妮妮',
        }}
        actionsRender={() => [
          <InfoCircleOutlined key="InfoCircleOutlined" />,
          <QuestionCircleOutlined key="QuestionCircleOutlined" />,
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
