import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@xxlabs/pro-components';
import { PageContainer, ProLayout, SettingDrawer } from '@xxlabs/pro-components';
import { Button, Descriptions, Result, Space, Statistic } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';

const content = (
  <Descriptions column={2} size="small">
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
  </Descriptions>
);

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const [pathname, setPathname] = useState('/welcome');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        avatarProps={{
          icon: <UserOutlined />,
        }}
        location={{
          pathname,
        }}
        menuFooterRender={(props) => {
          return (
            <a
              href="https://preview.pro.ant.design/dashboard/analysis"
              rel="noreferrer"
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              target="_blank"
            >
              <img
                alt="pro-logo"
                src="https://procomponents.ant.design/favicon.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: '0 16px',
                  marginInlineEnd: 10,
                }}
              />
              {!props?.collapsed && 'Preview Pro'}
            </a>
          );
        }}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        waterMarkProps={{
          content: 'Pro Layout',
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        {...settings}
      >
        <PageContainer
          content={content}
          extra={[
            <Button key="3">操作</Button>,
            <Button key="2">操作</Button>,
            <Button key="1" type="primary">
              主操作
            </Button>,
          ]}
          extraContent={
            <Space size={24}>
              <Statistic prefix={<LikeOutlined />} title="Feedback" value={1128} />
              <Statistic suffix="/ 100" title="Unmerged" value={93} />
            </Space>
          }
          footer={[
            <Button key="3">重置</Button>,
            <Button key="2" type="primary">
              提交
            </Button>,
          ]}
          tabList={[
            {
              tab: '基本信息',
              key: 'base',
            },
            {
              tab: '详细信息',
              key: 'info',
            },
          ]}
        >
          <div
            style={{
              height: '120vh',
              minHeight: 600,
            }}
          >
            <Result
              extra={<Button type="primary">Back Home</Button>}
              status="404"
              style={{
                height: '100%',
                background: '#fff',
              }}
              subTitle="Sorry, you are not authorized to access this page."
              title="Hello World"
            />
          </div>
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        disableUrlParams
        getContainer={() => document.getElementById('test-pro-layout')}
        pathname={pathname}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
      />
    </div>
  );
};
