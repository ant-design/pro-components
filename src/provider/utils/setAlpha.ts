import { TinyColor } from '@ctrl/tinycolor';

export const setAlpha = (baseColor: string, alpha: number) =>
  new TinyColor(baseColor).setAlpha(alpha).toRgbString();
