import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { Fragment, CSSProperties } from 'react';

import GlobalFooter from './GlobalFooter';
import { WithFalse } from './typings';

const { Footer } = Layout;

const defaultLinks = [
  {
    key: 'Ant Design Pro',
    title: 'Ant Design Pro',
    href: 'https://pro.ant.design',
    blankTarget: true,
  },
  {
    key: 'github',
    title: <GithubOutlined />,
    href: 'https://github.com/ant-design/ant-design-pro',
    blankTarget: true,
  },
  {
    key: 'Ant Design',
    title: 'Ant Design',
    href: 'https://ant.design',
    blankTarget: true,
  },
];

const defaultCopyright = '2019 蚂蚁金服体验技术部出品';

export interface FooterProps {
  links?: WithFalse<
    {
      key?: string;
      title: React.ReactNode;
      href: string;
      blankTarget?: boolean;
    }[]
  >;
  copyright?: WithFalse<String>;
  style?: CSSProperties;
  className?: string;
}

const FooterView: React.FC<FooterProps> = ({
  links,
  copyright,
  style,
  className,
}: FooterProps) => (
  <Footer className={className} style={{ padding: 0, ...style }}>
    <GlobalFooter
      links={links !== undefined ? links : defaultLinks}
      copyright={
        copyright === false ? null : (
          <Fragment>
            Copyright <CopyrightOutlined /> {copyright || defaultCopyright}
          </Fragment>
        )
      }
    />
  </Footer>
);

export default FooterView;
