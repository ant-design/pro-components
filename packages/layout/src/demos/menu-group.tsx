import React, { useState } from 'react';
import { Button, Result } from 'antd';
import {
  InfoCircleOutlined,
  MergeCellsOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';
import ProCard from '@ant-design/pro-card';

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
        brandBgImg={{
          url: 'https://gw.alipayobjects.com/zos/antfincdn/tQVPs1q2X%26/yonghushenfen.png',
        }}
        menu={{
          type: 'group',
        }}
        {...defaultProps}
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
        menuFooterRender={() => {
          return (
            <p
              style={{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.6)',
                paddingTop: 12,
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
