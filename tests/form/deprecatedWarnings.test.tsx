import {
  ProFormDateRangePicker,
  ProFormSelect,
  QueryFilter,
} from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

/**
 * #8830 / #8685 / #8091
 * antd v5 时代的废弃 API 警告(findDOMNode / Select bordered)。
 * 本仓库已升级 antd 6:findDOMNode 已被移除、bordered 已全量替换为 variant,
 * 这里渲染典型场景断言不再产生这些废弃警告(回归锁定)。
 */
describe('deprecated API warnings are gone on antd 6 (#8830/#8685/#8091)', () => {
  it('QueryFilter 渲染无 findDOMNode / bordered 废弃警告', () => {
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);

    render(
      <QueryFilter>
        <ProFormDateRangePicker
          name="date"
          label="日期"
          placeholder={['开始', '结束']}
        />
        <ProFormSelect
          name="status"
          label="任务状态"
          options={[
            { label: '进行中', value: 'open' },
            { label: '已关闭', value: 'closed' },
          ]}
        />
      </QueryFilter>,
    );

    const allMessages = [
      ...errorSpy.mock.calls.map((c) => String(c[0])),
      ...warnSpy.mock.calls.map((c) => String(c[0])),
    ].join('\n');

    expect(allMessages).not.toContain('findDOMNode');
    expect(allMessages).not.toContain('`bordered` is deprecated');

    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });
});
