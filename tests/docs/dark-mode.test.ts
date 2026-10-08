import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '../..');

describe('documentation dark mode', () => {
  it('🐛 #9684 styles code for dark mode', () => {
    const styles = fs.readFileSync(
      path.join(root, 'site/theme/site-defaults.css'),
      'utf8',
    );

    expect(styles).toContain("[data-theme='dark']");
    expect(styles).toMatch(
      /pre\[class\*='language-'\][\s\S]*background: #141414/,
    );
    expect(styles).toMatch(/:not\(pre\) > code[\s\S]*background: #262626/);
  });
});
