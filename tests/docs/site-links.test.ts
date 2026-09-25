import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '../..');

describe('documentation links', () => {
  it('🐛 #9632 keeps valueEnum links on the generated schema-form page', () => {
    const files = [
      'site/components/table.md',
      'site/components/table.en-US.md',
      'site/components/list.md',
      'site/components/list.en-US.md',
    ];
    const docs = files
      .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
      .join('\n');

    expect(docs).not.toContain('/components/schema#valueenum');
    expect(docs).toContain('/components/schema-form#valueenum');
    expect(docs).toContain('/en-US/components/schema-form#valueenum');
  });
});
