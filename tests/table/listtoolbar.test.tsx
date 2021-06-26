import { mount, render } from 'enzyme';
import React from 'react';
import ProTable, { ListToolBar } from '@ant-design/pro-table';
import { SettingOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

describe('Table valueEnum', () => {
  it('ListToolBar onAction', async () => {
    const onAction = jest.fn();
    const wrapper = mount(
      <ListToolBar
        actions={[
          <Button key="import">批量导入</Button>,
          <Button
            key="add"
            type="primary"
            onClick={() => {
              onAction('add');
            }}
          >
            添加
          </Button>,
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    expect(onAction).toHaveBeenLastCalledWith('add');
  });

  it('ListToolBar onAction', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <ProTable<{
        name: string;
      }>
        columns={[
          {
            title: '应用名称',
            dataIndex: 'name',
          },
        ]}
        request={() => {
          return Promise.resolve({
            data: [],
            success: true,
          });
        }}
        toolbar={{
          title: '这里是标题',
          search: {
            onSearch: (value: string) => {
              onSearch(value);
            },
          },
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-pro-table-list-toolbar-search input').simulate('change', {
        target: {
          value: '1111111',
        },
      });
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-pro-table-list-toolbar-search input').simulate('keyDown', { keyCode: 13 });
    });

    await waitForComponentToPaint(wrapper);
    expect(onSearch).toBeCalledWith('1111111');
  });

  it('ListToolBar action no array', async () => {
    const wrapper = render(
      <ListToolBar
        // @ts-expect-error
        actions={
          <Button key="add" type="primary">
            添加
          </Button>
        }
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('ListToolBar action is empty array', async () => {
    const wrapper = render(
      <ListToolBar
        // @ts-expect-error
        actions={() => []}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('ListToolBar action no jsx', async () => {
    const wrapper = render(
      <ListToolBar
        actions={[
          <Button key="add" type="primary">
            添加
          </Button>,
          'shuaxin',
        ]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('ListToolBar onSettingClick', async () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <ListToolBar
        settings={[
          {
            icon: <SettingOutlined />,
            tooltip: '设置',
            onClick,
            key: 's-value',
          },
          {
            icon: <FullscreenOutlined />,
            key: 'm-value',
          },
          // 测试空的情况
          null,
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('.anticon-setting').simulate('click');
    });
    expect(onClick).toHaveBeenLastCalledWith('s-value');
    expect(wrapper.find('.ant-divider').length).toEqual(0);
  });

  it('ListToolBar search left', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <ListToolBar
        search={{
          placeholder: '自定义 placeholder',
          onSearch,
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    const inputEle = wrapper.find('input');
    act(() => {
      inputEle.simulate('focus');
    });
    act(() => {
      inputEle.simulate('change', { target: { value: 'input 值' } });
    });
    act(() => {
      inputEle.simulate('keyDown', { keyCode: 13 });
    });
    expect(wrapper.find('.ant-pro-table-list-toolbar-left input').prop('value')).toEqual(
      'input 值',
    );
    expect(onSearch).toHaveBeenCalled();
    expect(wrapper.find('input').prop('placeholder')).toEqual('自定义 placeholder');
  });

  it('ListToolBar search right and custom input search', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <ListToolBar
        title="I am title"
        search={<Input.Search placeholder="自定义 placeholder" onSearch={onSearch} />}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    const inputEle = wrapper.find('input');
    act(() => {
      inputEle.simulate('focus');
    });
    act(() => {
      inputEle.simulate('change', { target: { value: 'input 值' } });
    });
    act(() => {
      inputEle.simulate('keyDown', { keyCode: 13 });
    });
    expect(wrapper.find('.ant-pro-table-list-toolbar-right input').prop('value')).toEqual(
      'input 值',
    );
    expect(onSearch).toHaveBeenCalled();
    expect(wrapper.find('input').prop('placeholder')).toEqual('自定义 placeholder');
  });

  it('ListToolBar dropdown menu', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ListToolBar
        menu={{
          type: 'dropdown',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
          ],
          onChange,
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    wrapper.find('div.ant-pro-table-list-toolbar-dropdownmenu-label').at(0).simulate('click');
    act(() => {
      wrapper.find('li.ant-dropdown-menu-item').at(1).simulate('click');
    });

    expect(onChange).toHaveBeenCalledWith('done', undefined);
  });

  it('ListToolBar tab menu', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ListToolBar
        menu={{
          type: 'tab',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
          ],
          onChange,
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('.ant-tabs-tab').at(1).simulate('click');
    });

    expect(onChange).toHaveBeenCalledWith('done', undefined);
  });

  it('ListToolBar inline menu', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ListToolBar
        menu={{
          type: 'inline',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
            {
              label: '禁用',
              key: 'disable',
              disabled: true,
            },
          ],
          onChange,
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('.ant-pro-table-list-toolbar-inline-menu-item').at(1).simulate('click');
    });
    expect(onChange).toHaveBeenCalledWith('done', undefined);
  });

  it('ListToolBar render no menu with item empty', async () => {
    const wrapper = mount(
      <ListToolBar
        menu={{
          type: 'inline',
          items: [],
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    expect(wrapper.find('.ant-pro-table-list-toolbar-menu').length).toBe(0);
  });
});
