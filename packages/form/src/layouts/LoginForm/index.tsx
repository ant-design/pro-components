import type { GithubOutlined } from '@ant-design/icons';
import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import type { AlertProps, TabPaneProps, TabsProps } from 'antd';
import { Alert, Space, Tabs } from 'antd';
import React, { useContext } from 'react';
import ProForm from '@ant-design/pro-form';
import type { FooterProps } from '@ant-design/pro-layout';
import { DefaultFooter } from '@ant-design/pro-layout';

import './index.less';
import type { BaseFormProps } from '../../BaseForm';
import ConfigProvider from 'antd/es/config-provider';

type AntdIconType = typeof GithubOutlined;
export type OtherLoginMethodsProps = {
  methods: { icon: AntdIconType; key: string }[];
  onClick: (key: string) => void;
};

export type LoginFormProps = {
  tabs: TabPaneProps[];
  onTabChange: TabsProps['onChange'];
  tabActiveKey: TabsProps['activeKey'];
  loginMessage: Pick<AlertProps, 'message' | 'type' | 'showIcon'>;
  title: React.ReactNode | false;
  subTitle: React.ReactNode | false;
  submitting: boolean;
  onFinish: BaseFormProps['onFinish'];
  submitter: BaseFormProps['submitter'];
  footerProps: FooterProps | false;
  otherLoginMethodsProps: OtherLoginMethodsProps | false;
};

const useClassName = () => {
  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-login');
  const getCls = (className: string) => `${baseClassName}-${className}`;
  return { getCls };
};

const OtherLoginMethods: React.FC<Partial<OtherLoginMethodsProps>> = ({ methods, onClick }) => {
  const { getCls } = useClassName();
  return (
    <Space className={getCls('other')}>
      其他登录方式
      {methods?.map(({ icon: Icon, key }) => (
        <Icon
          key={key}
          onClick={() => {
            if (onClick) {
              onClick(key);
            }
          }}
          className={getCls('icon')}
        ></Icon>
      ))}
    </Space>
  );
};

const LoginMessage: React.FC<LoginFormProps['loginMessage']> = (props) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    {...props}
  />
);

const LoginForm: React.FC<Partial<LoginFormProps>> = ({
  tabs,
  title,
  subTitle,
  loginMessage,
  tabActiveKey,
  onTabChange,
  children,
  submitting,
  onFinish,
  submitter = {
    searchConfig: {
      submitText: '登录',
    },
    render: (_, dom) => dom.pop(),
    submitButtonProps: {
      loading: submitting,
      size: 'large',
      style: {
        width: '100%',
      },
    },
  },
  footerProps = false,
  otherLoginMethodsProps = {
    methods: [
      {
        icon: AlipayCircleOutlined,
        key: 'alipay',
      },
      {
        icon: WeiboCircleOutlined,
        key: 'weibo',
      },
      {
        icon: TaobaoCircleOutlined,
        key: 'taobao',
      },
    ],
  },
}) => {
  const { getCls } = useClassName();
  return (
    <div className={getCls('container')}>
      <div className={getCls('content')}>
        <div className={getCls('top')}>
          <div className={getCls('header')}>
            <span className={getCls('title')}>{title}</span>
          </div>
          <div className={getCls('desc')}>{subTitle}</div>
        </div>
        <div className={getCls('main')}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={submitter}
            onFinish={onFinish}
          >
            {tabs && (
              <Tabs activeKey={tabActiveKey} onChange={onTabChange}>
                {tabs.map((tab) => (
                  <Tabs.TabPane key={tab.tabKey} {...tab}></Tabs.TabPane>
                ))}
              </Tabs>
            )}
            {loginMessage?.message && <LoginMessage {...loginMessage} />}
            {children}
          </ProForm>
          {otherLoginMethodsProps && (
            <OtherLoginMethods {...otherLoginMethodsProps}></OtherLoginMethods>
          )}
        </div>
      </div>
      {footerProps && <DefaultFooter {...footerProps}></DefaultFooter>}
    </div>
  );
};

export default LoginForm;
