import { ConfigProvider } from 'antd';
import React, { useContext } from 'react';
import type { ProFormProps } from '../ProForm';
import ProForm from '../ProForm';
import merge from 'lodash.merge';

import './index.less';

export type LoginFormProps<T> = {
  message: React.ReactNode | false;
  title: React.ReactNode | false;
  subTitle: React.ReactNode | false;
  submitting: boolean;
  actions: React.ReactNode;
} & ProFormProps<T>;

function LoginForm<T = Record<string, any>>(props: Partial<LoginFormProps<T>>) {
  const { message, title, subTitle, submitting, actions, children, ...proFormProps } = props;
  const submitter = merge(
    {},
    {
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
    } as ProFormProps['submitter'],
    proFormProps.submitter,
  );
  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-login');
  const getCls = (className: string) => `${baseClassName}-${className}`;
  return (
    <div className={getCls('container')}>
      <div className={getCls('top')}>
        {title ? (
          <div className={getCls('header')}>
            <span className={getCls('title')}>{title}</span>
          </div>
        ) : null}
        {subTitle ? <div className={getCls('desc')}>{subTitle}</div> : null}
      </div>
      <div className={getCls('main')}>
        <ProForm submitter={submitter} {...proFormProps}>
          {message}
          {children}
        </ProForm>
        {actions ? <div className={getCls('other')}>{actions}</div> : null}
      </div>
    </div>
  );
}
export default LoginForm;
