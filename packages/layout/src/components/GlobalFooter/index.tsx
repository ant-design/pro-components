import { ConfigProvider } from 'antd';
import React, { useContext } from 'react';
import { css, cx } from '../../emotion';
import { ProLayoutContext } from '../../ProLayoutContext';
import type { WithFalse } from '../../typings';

export type GlobalFooterProps = {
  links?: WithFalse<
    {
      key?: string;
      title: React.ReactNode;
      href: string;
      blankTarget?: boolean;
    }[]
  >;
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
};

const GlobalFooter = ({ className, prefixCls, links, copyright, style }: GlobalFooterProps) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const designToken = useContext(ProLayoutContext);
  const baseClassName = context.getPrefixCls(prefixCls || 'pro-global-footer');

  if (
    (links == null || links === false || (Array.isArray(links) && links.length === 0)) &&
    (copyright == null || copyright === false)
  ) {
    return null;
  }

  return (
    <div
      className={cx(
        baseClassName,
        className,
        css`
          margin: 48px 0 24px 0;
          padding: 0 16px;
          text-align: center;
        `,
      )}
      style={style}
    >
      {links && (
        <div
          className={cx(
            `${baseClassName}-links`,
            css`
              margin-bottom: 8px;
              a {
                color: ${designToken.colorTextSecondary};
                transition: all 0.3s;
                &:not(:last-child) {
                  margin-right: 40px;
                }
                &:hover {
                  color: ${designToken.colorText};
                }
              }
            `,
          )}
        >
          {links.map((link) => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
              rel="noreferrer"
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && (
        <div
          className={cx(
            `${baseClassName}-copyright`,
            css`
              font-size: 14px;
              color: ${designToken.colorTextSecondary};
            `,
          )}
        >
          {copyright}
        </div>
      )}
    </div>
  );
};

export { GlobalFooter };
