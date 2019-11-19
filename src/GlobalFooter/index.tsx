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
  className?: string;
}

export default ({ className, links, copyright, style }: GlobalFooterProps) => {
  if (
    (links == null ||
      links === false ||
      (Array.isArray(links) && links.length === 0)) &&
    (copyright == null || copyright === false)
  ) {
    return null;
  }
  const clsString = classNames('ant-pro-global-footer', className);
  return (
    <footer className={clsString} style={style}>
      {links && (
        <div className="ant-pro-global-footer-links">
          {links.map(link => (
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
        <div className="ant-pro-global-footer-copyright">{copyright}</div>
      )}
    </footer>
  );
};
