import { ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import React, { useContext } from 'react';
import type { WithFalse } from '../../typing';
import { useStyle } from './style';

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

const GlobalFooter = ({
  className,
  prefixCls,
  links,
  copyright,
  style,
}: GlobalFooterProps) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls(prefixCls || 'pro-global-footer');

  const { hashId } = useStyle(baseClassName);

  if (
    (links == null ||
      links === false ||
      (Array.isArray(links) && links.length === 0)) &&
    (copyright == null || copyright === false)
  ) {
    return null;
  }

  return (
    <div
      className={clsx(baseClassName, hashId, className)}
      style={style}
      data-testid="pro-global-footer"
    >
      {links && (
        <div
          className={clsx(`${baseClassName}-list`, hashId)}
          data-testid="pro-global-footer-list"
        >
          {links.map((link) => (
            <a
              className={clsx(`${baseClassName}-list-link`, hashId)}
              data-testid="pro-global-footer-list-link"
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
          className={clsx(`${baseClassName}-copyright`, hashId)}
          data-testid="pro-global-footer-copyright"
        >
          {copyright}
        </div>
      )}
    </div>
  );
};

export { GlobalFooter };
