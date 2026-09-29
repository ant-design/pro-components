import { ProDescriptions, ProField } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { describe, afterEach, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #8517 回归:
 * ProDescriptions 编辑模式下,valueType="select" + valueEnum(对象) + 字段值为 number 时,
 * Select 应该映射出对应字典文本,而不是直接显示数字。
 * 根因: Object.entries 会把数字 key 字符串化,导致 option value ("2") 与数据值 (2) 严格相等比较失败。
 */
describe('#8517 select edit mode with numeric valueEnum', () => {
  afterEach(() => {
    cleanup();
  });

  it('ProDescriptions editable select maps numeric value to enum text', async () => {
    const wrapper = render(
      <ProDescriptions
        editable={{ editableKeys: ['status'] }}
        columns={[
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
              1: { text: '进行中' },
              2: { text: '已完成' },
            },
          },
        ]}
        dataSource={{ status: 2 }}
      />,
    );
    await waitForWaitTime(300);

    // 编辑模式下 Select 应显示已映射的 label,而不是原始数字
    const text = wrapper.container.textContent ?? '';
    expect(text).toContain('已完成');
  });

  it('ProField edit mode select maps numeric value to enum text', async () => {
    const html = render(
      <ProField
        mode="edit"
        valueType="select"
        fieldProps={{ value: 2 }}
        valueEnum={{
          1: { text: '进行中' },
          2: { text: '已完成' },
        }}
      />,
    );
    await waitForWaitTime(200);
    expect(html.container.textContent).toContain('已完成');
  });

  it('string field value keeps working', async () => {
    const html = render(
      <ProField
        mode="edit"
        valueType="select"
        fieldProps={{ value: 'done' }}
        valueEnum={{
          todo: { text: '待办' },
          done: { text: '已完成' },
        }}
      />,
    );
    await waitForWaitTime(200);
    expect(html.container.textContent).toContain('已完成');
  });
});
