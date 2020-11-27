import React from 'react';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';

export default () => {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        menuItemRender={(item, dom) => <div>pre {dom}</div>}
        subMenuItemRender={(_, dom) => <div>pre {dom}</div>}
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
        {...defaultProps}
        location={{
          pathname: '/welcome',
        }}
      >
        <PageContainer content="欢迎使用">Hello World</PageContainer>
      </ProLayout>
    </div>
  );
};
