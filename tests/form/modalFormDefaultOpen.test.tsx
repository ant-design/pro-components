import { act, fireEvent, render } from '@testing-library/react';
import { Button } from 'antd';
import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ModalForm, ProFormText } from '../../src';

/**
 * #9624:Dropdown menu label 中放 ModalForm,默认 open={true} 时 modal 应显示。
 * 用户实际代码:isOpen 初始为 true + 受控 open + trigger + destroyOnClose。
 * 关键回归点:受控 open=true 初始挂载时,onOpenChange 不应把状态打回 false,
 * Modal 应该正常打开并渲染表单内容。
 */
describe('#9624 ModalForm default open in Dropdown', () => {
  it('renders modal content when controlled open is initially true', async () => {
    const onOpenChange = vi.fn();

    const Demo = () => {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <ModalForm
          open={isOpen}
          onOpenChange={(next) => {
            onOpenChange(next);
            setIsOpen(next);
          }}
          trigger={<Button id="open-btn">新建表单</Button>}
          modalProps={{
            getContainer: false,
            destroyOnClose: true,
          }}
        >
          <ProFormText name="managerName" label="商务经理" />
        </ModalForm>
      );
    };
    const { container } = render(<Demo />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });

    // Modal 打开且渲染了表单项
    const input = document.querySelector(
      'input[id$="_managerName"]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();

    // 受控初始 true:不应有 open=false 的事件把弹窗关掉
    expect(onOpenChange).not.toHaveBeenCalledWith(false);

    // 再通过 trigger 关闭再打开,内容仍能渲染(destroyOnClose 循环)
    await act(async () => {
      fireEvent.click(container.querySelector('#open-btn')!);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });
    await act(async () => {
      fireEvent.click(container.querySelector('#open-btn')!);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });
    const input2 = document.querySelector(
      'input[id$="_managerName"]',
    ) as HTMLInputElement;
    expect(input2).toBeTruthy();
  });
});
