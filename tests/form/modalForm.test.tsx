import React from 'react';
import { ProFormText, ModalForm } from '@ant-design/pro-form';
import { Button } from 'antd';
import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { waitForComponentToPaint, waitTime } from '../util';

describe('ModalForm', () => {
  it('📦 trigger will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ModalForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper);

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(true);
  });

  it('📦 submitter config no reset default config', async () => {
    const fn = jest.fn();
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
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper);

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitForComponentToPaint(wrapper, 200);
    expect(fn).toBeCalledWith(true);

    await act(async () => {
      (await wrapper.findByText('取 消'))?.click();
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);
  });

  it('📦 ModalForm first no render items', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ModalForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        initialValues={{
          name: '1234',
        }}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(await wrapper.queryByDisplayValue('1234')).toBeFalsy();

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitForComponentToPaint(wrapper);
    expect(await wrapper.findByDisplayValue('1234')).toBeTruthy();
  });

  it('📦 ModalForm first render items', async () => {
    const fn = jest.fn();
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
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper, 120);

    expect(await wrapper.findByDisplayValue('1234')).toBeTruthy();
  });

  it('📦 ModalForm destroyOnClose', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ModalForm
        width={600}
        initialValues={{
          name: '1234',
        }}
        modalProps={{ destroyOnClose: true }}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper);

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
          onVisibleChange={(visible) => fn(visible)}
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
    await waitForComponentToPaint(wrapper);

    expect(await wrapper.findByDisplayValue('1234')).toBeTruthy();

    act(() => {
      wrapper.rerender(
        <ModalForm
          key="reset"
          width={600}
          initialValues={{
            name: '1234',
          }}
          visible={false}
          modalProps={{ destroyOnClose: true }}
          onVisibleChange={(visible) => fn(visible)}
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
    await waitForComponentToPaint(wrapper, 2000);

    expect(await wrapper.queryByDisplayValue('1234')).toBeFalsy();
  });

  it('📦 modal close button will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('button.ant-modal-close')?.click();
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);
    expect(fn).toBeCalledTimes(2);
  });

  it('📦 modal visible=true simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(fn).toBeCalledWith(true);
  });

  it('📦 reset button will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper);

    await act(async () => {
      (await wrapper.findByText('取 消'))?.click();
    });
    expect(fn).toBeCalledWith(false);
  });

  it('📦 modal close button will simulate modalProps.onCancel', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ModalForm
        visible
        modalProps={{
          onCancel: () => fn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('button.ant-modal-close')?.click();
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);
  });

  it('📦 form onFinish return true should close modal', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
        onFinish={async () => true}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper, 500);

    await act(async () => {
      (await wrapper.findByText('确 认'))?.click();
    });

    await waitForComponentToPaint(wrapper);

    expect(fn).toBeCalledWith(false);
  });

  it('📦 form onFinish is null, no close modal', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ModalForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper, 500);

    await act(async () => {
      (await wrapper.findByText('确 认'))?.click();
    });

    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledTimes(1);
  });

  it('📦 ModalForm support submitter is false', async () => {
    const wrapper = render(
      <ModalForm visible trigger={<Button id="new">新建</Button>} submitter={false}>
        <ProFormText name="name" />
      </ModalForm>,
    );
    await waitForComponentToPaint(wrapper);

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.baseElement.querySelector<HTMLDivElement>('.ant-modal-footer')).toBeFalsy();
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
    await waitForComponentToPaint(wrapper);

    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });

    await waitForComponentToPaint(wrapper, 300);

    act(() => {
      fireEvent.change(wrapper.baseElement.querySelector('.ant-input#test')!, {
        target: {
          value: 'test',
        },
      });
    });
    await waitForComponentToPaint(wrapper);
    expect(await wrapper.findByDisplayValue('test')).toBeTruthy();
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('button.ant-modal-close')?.click();
    });
    await waitForComponentToPaint(wrapper);
    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitForComponentToPaint(wrapper);

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
    await waitForComponentToPaint(wrapper);
    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });

    await waitForComponentToPaint(wrapper, 300);
    act(() => {
      fireEvent.change(wrapper.container.querySelector('.ant-input#test')!, {
        target: {
          value: '1111',
        },
      });
    });

    await waitForComponentToPaint(wrapper);
    expect(await wrapper.findByDisplayValue('1111')).toBeTruthy();

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('button.ant-modal-close')?.click();
    });

    await waitForComponentToPaint(wrapper);
    await act(async () => {
      (await wrapper.findByText('新 建'))?.click();
    });
    await waitForComponentToPaint(wrapper);

    expect(await wrapper.findByDisplayValue('1234')).toBeTruthy();
  });

  it('📦 DrawerForm submitTimeout is number will disabled close button when submit', async () => {
    const fn = jest.fn();
    const html = render(
      <ModalForm
        visible
        modalProps={{
          onCancel: () => fn(),
        }}
        onFinish={async () => {
          await waitTime(20000);
        }}
        submitTimeout={3000}
      >
        <ProFormText name="text" />
      </ModalForm>,
    );
    await waitForComponentToPaint(html, 500);

    await act(async () => {
      (await html.findByText('确 认'))?.click();
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
      <ModalForm
        visible
        modalProps={{
          onCancel: () => fn(),
        }}
        onFinish={async () => {
          await waitTime(2000);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 500);

    await act(async () => {
      (await wrapper.findByText('确 认'))?.click();
    });

    await waitForComponentToPaint(wrapper, 500);

    expect(
      wrapper.baseElement.querySelector<HTMLButtonElement>('button.ant-btn-default')?.disabled,
    ).toEqual(false);

    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('button.ant-modal-close')?.click();
    });

    await waitForComponentToPaint(wrapper, 500);

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

    waitForComponentToPaint(html, 200);
    expect(ref.current).toBeFalsy();
    await act(async () => {
      (await html.findByText('新 建'))?.click();
    });
    await waitForComponentToPaint(html, 200);

    expect(ref.current).toBeTruthy();

    html.unmount();
  });
});
