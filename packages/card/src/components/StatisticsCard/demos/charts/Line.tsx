import React from 'react';
import { Line } from '@ant-design/charts'; // https://charts.ant.design/

export default ({ height = 500, autoFit = true }) => {
  const data = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
  ];

  const config = {
    autoFit,
    height,
    data,
    xField: 'year',
    yField: 'value',
    label: {},
    yAxis: {
      nice: true,
      min: 0,
      max: 15,
    },
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5b8ff9',
        lineWidth: 2,
      },
    },
  };
  return <Line {...config} />;
};
