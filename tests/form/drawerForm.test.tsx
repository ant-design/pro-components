import React from 'react';
import { ProFormText, DrawerForm } from '@ant-design/pro-form';
import { Button } from 'antd';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { waitForComponentToPaint } from '../util';

describe('DrawerForm', () => {
  it('📦 trigger will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
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
  });

  it('📦 modal close button will simulate onVisibleChange', async () => {
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
    expect(fn).toBeCalledWith(false);
  });

  it('📦 drawer close button will simulate modalProps.onClose', async () => {
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

    expect(fn).toBeCalledWith(false);
  });
});
