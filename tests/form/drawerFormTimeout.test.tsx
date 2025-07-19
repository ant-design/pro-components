import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
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

    const cancelButton = html.queryAllByText('取 消').at(0)
      ?.parentElement as HTMLButtonElement;
    expect(cancelButton.disabled).toBe(true);

    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    expect(fn).not.toHaveBeenCalled();

    expect(cancelButton.disabled).toBe(false);

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

    const cancelButton = wrapper
      .queryAllByText('取 消')
      .at(0) as HTMLButtonElement;
    expect(cancelButton.disabled).toBe(false);

    await act(async () => {
      (await wrapper.queryByText('取 消'))?.click();
    });

    expect(fn).toHaveBeenCalled();
    wrapper.unmount();
  });
});
