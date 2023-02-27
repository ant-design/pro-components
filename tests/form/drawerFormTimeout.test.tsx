import { DrawerForm, ProFormText } from '@ant-design/pro-form';
import { act, render } from '@testing-library/react';
import { waitTime } from '../util';

describe('DrawerForm', () => {
  it('📦 DrawerForm submitTimeout is number will disabled close button when submit', async () => {
    const fn = jest.fn();
    const html = render(
      <DrawerForm
        open
        drawerProps={{
          onClose: () => fn(),
        }}
        onFinish={async () => {
          await waitTime(3000);
        }}
        submitTimeout={3000}
      >
        <ProFormText name="text" />
      </DrawerForm>,
    );
    await waitTime(300);

    await act(async () => {
      (await html.queryByText('确 认'))?.click();
    });

    await waitTime(1000);

    expect(
      (html.queryAllByText('取 消').at(0)?.parentElement as HTMLButtonElement).disabled,
    ).toEqual(true);

    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    await waitTime(300);

    expect(fn).not.toBeCalled();

    await waitTime(2500);

    expect(
      (html.queryAllByText('取 消').at(0)?.parentElement as HTMLButtonElement)?.disabled,
    ).toEqual(false);

    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    await waitTime(1000);

    expect(fn).toBeCalled();
    html.unmount();
  });

  it('📦 DrawerForm submitTimeout is null no disable close button when submit', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        open
        drawerProps={{
          onClose: () => fn(),
        }}
        onFinish={async () => {
          await waitTime(3000);
          return true;
        }}
      >
        <ProFormText name="text" />
      </DrawerForm>,
    );
    await waitTime(1200);

    await act(async () => {
      (await wrapper.queryByText('确 认'))?.click();
    });

    await waitTime(1200);

    expect((wrapper.queryAllByText('取 消').at(0) as HTMLButtonElement)?.disabled).toEqual(
      undefined,
    );

    await act(async () => {
      (await wrapper.queryByText('取 消'))?.click();
    });

    await waitTime(1200);

    expect(fn).toBeCalled();
  });
});
