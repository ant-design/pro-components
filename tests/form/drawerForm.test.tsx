import React from 'react';
import { ProFormText, DrawerForm, ModalForm } from '@ant-design/pro-form';
import { Button } from 'antd';
import { act } from 'react-dom/test-utils';
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
    act(() => {
      wrapper.unmount();
    });
    expect(fn).toBeCalledWith(true);
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
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('input#test').exists()).toBeFalsy();

    act(() => {
      wrapper.find('button#new').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('input#test').exists()).toBeTruthy();
  });

  it('📦 DrawerForm first render items', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        width={600}
        drawerProps={{
          forceRender: true,
        }}
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

    expect(wrapper.find('input#test').exists()).toBeTruthy();
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

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-drawer-footer').length).toBe(0);
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
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('input#test').exists()).toBeTruthy();

    act(() => {
      wrapper.setProps({
        visible: false,
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('input#test').exists()).toBeFalsy();
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-drawer-footer button.ant-btn').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);
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
  });

  it('📦 drawer reset button will simulate drawerProps.onCancel', async () => {
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
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(fn).toBeCalledWith(false);
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledTimes(1);
  });

  it('📦 getContainer is function', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = mount(
      <div>
        <div id="render-form" ref={ref}></div>
        <DrawerForm
          drawerProps={{
            getContainer: () => ref.current!,
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </DrawerForm>
      </div>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
  });

  it('📦 getContainer is string', async () => {
    const ref = React.createRef<HTMLDivElement>();
    document.getElementById = () => ref.current;
    const wrapper = mount(
      <div>
        <div id="render-form" ref={ref}></div>
        <DrawerForm
          drawerProps={{
            getContainer: 'render-form',
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </DrawerForm>
      </div>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
  });

  it('📦 getContainer is element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const Demo = () => (
      <div>
        <div id="render-form" ref={ref}></div>
        <DrawerForm
          drawerProps={{
            getContainer: ref.current!,
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </DrawerForm>
      </div>
    );

    const wrapper = mount(<Demo />);

    act(() => {
      wrapper.setProps({
        id: '1212',
      });
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
  });

  it('📦 ModalForm getContainer is function', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = mount(
      <div>
        <div id="render-form" ref={ref}></div>
        <ModalForm
          modalProps={{
            getContainer: () => ref.current!,
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </ModalForm>
      </div>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 ModalForm getContainer is string', async () => {
    const ref = React.createRef<HTMLDivElement>();
    document.getElementById = () => ref.current;
    const wrapper = mount(
      <div>
        <div id="render-form" ref={ref}></div>
        <ModalForm
          modalProps={{
            getContainer: 'render-form',
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </ModalForm>
      </div>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
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
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(true);

    act(() => {
      wrapper.find('button#reset').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);
  });

  it('📦 ModalForm getContainer is element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const Demo = () => (
      <div>
        <div id="render-form" ref={ref}></div>
        <ModalForm
          modalProps={{
            getContainer: ref.current || undefined,
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </ModalForm>
      </div>
    );

    const wrapper = mount(<Demo />);
    act(() => {
      wrapper.setProps({
        id: '1212',
      });
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
  });
});
