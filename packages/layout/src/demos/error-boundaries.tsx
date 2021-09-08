import React, { useState } from 'react';
import { Button, Result } from 'antd';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';

const CustomErrorPage = () => {
  return (
    <Result
      status="warning"
      style={{
        height: '100%',
        background: '#fff',
      }}
      title="错误处理"
      extra={
        <>
          <div
            style={{
              maxWidth: 620,
              textAlign: 'left',
              backgroundColor: 'rgba(255,229,100,0.3)',
              borderLeftColor: '#ffe564',
              borderLeftWidth: '9px',
              borderLeftStyle: 'solid',
              padding: '20px 45px 20px 26px',
              margin: 'auto',
              marginBottom: '30px',
              marginTop: '20px',
            }}
          >
            <p>注意</p>
            <p>
              错误边界<strong>无法</strong>捕获以下场景中产生的错误：
            </p>
            <ul
              style={{
                listStyle: 'none',
              }}
            >
              <li>
                事件处理（
                <a href="https://zh-hans.reactjs.org/docs/error-boundaries.html#how-about-event-handlers#how-about-event-handlers">
                  了解更多
                </a>
                ）
              </li>
              <li>
                异步代码（例如 <code>setTimeout</code> 或 <code>requestAnimationFrame</code>{' '}
                回调函数）
              </li>
              <li>服务端渲染</li>
              <li>它自身抛出来的错误（并非它的子组件）</li>
            </ul>
          </div>
          <Button
            danger
            type="primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            刷新页面
          </Button>
        </>
      }
    />
  );
};

const ErrorTriggerTestPage = () => {
  const [error, setError] = useState<boolean>(false);
  if (error) throw new Error('渲染发生了错误');
  return (
    <Button
      danger
      type="primary"
      onClick={() => {
        setError(true);
      }}
    >
      触发错误
    </Button>
  );
};

export default () => {
  const [pathname, setPathname] = useState('/default');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        route={{
          path: '/',
          routes: [
            {
              path: '/default',
              name: '默认错误',
            },
            {
              path: '/custom',
              name: '自定义错误',
            },
          ],
        }}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        ErrorBoundary={pathname === '/custom' ? CustomErrorPage : undefined}
      >
        <PageContainer>
          <ErrorTriggerTestPage />
        </PageContainer>
      </ProLayout>
    </div>
  );
};
