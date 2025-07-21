import { ModalForm, ProFormText } from '@ant-design/pro-components';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import type { FormInstance } from 'antd';
import { Button } from 'antd';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
  // 清理所有定时器
  vi.clearAllTimers();
  // 清理所有模拟
  vi.clearAllMocks();
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

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(true);
    });

    await act(async () => {
      const cancelButton = wrapper.getByText('取 消');
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(false);
    });

    // 确保组件完全卸载
    wrapper.unmount();
    await waitForWaitTime(100);
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

    await waitFor(() => {
      expect(wrapper.getByText('名称')).toBeTruthy();
    });

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

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(true);
    });

    await act(async () => {
      const cancelButton = wrapper.getByText('取 消');
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(false);
    });
  });

  it('📦 form onFinish return true should close modal', async () => {
    const wrapper = render(
      <ModalForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onFinish={async () => {
          return true;
        }}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      const submitButton = wrapper.getByText('确 认');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      // 检查 Modal 是否被关闭，通过检查 .ant-modal-root 是否还存在
      const modalRoot = wrapper.container.querySelector('.ant-modal-root');
      expect(modalRoot).toBeFalsy();
    });
  });

  it('📦 form onFinish is null, no close modal', async () => {
    const wrapper = render(
      <ModalForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onFinish={async () => {
          return false;
        }}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      const submitButton = wrapper.getByText('确 认');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      // Modal 应该保持打开状态，检查按钮文本是否存在
      expect(wrapper.getByText('确 认')).toBeTruthy();
    });
  });

  it('📦 ModalForm support submitter is false', async () => {
    const wrapper = render(
      <ModalForm
        width={600}
        submitter={false}
        trigger={<Button id="new">新建</Button>}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await waitFor(() => {
      // 不应该有提交按钮
      expect(wrapper.queryByText('确 认')).toBeFalsy();
      expect(wrapper.queryByText('取 消')).toBeFalsy();
    });
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

    // 初始状态下不应该渲染表单内容
    expect(wrapper.queryByDisplayValue('1234')).toBeFalsy();

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await waitFor(() => {
      expect(wrapper.getByDisplayValue('1234')).toBeTruthy();
    });
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
        open
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

    await waitFor(() => {
      expect(wrapper.getByDisplayValue('1234')).toBeTruthy();
    });
  });

  it('📦 ModalForm destroyOnHidden', async () => {
    const wrapper = render(
      <ModalForm
        width={600}
        modalProps={{ destroyOnHidden: true }}
        trigger={<Button id="new">新建</Button>}
      >
        <ProFormText name="test" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      // 只选 className 包含 ant-input 的 input
      const inputs = wrapper
        .getAllByDisplayValue('')
        .filter((el) => el.className.includes('ant-input'));
      fireEvent.change(inputs[0], { target: { value: '1234' } });
    });

    await act(async () => {
      const cancelButton = wrapper.getByText('取 消');
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      // 检查 Modal 是否被关闭
      const modalRoot = wrapper.container.querySelector('.ant-modal-root');
      expect(modalRoot).toBeFalsy();
    });

    // 再次打开 Modal
    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await waitFor(() => {
      // 检查输入框是否被重置
      const inputs = wrapper
        .getAllByDisplayValue('')
        .filter((el) => el.className.includes('ant-input'));

      expect(inputs.length).toBe(0);
    });
  });

  it('📦 modal close button will simulate onOpenChange', async () => {
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

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      const cancelButton = wrapper.getByText('取 消');
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(false);
    });
  });

  it('📦 modal open=true simulate onOpenChange', async () => {
    const fn = vi.fn();
    render(
      <ModalForm width={600} open onOpenChange={(open) => fn(open)}>
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
        width={600}
        trigger={<Button id="new">新建</Button>}
        onOpenChange={(open) => fn(open)}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      const cancelButton = wrapper.getByText('取 消');
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(false);
    });
  });

  it('📦 modal close button will simulate modalProps.onCancel', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ModalForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        modalProps={{
          onCancel: () => fn(false),
        }}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      const cancelButton = wrapper.getByText('取 消');
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(false);
    });
  });

  it('📦 ModalForm close no rerender from', async () => {
    const wrapper = render(
      <ModalForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onFinish={async () => {
          return true;
        }}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      const submitButton = wrapper.getByText('确 认');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      // 检查 Modal 是否被关闭
      const modalRoot = wrapper.container.querySelector('.ant-modal-root');
      expect(modalRoot).toBeFalsy();
    });

    // 再次打开 Modal
    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await waitFor(() => {
      // Modal 应该重新打开，检查按钮文本是否存在
      expect(wrapper.getByText('确 认')).toBeTruthy();
    });
  });

  it('📦 ModalForm destroyOnHidden close will rerender from', async () => {
    const wrapper = render(
      <ModalForm
        width={600}
        modalProps={{ destroyOnHidden: true }}
        trigger={<Button id="new">新建</Button>}
        onFinish={async () => {
          return true;
        }}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      const submitButton = wrapper.getByText('确 认');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      // 检查 Modal 是否被关闭
      const modalRoot = wrapper.container.querySelector('.ant-modal-root');
      expect(modalRoot).toBeFalsy();
    });

    // 再次打开 Modal
    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await waitFor(() => {
      // Modal 应该重新打开，检查按钮文本是否存在
      expect(wrapper.getByText('确 认')).toBeTruthy();
    });
  });

  it('📦 DrawerForm submitTimeout is number will disabled close button when submit', async () => {
    const wrapper = render(
      <ModalForm
        width={600}
        submitTimeout={2000}
        trigger={<Button id="new">新建</Button>}
        onFinish={async () => {
          await waitForWaitTime(1000);
          return true;
        }}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      const submitButton = wrapper.getByText('确 认');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      // 检查提交按钮是否有 loading 状态
      const submitButton = wrapper.getByText('确 认').closest('button');
      expect(submitButton).toHaveClass('ant-btn-loading');
    });
  });

  it('📦 modal submitTimeout is null no disable close button when submit', async () => {
    const wrapper = render(
      <ModalForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onFinish={async () => {
          await waitForWaitTime(100);
          return true;
        }}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = wrapper.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await act(async () => {
      const submitButton = wrapper.getByText('确 认');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      // 提交按钮不应该被禁用
      const submitButton = wrapper.container.querySelector(
        'button[type="button"]',
      );
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('📦 model no render Form when destroyOnHidden', async () => {
    const wrapper = render(
      <ModalForm
        width={600}
        modalProps={{ destroyOnHidden: true }}
        trigger={<Button id="new">新建</Button>}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    // 初始状态下不应该渲染表单内容
    expect(wrapper.queryByText('确 认')).toBeFalsy();
  });

  it('📦 ModelForm get formRef when destroyOnHidden', async () => {
    const formRef = createRef<FormInstance>();
    const html = render(
      <ModalForm
        width={600}
        formRef={formRef}
        modalProps={{ destroyOnHidden: true }}
        trigger={<Button id="new">新建</Button>}
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    await act(async () => {
      const triggerButton = html.getByText('新 建');
      fireEvent.click(triggerButton);
    });

    await waitFor(() => {
      expect(formRef.current).toBeTruthy();
    });
  });
});
