import React from 'react';
import { RingProgress } from '@ant-design/charts';

export default ({
  height = 64,
  width = 64,
  percent = 0.8,
  bgColor = '#30BF78',
  ringProps = {},
}) => {
  const config = {
    width,
    height,
    percent,
    color: [bgColor, '#E8EDF3'],
    ...ringProps,
  };
  return <RingProgress {...config} />;
};
