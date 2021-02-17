import React from 'react';
import ProForm, { ProFormText, ProFormList } from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { waitForComponentToPaint } from '../util';

describe('ProForm List', () => {
  it('♨️  ProForm.List', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={async (values) => {
          fn(Object.keys(values['users'][0]));
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );
    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith(['name', 'nickName']);
  });

  it('♨️  ProForm.List add button', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={async (values) => {
          fn(Object.keys(values['users'][1]));
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    await waitForComponentToPaint(html);

    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').exists()).toBeTruthy();
    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-top').exists()).toBeFalsy();

    act(() => {
      html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith([]);
  });

  it('♨️  ProForm.List render children', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={async (values) => {
          fn(values['users'][0]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          {(fields) => {
            return fields.map((filed) => (
              <>
                <ProFormText name={[filed.name, 'name']} />
                <ProFormText name={[filed.name, 'nickName']} />
              </>
            ));
          }}
        </ProFormList>
      </ProForm>,
    );

    await waitForComponentToPaint(html);

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: '1111',
      nickName: '1111',
    });
  });

  it('♨️  ProForm.List close button', async () => {
    const html = mount(
      <ProForm>
        <ProFormText name="name" label="姓名" />
        <ProFormList name="users" label="用户信息" creatorButtonProps={false}>
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    await waitForComponentToPaint(html);

    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').exists()).toBeFalsy();
  });

  it('♨️  ProForm.List add button when creatorRecord', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={async (values) => {
          fn(values['users'][1]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          creatorRecord={{
            name: '2222',
            nickName: '2222',
          }}
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    await waitForComponentToPaint(html);

    act(() => {
      html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: '2222',
      nickName: '2222',
    });
  });

  it('♨️  ProForm.List add button on top', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={async (values) => {
          fn(Object.keys(values['users'][1]));
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          creatorButtonProps={{
            position: 'top',
            creatorButtonText: '新建',
          }}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    await waitForComponentToPaint(html);

    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-top').exists()).toBeTruthy();
    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').exists()).toBeFalsy();

    act(() => {
      html.find('.ant-btn.ant-pro-form-list-creator-button-top').simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith([]);
  });

  it('♨️  ProForm.List copy to newline', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={async (values) => {
          fn(values['users'][1]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    act(() => {
      html.find('.ant-pro-form-list-action .ant-pro-form-list-action-icon').at(0).simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: '1111',
      nickName: '1111',
    });
  });

  it('♨️  ProForm.List delete icon', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={async (values) => {
          fn(values['users'][0]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
            {
              name: '2222',
              nickName: '2222',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    act(() => {
      html
        .find('.ant-pro-form-list-action')
        .at(0)
        .find('span.ant-pro-form-list-action-icon')
        .at(1)
        .simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: '2222',
      nickName: '2222',
    });
  });
});
