import React from 'react';
import { Progress } from '@ant-design/charts'; // https://charts.ant.design/

interface MiniProgressProps {
  bgColor?: string;
  percent?: number;
}

const MiniProgress: React.FC<MiniProgressProps> = ({ bgColor = '#5B8FF9', percent = 0.3 }) => {
  return (
    <Progress height={20} barWidthRatio={0.5} percent={percent} color={[bgColor, '#E8EDF3']} />
  );
};

export default MiniProgress;
