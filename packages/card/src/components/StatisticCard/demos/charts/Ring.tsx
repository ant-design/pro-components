import React from 'react';
import { Pie } from '@ant-design/charts';

const DemoDonut: React.FC = () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其它',
      value: 5,
    },
  ];
  const config: any = {
    autoFit: true,
    height: 250,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      content: '{value}',
      autoRotate: false,
      style: {
        fill: '#333',
        stroke: '#fff',
        strokeWidth: 1,
        shadowColor: '#fff',
        shadowBlur: 4,
      },
    },
    statistic: {
      title: {
        offsetY: -10,
        formatter: () => '总计',
      },
      content: {
        offsetY: 10,
        formatter: () => '100',
      },
    },
  };
  return <Pie {...config} />;
};
export default DemoDonut;
