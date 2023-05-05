import { DrawerForm, ModalForm, ProFormText } from '@ant-design/pro-form';
import { act, fireEvent, render } from '@testing-library/react';
import { Button, Form } from 'antd';
import React from 'react';
import { waitTime } from '../util';

describe('DrawerForm', () => {
  it('📦 trigger will simulate onOpenChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    expect(fn).toBeCalledWith(true);
  });

  it('📦 DrawerForm first no render items', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitTime(300);

    expect(!!wrapper.baseElement.querySelector('input#test')).toBeFalsy();

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitTime(300);
    expect(!!wrapper.baseElement.querySelector('input#test')).toBeTruthy();
  });

  it('📦 DrawerForm first render items', async () => {
    const wrapper = render(
      <DrawerForm
        width={600}
        drawerProps={{
          forceRender: true,
        }}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitTime(300);
    expect(!!wrapper.baseElement.querySelector('input#test')).toBeTruthy();
  });

  it('📦 DrawerForm support submitter is false', async () => {
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        submitter={false}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitTime(300);

    expect(
      !!wrapper.baseElement.querySelector('.ant-drawer-footer'),
    ).toBeFalsy();
  });

  it('📦 DrawerForm destroyOnClose', async () => {
    const wrapper = render(
      <DrawerForm
        width={600}
        open={false}
        drawerProps={{ destroyOnClose: true }}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitTime(300);
    expect(!!wrapper.baseElement.querySelector('input#test')).toBeFalsy();

    act(() => {
      wrapper.rerender(
        <DrawerForm width={600} open drawerProps={{ destroyOnClose: true }}>
          <ProFormText
            name="name"
            fieldProps={{
              id: 'test',
            }}
          />
        </DrawerForm>,
      );
    });
    await waitTime(300);
    expect(!!wrapper.baseElement.querySelector('input#test')).toBeTruthy();

    act(() => {
      wrapper.rerender(
        <DrawerForm
          key="reset"
          width={600}
          open={false}
          drawerProps={{ destroyOnClose: true }}
        >
          <ProFormText
            name="name"
            fieldProps={{
              id: 'test',
            }}
          />
        </DrawerForm>,
      );
    });
    await waitTime(300);
    expect(!!wrapper.baseElement.querySelector('input#test')).toBeFalsy();
  });

  it('📦 drawer close button will simulate onOpenChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitTime(100);

    act(() => {
      (
        wrapper.baseElement.querySelector(
          'button.ant-drawer-close',
        ) as HTMLButtonElement
      ).click();
    });
    await waitTime(100);
    expect(fn).toBeCalledWith(false);
  });

  it('📦 drawer close button will simulate onOpenChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );

    await waitTime(100);

    act(() => {
      (
        wrapper.baseElement.querySelector(
          'button.ant-drawer-close',
        ) as HTMLButtonElement
      ).click();
    });
    await waitTime(100);
    expect(fn).toBeCalledWith(false);
  });

  it('📦 reset button will simulate onOpenChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitTime(300);

    await act(async () => {
      await (await wrapper.findByText('取 消')).click();
    });
    await waitTime(300);

    expect(fn).toBeCalledWith(false);
  });

  it('📦 drawer close button will simulate drawerProps.onClose', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => fn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitTime(100);

    act(() => {
      (
        wrapper.baseElement.querySelector(
          'button.ant-drawer-close',
        ) as HTMLButtonElement
      ).click();
    });
    await waitTime(100);
    expect(fn).toBeCalledWith(false);
  });

  it('📦 drawer reset button will simulate drawerProps.onClose', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => fn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitTime(100);

    await act(async () => {
      (await wrapper.findByText('取 消')).click();
    });

    expect(fn).toBeCalledWith(false);
  });

  it('📦 drawer reset button will simulate drawerProps.onCancel', async () => {
    const fn = jest.fn();
    const onCloseFn = jest.fn();
    const wrapper = render(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => onCloseFn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitTime(100);

    await act(async () => {
      (await wrapper.findByText('取 消')).click();
    });
    await waitTime(100);
    expect(fn).toBeCalledWith(false);
    expect(fn).toBeCalledTimes(2);

    // 点击关闭按钮的时候会手动触发一下 onClose
    expect(onCloseFn).toBeCalledWith(false);
    expect(fn).toBeCalledTimes(2);
  });

  it('📦 form onFinish return true should close drawer', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
        onFinish={async () => true}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitTime(1200);

    await act(async () => {
      (await wrapper.findByText('确 认')).click();
    });

    await waitTime(100);

    expect(fn).toBeCalledWith(false);
  });

  it('📦 form onFinish is null, no close drawer', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitTime(1200);

    await act(async () => {
      (await wrapper.findByText('确 认')).click();
    });

    await waitTime(100);
    expect(fn).toBeCalledTimes(1);
  });

  it('📦 submitter config no reset default config', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <DrawerForm
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
      </DrawerForm>,
    );
    await waitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });
    await waitTime(200);
    expect(fn).toBeCalledWith(true);

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLButtonElement>('button#reset')
        ?.click?.();
    });
    await waitTime(100);
    expect(fn).toBeCalledWith(false);
  });

  it('📦 DrawerForm close no rerender from', async () => {
    const wrapper = render(
      <DrawerForm
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
      </DrawerForm>,
    );
    await waitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitTime(300);
    act(() => {
      fireEvent.change(wrapper.baseElement.querySelector('.ant-input#test')!, {
        target: {
          value: 'test',
        },
      });
    });
    await waitTime(200);

    expect(
      wrapper.baseElement.querySelector<HTMLInputElement>('.ant-input#test')
        ?.value,
    ).toEqual('test');
    await waitTime(100);

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLInputElement>('.ant-drawer-close')
        ?.click();
    });
    await waitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitTime(200);

    expect(
      wrapper.baseElement.querySelector<HTMLInputElement>('.ant-input#test')
        ?.value,
    ).toEqual('test');
  });

  it('📦 DrawerForm destroyOnClose close will rerender from', async () => {
    const wrapper = render(
      <DrawerForm
        drawerProps={{
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
      </DrawerForm>,
    );
    await waitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitTime(300);

    act(() => {
      fireEvent.change(wrapper.baseElement.querySelector('.ant-input#test')!, {
        target: {
          value: '1111',
        },
      });
    });

    await waitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLInputElement>('input#test')?.value,
    ).toEqual('1111');

    await waitTime(100);

    act(() => {
      wrapper.rerender(
        <DrawerForm
          drawerProps={{
            destroyOnClose: true,
          }}
          initialValues={{
            name: '1234',
          }}
          open={false}
          trigger={<Button id="new">新建</Button>}
        >
          <ProFormText
            name="name"
            fieldProps={{
              id: 'test',
            }}
          />
        </DrawerForm>,
      );
    });
    await waitTime(300);

    act(() => {
      wrapper.rerender(
        <DrawerForm
          key="reset"
          drawerProps={{
            destroyOnClose: true,
          }}
          initialValues={{
            name: '1234',
          }}
          open={undefined}
          trigger={<Button id="new">新建</Button>}
        >
          <ProFormText
            name="name"
            fieldProps={{
              id: 'test',
            }}
          />
        </DrawerForm>,
      );
    });
    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitTime(300);

    expect(
      wrapper.baseElement.querySelector<HTMLInputElement>('input#test')?.value,
    ).toEqual('1234');
  });

  it('📦 drawer no render Form when destroyOnClose', () => {
    const { container } = render(
      <DrawerForm
        drawerProps={{
          destroyOnClose: true,
        }}
        trigger={
          <Button id="new" type="primary">
            新建
          </Button>
        }
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );

    expect(container.querySelector('form')).toBeFalsy();
  });

  it('📦 drawerForm get formRef when destroyOnClose', async () => {
    const ref = React.createRef<any>();

    const html = render(
      <DrawerForm
        formRef={ref}
        drawerProps={{
          destroyOnClose: true,
        }}
        trigger={
          <Button id="new" type="primary">
            新建
          </Button>
        }
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );

    await waitTime(1200);
    expect(ref.current).toBeFalsy();

    await act(async () => {
      (await html.findByText('新 建')).click();
    });
    await waitTime(200);

    act(() => {
      html.rerender(
        <DrawerForm
          formRef={ref}
          drawerProps={{
            destroyOnClose: true,
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </DrawerForm>,
      );
    });

    expect(ref.current).toBeTruthy();
  });

  const tests = [
    {
      name: 'drawerForm',
      Comp: DrawerForm,
      close: '.ant-drawer-close',
      props: 'drawerProps',
    },
    {
      name: 'modalForm',
      Comp: ModalForm,
      close: '.ant-modal-close',
      props: 'modalProps',
    },
  ];
  tests.forEach((item) => {
    const { name, Comp, close, props } = item;
    it(`📦 ${name} resetFields when destroy`, async () => {
      const fn = jest.fn();
      const App = () => {
        const [form] = Form.useForm();
        const prop = {
          [props]: {
            destroyOnClose: true,
          },
        };
        return (
          <Comp
            {...prop}
            form={form}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                if (form.getFieldValue('name')) fn(form.getFieldValue('name'));
              }
            }}
            onFinish={async () => {
              return true;
            }}
            trigger={
              <Button id="new" type="primary">
                新建
              </Button>
            }
          >
            <ProFormText name="name" />
          </Comp>
        );
      };
      const html = render(<App />);
      await waitTime(300);
      // 点击取消按钮后重置
      act(() => {
        html.baseElement.querySelectorAll<HTMLDivElement>('#new')[0].click();
      });
      await waitTime(300);
      act(() => {
        fireEvent.change(
          html.baseElement.querySelector<HTMLDivElement>('input#name')!,
          {
            target: {
              value: '12345',
            },
          },
        );
      });
      await waitTime(300);
      expect(
        html.baseElement.querySelector<HTMLInputElement>('input#name')?.value,
      ).toBe('12345');
      act(() => {
        html.baseElement
          .querySelectorAll<HTMLDivElement>('.ant-btn-default')[0]
          .click();
      });
      act(() => {
        html.baseElement.querySelectorAll<HTMLDivElement>('#new')[0].click();
      });
      await waitTime(300);
      expect(
        html.baseElement.querySelector<HTMLInputElement>('input#name')?.value,
      ).toBeFalsy();
      // 点击关闭按钮后重置
      act(() => {
        fireEvent.change(
          html.baseElement.querySelector<HTMLDivElement>('input#name')!,
          {
            target: {
              value: '12345',
            },
          },
        );
      });
      await waitTime(300);
      expect(
        html.baseElement.querySelector<HTMLInputElement>('input#name')?.value,
      ).toBe('12345');
      act(() => {
        html.baseElement.querySelectorAll<HTMLDivElement>(close)[0].click();
      });
      act(() => {
        html.baseElement.querySelectorAll<HTMLDivElement>('#new')[0].click();
      });
      await waitTime(300);
      expect(
        html.baseElement.querySelector<HTMLInputElement>('input#name')?.value,
      ).toBeFalsy();
      // 点击提交按钮后重置
      act(() => {
        fireEvent.change(
          html.baseElement.querySelector<HTMLDivElement>('input#name')!,
          {
            target: {
              value: '12345',
            },
          },
        );
      });
      await waitTime(300);
      expect(
        html.baseElement.querySelector<HTMLInputElement>('input#name')?.value,
      ).toBe('12345');

      act(() => {
        html.baseElement
          .querySelectorAll<HTMLDivElement>('.ant-btn-primary')[0]
          .click();
      });
      await waitTime(300);
      act(() => {
        html.baseElement.querySelectorAll<HTMLDivElement>('#new')[0].click();
      });
      await waitTime(300);
      expect(
        html.baseElement.querySelector<HTMLInputElement>('input#name')?.value,
      ).toBeFalsy();

      // 通过检查fn被调用的次数确定在 onOpenChange 时表单是否已被重置
      expect(fn).toBeCalledTimes(3);

      html.unmount();
    });
  });
});
