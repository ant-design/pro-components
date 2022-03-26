import React from 'react';
import { ProFormText, DrawerForm, ModalForm } from '@ant-design/pro-form';
import { Button } from 'antd';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { waitForComponentToPaint } from '../util';

describe('DrawerForm', () => {
  it('📦 trigger will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    expect(fn).toBeCalledWith(true);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm first no render items', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper, 300);

    expect(wrapper.find('input#test').exists()).toBeFalsy();

    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 300);
    expect(wrapper.find('input#test').exists()).toBeTruthy();
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm first render items', async () => {
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper, 300);
    expect(wrapper.find('input#test').exists()).toBeTruthy();
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm support submitter is false', async () => {
    const wrapper = mount(
      <DrawerForm visible trigger={<Button id="new">新建</Button>} submitter={false}>
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 300);

    expect(wrapper.find('.ant-drawer-footer').length).toBe(0);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm destroyOnClose', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        width={600}
        drawerProps={{ destroyOnClose: true }}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('input#test').exists()).toBeFalsy();

    act(() => {
      wrapper.setProps({
        visible: true,
      });
    });
    await waitForComponentToPaint(wrapper, 200);

    expect(wrapper.find('input#test').exists()).toBeTruthy();

    act(() => {
      wrapper.setProps({
        visible: false,
      });
    });
    await waitForComponentToPaint(wrapper);

    // expect(wrapper.find('input#test').exists()).toBeFalsy();

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer close button will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-drawer-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer close button will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-drawer-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 reset button will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper, 300);

    act(() => {
      wrapper.find('.ant-drawer-footer').update().find('button.ant-btn').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 300);

    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer close button will simulate drawerProps.onClose', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => fn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-drawer-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer reset button will simulate drawerProps.onClose', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => fn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn').at(0).simulate('click');
    });

    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer reset button will simulate drawerProps.onCancel', async () => {
    const fn = jest.fn();
    const onCloseFn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => onCloseFn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);
    expect(fn).toBeCalledTimes(2);

    // 点击关闭按钮的时候会手动触发一下 onClose
    expect(onCloseFn).toBeCalledWith(false);
    expect(fn).toBeCalledTimes(2);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 form onFinish return true should close drawer', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
        onFinish={async () => true}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper, 500);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 form onFinish is null, no close drawer', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper, 500);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledTimes(1);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 submitter config no reset default config', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 200);
    expect(fn).toBeCalledWith(true);

    act(() => {
      wrapper.find('button#reset').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm close no rerender from', async () => {
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 300);
    act(() => {
      wrapper
        .find('.ant-input#test')
        .at(0)
        .simulate('change', {
          target: {
            value: 'test',
          },
        });
    });
    await waitForComponentToPaint(wrapper, 200);

    expect(wrapper.find('.ant-input#test').props().value).toEqual('test');
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-drawer-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(wrapper.find('Input#test').props().value).toEqual('test');

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm destroyOnClose close will rerender from', async () => {
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 300);

    act(() => {
      wrapper
        .find('.ant-input#test')
        .at(0)
        .simulate('change', {
          target: {
            value: '1111',
          },
        });
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('Input#test').props().value).toEqual('1111');

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.setProps({ visible: false });
    });
    await waitForComponentToPaint(wrapper, 300);
    act(() => {
      wrapper.setProps({ visible: undefined });
    });
    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 300);

    // expect(wrapper.find('Input#test').props().value).toEqual('1234');

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

    const html = mount(
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

    waitForComponentToPaint(html, 200);
    expect(ref.current).toBeFalsy();
    act(() => {
      html.find('button#new').simulate('click');
    });
    await waitForComponentToPaint(html, 200);

    html.setProps({ formRef: ref, drawerProps: { destroyOnClose: true } });

    expect(ref.current).toBeTruthy();

    html.unmount();
  });

  it('📦 ModelForm get formRef when destroyOnClose', async () => {
    const ref = React.createRef<any>();

    const html = mount(
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
    act(() => {
      html.find('button#new').simulate('click');
    });
    await waitForComponentToPaint(html, 200);

    expect(ref.current).toBeTruthy();

    html.unmount();
  });
});
