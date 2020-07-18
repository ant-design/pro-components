import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageContainer } from '../../../src/';
import { useIntl } from 'umi';

export default (): React.ReactNode => (
  <PageContainer>
    <Card>
      <Alert
        message={useIntl().formatMessage({ id: 'app.alert.umi-ui-released' })}
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 48,
        }}
      />
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You
      </Typography.Title>
    </Card>
    <p style={{ textAlign: 'center', marginTop: 24 }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageContainer>
);
