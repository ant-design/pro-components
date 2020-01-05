import React from 'react';
import { PageHeaderWrapper } from '../../../src';

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <div style={{ textAlign: 'center', minHeight: '120vh' }}>
      Want to add more pages? Please refer to{' '}
      <a
        href="https://pro.ant.design/docs/block-cn"
        target="_blank"
        rel="noopener noreferrer"
      >
        use block
      </a>
      。
    </div>
  </PageHeaderWrapper>
);
