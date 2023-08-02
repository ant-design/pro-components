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
import defaultProps from './_defaultProps';

export default () => {
  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');

  return (
    <ProLayout
      splitMenus
      token={{
        colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
        colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
        colorTextAppListIcon: 'rgba(255,255,255,0.85)',
        sider: {
          colorBgCollapsedButton: '#fff',
          colorTextCollapsedButtonHover: 'rgba(0,0,0,0.65)',
          colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
          colorMenuBackground: '#004FD9',
          colorBgMenuItemCollapsedElevated: 'rgba(0,0,0,0.85)',
          colorMenuItemDivider: 'rgba(255,255,255,0.15)',
          colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
          colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
          colorTextMenuSelected: '#fff',
          colorTextMenuItemHover: 'rgba(255,255,255,0.75)',
          colorTextMenu: 'rgba(255,255,255,0.75)',
          colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
          colorTextMenuTitle: 'rgba(255,255,255,0.95)',
          colorTextMenuActive: 'rgba(255,255,255,0.95)',
          colorTextSubMenuSelected: '#fff',
        },
        header: {
          colorBgHeader: '#004FD9',
          colorBgRightActionsItemHover: 'rgba(0,0,0,0.06)',
          colorTextRightActionsItem: 'rgba(255,255,255,0.65)',
          colorHeaderTitle: '#fff',
          colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
          colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
          colorTextMenuSelected: '#fff',
          colorTextMenu: 'rgba(255,255,255,0.75)',
          colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
          colorTextMenuActive: 'rgba(255,255,255,0.95)',
        },
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
      layout="top"
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
