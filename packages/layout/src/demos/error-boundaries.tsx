import React from 'react';
import { Button, Result } from 'antd';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';

export default () => {
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
          pathname: '/welcome',
        }}
      >
        <PageContainer>
          <div
            style={{
              height: '120vh',
            }}
          >
            <Result
              status="404"
              style={{
                height: '100%',
                background: '#fff',
              }}
              title="Hello World"
              subTitle="Sorry, you are not authorized to access this page."
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    throw new Error('发生了错误');
                  }}
                >
                  触发错误
                </Button>
              }
            />
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
