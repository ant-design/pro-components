import { token2CSSVar } from '@ant-design/cssinjs';
import { genCalc } from '@ant-design/cssinjs-utils';

const unitlessCssVar = new Set<string>();
const unitless: Record<string, boolean> = {
  lineHeight: true,
  lineHeightSM: true,
  lineHeightLG: true,
  lineHeightHeading1: true,
  lineHeightHeading2: true,
  lineHeightHeading3: true,
  lineHeightHeading4: true,
  lineHeightHeading5: true,
  opacityLoading: true,
  fontWeightStrong: true,
  zIndexPopupBase: true,
  zIndexBase: true,
  opacityImage: true,
};

/**
 * Use antd's CSS calculator only when cssVar mode is active. Plain themes keep
 * their original numeric interpolation, while CSS themes emit calc() safely.
 */
export const createStyleCalc = (cssVarPrefix?: string) => {
  if (!cssVarPrefix) return undefined;
  Object.keys(unitless).forEach((key) => {
    unitlessCssVar.add(token2CSSVar(key, cssVarPrefix));
  });
  return genCalc('css', unitlessCssVar);
};

export type StyleCalc = NonNullable<ReturnType<typeof createStyleCalc>>;

export const addUnit = (
  value: number | string,
  calc?: StyleCalc,
  unit = 'px',
) => (calc ? calc(value).equal({ unit: unit === 'px' }) : `${value}${unit}`);
