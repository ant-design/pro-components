import React from 'react';
import PageHeaderWrapper from '../components/PageHeaderWrapper';
import { RouteContext, GridContent } from '../../../src/index';

const Welcome = () => (
  <RouteContext.Consumer>
    {value => {
      return (
        <PageHeaderWrapper {...value}>
          <GridContent>
            <div
              style={{
                height: '1200px',
              }}
            >
              <p style={{ textAlign: 'center' }}>
                想要添加更多页面？请参考{' '}
                <a
                  href="https://umijs.org/guide/block.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  umi 区块
                </a>
                。
              </p>
            </div>
          </GridContent>
        </PageHeaderWrapper>
      );
    }}
  </RouteContext.Consumer>
);
export default Welcome;
