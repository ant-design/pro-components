import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {});

afterEach(() => {
  cleanup();
});

describe('DrawerForm', () => {
  it('📦 DrawerForm submitTimeout is number will disabled close button when submit', async () => {
    const fn = vi.fn();
    const html = render(
      <DrawerForm
        open
        drawerProps={{
          onClose: () => fn(),
        }}
        onFinish={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 3000);
          });
        }}
        submitTimeout={3000}
      >
        <ProFormText name="text" />
      </DrawerForm>,
    );

    await act(async () => {
      (await html.queryByText('确 认'))?.click();
    });

    // 等待按钮状态更新
    await waitFor(() => {
      const cancelButton = html.queryAllByText('取 消').at(0)
        ?.parentElement as HTMLButtonElement;
      expect(cancelButton.disabled).toBe(true);
    });

    // 尝试点击取消按钮，应该被禁用
    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    expect(fn).not.toHaveBeenCalled();

    // 等待提交完成，按钮应该重新启用
    await waitFor(
      () => {
        const cancelButton = html.queryAllByText('取 消').at(0)
          ?.parentElement as HTMLButtonElement;
        expect(cancelButton.disabled).toBe(false);
      },
      { timeout: 5000 },
    );

    // 现在可以正常点击取消按钮
    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    expect(fn).toHaveBeenCalled();
    html.unmount();
  });

  it('📦 DrawerForm submitTimeout is null no disable close button when submit', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DrawerForm
        open
        drawerProps={{
          onClose: () => fn(),
        }}
        onFinish={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 3000);
          });
        }}
      >
        <ProFormText name="text" />
      </DrawerForm>,
    );

    await act(async () => {
      (await wrapper.queryByText('确 认'))?.click();
    });

    // 没有 submitTimeout 时，取消按钮不应该被禁用
    const cancelButton = wrapper.queryAllByText('取 消').at(0)
      ?.parentElement as HTMLButtonElement;
    expect(cancelButton.disabled).toBe(false);

    // 可以直接点击取消按钮
    await act(async () => {
      (await wrapper.queryByText('取 消'))?.click();
    });

    expect(fn).toHaveBeenCalled();
    wrapper.unmount();
  });
});
