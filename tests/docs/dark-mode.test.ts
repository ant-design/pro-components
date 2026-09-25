import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '../..');

describe('documentation dark mode', () => {
  it('🐛 #9684 styles code for dumi dark mode', () => {
    const styles = fs.readFileSync(path.join(root, '.dumi/global.less'), 'utf8');

    expect(styles).toContain("[data-prefers-color='dark']");
    expect(styles).toMatch(/pre\[class\*='language-'\][\s\S]*background: #141414/);
    expect(styles).toMatch(/:not\(pre\) > code[\s\S]*background: #262626/);
  });
});
