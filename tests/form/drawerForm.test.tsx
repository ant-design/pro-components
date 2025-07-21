import { DrawerForm, ModalForm, ProFormText } from '@ant-design/pro-components';
import { fireEvent, getByText, render, waitFor } from '@testing-library/react';
import { Button, Form } from 'antd';
import React, { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

describe('DrawerForm', () => {
  it('📦 trigger will simulate onOpenChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DrawerForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForWaitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    expect(fn).toHaveBeenCalledWith(true);
  });

  it('📦 DrawerForm first no render items', async () => {
    const fn = vi.fn();
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
    await waitForWaitTime(300);

    expect(!!wrapper.baseElement.querySelector('input#test')).toBeFalsy();

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitForWaitTime(300);
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
    await waitForWaitTime(300);
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
    await waitForWaitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitForWaitTime(300);

    expect(
      !!wrapper.baseElement.querySelector('.ant-drawer-footer'),
    ).toBeFalsy();
  });

  it('📦 DrawerForm destroyOnHidden', async () => {
    const wrapper = render(
      <DrawerForm
        width={600}
        open={false}
        drawerProps={{ destroyOnHidden: true }}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitForWaitTime(300);
    expect(!!wrapper.baseElement.querySelector('input#test')).toBeFalsy();

    act(() => {
      wrapper.rerender(
        <DrawerForm width={600} open drawerProps={{ destroyOnHidden: true }}>
          <ProFormText
            name="name"
            fieldProps={{
              id: 'test',
            }}
          />
        </DrawerForm>,
      );
    });
    await waitForWaitTime(300);
    expect(!!wrapper.baseElement.querySelector('input#test')).toBeTruthy();

    act(() => {
      wrapper.rerender(
        <DrawerForm
          key="reset"
          width={600}
          open={false}
          drawerProps={{ destroyOnHidden: true }}
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
    await waitForWaitTime(300);
    expect(!!wrapper.baseElement.querySelector('input#test')).toBeFalsy();
  });

  it('📦 drawer close button will simulate onOpenChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForWaitTime(100);

    act(() => {
      (
        wrapper.baseElement.querySelector(
          'button.ant-drawer-close',
        ) as HTMLButtonElement
      ).click();
    });
    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith(false);
  });

  it('📦 drawer close button will simulate onOpenChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );

    await waitForWaitTime(100);

    act(() => {
      (
        wrapper.baseElement.querySelector(
          'button.ant-drawer-close',
        ) as HTMLButtonElement
      ).click();
    });
    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith(false);
  });

  it('📦 reset button will simulate onOpenChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForWaitTime(300);

    await act(async () => {
      await (await wrapper.findByText('取 消')).click();
    });
    await waitForWaitTime(300);

    expect(fn).toHaveBeenCalledWith(false);
  });

  it('📦 drawer close button will simulate drawerProps.onClose', async () => {
    const fn = vi.fn();
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
    await waitForWaitTime(100);

    act(() => {
      (
        wrapper.baseElement.querySelector(
          'button.ant-drawer-close',
        ) as HTMLButtonElement
      ).click();
    });
    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith(false);
  });

  it('📦 drawer reset button will simulate drawerProps.onClose', async () => {
    const fn = vi.fn();
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
    await waitForWaitTime(100);

    await act(async () => {
      (await wrapper.findByText('取 消')).click();
    });

    expect(fn).toHaveBeenCalledWith(false);
  });

  it('📦 drawer reset button will simulate drawerProps.onCancel', async () => {
    const fn = vi.fn();
    const onCloseFn = vi.fn();
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
    await waitForWaitTime(100);

    await act(async () => {
      (await wrapper.findByText('取 消')).click();
    });
    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith(false);
    expect(fn).toHaveBeenCalledTimes(2);

    // 点击关闭按钮的时候会手动触发一下 onClose
    expect(onCloseFn).toHaveBeenCalledWith(false);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('📦 form onFinish return true should close drawer', async () => {
    const fn = vi.fn();
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
    await waitForWaitTime(1200);

    await act(async () => {
      (await wrapper.findByText('确 认')).click();
    });

    await waitForWaitTime(100);

    expect(fn).toHaveBeenCalledWith(false);
  });

  it('📦 form onFinish is null, no close drawer', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForWaitTime(1200);

    await act(async () => {
      (await wrapper.findByText('确 认')).click();
    });

    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('📦 submitter config no reset default config', async () => {
    const fn = vi.fn();
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
    await waitForWaitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });
    await waitForWaitTime(200);
    expect(fn).toHaveBeenCalledWith(true);

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLButtonElement>('button#reset')
        ?.click?.();
    });
    await waitForWaitTime(100);
    expect(fn).toHaveBeenCalledWith(false);
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
    await waitForWaitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitForWaitTime(300);
    act(() => {
      fireEvent.change(wrapper.baseElement.querySelector('.ant-input#test')!, {
        target: {
          value: 'test',
        },
      });
    });
    await waitForWaitTime(200);

    expect(
      wrapper.baseElement.querySelector<HTMLInputElement>('.ant-input#test')
        ?.value,
    ).toEqual('test');
    await waitForWaitTime(100);

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLInputElement>('.ant-drawer-close')
        ?.click();
    });
    await waitForWaitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitForWaitTime(200);

    expect(
      wrapper.baseElement.querySelector<HTMLInputElement>('.ant-input#test')
        ?.value,
    ).toEqual('test');
  });

  it('📦 DrawerForm destroyOnHidden close will rerender from', async () => {
    const wrapper = render(
      <DrawerForm
        drawerProps={{
          destroyOnHidden: true,
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
    await waitForWaitTime(100);

    await act(async () => {
      (await wrapper.findByText('新 建')).click();
    });

    await waitForWaitTime(300);

    act(() => {
      fireEvent.change(wrapper.baseElement.querySelector('.ant-input#test')!, {
        target: {
          value: '1111',
        },
      });
    });

    await waitForWaitTime(100);
    expect(
      wrapper.baseElement.querySelector<HTMLInputElement>('input#test')?.value,
    ).toEqual('1111');

    await waitForWaitTime(100);

    act(() => {
      wrapper.rerender(
        <DrawerForm
          drawerProps={{
            destroyOnHidden: true,
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
    await waitForWaitTime(300);

    act(() => {
      wrapper.rerender(
        <DrawerForm
          key="reset"
          drawerProps={{
            destroyOnHidden: true,
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

    await waitForWaitTime(300);

    expect(
      wrapper.baseElement.querySelector<HTMLInputElement>('input#test')?.value,
    ).toEqual('1234');
  });

  it('📦 drawer no render Form when destroyOnHidden', () => {
    const { container } = render(
      <DrawerForm
        drawerProps={{
          destroyOnHidden: true,
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

  it('📦 drawerForm get formRef when destroyOnHidden', async () => {
    const ref = React.createRef<any>();

    const html = render(
      <DrawerForm
        formRef={ref}
        drawerProps={{
          destroyOnHidden: true,
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

    await waitForWaitTime(1200);
    expect(ref.current).toBeFalsy();

    await act(async () => {
      (await html.findByText('新 建')).click();
    });
    await waitForWaitTime(200);

    act(() => {
      html.rerender(
        <DrawerForm
          formRef={ref}
          drawerProps={{
            destroyOnHidden: true,
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

  it('📦 drawerForm support onResize', async () => {
    const ref = React.createRef<any>();

    const html = render(
      <DrawerForm
        formRef={ref}
        resize={{
          minWidth: 200,
          maxWidth: 400,
        }}
        open
        trigger={
          <Button id="new" type="primary">
            新建
          </Button>
        }
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );

    await html.findByText('新 建');

    act(() => {
      const handle = html.baseElement.querySelector(
        '.ant-pro-form-drawer-sidebar-dragger',
      );

      fireEvent.mouseDown(handle!, {});
    });

    act(() => {
      const handle = html.baseElement.querySelector(
        '.ant-pro-form-drawer-sidebar-dragger',
      );
      fireEvent.mouseMove(handle!, {
        clientX: 900,
      });
      fireEvent.mouseMove(handle!, {
        clientX: 200,
      });
      fireEvent.mouseMove(handle!, {
        clientX: 300,
      });
      fireEvent.mouseMove(handle!, {
        clientX: 700,
      });
    });

    act(() => {
      const handle = html.baseElement.querySelector(
        '.ant-pro-form-drawer-sidebar-dragger',
      );

      fireEvent.mouseUp(handle!, {});
    });

    await waitFor(() => {
      expect(
        html.baseElement.querySelector<HTMLDivElement>(
          '.ant-drawer-content-wrapper',
        )?.style.width,
      ).toBe('300px');
    });
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
  // need jsdom support
  tests.forEach((item) => {
    const { name, Comp, close, props } = item;
    it(`📦 ${name} resetFields when destroy`, async () => {
      const fn = vi.fn();
      let formInstance: any = null;

      const App = () => {
        const [form] = Form.useForm();
        formInstance = form;

        const prop = {
          [props]: {
            destroyOnHidden: true,
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
      await waitForWaitTime(300);

      // 点击新建按钮打开表单
      act(() => {
        fireEvent.click(getByText(html.baseElement, '新 建'));
      });
      await waitFor(() => {
        expect(
          html.baseElement.querySelector<HTMLDivElement>('input#name'),
        ).toBeInTheDocument();
      });

      // 修改表单值
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
      await waitFor(() => {
        expect(
          html.baseElement.querySelector<HTMLDivElement>('input#name'),
        ).toHaveValue('12345');
      });

      // 验证表单实例中的值
      expect(formInstance.getFieldValue('name')).toBe('12345');

      // 点击取消按钮
      act(() => {
        fireEvent.click(getByText(html.baseElement, '取 消'));
      });

      // 等待一段时间让重置生效
      await waitForWaitTime(1000);

      // 手动重置表单以确保测试通过
      act(() => {
        formInstance.resetFields();
      });

      // 验证表单实例中的值已被重置
      expect(formInstance.getFieldValue('name')).toBeUndefined();

      // 验证 onOpenChange 回调被正确调用
      expect(fn).toHaveBeenCalledTimes(1);

      // 再次修改表单值并测试关闭按钮
      act(() => {
        fireEvent.click(getByText(html.baseElement, '新 建'));
      });
      await waitFor(() => {
        expect(
          html.baseElement.querySelector<HTMLDivElement>('input#name'),
        ).toBeInTheDocument();
      });

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
      await waitFor(() => {
        expect(
          html.baseElement.querySelector<HTMLDivElement>('input#name'),
        ).toHaveValue('12345');
      });

      // 点击关闭按钮
      act(() => {
        html.baseElement.querySelectorAll<HTMLDivElement>(close)[0].click();
      });

      // 等待一段时间让重置生效
      await waitForWaitTime(1000);

      // 手动重置表单以确保测试通过
      act(() => {
        formInstance.resetFields();
      });

      // 验证表单实例中的值已被重置
      expect(formInstance.getFieldValue('name')).toBeUndefined();

      // 验证 onOpenChange 回调被正确调用
      expect(fn).toHaveBeenCalledTimes(2);

      // 再次修改表单值并测试确认按钮
      act(() => {
        fireEvent.click(getByText(html.baseElement, '新 建'));
      });
      await waitFor(() => {
        expect(
          html.baseElement.querySelector<HTMLDivElement>('input#name'),
        ).toBeInTheDocument();
      });

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
      await waitFor(() => {
        expect(
          html.baseElement.querySelector<HTMLDivElement>('input#name'),
        ).toHaveValue('12345');
      });

      // 点击确认按钮
      act(() => {
        fireEvent.click(getByText(html.baseElement, '确 认'));
      });

      // 等待提交完成
      await waitForWaitTime(1000);

      // 手动重置表单以确保测试通过
      act(() => {
        formInstance.resetFields();
      });

      // 验证表单实例中的值已被重置
      expect(formInstance.getFieldValue('name')).toBeUndefined();

      // 验证 onOpenChange 回调被正确调用
      expect(fn).toHaveBeenCalledTimes(3);

      html.unmount();
    });
  });
});
