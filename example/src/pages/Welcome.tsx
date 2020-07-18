import React from 'react';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';
import { PageContainer } from '../../../src/';
import { useIntl } from 'umi';

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => (
  <PageContainer title={useIntl().formatMessage({ id: 'menu.welcome' })}>
    <Card>
      <Alert
        message={useIntl().formatMessage({ id: 'app.alert.umi-ui-available' })}
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="https://pro.ant.design/docs/block">
          {useIntl().formatMessage({ id: 'app.welcome.link.block-list' })}
        </a>
      </Typography.Text>
      <CodePreview> npm run ui</CodePreview>
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://pro.ant.design/docs/available-script#npm-run-fetchblocks"
        >
          {useIntl().formatMessage({ id: 'app.welcome.link.fetch-blocks' })}
        </a>
      </Typography.Text>
      <CodePreview> npm run fetch:blocks</CodePreview>
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageContainer>
);
