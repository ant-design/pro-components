import { clsx } from 'clsx';
import React, { useMemo } from 'react';

export type LoginFormHeaderProps = {
  logo?: React.ReactNode;
  title?: React.ReactNode | false;
  subTitle?: React.ReactNode | false;
  /** CSS 前缀（来自 context.getPrefixCls，由调用方传入） */
  prefixCls: string;
  hashId?: string;
};

/**
 * LoginForm / LoginFormPage 共用的顶部 header：
 * - logo（string → <img>，ReactNode → 原样）
 * - title
 * - subTitle（desc 区）
 */
export const LoginFormHeader: React.FC<LoginFormHeaderProps> = ({
  logo,
  title,
  subTitle,
  prefixCls,
  hashId,
}) => {
  const getCls = (className: string) => `${prefixCls}-${className}`;

  const logoDom = useMemo(() => {
    if (!logo) return null;
    if (typeof logo === 'string') {
      return <img src={logo} alt="" />;
    }
    return logo;
  }, [logo]);

  return (
    <div className={clsx(getCls('top'), hashId)}>
      {title || logoDom ? (
        <div className={clsx(getCls('header'), hashId)}>
          {logoDom ? (
            <span className={clsx(getCls('logo'), hashId)}>{logoDom}</span>
          ) : null}
          {title ? (
            <span className={clsx(getCls('title'), hashId)}>{title}</span>
          ) : null}
        </div>
      ) : null}
      {subTitle ? (
        <div className={clsx(getCls('desc'), hashId)}>{subTitle}</div>
      ) : null}
    </div>
  );
};
