import { describe, expect, it } from 'vitest';
import { createIntl, zhCNIntl } from '../../src/provider/intl';

/**
 * #9016 vi-VN locale 下部分文案回落中文
 * 根因之一：空字符串是合法文案（vi-VN pagination.total.range 故意留空），
 * 旧实现 `if (msg)` 把空串当缺失回落 zh-CN。
 */
describe('#9016 vi-VN locale 空串文案不回落 zh-CN', () => {
  it('createIntl 对空字符串文案返回空串而非中文', () => {
    const intl = createIntl('vi_VN', {
      pagination: { total: { range: '' } },
    });
    // 空串是合法值，不回落
    expect(intl.getMessage('pagination.total.range', '第')).toBe('');
  });

  it('createIntl 缺失 key 仍回落 zh-CN', () => {
    const intl = createIntl('vi_VN', { pagination: {} });
    // 缺 key → zh-CN → defaultMessage
    expect(intl.getMessage('pagination.total.range', '第')).toBe(
      zhCNIntl.getMessage('pagination.total.range', '第'),
    );
  });
});
