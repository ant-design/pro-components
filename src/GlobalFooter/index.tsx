import './index.less';

import React from 'react';
import classNames from 'classnames';
import { WithFalse } from '../typings';

export interface GlobalFooterProps {
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
}

export default ({
  className,
  prefixCls = 'ant-pro',
  links,
  copyright,
  style,
}: GlobalFooterProps) => {
  if (
    (links == null ||
      links === false ||
      (Array.isArray(links) && links.length === 0)) &&
    (copyright == null || copyright === false)
  ) {
    return null;
  }
  const baseClassName = `${prefixCls}-global-footer`;
  const clsString = classNames(baseClassName, className);
  return (
    <footer className={clsString} style={style}>
      {links && (
        <div className={`${baseClassName}-links`}>
          {links.map((link) => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && (
        <div className={`${baseClassName}-copyright`}>{copyright}</div>
      )}
    </footer>
  );
};
