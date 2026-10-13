import ProTable from '../../src/table';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('ProTable search submitterColSpanProps (#9626)', () => {
  it('submitter col span can be customized via search.submitterColSpanProps', () => {
    const { container } = render(
      <ProTable
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Age', dataIndex: 'age' },
        ]}
        search={{
          span: 6,
          submitterColSpanProps: { span: 12 },
        }}
      />,
    );
    // 操作区（提交/重置按钮）所在的 Col 应使用自定义 span=12
    const form = container.querySelector('form');
    expect(form).toBeTruthy();
    const cols = Array.from(
      form!.querySelectorAll('.ant-col'),
    ) as HTMLElement[];
    const submitterCol = cols.find((col) =>
      col.querySelector('.ant-pro-query-filter-actions'),
    );
    expect(submitterCol).toBeTruthy();
    expect(submitterCol!.className).toContain('ant-col-12');
  });
});
