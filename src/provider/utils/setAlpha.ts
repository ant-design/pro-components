import { TinyColor } from '@ctrl/tinycolor';

export const setAlpha = (baseColor: string, alpha: number) => {
  if (baseColor.includes('var(')) {
    const percentage = Math.round(Math.min(1, Math.max(0, alpha)) * 1e8) / 1e6;
    return `color-mix(in srgb, ${baseColor} ${percentage}%, transparent)`;
  }
  return new TinyColor(baseColor).setAlpha(alpha).toRgbString();
};
