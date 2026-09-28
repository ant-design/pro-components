import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import React, { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { ModalForm, ProFormText } from '../../src';

/**
 * #8624:ModalForm + 外部 form + request + Form.useWatch 同用时,
 * 弹窗应展示本次 request 返回的最新值,而非上一次打开的旧值。
 * 请求返回后 useWatch 也必须读到新值(父组件依赖 watch 驱动 UI)。
 */
describe('#8624 ModalForm request + Form.useWatch', () => {
  it('watched value converges to the latest request data on each open', async () => {
    const records: Record<string, { name: string }> = {
      a: { name: 'record-a' },
      b: { name: 'record-b' },
    };
    let watchValue: string | undefined;

    const Demo = () => {
      const [form] = Form.useForm();
      const [open, setOpen] = useState(false);
      const [recordId, setRecordId] = useState('a');
      const name = Form.useWatch(['name'], form);
      watchValue = name;

      return (
        <>
          <button
            type="button"
            onClick={() => {
              setRecordId('a');
              setOpen(true);
            }}
          >
            open a
          </button>
          <button
            type="button"
            onClick={() => {
              setRecordId('b');
              setOpen(true);
            }}
          >
            open b
          </button>
          <ModalForm
            form={form}
            open={open}
            onOpenChange={setOpen}
            params={{ id: recordId }}
            request={async ({ id }) => {
              await new Promise((r) => setTimeout(r, 50));
              return records[id as string];
            }}
            modalProps={{ getContainer: false }}
          >
            <ProFormText name="name" label="Name" />
          </ModalForm>
        </>
      );
    };

    render(<Demo />);

    // 打开记录 a
    await act(async () => {
      fireEvent.click(document.querySelectorAll('button')[0]);
    });
    await waitFor(() => {
      const input = document.querySelector(
        'input[id$="_name"]',
      ) as HTMLInputElement;
      expect(input?.value).toBe('record-a');
    });

    // 关闭
    await act(async () => {
      fireEvent.click(document.querySelector('button.ant-modal-close')!);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });

    // 打开记录 b:必须显示 record-b,watch 也必须读到 record-b
    await act(async () => {
      fireEvent.click(document.querySelectorAll('button')[1]);
    });
    await waitFor(() => {
      const input = document.querySelector(
        'input[id$="_name"]',
      ) as HTMLInputElement;
      expect(input?.value).toBe('record-b');
      expect(watchValue).toBe('record-b');
    });
  });
});
