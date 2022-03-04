import { CopyrightOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import type { CSSProperties } from 'react';
import React, { Fragment } from 'react';

import GlobalFooter from './components/GlobalFooter';
import type { WithFalse } from './typings';

const { Footer } = Layout;

export type FooterProps = {
  links?: WithFalse<
    {
      key?: string;
      title: React.ReactNode;
      href: string;
      blankTarget?: boolean;
    }[]
  >;
  copyright?: WithFalse<string>;
  style?: CSSProperties;
  className?: string;
  prefixCls?: string;
};

const FooterView: React.FC<FooterProps> = ({
  links,
  copyright,
  style,
  className,
  prefixCls,
}: FooterProps) => (
  <Footer className={className} style={{ padding: 0, ...style }}>
    <GlobalFooter
      links={links}
      prefixCls={prefixCls}
      copyright={
        copyright === false ? null : (
          <Fragment>
            <CopyrightOutlined /> {copyright}
          </Fragment>
        )
      }
    />
  </Footer>
);

export default FooterView;
