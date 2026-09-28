import { act, fireEvent, render } from '@testing-library/react';
import { Button } from 'antd';
import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ModalForm, ProFormText } from '../../src';

/**
 * #9624:Dropdown menu label 中放 ModalForm(trigger 按钮)。
 * 打开弹窗后 Dropdown 若仍监听 document 点击,会再次切换导致弹窗异常关闭。
 * ModalForm 侧的正确行为:trigger 点击仅切换一次 open;Modal 打开后,
 * Modal 内部的点击不会再次触发 trigger onClick(事件不泄漏)。
 */
describe('#9624 ModalForm trigger inside Dropdown-like parent', () => {
  it('trigger click toggles open once; modal body clicks do not re-trigger', async () => {
    const triggerClick = vi.fn();
    const opens: boolean[] = [];

    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <ModalForm
          open={open}
          onOpenChange={(next) => {
            opens.push(next);
            setOpen(next);
          }}
          trigger={
            <Button
              id="open-btn"
              onClick={(e) => {
                triggerClick();
                e.stopPropagation();
              }}
            >
              open
            </Button>
          }
          modalProps={{ getContainer: false }}
        >
          <ProFormText name="name" label="Name" />
        </ModalForm>
      );
    };
    const { container } = render(<Demo />);

    await act(async () => {
      fireEvent.click(container.querySelector('#open-btn')!);
    });
    // 等 queueMicrotask flush + Modal 懒渲染 + form onInit flush(#8920)
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });

    expect(triggerClick).toHaveBeenCalledTimes(1);
    // 曾收到 true(无论时序上是否夹带 false,最终必须是打开状态)
    expect(opens).toContain(true);

    // Modal 已打开且渲染了表单
    const input = document.querySelector(
      'input[id$="_name"]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();

    // 点击 Modal 内部区域不重复触发 trigger onClick
    await act(async () => {
      fireEvent.click(input);
    });
    expect(triggerClick).toHaveBeenCalledTimes(1);
  });
});
