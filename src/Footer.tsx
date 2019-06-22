import { Icon, Layout } from 'antd';
import React, { Fragment } from 'react';

import GlobalFooter from './GlobalFooter';

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
    title: <Icon type="github" />,
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
  links?: {
    key?: string;
    title: React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }[];
  copyright?: string;
}

const FooterView: React.FC<FooterProps> = ({ links, copyright }: FooterProps) => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={links || defaultLinks}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> {copyright || defaultCopyright}
        </Fragment>
      }
    />
  </Footer>
);

export default FooterView;
