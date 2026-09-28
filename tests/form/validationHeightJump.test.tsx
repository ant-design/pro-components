import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ModalForm, ProForm, ProFormText } from '../../src';

const selectVisibleInput = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('input')).find(
    (el) =>
      el.getAttribute('placeholder')?.includes('输入') &&
      el.style.display !== 'none',
  )!;

/**
 * #8956/#8942/#8895/#8892:校验信息出现/消失时表单项高度跳动。
 * antd 通过 .ant-form-item 的 explain 区(height 24px 占位)保证高度稳定。
 */
describe('validation error height stability', () => {
  it('ProFormText error explain area exists before validation', async () => {
    const { container } = render(
      <ProForm>
        <ProFormText
          name="name"
          label="名称"
          rules={[{ required: true, message: '必填消息' }]}
        />
      </ProForm>,
    );
    // 校验前就应有 explain 占位(min-height),高度才不会跳
    const item = container.querySelector('.ant-form-item');
    expect(item).toBeTruthy();
    // antd 5/6: 校验前 .ant-form-item 含 .ant-form-item-explain 占位 或 margin-bottom 补偿
    // 出错后 class 变化不应导致布局重排的 margin 缺失
    const input = selectVisibleInput(container);
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => {
      expect(container.textContent).toContain('必填消息');
    });
    // 错误出现后,错误文本应位于 explain 容器中,且 margin-offset 补偿存在
    const explain = container.querySelector('.ant-form-item-explain-error');
    expect(explain).toBeTruthy();
  });

  it('ModalForm fields render error explain area', async () => {
    const Demo = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <ModalForm
          open={open}
          onOpenChange={setOpen}
          title="测试"
          trigger={
            <button type="button" onClick={() => setOpen(true)}>
              open
            </button>
          }
        >
          <ProFormText
            name="name"
            label="名称"
            rules={[{ required: true, message: '弹窗必填' }]}
          />
        </ModalForm>
      );
    };
    const { baseElement } = render(<Demo />);
    fireEvent.click(baseElement.querySelector('button')!);

    const input = await waitFor(() => {
      const el = Array.from(document.querySelectorAll('input')).find(
        (i) =>
          i.getAttribute('placeholder')?.includes('输入') &&
          i.style.display !== 'none',
      );
      expect(el).toBeTruthy();
      return el!;
    });
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => {
      expect(document.body.textContent).toContain('弹窗必填');
    });
  });
});
