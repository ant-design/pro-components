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
      layout="mix"
      token={{
        bgLayout: 'rgba(160, 217, 17, 0.1)',
        colorTextAppListIcon: 'rgba(255, 255, 255, 1)',
        colorTextAppListIconHover: 'rgba(245, 34, 45, 1)',
        sider: {
          colorBgMenuItemHover: 'rgba(24, 144, 255, 1)',
          colorMenuBackground: 'rgba(24, 144, 255, 0.1)',
          colorMenuItemDivider: 'rgba(250, 219, 20, 1)',
          colorTextMenu: 'rgba(250, 219, 20, 1)',
          colorTextMenuSelected: 'rgba(250, 84, 28, 1)',
          colorTextMenuItemHover: 'rgba(255, 255, 255, 1)',
          colorBgMenuItemSelected: 'rgb(82, 196, 26)',
          colorBgCollapsedButton: 'rgba(250, 84, 28, 1)',
          colorTextCollapsedButton: 'rgba(24, 144, 255, 1)',
          colorTextCollapsedButtonHover: 'rgba(143, 35, 35, 1)',
        },
        header: {
          colorBgMenuItemSelected: 'rgba(82, 196, 26, 1)',
          colorTextMenuSelected: 'rgba(114, 46, 209, 1)',
          colorBgHeader: 'rgba(250, 173, 20, 1)',
          colorHeaderTitle: 'rgba(47, 84, 235, 1)',
          colorTextMenuActive: 'rgba(255, 255, 255, 1)',
          colorTextMenu: 'rgba(250, 84, 28, 1)',
          colorBgMenuItemHover: 'rgba(24, 144, 255, 1)',
        },
        pageContainer: {
          colorBgPageContainer: 'rgba(250, 84, 28, 1)',
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
