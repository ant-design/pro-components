import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { PageContainer, ProLayout } from '@ant-design/pro-layout';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import defaultProps from './_defaultProps';

export default () => {
  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');

  return (
    <ProLayout
      splitMenus
      token={{
        sider: {
          menuBackgroundColor: '#004FD9',
          menuTextColor: 'rgba(255,255,255,0.85)',
          subMenuSelectedTextColor: '#fff',
          menuTextColorSecondary: 'rgba(255,255,255,0.65)',
          menuSelectedTextColor: '#fff',
          menuTitleTextColor: 'rgba(255,255,255,0.95)',
          menuItemHoverBgColor: 'rgba(0,0,0,0.06)',
          menuItemCollapsedHoverBgColor: 'rgba(0,0,0,0.06)',
          menuItemSelectedBgColor: 'rgba(0,0,0,0.15)',
          menuItemCollapsedSelectedBgColor: 'rgba(0,0,0,0.15)',
          menuItemDividerColor: 'rgba(255,255,255,0.15)',
          collapsedButtonBgColor: '#fff',
          collapsedButtonTextColor: 'rgba(0,0,0,0.45)',
          collapsedButtonHoverTextColor: 'rgba(0,0,0,0.65)',
          menuSubArrowColor: 'rgba(255,255,255,0.15)',
        },
        appListIconTextColor: 'rgba(255,255,255,0.85)',
        appListIconHoverTextColor: 'rgba(255,255,255,0.95)',
        appListIconHoverBgColor: 'rgba(0,0,0,0.06)',
      }}
      {...defaultProps}
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
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined;
        return (
          <p
            style={{
              textAlign: 'center',
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
