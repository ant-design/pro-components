import { Card, Skeleton, Space } from 'antd';
import React from 'react';
import { PageHeaderSkeleton } from '../List';

type ResultPageSkeletonProps = {
  active?: boolean;
  pageHeader?: false;
};

const ResultPageSkeleton: React.FC<ResultPageSkeletonProps> = ({
  active = true,
  pageHeader,
}) => (
  <div
    style={{
      width: '100%',
    }}
  >
    {pageHeader !== false && <PageHeaderSkeleton active={active} />}
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 128,
        }}
      >
        <Skeleton.Avatar
          size={64}
          style={{
            marginBlockEnd: 32,
          }}
        />
        <Skeleton.Button
          active={active}
          style={{ width: 214, marginBlockEnd: 8 }}
        />
        <Skeleton.Button active={active} style={{ width: 328 }} size="small" />
        <Space
          style={{
            marginBlockStart: 24,
          }}
        >
          <Skeleton.Button active={active} style={{ width: 116 }} />
          <Skeleton.Button active={active} style={{ width: 116 }} />
        </Space>
      </div>
    </Card>
  </div>
);

export default ResultPageSkeleton;
