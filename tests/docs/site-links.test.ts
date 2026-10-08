import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '../..');

describe('documentation links', () => {
  it('🐛 #9632 keeps valueEnum links on the generated schema-form page', () => {
    const files = [
      'site/zh-CN/components/table/index.mdx',
      'site/en-US/components/table/index.mdx',
      'site/zh-CN/components/list.mdx',
      'site/en-US/components/list.mdx',
    ];
    const docs = files
      .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
      .join('\n');

    expect(docs).not.toContain('/components/schema#valueenum');
    expect(docs).toContain('/components/schema-form#valueenum');
    expect(docs).toContain('/en-US/components/schema-form#valueenum');
  });
});
