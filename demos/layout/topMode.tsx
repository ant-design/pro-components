import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { css } from '@emotion/css';
import { Divider, Input, Popover, theme } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';

const SOLUTIONS = {
  金融行业: [
    '智能风控平台',
    '供应链金融',
    '数字银行核心',
    '保险理赔系统',
    '资产管理中台',
    '合规审计平台',
  ],
  通用方案: [
    '统一权限中心',
    '数据可视化引擎',
    '微服务治理框架',
    '低代码搭建平台',
    '智能客服系统',
    'DevOps 工具链',
  ],
};

const HOT_PRODUCTS = [
  { name: 'Ant Design Pro', desc: '开箱即用的中台前端解决方案' },
  { name: '数据可视化引擎', desc: '企业级数据看板与图表分析工具' },
  { name: '微服务治理框架', desc: '基于 K8s 的服务注册与发现' },
];

const SolutionItem: React.FC<{ children: React.ReactNode }> = (props) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
      style={{
        width: '33.33%',
      }}
    >
      {props.children}
      <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      />
    </div>
  );
};

const SolutionCategory: React.FC<{
  title: string;
  items: string[];
  style?: React.CSSProperties;
}> = (props) => {
  const { token } = theme.useToken();

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
          color: token.colorTextHeading,
          lineHeight: '24px',
          fontWeight: 500,
          marginBlockEnd: 16,
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
        {props.items.map((item) => (
          <SolutionItem key={item}>{item}</SolutionItem>
        ))}
      </div>
    </div>
  );
};

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
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
        orientation="vertical"
      />
      <Popover
        placement="bottom"
        styles={{
          root: {
            width: 'calc(100vw - 24px)',
            padding: '24px',
            paddingTop: 8,
            height: '307px',
            borderRadius: '0 0 6px 6px',
          },
        }}
        content={
          <div style={{ display: 'flex', padding: '32px 40px' }}>
            <div style={{ flex: 1 }}>
              <SolutionCategory
                title="金融行业"
                items={SOLUTIONS['金融行业']}
              />
              <SolutionCategory
                title="通用方案"
                items={SOLUTIONS['通用方案']}
                style={{ marginBlockStart: 32 }}
              />
            </div>

            <div
              style={{
                width: '308px',
                borderInlineStart: '1px solid ' + token.colorBorder,
                paddingInlineStart: 16,
              }}
            >
              <div
                className={css`
                  font-size: 14px;
                  color: ${token.colorText};
                  line-height: 22px;
                `}
              >
                热门产品
              </div>
              {HOT_PRODUCTS.map((product) => (
                <div
                  key={product.name}
                  className={css`
                    border-radius: 4px;
                    padding: 16px;
                    margin-top: 4px;
                    display: flex;
                    cursor: pointer;
                    &:hover {
                      background-color: ${token.colorBgTextHover};
                    }
                  `}
                >
                  <img src="https://gw.alipayobjects.com/zos/antfincdn/6FTGmLLmN/bianzu%25252013.svg" />
                  <div
                    style={{
                      marginInlineStart: 14,
                    }}
                  >
                    <div
                      className={css`
                        font-size: 14px;
                        color: ${token.colorText};
                        line-height: 22px;
                      `}
                    >
                      {product.name}
                    </div>
                    <div
                      className={css`
                        font-size: 12px;
                        color: ${token.colorTextSecondary};
                        line-height: 20px;
                      `}
                    >
                      {product.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            paddingInlineStart: 8,
            paddingInlineEnd: 12,
            alignItems: 'center',
          }}
          className={css`
            &:hover {
              background-color: ${token.colorBgTextHover};
            }
          `}
        >
          <span> 企业级资产中心</span>
          <CaretDownFilled />
        </div>
      </Popover>
    </div>
  );
};

const Demo = () => {
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: 'top',
    splitMenus: true,
  };

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
        location={{
          pathname,
        }}
        menu={{
          type: 'group',
        }}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '书琰',
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
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </div>
        )}
        headerTitleRender={(logo, title, _) => {
          const defaultDom = (
            <a
              onClick={() => {
                console.log('titheaderTitle clicked');
              }}
            >
              {logo}
              {title}
            </a>
          );
          if (
            typeof document === 'undefined' ||
            document.body.clientWidth < 1400
          ) {
            return defaultDom;
          }
          if (_.isMobile) return defaultDom;
          return (
            <>
              {defaultDom}
              <MenuCard />
            </>
          );
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
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
