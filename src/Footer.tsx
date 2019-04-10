import { Icon, Layout } from 'antd';
import React, { Fragment } from 'react';
import GlobalFooter from './GlobalFooter';

const { Footer } = Layout;

const FooterView: React.SFC = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
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
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 蚂蚁金服体验技术部出品
        </Fragment>
      }
    />
  </Footer>
);

export default FooterView;
