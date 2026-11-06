import { ModalForm, ProFormText } from '@ant-design/pro-components';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { Button, Form } from 'antd';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(cleanup);

/**
 * 关闭弹层并等待内容销毁。
 * happy-dom 不会真的跑 CSS 动画，这里反复派发动画结束事件，
 * 让 rc-motion 走完 leave 流程，从而触发 Modal 的 afterClose / Drawer 的 afterOpenChange。
 */
const closeAndWaitDestroyed = async (root: HTMLElement, closeText: string) => {
  await act(async () => {
    fireEvent.click(
      Array.from(root.querySelectorAll('button')).find((btn) =>
        (btn.textContent || '').includes(closeText),
      )!,
    );
  });

  await waitFor(
    () => {
      root
        .querySelectorAll(
          [
            '.ant-modal',
            '.ant-modal-wrap',
            '.ant-modal-mask',
            '.ant-drawer',
            '.ant-drawer-content-wrapper',
            '.ant-drawer-mask',
            '[class*="-leave"]',
            '[class*="-leave-active"]',
          ].join(','),
        )
        .forEach((node) => {
          node.dispatchEvent(new Event('transitionend', { bubbles: true }));
          node.dispatchEvent(new Event('animationend', { bubbles: true }));
        });
      expect(root.querySelector('.ant-form-item')).toBeFalsy();
    },
    { timeout: 3000 },
  );

  // 内容销毁后动画回调（afterOpenChange / afterClose）可能还要再走一帧
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    root.querySelectorAll('[class*="leave"]').forEach((node) => {
      node.dispatchEvent(new Event('transitionend', { bubbles: true }));
      node.dispatchEvent(new Event('animationend', { bubbles: true }));
    });
    await new Promise((resolve) => setTimeout(resolve, 200));
  });
};

const getInput = (root: HTMLElement) =>
  Array.from(root.querySelectorAll('input')).find((el) =>
    el.className.includes('ant-input'),
  ) as HTMLInputElement | undefined;

describe('#9789 destroyOnHidden should clear the form of overlay forms', () => {
  it('ModalForm + external form', async () => {
    const Demo = () => {
      const [form] = Form.useForm();
      return (
        <ModalForm
          form={form}
          modalProps={{ destroyOnHidden: true }}
          trigger={<Button>新建</Button>}
        >
          <ProFormText name="test" />
        </ModalForm>
      );
    };

    const wrapper = render(<Demo />);

    await act(async () => {
      fireEvent.click(wrapper.getByText('新 建'));
    });
    const input = await waitFor(() => {
      const el = getInput(wrapper.baseElement as HTMLElement);
      expect(el).toBeTruthy();
      return el!;
    });
    await act(async () => {
      fireEvent.change(input, { target: { value: '1234' } });
    });

    await closeAndWaitDestroyed(wrapper.baseElement as HTMLElement, '取 消');

    await act(async () => {
      fireEvent.click(wrapper.getByText('新 建'));
    });
    await waitFor(() => {
      expect(getInput(wrapper.baseElement as HTMLElement)).toBeTruthy();
    });
    expect(getInput(wrapper.baseElement as HTMLElement)?.value).toBe('');
  });

  it('ModalForm without external form', async () => {
    const Demo = () => (
      <ModalForm
        modalProps={{ destroyOnHidden: true }}
        trigger={<Button>新建</Button>}
      >
        <ProFormText name="test" />
      </ModalForm>
    );

    const wrapper = render(<Demo />);

    await act(async () => {
      fireEvent.click(wrapper.getByText('新 建'));
    });
    const input = await waitFor(() => {
      const el = getInput(wrapper.baseElement as HTMLElement);
      expect(el).toBeTruthy();
      return el!;
    });
    await act(async () => {
      fireEvent.change(input, { target: { value: '1234' } });
    });

    await closeAndWaitDestroyed(wrapper.baseElement as HTMLElement, '取 消');

    await act(async () => {
      fireEvent.click(wrapper.getByText('新 建'));
    });
    await waitFor(() => {
      expect(getInput(wrapper.baseElement as HTMLElement)).toBeTruthy();
    });
    expect(getInput(wrapper.baseElement as HTMLElement)?.value).toBe('');
  });
});
