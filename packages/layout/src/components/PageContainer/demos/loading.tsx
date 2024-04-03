import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

export default () => {
  const customLoadingDom = useMemo(
    () => (
      <div style={{ color: 'red', padding: '30px', textAlign: 'center' }}>
        自定义加载...
      </div>
    ),
    [],
  );
  const [customLoading, setCustomLoading] = useState<React.ReactNode | boolean>(
    customLoadingDom,
  );

  useEffect(() => {
    if (process.env.NODE_ENV?.toLocaleLowerCase() === 'test') {
      return;
    }
    setTimeout(() => {
      setCustomLoading(false);
    }, 3000);
  }, []);

  return (
    <div
      style={{
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
        minHeight: '100vh',
        background: '#F5F7FA',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 24,
      }}
    >
      <Card>
        <PageContainer
          ghost
          loading
          header={{
            title: '默认loading',
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: '一级页面',
                },
                {
                  path: '',
                  title: '二级页面',
                },
                {
                  path: '',
                  title: '当前页面',
                },
              ],
            },
          }}
        >
          <div
            style={{
              height: '100vh',
            }}
          >
            加载中这里不显示
          </div>
        </PageContainer>
      </Card>
      <Card>
        <PageContainer
          ghost
          loading={{
            spinning: true,
            className: 'customClassName',
            tip: '拼命加载中...',
          }}
          header={{
            title: '自定义loading属性',
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: '一级页面',
                },
                {
                  path: '',
                  title: '二级页面',
                },
                {
                  path: '',
                  title: '当前页面',
                },
              ],
            },
          }}
        >
          <div
            style={{
              height: '100vh',
            }}
          >
            加载中这里不显示
          </div>
        </PageContainer>
      </Card>
      <Card>
        <PageContainer
          ghost
          loading={customLoading}
          header={{
            title: '自定义loading，3s后显示内容',
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: '一级页面',
                },
                {
                  path: '',
                  title: '二级页面',
                },
                {
                  path: '',
                  title: '当前页面',
                },
              ],
            },
          }}
        >
          <div
            style={{
              height: '100vh',
            }}
          >
            加载中这里不显示
          </div>
        </PageContainer>
      </Card>
    </div>
  );
};
