import {
  CaretDownFilled,
  DoubleRightOutlined,
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
import { Button, Divider, Dropdown, Input } from 'antd';
import React, { useState } from 'react';
import defaultProps from './_defaultProps';

const Item: React.FC<{ children: React.ReactNode }> = (props) => (
  <div
    className={css`
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      cursor: pointer;
      line-height: 22px;
      margin-bottom: 8px;
      &:hover {
        color: #1890ff;
      }
    `}
    style={{
      width: '33.33%',
    }}
  >
    {props.children}
    <DoubleRightOutlined
      style={{
        marginLeft: 4,
      }}
    />
  </div>
);

const List: React.FC<{ title: string; style?: React.CSSProperties }> = (props) => {
  return (
    <div
      style={{
        width: '100%',
        ...props.style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: 'rgba(0,0,0,0.85)',
          lineHeight: '24px',
          fontWeight: 500,
          marginBottom: 16,
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {new Array(6).fill(1).map((_, index) => {
          return <Item key={index}>具体的解决方案-{index}</Item>;
        })}
      </div>
    </div>
  );
};

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
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
        disableContentMargin
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '七妮妮',
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            props.layout !== 'side' && document.body.clientWidth > 1400 ? (
              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: 24,
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
            ) : undefined,
            <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <GithubFilled key="GithubFilled" />,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          const defaultDom = (
            <a>
              {logo}
              {title}
            </a>
          );
          if (document.body.clientWidth < 1400) {
            return defaultDom;
          }
          if (_.isMobile) return defaultDom;
          return (
            <>
              {defaultDom}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Divider
                  style={{
                    height: '1.5em',
                  }}
                  type="vertical"
                />
                <Dropdown
                  placement="bottom"
                  overlay={
                    <div
                      style={{
                        padding: '32px 40px',
                        backgroundColor: '#fff',
                        width: '100vw',
                        height: '307px',
                        boxShadow:
                          '0 8px 16px 0 rgba(0,0,0,0.03), 0 4px 8px 0 rgba(25,15,15,0.07), 0 2px 4px 0 rgba(0,0,0,0.08)',
                        borderRadius: '0 0 6px 6px',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                          <List title="金融解决方案" />
                          <List
                            title="其他解决方案"
                            style={{
                              marginTop: 32,
                            }}
                          />
                        </div>

                        <div
                          style={{
                            width: '308px',
                            borderLeft: '1px solid rgba(0,0,0,0.06)',
                            paddingLeft: 16,
                          }}
                        >
                          <div
                            className={css`
                              font-size: 14px;
                              color: rgba(0, 0, 0, 0.45);
                              line-height: 22px;
                            `}
                          >
                            热门产品
                          </div>
                          {new Array(3).fill(1).map((name, index) => {
                            return (
                              <div
                                key={index}
                                className={css`
                                  border-radius: 4px;
                                  padding: 16px;
                                  margin-top: 4px;
                                  display: flex;
                                  cursor: pointer;
                                  &:hover {
                                    background-color: rgba(0, 0, 0, 0.03);
                                  }
                                `}
                              >
                                <img src="https://gw.alipayobjects.com/zos/antfincdn/6FTGmLLmN/bianzu%25252013.svg" />
                                <div
                                  style={{
                                    marginLeft: 14,
                                  }}
                                >
                                  <div
                                    className={css`
                                      font-size: 14px;
                                      color: rgba(0, 0, 0, 0.85);
                                      line-height: 22px;
                                    `}
                                  >
                                    Ant Design
                                  </div>
                                  <div
                                    className={css`
                                      font-size: 12px;
                                      color: rgba(0, 0, 0, 0.45);
                                      line-height: 20px;
                                    `}
                                  >
                                    杭州市较知名的 UI 设计语言
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  }
                >
                  <div
                    style={{
                      color: 'rgba(0, 0, 0, 0.85)',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      gap: 4,
                      paddingLeft: 8,
                      paddingRight: 12,
                      alignItems: 'center',
                    }}
                    className={css`
                      &:hover {
                        background-color: rgba(0, 0, 0, 0.03);
                      }
                    `}
                  >
                    <span> 企业级资产中心</span>
                    <CaretDownFilled />
                  </div>
                </Dropdown>
              </div>
            </>
          );
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div
              style={{
                textAlign: 'center',
                paddingTop: 12,
              }}
            >
              <div>© 2021 Made with love</div>
              <div>by Ant Design</div>
            </div>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
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
