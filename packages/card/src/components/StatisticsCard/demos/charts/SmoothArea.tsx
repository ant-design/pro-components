import React from 'react';
import { Area } from '@ant-design/charts'; // https://charts.ant.design/

export default () => {
  const data = [
    { index: '2007', value: 10 },
    { index: '2008', value: 10 },
    { index: '2009', value: 10 },
    { index: '2010', value: 10 },
    { index: '2011', value: 11 },
    { index: '2012', value: 11 },
    { index: '2013', value: 11 },
    { index: '2014', value: 11 },
    { index: '2015', value: 11 },
    { index: '2016', value: 9 },
    { index: '2017', value: 10 },
    { index: '2018', value: 9.8 },
    { index: '2019', value: 12 },
  ];

  // 面积图config
  const configArea = {
    height: 104,
    data,
    autoFit: true,
    xField: 'index',
    yField: 'value',
    areaStyle: {
      fill: 'l(90) 0:#5B8FF9 0.2:#ffffff 1:#ffffff',
    },
    smooth: true,
    xAxis: false,
    line: {},
    yAxis: {
      min: 9, // min max 根据实际数据设置
      max: 12,
      tickCount: 2,
      label: null,
      grid: {
        line: null,
      },
    },
  };
  return <Area {...configArea} />;
};
