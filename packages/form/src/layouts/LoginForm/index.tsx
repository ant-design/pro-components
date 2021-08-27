import { ConfigProvider } from 'antd';
import React, { useContext, useMemo } from 'react';
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
  logo?: React.ReactNode | string;
} & ProFormProps<T>;

function LoginForm<T = Record<string, any>>(props: Partial<LoginFormProps<T>>) {
  const { logo, message, title, subTitle, submitting, actions, children, ...proFormProps } = props;
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

  /** 生成logo 的dom，如果是string 设置为图片 如果是个 dom 就原样保留 */
  const logoDom = useMemo(() => {
    if (!logo) return null;
    if (typeof logo === 'string') {
      return <img src={logo} />;
    }
    return logo;
  }, [logo]);

  return (
    <div className={getCls('container')}>
      <div className={getCls('top')}>
        {title || logoDom ? (
          <div className={getCls('header')}>
            {logoDom ? <span className={getCls('logo')}>{logoDom}</span> : null}
            {title ? <span className={getCls('title')}>{title}</span> : null}
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
