import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';
import defaultProps from './_defaultProps';

export default () => {
  const [pathname, setPathname] = useState('/product/list/on-sale');

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        layout="side"
        splitMenus
        fixSiderbar
        headerTitleRender={(logo, title) => (
          <a
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {logo}
            {title}
          </a>
        )}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </div>
        )}
      >
        <PageContainer>
          <ProCard
            style={{
              height: '100vh',
              minHeight: 800,
            }}
          >
            <div />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
