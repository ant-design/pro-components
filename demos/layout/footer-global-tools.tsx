import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@xxlabs/pro-components';
import { PageContainer, ProCard, ProLayout } from '@xxlabs/pro-components';
import { Alert, Button, Input, Space } from 'antd';
import React, { useState } from 'react';
import defaultProps from './_defaultProps';

export default () => {
  const settings: ProSettings | undefined = {
    layout: 'mix',
    splitMenus: true,
  };

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');

  return (
    <>
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
          footerRender={() => (
            <Space
              style={{
                height: 64,
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                marginInlineEnd: 24,
              }}
            >
              <Button key="1">上一步</Button>
              <Button key="2" type="primary">
                保存
              </Button>
            </Space>
          )}
          headerRender={(props, defaultDom) => (
            <>
              <Alert
                banner
                action={
                  <Button
                    style={{
                      color: 'white',
                    }}
                    type="text"
                  >
                    查看详情
                  </Button>
                }
                icon={
                  <InfoCircleFilled
                    style={{
                      color: 'white',
                    }}
                  />
                }
                message={
                  <div
                    style={{
                      color: 'white',
                    }}
                  >
                    本网站提供的部分服务在你当前浏览器中无法使用，建议你更换为 Chrome 浏览器查看本网站。
                  </div>
                }
                style={{
                  backgroundColor: 'black',
                }}
              />
              {React.cloneElement(defaultDom as any, {
                style: {
                  height: '56px',
                  lineHeight: '56px',
                },
              })}
            </>
          )}
          token={{
            header: {
              heightLayoutHeader: 108,
            },
          }}
          {...defaultProps}
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
                    marginInlineEnd: 24,
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Input
                    placeholder="搜索方案"
                    prefix={
                      <SearchOutlined
                        style={{
                          color: 'rgba(0, 0, 0, 0.15)',
                        }}
                      />
                    }
                    style={{
                      borderRadius: 4,
                      marginInlineEnd: 12,
                      backgroundColor: 'rgba(0,0,0,0.03)',
                    }}
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
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: '七妮妮',
          }}
          location={{
            pathname,
          }}
          menu={{
            type: 'group',
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed) return undefined;
            return (
              <div
                style={{
                  textAlign: 'center',
                  paddingBlockStart: 12,
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
