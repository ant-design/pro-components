import {
  CaretDownFilled,
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import type { ProSettings } from '@ant-design/pro-layout';
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-layout';
import { css } from '@emotion/css';
import { Avatar, Dropdown, Image, Input, Space } from 'antd';
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
        layoutBgImgList={[
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
        location={{
          pathname,
        }}
        menu={{
          type: 'group',
        }}
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
                width={'100%'}
                preview={false}
                height={132}
                src="https://gw.alipayobjects.com/zos/bmw-prod/d283f09a-64d6-4d59-bfc7-37b49ea0da2b.svg"
              />
              <Space
                align="center"
                size="middle"
                style={{
                  width: '100%',
                  marginTop: '32px',
                }}
              >
                <Avatar
                  src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                  size="small"
                />
                <div
                  style={{
                    fontSize: '14px',
                    marginRight: '32px',
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
        menuExtraRender={(props) => {
          if (props.collapsed) return [];
          return (
            <>
              <Dropdown placement="bottom" overlay={<></>}>
                <div
                  style={{
                    color: 'rgba(0, 0, 0, 0.85)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    gap: 4,
                    alignItems: 'center',
                    minWidth: '180px',
                  }}
                  className={css`
                    font-size: 16px;
                    margin-top: 24px;
                    padding: 0 12px;
                    &:hover {
                      background-color: rgba(0, 0, 0, 0.03);
                    }
                  `}
                >
                  <span> 企业级资产中心</span>
                  <CaretDownFilled />
                </div>
              </Dropdown>

              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  marginTop: '24px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Input
                  style={{
                    borderRadius: 4,
                    marginRight: 12,
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
            </>
          );
        }}
        menuRender={(props, defaultDom) => (
          <>
            {console.log('defaultDom', defaultDom)}
            {defaultDom}
          </>
        )}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </div>
        )}
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
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={false}
      />
    </div>
  );
};
