import React from 'react';

export default (): React.ReactNode => (
  <div
    className="tech-page-container"
    style={{
      display: 'flex',
      flexDirection: 'column',
      margin: -24,
    }}
  >
    <div
      style={{
        flex: 1,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          minHeight: '120vh',
          background: 'yellow',
        }}
      >
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
    </div>
    <div
      style={{
        height: 64,
        background: 'red',
      }}
    >
      footer
    </div>
  </div>
);
