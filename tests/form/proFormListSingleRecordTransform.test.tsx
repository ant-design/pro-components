import {
  ProForm,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-components';
import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

describe('ProFormList single-record transform (#9109)', () => {
  it('transform fires for a single record added via creator button', async () => {
    const fn = vi.fn();
    const formRef = { current: undefined as any };
    const wrapper = render(
      <ProForm formRef={formRef} onFinish={async (v) => fn(v)}>
        <ProFormList
          name="items"
          creatorRecord={{ answer: 'A' }}
          creatorButtonProps={{ creatorButtonText: '新增' }}
        >
          <ProFormSelect
            name="answer"
            transform={(value: any) => `${value}:x`}
            fieldProps={{ options: [{ label: 'A', value: 'A' }] }}
          />
        </ProFormList>
      </ProForm>,
    );
    await waitForWaitTime(300);
    // 仅新增一条 record
    await act(async () => {
      fireEvent.click(wrapper.getByText('新增'));
    });
    await waitForWaitTime(300);
    await act(async () => {
      formRef.current?.submit?.();
    });
    await waitForWaitTime(300);
    // 期望 transform 对这唯一一条新增记录生效
    expect(fn).toHaveBeenCalledWith({ items: [{ answer: 'A:x' }] });
  });
});
