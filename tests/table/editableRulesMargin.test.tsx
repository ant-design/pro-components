import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { EditableProTable } from '../../src';

/**
 * #8859:EditableProTable 违反 rules 时行高被 ant-form-item-margin-offset 撑高。
 * 现机制:InlineErrorFormItem 给 form-item 应用 -5px 内联 margin(margin-block),
 * antd ItemHolder 测得后渲染 margin-offset 补偿层(margin-bottom: +5px),
 * 两者等量反向、净占位为 0,校验错误出现/消失时行高稳定。
 * 断言目标:额外占位必须被完全抵消,而非禁止渲染 offset 节点。
 */
describe('#8859 editable rules margin', () => {
  it('editing cell error keeps net-zero extra space', async () => {
    const { container } = render(
      <EditableProTable
        rowKey="id"
        recordCreatorProps={false}
        editable={{ editableKeys: [1] }}
        value={[{ id: 1, name: '' }]}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            formItemProps: {
              rules: [{ required: true, message: '必填名称' }],
            },
          },
          {
            title: '操作',
            valueType: 'option',
          },
        ]}
      />,
    );

    // 进入编辑态后输入框存在
    const input = await waitFor(() => {
      const el = Array.from(container.querySelectorAll('input')).find(
        (i) => i.style.display !== 'none',
      );
      expect(el).toBeTruthy();
      return el!;
    });

    // 触发校验:修改后清空
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: '' } });

    // 校验错误状态生效
    await waitFor(() => {
      const errorItem = container.querySelector('.ant-form-item-has-error');
      expect(errorItem).toBeTruthy();
    });

    // 核心断言:额外占位被完全抵消。
    // form-item 自带 -5px 内联 margin(margin-block),antd ItemHolder 用
    // getComputedStyle 测量后渲染 margin-offset 补偿层。jsdom 无布局引擎,
    // 测得样式表默认 24px → offset=-24px;真实浏览器测得 -5px → offset=+5px。
    // 不变量:offset 必须与测得的 form-item margin 等量反向,两者之和为 0。
    const offsetEl = container.querySelector<HTMLElement>(
      '.ant-form-item-margin-offset',
    );
    expect(offsetEl, 'margin-offset compensation layer exists').toBeTruthy();

    const formItem = container.querySelector<HTMLElement>('.ant-form-item');
    const style = formItem?.getAttribute('style') || '';
    expect(style).toContain('margin-block-start: -5px');

    // jsdom 环境测量值为样式表默认(24px),offset 取负后恰好抵消
    const offsetMargin = Number.parseFloat(offsetEl?.style.marginBottom || '');
    const measuredMargin = Number.parseFloat(
      getComputedStyle(formItem as HTMLElement).marginBottom,
    );
    expect(
      offsetMargin + measuredMargin,
      'offset compensates the measured form-item margin',
    ).toBe(0);
  });
});
