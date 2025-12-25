import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

export default () => {
  const customLoadingDom = useMemo(
    () => (
      <div style={{ color: 'red', padding: '30px', textAlign: 'center' }}>
        Custom loading...
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
    <div style={{ padding: 24 }}>

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
            title: 'Default loading',
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: 'Primary page',
                },
                {
                  path: '',
                  title: 'Secondary page',
                },
                {
                  path: '',
                  title: 'Current page',
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
            If in loading state, this content will not be displayed
          </div>
        </PageContainer>
      </Card>
      <Card>
        <PageContainer
          ghost
          loading={{
            spinning: true,
            className: 'customClassName',
            tip: 'Loading relentlessly...',
          }}
          header={{
            title: 'Custom loading property',
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: 'Primary page',
                },
                {
                  path: '',
                  title: 'Secondary page',
                },
                {
                  path: '',
                  title: 'Current page',
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
            If in loading state, this content will not be displayed
          </div>
        </PageContainer>
      </Card>
      <Card>
        <PageContainer
          ghost
          loading={customLoading}
          header={{
            title: 'Custom loading, display content after 3 seconds',
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: 'Primary page',
                },
                {
                  path: '',
                  title: 'Secondary page',
                },
                {
                  path: '',
                  title: 'Current page',
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
            If in loading state, this content will not be displayed
          </div>
        </PageContainer>
      </Card>
    </div>
  
    </div>
  );
};
