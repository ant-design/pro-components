import { MappingAlgorithm } from 'antd-style';

export const lightAlgorithm: MappingAlgorithm = (_, mapToken) => {
  const primaryColors = [
    '#ffffff',
    '#d9ebfb',
    '#b4d6f7',
    '#90c0f5',
    '#6caaf5',
    '#4792f8',
    '#1677ff',
    '#0568e0',
    '#005ac0',
    '#004ca1',
    '#003e84',
  ];
  return {
    ...mapToken,
    colorBgLayout: 'hsl(220,23%,97%)',
    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryTextHover: primaryColors[8],
    colorPrimaryText: primaryColors[9],
    colorPrimaryTextActive: primaryColors[10],
  } as ReturnType<MappingAlgorithm>;
};
