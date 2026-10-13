import { act, fireEvent, render } from '@testing-library/react';
import { Button } from 'antd';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ModalForm, ProFormText } from '../../src';

/**
 * #9624 最小复现:受控 open + trigger 同时存在时,trigger 点击后
 * onOpenChange(true) 应该通知到外部。
 * 如果 onOpenChange 从未被调用,说明事件被吞;如果只收到 false,
 * 说明 open 状态在受控模式下被错误切换。
 */
describe('#9624 controlled open with trigger', () => {
  it('notifies onOpenChange(true) after trigger click in controlled mode', async () => {
    const onOpenChange = vi.fn();
    const values: boolean[] = [];

    const Demo = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <ModalForm
          open={open}
          onOpenChange={(nextOpen) => {
            onOpenChange(nextOpen);
            values.push(nextOpen);
            setOpen(nextOpen);
          }}
          trigger={<Button id="open-btn">open</Button>}
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
    // 等 queueMicrotask flush + form mount
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });

    // 受控模式:点击 trigger 应先通知外部，再由外部更新 open。
    expect(values).toContain(true);
    expect(onOpenChange).toHaveBeenCalledTimes(1);

    // Modal 内容已渲染
    const input = document.querySelector(
      'input[id$="_name"]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
  });
});
