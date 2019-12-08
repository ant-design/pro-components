import React, { useState } from 'react';
import { Avatar } from 'antd';

import BasicLayout, {
  SettingDrawer,
  PageHeaderWrapper,
  DefaultFooter,
} from '../src/';
import defaultProps from './defaultProps';
import customMenu from './customMenu';
import ReactMarkdown from 'react-markdown/with-html';

import README from '../README.zh-CN.md';

export default { title: 'BasicLayout' };

export const READECN = () => (
  <div
    className="markdown-body entry-content"
    style={{
      padding: 24,
      backgroundColor: '#FFF',
    }}
  >
    <ReactMarkdown className="markdown" source={README} escapeHtml={false} />
  </div>
);
READECN.story = {
  name: 'README',
};

export const Basic = () => <BasicLayout>Hello World</BasicLayout>;

Basic.story = {
  name: '基本使用',
  parameters: {
    notes: {
      markdown: README,
    },
  },
};

export const CustomMenu = () => (
  <BasicLayout
    menuDataRender={() => customMenu}
    menuItemRender={(menuItemProps, defaultDom) =>
      menuItemProps.isUrl ? defaultDom : <a>open {defaultDom}</a>
    }
  >
    Hello World
  </BasicLayout>
);

CustomMenu.story = {
  name: '自定义菜单',
  parameters: {
    notes: {
      markdown: README,
    },
  },
};

export const CustomHeader = () => (
  <BasicLayout
    {...defaultProps}
    title="Remax"
    logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
    menuHeaderRender={(logo, title) => (
      <div
        id="customize_menu_header"
        onClick={() => {
          window.open('https://remaxjs.org/');
        }}
      >
        {logo}
        {title}
      </div>
    )}
  />
);

CustomHeader.story = {
  name: '自定义头',
  parameters: {
    notes: {
      markdown: README,
    },
  },
};

export const CloseFooter = () => (
  <BasicLayout footerRender={false} {...defaultProps} />
);

CloseFooter.story = {
  name: '关闭页脚',
  parameters: {
    notes: {
      markdown: README,
    },
  },
};

export const CustomFooter = () => (
  <BasicLayout
    footerRender={() => (
      <DefaultFooter
        links={[
          { key: 'test', title: 'layout', href: 'www.alipay.com' },
          { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
        ]}
        copyright="这是一条测试文案"
      ></DefaultFooter>
    )}
    {...defaultProps}
  />
);

CustomFooter.story = {
  name: '自定义页脚',
  parameters: {
    notes: {
      markdown: README,
    },
  },
};

export const UsePageHeader = () => {
  const [activeKey, setActiveKey] = useState<string>('key1');
  return (
    <>
      <BasicLayout {...defaultProps}>
        <PageHeaderWrapper
          tabList={[
            { tab: 'key1', key: 'key1' },
            { tab: 'key2', key: 'key2' },
          ]}
          tabProps={{
            activeKey,
            onChange: key => {
              setActiveKey(key);
            },
          }}
        >
          Hello World
        </PageHeaderWrapper>
      </BasicLayout>
    </>
  );
};

UsePageHeader.story = {
  name: '使用 PageHeader',
  parameters: {
    notes: {
      markdown: README,
    },
  },
};

export const Drawer = () => {
  const [collapsed, handleMenuCollapse] = useState<boolean>(true);
  const [settings, setSettings] = useState({});
  return (
    <>
      <BasicLayout
        collapsed={collapsed}
        onCollapse={handleMenuCollapse}
        {...defaultProps}
        {...settings}
      >
        Hello World
      </BasicLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config => setSettings(config)}
      />
    </>
  );
};

Drawer.story = {
  name: '使用 Drawer',
  parameters: {
    notes: {
      markdown: README,
    },
  },
};

export const NestedLayout = () => (
  <BasicLayout
    {...defaultProps}
    layout="topmenu"
    rightContentRender={() => (
      <div
        style={{
          padding: '0px 16px',
        }}
      >
        <Avatar icon="user" />
      </div>
    )}
    contentStyle={{ margin: 0 }}
  >
    <BasicLayout menuHeaderRender={false} {...defaultProps}>
      Hello World
    </BasicLayout>
  </BasicLayout>
);

NestedLayout.story = {
  name: '嵌套 Layout',
  parameters: {
    notes: {
      markdown: README,
    },
  },
};
