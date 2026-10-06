/**
 * Money 千分位/小数点互换：旧实现（regex + \\u0001）与新实现（replaceAll + fromCharCode）
 * 两边对比，锁定迁移后输出一致。
 */
import { describe, expect, it } from 'vitest';
import { getLocaleMoneyMeta } from '../../src/field/components/Money/moneyFormat';

/** 迁移前 FieldMoneyEdit formatter 中的分隔符互换写法 */
function swapSeparatorsLegacy(
  usFormatted: string,
  decimalSeparator: string,
  groupSeparator: string,
): string {
  const placeholder = '\u0001';
  return usFormatted
    .split(',')
    .join(placeholder)
    .split('.')
    .join(decimalSeparator)
    .split(placeholder)
    .join(groupSeparator);
}

/** 当前 FieldMoneyEdit 使用的写法 */
function swapSeparatorsCurrent(
  usFormatted: string,
  decimalSeparator: string,
  groupSeparator: string,
): string {
  const placeholder = String.fromCharCode(1);
  return usFormatted
    .replaceAll(',', placeholder)
    .replaceAll('.', decimalSeparator)
    .replaceAll(placeholder, groupSeparator);
}

describe('Money separator swap: legacy vs current', () => {
  const fixtures: Array<{
    name: string;
    usFormatted: string;
    decimalSeparator: string;
    groupSeparator: string;
    expected: string;
  }> = [
    {
      name: 'zh/en: comma group + dot decimal',
      usFormatted: '1,234,567.89',
      decimalSeparator: '.',
      groupSeparator: ',',
      expected: '1,234,567.89',
    },
    {
      name: 'de-style: dot group + comma decimal（最易踩坑）',
      usFormatted: '1,234,567.89',
      decimalSeparator: ',',
      groupSeparator: '.',
      expected: '1.234.567,89',
    },
    {
      name: 'fr/ru-style: nbsp group + comma decimal',
      usFormatted: '1,234,567.89',
      decimalSeparator: ',',
      groupSeparator: '\u00a0',
      expected: '1\u00a0234\u00a0567,89',
    },
    {
      name: 'space group + comma decimal',
      usFormatted: '1,234.5',
      decimalSeparator: ',',
      groupSeparator: ' ',
      expected: '1 234,5',
    },
    {
      name: 'no group, only decimal swap',
      usFormatted: '42.00',
      decimalSeparator: ',',
      groupSeparator: '.',
      expected: '42,00',
    },
    {
      name: 'integer with groups only',
      usFormatted: '1,000,000',
      decimalSeparator: ',',
      groupSeparator: '.',
      expected: '1.000.000',
    },
    {
      name: 'placeholder 字符本身不得残留',
      usFormatted: '9,876.54',
      decimalSeparator: ',',
      groupSeparator: '.',
      expected: '9.876,54',
    },
  ];

  it.each(fixtures)(
    '算法对比一致: $name',
    ({ usFormatted, decimalSeparator, groupSeparator, expected }) => {
      const legacy = swapSeparatorsLegacy(
        usFormatted,
        decimalSeparator,
        groupSeparator,
      );
      const current = swapSeparatorsCurrent(
        usFormatted,
        decimalSeparator,
        groupSeparator,
      );
      expect(current).toBe(legacy);
      expect(current).toBe(expected);
      expect(current).not.toContain('\u0001');
      expect(current).not.toContain(String.fromCharCode(1));
    },
  );

  it('对常见 locale 的 Intl 分隔符，两边输出一致', () => {
    const locales = ['zh-CN', 'en-US', 'de-DE', 'fr-FR', 'ru-RU', 'pt-BR'];
    const usFormatted = '12,345,678.90';

    for (const locale of locales) {
      const { decimalSeparator, groupSeparator } = getLocaleMoneyMeta(locale);
      const legacy = swapSeparatorsLegacy(
        usFormatted,
        decimalSeparator,
        groupSeparator,
      );
      const current = swapSeparatorsCurrent(
        usFormatted,
        decimalSeparator,
        groupSeparator,
      );
      expect(current, locale).toBe(legacy);
    }
  });
});
