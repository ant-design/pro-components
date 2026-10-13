import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProTable } from '../../src';
import { isNeedTranText } from '../../src/utils/genCopyable';

/**
 * #8542:ellipsis + valueType(select/cascader 等)时,
 * tooltip 应显示 valueType 转换后的文本,与单元格文本一致,
 * 而不是显示原始值(如 id 数字)。
 */
describe('#8542 isNeedTranText covers mismatch value types', () => {
  it.each(['select', 'cascader', 'treeSelect', 'money', 'digit', 'percent'])(
    'valueType=%s uses rendered dom as tooltip title',
    (valueType) => {
      expect(isNeedTranText({ valueType })).toBe(true);
    },
  );

  it('plain text valueType does not force dom tooltip', () => {
    expect(isNeedTranText({ valueType: 'text' })).toBe(false);
  });

  it('valueEnum column uses dom tooltip', () => {
    expect(isNeedTranText({ valueEnum: { a: { text: 'A' } } })).toBe(true);
  });
});

describe('#8542 ellipsis cell renders valueType label', () => {
  it('select column shows label text in cell', async () => {
    const options = [
      { label: '平安保险', value: '1' },
      { label: '人寿保险', value: '2' },
    ];

    const { container } = render(
      <ProTable
        search={false}
        pagination={false}
        dataSource={[{ id: 1, company: '1' }]}
        columns={[
          {
            title: '保险公司',
            dataIndex: 'company',
            valueType: 'select',
            fieldProps: { options },
            ellipsis: { showTitle: true },
          },
        ]}
      />,
    );

    await waitFor(() => {
      const row = container.querySelector('.ant-table-row');
      expect(row?.textContent).toContain('平安保险');
    });
  });
});
