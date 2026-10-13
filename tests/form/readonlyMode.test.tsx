import { ProForm, ProFormCascader, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * B9 只读(read)模式回归:
 * - #8848 ProFormSelect readonly 值为空数组时展示 emptyText(-) 而不是空白
 * - #8844 ProFormDigit readonly 展示 prefix/suffix
 * - #8710 ProFormCascader readonly 各层级 value 相同时按路径取 label
 */
describe('B9 readonly mode regressions', () => {
  it('#8848 ProFormSelect readonly with empty array shows emptyText', async () => {
    const { container, getByText } = render(
      <ProForm submitter={false}>
        <ProFormSelect
          name="tags"
          label="标签"
          readonly
          fieldProps={{ mode: 'multiple', options: [{ label: 'A', value: 'a' }] }}
          initialValue={[]}
        />
      </ProForm>,
    );
    await waitForWaitTime(300);
    // 空数组应渲染 emptyText 占位 '-'，而不是空白的 select 容器
    expect(getByText('-')).toBeTruthy();
    expect(container.querySelector('.pro-field-select-read')).toBeNull();
  });

  it('#8848 ProFormSelect readonly with null also shows emptyText', async () => {
    const { getByText } = render(
      <ProForm submitter={false}>
        <ProFormSelect
          name="tags"
          label="标签"
          readonly
          fieldProps={{ options: [{ label: 'A', value: 'a' }] }}
          initialValue={null}
        />
      </ProForm>,
    );
    await waitForWaitTime(300);
    expect(getByText('-')).toBeTruthy();
  });

  it('#8844 ProFormDigit readonly shows prefix and suffix', async () => {
    const { container } = render(
      <ProForm submitter={false}>
        <ProFormDigit
          name="count"
          label="数量"
          readonly
          initialValue={8}
          fieldProps={{ prefix: '≥ ', suffix: '个' }}
        />
      </ProForm>,
    );
    await waitForWaitTime(300);
    const text = container.textContent;
    expect(text).toContain('≥');
    expect(text).toContain('8');
    expect(text).toContain('个');
  });

  it('#8710 ProFormCascader readonly resolves labels by path when values repeat across levels', async () => {
    const { container } = render(
      <ProForm submitter={false}>
        <ProFormCascader
          name="area"
          label="区域"
          readonly
          request={async () => [
            {
              value: 'hangzhou',
              label: '浙江',
              children: [
                {
                  value: 'hangzhou',
                  label: '杭州',
                  children: [
                    {
                      value: 'hangzhou',
                      label: '西湖',
                    },
                  ],
                },
              ],
            },
          ]}
          initialValue={['hangzhou', 'hangzhou', 'hangzhou']}
        />
      </ProForm>,
    );
    await waitForWaitTime(1000);
    const text = container.textContent ?? '';
    expect(text).toContain('浙江');
    expect(text).toContain('杭州');
    expect(text).toContain('西湖');
  });
});
