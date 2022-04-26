import React from 'react';
import { DrawerForm, ProFormText } from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { waitForComponentToPaint, waitTime } from '../util';

describe('DrawerForm', () => {
  it('📦 DrawerForm submitTimeout is number will disabled close button when submit', async () => {
    const fn = jest.fn();
    const html = render(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => fn(),
        }}
        onFinish={async () => {
          await waitTime(20000);
        }}
        submitTimeout={3000}
      >
        <ProFormText name="text" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(html, 500);

    await act(async () => {
      (await html.queryByText('确 认'))?.click();
    });

    await waitForComponentToPaint(html, 1000);

    expect(
      (html.queryAllByText('取 消').at(0)?.parentElement as HTMLButtonElement).disabled,
    ).toEqual(true);

    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    await waitForComponentToPaint(html, 500);

    expect(fn).not.toBeCalled();

    await waitForComponentToPaint(html, 2500);

    expect(
      (html.queryAllByText('取 消').at(0)?.parentElement as HTMLButtonElement)?.disabled,
    ).toEqual(false);

    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    await waitForComponentToPaint(html, 500);

    expect(fn).toBeCalled();
  });

  it('📦 modal submitTimeout is null no disable close button when submit', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => fn(),
        }}
        onFinish={async () => {
          await waitTime(1000);
          return true;
        }}
      >
        <ProFormText name="text" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper, 500);

    await act(async () => {
      (await wrapper.queryByText('确 认'))?.click();
    });

    await waitForComponentToPaint(wrapper, 500);

    expect((wrapper.queryAllByText('取 消').at(0) as HTMLButtonElement)?.disabled).toEqual(
      undefined,
    );

    await act(async () => {
      (await wrapper.queryByText('取 消'))?.click();
    });

    await waitForComponentToPaint(wrapper, 500);

    expect(fn).toBeCalled();
  });
});
