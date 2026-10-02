import { act, fireEvent, render } from '@testing-library/react';
import { Button } from 'antd';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { DrawerForm, ModalForm, ProFormText } from '../../src';

/**
 * #8924:用户给 trigger 传了 onClick={e => e.stopPropagation()} 时,
 * useOverlayForm clone trigger 注入的 onClick 会覆盖用户的 stopPropagation,
 * 导致弹窗打开后点击 Modal 内任意位置,事件冒泡到父级触发父级的 onClick。
 * 修复:注入的 onClick 必须先执行用户原生的 onClick(保留 stopPropagation 语义),
 * 再切换 open。
 */
describe('#8924 trigger stopPropagation preserved', () => {
  it('ModalForm keeps user stopPropagation on trigger click', async () => {
    const parentClick = vi.fn();
    const triggerClick = vi.fn();

    const Demo = () => (
      <div onClick={parentClick}>
        <ModalForm
          trigger={
            <Button
              id="open-btn"
              onClick={(e) => {
                e.stopPropagation();
                triggerClick();
              }}
            >
              open
            </Button>
          }
        >
          <ProFormText name="name" label="Name" />
        </ModalForm>
      </div>
    );
    const { container } = render(<Demo />);

    await act(async () => {
      fireEvent.click(container.querySelector('#open-btn')!);
    });

    // 用户 onClick 执行了(含 stopPropagation)
    expect(triggerClick).toHaveBeenCalledTimes(1);
    // 由于 stopPropagation,父级 onClick 不应被触发
    expect(parentClick).not.toHaveBeenCalled();

    const input = document.querySelector(
      'input[id$="_name"]',
    ) as HTMLInputElement;
    await act(async () => {
      fireEvent.click(input);
    });
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('DrawerForm keeps user stopPropagation on trigger click', async () => {
    const parentClick = vi.fn();

    const Demo = () => (
      <div onClick={parentClick}>
        <DrawerForm
          trigger={
            <Button
              id="open-btn"
              onClick={(e) => e.stopPropagation()}
            >
              open
            </Button>
          }
        >
          <ProFormText name="name" label="Name" />
        </DrawerForm>
      </div>
    );
    const { container } = render(<Demo />);

    await act(async () => {
      fireEvent.click(container.querySelector('#open-btn')!);
    });

    expect(parentClick).not.toHaveBeenCalled();

    const input = document.querySelector(
      'input[id$="_name"]',
    ) as HTMLInputElement;
    await act(async () => {
      fireEvent.click(input);
    });
    expect(parentClick).not.toHaveBeenCalled();
  });
});
