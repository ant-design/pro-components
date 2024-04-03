import { ConfigProvider } from 'antd';
import classNames from 'classnames';
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

  const { wrapSSR, hashId } = useStyle(baseClassName);

  if (
    (links == null ||
      links === false ||
      (Array.isArray(links) && links.length === 0)) &&
    (copyright == null || copyright === false)
  ) {
    return null;
  }

  return wrapSSR(
    <div className={classNames(baseClassName, hashId, className)} style={style}>
      {links && (
        <div className={`${baseClassName}-list ${hashId}`.trim()}>
          {links.map((link) => (
            <a
              className={`${baseClassName}-list-link ${hashId}`.trim()}
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
        <div className={`${baseClassName}-copyright ${hashId}`.trim()}>
          {copyright}
        </div>
      )}
    </div>,
  );
};

export { GlobalFooter };
