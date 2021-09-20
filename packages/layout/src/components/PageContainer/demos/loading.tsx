import React, { useState, useEffect, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

export default () => {
  const customLoadingDom = useMemo(
    () => <div style={{ color: 'red', padding: '30px', textAlign: 'center' }}>自定义加载...</div>,
    [],
  );
  const [customLoading, setCustomLoading] = useState<React.ReactNode | boolean>(customLoadingDom);

  useEffect(() => {
    setTimeout(() => {
      setCustomLoading(false);
    }, 3000);
  }, []);

  return (
    <div
      style={{
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
        height: '100vh',
        background: '#F5F7FA',
      }}
    >
      <Card>
        <PageContainer
          ghost
          loading
          header={{
            title: '默认loading',
            breadcrumb: {
              routes: [
                {
                  path: '',
                  breadcrumbName: '一级页面',
                },
                {
                  path: '',
                  breadcrumbName: '二级页面',
                },
                {
                  path: '',
                  breadcrumbName: '当前页面',
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
              routes: [
                {
                  path: '',
                  breadcrumbName: '一级页面',
                },
                {
                  path: '',
                  breadcrumbName: '二级页面',
                },
                {
                  path: '',
                  breadcrumbName: '当前页面',
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
              routes: [
                {
                  path: '',
                  breadcrumbName: '一级页面',
                },
                {
                  path: '',
                  breadcrumbName: '二级页面',
                },
                {
                  path: '',
                  breadcrumbName: '当前页面',
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
