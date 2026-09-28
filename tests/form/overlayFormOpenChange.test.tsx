import { act, fireEvent, render } from '@testing-library/react';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { DrawerForm, ProFormText } from '../../src';

// #8920: DrawerForm onOpenChange 中 setFieldsValue 首次不生效
describe('#8920 DrawerForm setFieldsValue in onOpenChange', () => {
  it('applies setFieldsValue on first open', async () => {
    const Demo = () => {
      const formRef = useRef<any>();
      return (
        <DrawerForm
          formRef={formRef}
          onOpenChange={(open) => {
            if (open) {
              formRef.current?.setFieldsValue({ name: 'from-open-change' });
            }
          }}
          trigger={<Button id="open-btn">open</Button>}
        >
          <ProFormText name="name" label="Name" />
        </DrawerForm>
      );
    };
    const { container } = render(<Demo />);

    // 首次打开
    await act(async () => {
      fireEvent.click(container.querySelector('#open-btn')!);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });

    // Drawer 渲染在 portal，input id 带 form name 前缀（#9144）
    const input = document.querySelector(
      'input[id$="_name"]',
    ) as HTMLInputElement;
    expect(input?.value).toBe('from-open-change');
  });
});
