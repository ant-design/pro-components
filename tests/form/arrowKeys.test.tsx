import {
  ModalForm,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { act, fireEvent, render } from '@testing-library/react';
import { Button } from 'antd';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #9142: 在 edit form（带 initialValues）里，ArrowLeft/ArrowRight 的
 * keydown 事件曾被 preventDefault，导致无法用方向键移动光标。
 * 该问题在 antd 6 代码路径上无法复现，此处锁定回归行为：
 * 输入框内方向键事件必须保持 defaultPrevented === false。
 */
describe('arrow key navigation in forms (#9142)', () => {
  const collectArrowEvents = () => {
    const events: string[] = [];
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        events.push(`${e.key}:${e.defaultPrevented}`);
      }
    };
    document.addEventListener('keydown', listener);
    return {
      events,
      dispose: () => document.removeEventListener('keydown', listener),
    };
  };

  it('plain ProForm with initialValues does not prevent arrow keys', () => {
    const collector = collectArrowEvents();
    const { container, unmount } = render(
      <ProForm initialValues={{ name: 'hello world' }}>
        <ProFormText name="name" label="Name" fieldProps={{ maxLength: 255 }} />
      </ProForm>,
    );

    const input = container.querySelector('input');
    expect(input).toBeTruthy();
    input?.focus();
    act(() => {
      fireEvent.keyDown(input!, { key: 'ArrowLeft' });
      fireEvent.keyDown(input!, { key: 'ArrowRight' });
    });

    collector.dispose();
    unmount();

    expect(collector.events).toEqual(['ArrowLeft:false', 'ArrowRight:false']);
  });

  it('ModalForm with initialValues + autoFocusFirstInput does not prevent arrow keys', async () => {
    const collector = collectArrowEvents();
    const { baseElement, unmount } = render(
      <ModalForm
        title="Edit"
        initialValues={{ name: 'hello world' }}
        autoFocusFirstInput
        trigger={<Button>Edit</Button>}
      >
        <ProFormText name="name" label="Name" fieldProps={{ maxLength: 255 }} />
      </ModalForm>,
    );

    await waitForWaitTime(300);
    await act(async () => {
      fireEvent.click(baseElement.querySelector('button')!);
    });
    await waitForWaitTime(300);

    const input =
      baseElement.querySelector<HTMLInputElement>('input.ant-input');
    expect(input).toBeTruthy();
    act(() => {
      input?.focus();
      fireEvent.keyDown(input!, { key: 'ArrowLeft' });
      fireEvent.keyDown(input!, { key: 'ArrowRight' });
    });

    collector.dispose();
    unmount();

    expect(collector.events).toEqual(['ArrowLeft:false', 'ArrowRight:false']);
  });
});
