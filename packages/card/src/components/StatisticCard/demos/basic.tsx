import React from 'react';
import { RightOutlined, EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';
import { Space } from 'antd';
import MiniArea from './charts/MiniArea';
import MiniProgress from './charts/MiniProgress';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <StatisticCard
      title={
        <Space>
          <span>部门一</span>
          <RightOutlined style={{ color: 'rgba(0,0,0,0.65)' }} />
        </Space>
      }
      extra={<EllipsisOutlined />}
      statistic={{
        value: 1102893,
        prefix: '¥',
        description: (
          <Space>
            <Statistic title="实际完成度" value="82.3%" />
            <Statistic title="当前目标" value="¥6000" />
          </Space>
        ),
      }}
      chart={
        <>
          <MiniProgress bgColor="#F4664A" />
          <MiniArea />
        </>
      }
      style={{ width: 268 }}
    />
  );
};
