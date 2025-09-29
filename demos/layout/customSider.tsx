import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import type { ProSettings } from '@xxlabs/pro-components';
import { PageContainer, ProCard, ProLayout, SettingDrawer } from '@xxlabs/pro-components';
import { Avatar, Image, Space } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    layout: 'side',
  });

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        bgLayoutImgList={[
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            left: 85,
            bottom: 100,
            height: '303px',
          },
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            bottom: -68,
            right: -45,
            height: '303px',
          },
          {
            src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
            bottom: 0,
            left: 0,
            width: '331px',
          },
        ]}
        {...defaultProps}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <div
              key={1}
              style={{
                height: '200px',
              }}
            >
              <Image
                height={132}
                preview={false}
                src="https://gw.alipayobjects.com/zos/bmw-prod/d283f09a-64d6-4d59-bfc7-37b49ea0da2b.svg"
                width="100%"
              />
              <Space
                align="center"
                size="middle"
                style={{
                  width: '100%',
                  marginBlockStart: '32px',
                }}
              >
                <Avatar
                  size="small"
                  src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                />
                <div
                  style={{
                    fontSize: '14px',
                    marginInlineEnd: '32px',
                  }}
                >
                  七妮妮
                </div>
                <InfoCircleFilled key="InfoCircleFilled" />
                <QuestionCircleFilled key="QuestionCircleFilled" />
                <GithubFilled key="GithubFilled" />
              </Space>
            </div>,
          ];
        }}
        collapsed={false}
        location={{
          pathname,
        }}
        menu={{
          type: 'group',
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </div>
        )}
        menuRender={(props, defaultDom) => {
          console.log('defaultDom', defaultDom);
          return defaultDom;
        }}
        {...settings}
      >
        <PageContainer>
          <ProCard
            style={{
              height: '100vh',
              minHeight: 800,
            }}
          >
            <div />
          </ProCard>
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        enableDarkTheme
        disableUrlParams={false}
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
