import React, { useState } from 'react';
import { Input, Button, Space, Alert } from 'antd';
import {
  GithubFilled,
  QuestionCircleFilled,
  InfoCircleFilled,
  SearchOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';

import { ProSettings } from '@ant-design/pro-layout';
import { ProLayout, PageContainer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';
import ProCard from '@ant-design/pro-card';

export default () => {
  const settings: ProSettings | undefined = {
    layout: 'mix',
    splitMenus: true,
  };

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');

  return (
    <>
      <Alert message="Warning text" banner />
      <div
        id="test-pro-layout"
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          headerHeight={100}
          headerRender={(props, defaultDom) => (
            <>
              <Alert
                message={
                  <div
                    style={{
                      color: 'white',
                    }}
                  >
                    本网站提供的部分服务在你当前浏览器中无法使用，建议你更换为 Chrome
                    浏览器查看本网站。
                  </div>
                }
                icon={
                  <InfoCircleFilled
                    style={{
                      color: 'white',
                    }}
                  />
                }
                banner
                style={{
                  backgroundColor: 'black',
                }}
                action={
                  <Button
                    type="text"
                    style={{
                      color: 'white',
                    }}
                  >
                    查看详情
                  </Button>
                }
              />
              {React.cloneElement(defaultDom, {
                style: {
                  height: '56px',
                  lineHeight: '56px',
                },
              })}
            </>
          )}
          footerRender={() => (
            <Space
              style={{
                height: 64,
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                marginRight: 24,
              }}
            >
              <Button key="1">上一步</Button>
              <Button key="2" type="primary">
                保存
              </Button>
            </Space>
          )}
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
          menuFooterRender={() => {
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
                minHeight: 800,
              }}
            >
              <div />
            </ProCard>
          </PageContainer>
        </ProLayout>
      </div>
    </>
  );
};
