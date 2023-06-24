import { DrawerForm, ProFormText } from '@ant-design/pro-form';
import { act, render } from '@testing-library/react';

describe('DrawerForm', () => {
  it('📦 DrawerForm submitTimeout is number will disabled close button when submit', async () => {
    const fn = jest.fn();
    jest.useFakeTimers();
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

    expect(
      (html.queryAllByText('取 消').at(0)?.parentElement as HTMLButtonElement)
        .disabled,
    ).toEqual(true);

    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(fn).not.toBeCalled();

    expect(
      (html.queryAllByText('取 消').at(0)?.parentElement as HTMLButtonElement)
        ?.disabled,
    ).toEqual(false);

    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    expect(fn).toBeCalled();
    html.unmount();
    jest.useRealTimers();
  });

  it('📦 DrawerForm submitTimeout is null no disable close button when submit', async () => {
    const fn = jest.fn();
    jest.useFakeTimers();
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

    expect(
      (wrapper.queryAllByText('取 消').at(0) as HTMLButtonElement)?.disabled,
    ).toEqual(undefined);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await act(async () => {
      (await wrapper.queryByText('取 消'))?.click();
    });

    expect(fn).toBeCalled();
  });
});
