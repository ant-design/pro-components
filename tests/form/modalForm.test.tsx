﻿import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import type { FormInstance } from 'antd';
import { Button } from 'antd';
import React, { act, createRef } from 'react';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
});

describe('ModalForm', () => {
  it('📦 trigger will simulate onOpenChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    expect(fn).toHaveBeenCalledWith(true);
  });

  it('📦 ModelForm get formRef when use request', async () => {
    const formRef = createRef<FormInstance>();
    const wrapper = render(
      <ModalForm
        open
        formRef={formRef}
        request={async (params) => {
          return params;
        }}
        params={{
          name: 'test',
        }}
      >
        <ProFormText label="名称" name="name" />
      </ModalForm>,
    );

    await wrapper.findAllByText('名称');

    expect(formRef.current?.getFieldValue('name')).toBe('test');
    wrapper.unmount();
  });

  it('📦 submitter config no reset default config', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        width={600}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
          resetButtonProps: {
            style: {
              width: '80px',
            },
            id: 'reset',
          },
        }}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitForWaitTime(200);
    expect(fn).toHaveBeenCalledWith(true);

    await act(async () => {
      (await wrapper.findByText('取 消'))?.click();
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    expect(fn).toHaveBeenCalledWith(false);
  });

  it('📦 ModalForm first no render items', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        initialValues={{
          name: '1234',
        }}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </ModalForm>,
    );
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    expect(await wrapper.queryByDisplayValue('1234')).toBeFalsy();

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    expect(await wrapper.findByDisplayValue('1234')).toBeTruthy();
  });

  it('📦 ModalForm first render items', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        width={600}
        modalProps={{
          forceRender: true,
        }}
        initialValues={{
          name: '1234',
        }}
        visible
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </ModalForm>,
    );
    await waitForWaitTime(120);

    expect(await wrapper.findByDisplayValue('1234')).toBeTruthy();
  });

  it('📦 ModalForm destroyOnClose', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        width={600}
        initialValues={{
          name: '1234',
        }}
        modalProps={{ destroyOnClose: true }}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </ModalForm>,
    );
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    expect(await wrapper.queryByDisplayValue('1234')).toBeFalsy();

    act(() => {
      wrapper.rerender(
        <ModalForm
          width={600}
          initialValues={{
            name: '1234',
          }}
          visible
          modalProps={{ destroyOnClose: true }}
          onOpenChange={(open) => fn(open)}
        >
          <ProFormText
            name="name"
            fieldProps={{
              id: 'test',
            }}
          />
        </ModalForm>,
      );
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    expect(await wrapper.findByDisplayValue('1234')).toBeTruthy();

    act(() => {
      wrapper.rerender(
        <ModalForm
          key="reset"
          width={600}
          initialValues={{
            name: '1234',
          }}
          open={false}
          modalProps={{ destroyOnClose: true }}
          onOpenChange={(open) => fn(open)}
        >
          <ProFormText
            name="name"
            fieldProps={{
              id: 'test',
            }}
          />
        </ModalForm>,
      );
    });
    await waitForWaitTime(2000);

    expect(await wrapper.queryByDisplayValue('1234')).toBeFalsy();
  });

  it('📦 modal close button will simulate onOpenChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('button.ant-modal-close')
        ?.click();
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    expect(fn).toHaveBeenCalledWith(false);
    expect(fn).toBeCalledTimes(2); // 点击触发一次，关闭触发一次 onOpenChange
  });

  it('📦 modal open=true simulate onOpenChange', async () => {
    const fn = vi.fn();
    render(
      <ModalForm
        open
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(true);
    });
  });

  it('📦 reset button will simulate onOpenChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    await act(async () => {
      (await wrapper.findByText('取 消'))?.click();
    });
    expect(fn).toHaveBeenCalledWith(false);
  });

  it('📦 modal close button will simulate modalProps.onCancel', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        visible
        modalProps={{
          onCancel: () => fn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('button.ant-modal-close')
        ?.click();
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    expect(fn).toHaveBeenCalledWith(false);
  });

  it('📦 form onFinish return true should close modal', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
        onFinish={async () => true}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForWaitTime(500);

    await act(async () => {
      (await wrapper.findByText('确 认'))?.click();
    });

    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    expect(fn).toHaveBeenCalledWith(false);
    await waitFor(async () => {
      await waitForWaitTime(100);
    });
  });

  it('📦 form onFinish is null, no close modal', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForWaitTime(500);

    await act(async () => {
      (await wrapper.findByText('确 认'))?.click();
    });

    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    expect(fn).toBeCalledTimes(1); // 点击会触发一次onOpenChange
  });

  it('📦 ModalForm support submitter is false', async () => {
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        submitter={false}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });

    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-modal-footer'),
    ).toBeFalsy();
  });

  it('📦 ModalForm close no rerender from', async () => {
    const wrapper = render(
      <ModalForm
        initialValues={{
          name: '1234',
        }}
        trigger={<Button id="new">新建</Button>}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </ModalForm>,
    );
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });

    await waitFor(async () => {
      await waitForWaitTime(300);
    });

    act(() => {
      fireEvent.change(wrapper.baseElement.querySelector('.ant-input#test')!, {
        target: {
          value: 'test',
        },
      });
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    expect(await wrapper.findByDisplayValue('test')).toBeTruthy();
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('button.ant-modal-close')
        ?.click();
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    expect(await wrapper.findByDisplayValue('test')).toBeTruthy();
  });

  it('📦 ModalForm destroyOnClose close will rerender from', async () => {
    const wrapper = render(
      <ModalForm
        modalProps={{
          getContainer: false,
          destroyOnClose: true,
        }}
        initialValues={{
          name: '1234',
        }}
        trigger={<Button id="new">新建</Button>}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </ModalForm>,
    );
    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });

    await waitFor(async () => {
      await waitForWaitTime(300);
    });
    act(() => {
      fireEvent.change(wrapper.container.querySelector('.ant-input#test')!, {
        target: {
          value: '1111',
        },
      });
    });

    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    expect(await wrapper.findByDisplayValue('1111')).toBeTruthy();

    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('button.ant-modal-close')
        ?.click();
    });

    await waitFor(async () => {
      await waitForWaitTime(100);
    });
    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitFor(async () => {
      await waitForWaitTime(100);
    });

    expect(await wrapper.findByDisplayValue('1234')).toBeTruthy();
  });

  it('📦 DrawerForm submitTimeout is number will disabled close button when submit', async () => {
    const fn = vi.fn();
    vi.useFakeTimers();
    const html = render(
      <ModalForm
        visible
        modalProps={{
          onCancel: () => fn(),
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
      </ModalForm>,
    );

    await act(async () => {
      (await html.findByText('确 认'))?.click();
    });

    expect(
      (html.queryAllByText('取 消').at(0)?.parentElement as HTMLButtonElement)
        .disabled,
    ).toEqual(true);

    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    expect(fn).not.toBeCalled();

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(
      (html.queryAllByText('取 消').at(0)?.parentElement as HTMLButtonElement)
        ?.disabled,
    ).toEqual(false);

    await act(async () => {
      (await html.queryByText('取 消'))?.click();
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });
    expect(fn).toBeCalled();
    vi.useRealTimers();
  });

  it('📦 modal submitTimeout is null no disable close button when submit', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        visible
        modalProps={{
          onCancel: () => fn(),
        }}
        onFinish={async () => {
          await waitForWaitTime(2000);
        }}
      />,
    );

    await waitFor(async () => {
      await waitForWaitTime(500);
    });

    await act(async () => {
      (await wrapper.findByText('确 认'))?.click();
    });

    await waitFor(async () => {
      await waitForWaitTime(500);
    });

    expect(
      wrapper.baseElement.querySelector<HTMLButtonElement>(
        'button.ant-btn-default',
      )?.disabled,
    ).toEqual(false);

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('button.ant-modal-close')
        ?.click();
    });

    await waitFor(async () => {
      await waitForWaitTime(500);
    });

    expect(fn).toBeCalled();

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 model no render Form when destroyOnClose', () => {
    const { container } = render(
      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        trigger={
          <Button id="new" type="primary">
            新建
          </Button>
        }
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    expect(container.querySelector('form')).toBeFalsy();
  });

  it('📦 ModelForm get formRef when destroyOnClose', async () => {
    const ref = React.createRef<any>();

    const html = render(
      <ModalForm
        formRef={ref}
        modalProps={{
          destroyOnClose: true,
        }}
        trigger={
          <Button id="new" type="primary">
            新建
          </Button>
        }
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    expect(ref.current).toBeFalsy();

    await act(async () => {
      (await html.findByText('新 建'))?.click();
    });

    await waitFor(
      () => {
        expect(ref.current).toBeTruthy();
      },
      {
        timeout: 1000,
      },
    );

    html.unmount();
  });
});
