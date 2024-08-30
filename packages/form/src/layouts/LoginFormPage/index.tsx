import { useIntl } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import type { ProFormProps } from '../ProForm';
import { ProForm } from '../ProForm';
import { useStyle } from './style';

export type LoginFormPageProps<T> = {
  /**
   * @name form 顶部的一个提示配置，可以配置一些错误的提示信息
   * @example <caption>提示登录异常</caption>
   * message={<Alert message="登录异常，请重试！"/>}
   */
  message: React.ReactNode | false;
  /**
   * @name 标题，可以配置为空
   */
  title: React.ReactNode | false;
  /**
   * @name 二级标题，可以配置为空
   */
  subTitle: React.ReactNode | false;
  /**
   * @name 自定义额外的登录功能
   *
   * @example <caption>配置支付宝登录</caption>
   * actions={<a>跳转支付宝登录</a>}
   *
   * @example <caption>使用图标</caption>
   * actions={<a><Icon type="alipay" />跳转支付宝登录</a>}
   */
  actions: React.ReactNode;
  /**
   * @name logo 的配置，支持node 和 string
   */
  logo?: React.ReactNode | string;
  /**
   * @name 整个登录页面的样式配置
   * @type  React.CSSProperties
   */
  style: React.CSSProperties;
  /**
   * @name 活动信息的配置，一个页面应该只有一个。
   * @example <caption>配置一个简单的活动。</caption>
   * activityConfig={{title:"这里有个大活动",description:"这里有个大活动的描述",action:<a>点我去看看</a>}}
   */
  activityConfig?: {
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    action?: React.ReactNode;
    style?: React.CSSProperties;
  };
  /**
   * @name 登录页面的背景图片，可以用它来设置一个背景
   *
   * @example  backgroundImageUrl="xxx.svg"
   */
  backgroundImageUrl?: string;
  /**
   * @name 登录页面的背景视频，可以用它来设置一个背景，优先级高于 backgroundImageUrl
   *
   * @example  backgroundImageUrl="xxx.svg"
   */
  backgroundVideoUrl?: string;
  children?: React.ReactNode | React.ReactNode[];

  containerStyle?: React.CSSProperties;
  mainStyle?: React.CSSProperties;
  otherStyle?: React.CSSProperties;
} & Omit<ProFormProps<T>, 'title'>;

export function LoginFormPage<T = Record<string, any>>(
  props: Partial<LoginFormPageProps<T>>,
) {
  const {
    logo,
    message,
    style,
    activityConfig,
    backgroundImageUrl,
    backgroundVideoUrl,
    title,
    subTitle,
    actions,
    children,
    containerStyle,
    otherStyle,
    mainStyle,
    ...proFormProps
  } = props;

  const intl = useIntl();

  const genSubmitButtonProps = () => {
    if (proFormProps.submitter === false) return false;
    if (proFormProps.submitter?.submitButtonProps === false) return false;
    return {
      size: 'large',
      style: {
        width: '100%',
      },
      ...proFormProps.submitter?.submitButtonProps,
    };
  };

  const submitter = {
    searchConfig: {
      submitText: intl.getMessage('loginForm.submitText', '登录'),
    },
    render: (_, dom) => dom.pop(),
    ...proFormProps.submitter,
    submitButtonProps: genSubmitButtonProps(),
  } as ProFormProps['submitter'];

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-login-page');
  const { wrapSSR, hashId } = useStyle(baseClassName);

  const getCls = (className: string) =>
    `${baseClassName}-${className} ${hashId}`.trim();

  /** 生成logo 的dom，如果是string 设置为图片 如果是个 dom 就原样保留 */
  const logoDom = useMemo(() => {
    if (!logo) return null;
    if (typeof logo === 'string') {
      return <img src={logo} />;
    }
    return logo;
  }, [logo]);

  return wrapSSR(
    <div
      className={classNames(baseClassName, hashId)}
      style={{
        ...style,
        position: 'relative',
        backgroundImage: backgroundImageUrl
          ? `url("${backgroundImageUrl}")`
          : undefined,
      }}
    >
      {backgroundVideoUrl ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <video
            src={backgroundVideoUrl}
            controls={false}
            autoPlay
            playsInline
            loop
            muted={true}
            crossOrigin="anonymous"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ) : null}
      <div className={classNames(baseClassName, hashId)}>
        <div className={getCls('notice')}>
          {activityConfig && (
            <div
              className={getCls('notice-activity')}
              style={activityConfig.style}
            >
              {activityConfig.title && (
                <div className={getCls('notice-activity-title')}>
                  {' '}
                  {activityConfig.title}{' '}
                </div>
              )}
              {activityConfig.subTitle && (
                <div className={getCls('notice-activity-subTitle')}>
                  {activityConfig.subTitle}
                </div>
              )}
              {activityConfig.action && (
                <div className={getCls('notice-activity-action')}>
                  {activityConfig.action}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={getCls('left')}>
          <div className={getCls('container')} style={containerStyle}>
            <div className={getCls('top')}>
              {title || logoDom ? (
                <div className={getCls('header')}>
                  {logoDom ? (
                    <span className={getCls('logo')}>{logoDom}</span>
                  ) : null}
                  {title ? (
                    <span className={getCls('title')}>{title}</span>
                  ) : null}
                </div>
              ) : null}
              {subTitle ? (
                <div className={getCls('desc')}>{subTitle}</div>
              ) : null}
            </div>
            <div className={getCls('main')} style={mainStyle}>
              <ProForm isKeyPressSubmit {...proFormProps} submitter={submitter}>
                {message}
                {children}
              </ProForm>
              {actions ? (
                <div className={getCls('other')} style={otherStyle}>
                  {actions}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>,
  );
}
