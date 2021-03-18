import './index.less';

import React, { useContext } from 'react';
import classNames from 'classnames';
import type { WithFalse } from '../../typings';
import { ConfigProvider } from 'antd';

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

export default ({ className, prefixCls, links, copyright, style }: GlobalFooterProps) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls(prefixCls || 'pro-global-footer');

  if (
    (links == null || links === false || (Array.isArray(links) && links.length === 0)) &&
    (copyright == null || copyright === false)
  ) {
    return null;
  }

  const clsString = classNames(baseClassName, className);
  return (
    <div className={clsString} style={style}>
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
      {copyright && <div className={`${baseClassName}-copyright`}>{copyright}</div>}
    </div>
  );
};
