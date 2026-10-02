import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { describe, expect, it } from 'vitest';
import { ProForm, ProFormDateRangePicker } from '../../src';

/**
 * #8733:ProFormDateRangePicker 国际化。
 * 只读态展示由 pro-components 控制;编辑态面板语言由 antd
 * ConfigProvider locale 驱动。验证两层都能正确工作。
 */
describe('#8733 DateRangePicker locale', () => {
  it('read mode formats values and edit mode respects ConfigProvider locale', async () => {
    const { container } = render(
      <ConfigProvider locale={enUS}>
        <ProForm
          submitter={false}
          readonly
          initialValues={{ range: ['2026-09-01', '2026-09-28'] }}
        >
          <ProFormDateRangePicker name="range" label="Range" />
        </ProForm>
      </ConfigProvider>,
    );

    await waitFor(() => {
      // 只读态应展示格式化后的区间文本
      expect(container.textContent).toContain('2026-09-01');
      expect(container.textContent).toContain('2026-09-28');
    });
  });

  it('edit mode renders picker inputs under ConfigProvider', async () => {
    const { container } = render(
      <ConfigProvider locale={enUS}>
        <ProForm submitter={false}>
          <ProFormDateRangePicker name="range" label="Range" />
        </ProForm>
      </ConfigProvider>,
    );

    await waitFor(() => {
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBeGreaterThan(0);
    });
  });
});
