import { describe, expect, it } from 'vitest';
import {
  fieldIntlMap,
  fieldLocaleMessages,
  findFieldLocaleKey,
} from '../../src/field/internal/fieldLocale';
import { findIntlKeyByAntdLocaleKey, intlMap } from '../../src/provider/intl';

describe('field locale subset', () => {
  it('matches every full locale for field messages', () => {
    const keys = Object.keys(fieldLocaleMessages['zh-CN']);
    expect(Object.keys(fieldIntlMap).sort()).toEqual(
      Object.keys(intlMap).sort(),
    );

    for (const [locale, intl] of Object.entries(intlMap)) {
      for (const key of keys) {
        expect(
          fieldIntlMap[locale as keyof typeof fieldIntlMap].getMessage(
            key,
            'fallback',
          ),
        ).toBe(intl.getMessage(key, 'fallback'));
      }
    }
  });

  it('uses the same locale fallback for language prefixes', () => {
    for (const language of ['en', 'zh', 'fr', 'pt', 'unknown']) {
      expect(findFieldLocaleKey(language)).toBe(
        findIntlKeyByAntdLocaleKey(language),
      );
    }
  });
});
