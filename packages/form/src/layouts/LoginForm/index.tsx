import { ConfigProvider } from 'antd';
import React, { useContext } from 'react';
import type { BaseFormProps } from '../../BaseForm';
import ProForm from '../ProForm';

import './index.less';

export type LoginFormProps = {
  message: React.ReactNode | false;
  title: React.ReactNode | false;
  subTitle: React.ReactNode | false;
  submitting: boolean;
  onFinish: BaseFormProps['onFinish'];
  submitter: BaseFormProps['submitter'];
  actions: React.ReactNode;
};

const LoginForm: React.FC<Partial<LoginFormProps>> = ({
  title,
  subTitle,
  message,
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
  actions,
}) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-login');
  const getCls = (className: string) => `${baseClassName}-${className}`;
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
            {message}
            {children}
          </ProForm>
          <div className={getCls('other')}>{actions}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
